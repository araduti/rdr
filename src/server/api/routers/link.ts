import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

// Helper function to generate short codes
function generateShortCode(length = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Helper function to validate URLs
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
}

export const linkRouter = createTRPCRouter({
  // Public endpoint to get link details (for redirects)
  getByShortCode: publicProcedure
    .input(z.object({ 
      shortCode: z.string().min(1),
      domain: z.string().optional().default("rdr.nu")
    }))
    .query(async ({ ctx, input }) => {
      const link = await ctx.db.link.findFirst({
        where: {
          shortCode: input.shortCode,
          domain: input.domain,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      if (!link) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Link not found",
        });
      }

      // Check if link is expired
      if (link.expiresAt && link.expiresAt < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Link has expired",
        });
      }

      return link;
    }),

  // Public endpoint to create links (with rate limiting in production)
  create: publicProcedure
    .input(z.object({
      url: z.string().url("Please enter a valid URL"),
      title: z.string().optional(),
      description: z.string().optional(),
      customCode: z.string().min(3).max(20).optional(),
      domain: z.string().optional().default("rdr.nu"),
      password: z.string().optional(),
      expiresAt: z.date().optional(),
      projectId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Validate URL
      if (!isValidUrl(input.url)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid URL format",
        });
      }

      // Generate short code
      let shortCode = input.customCode ?? generateShortCode();
      
      // Ensure short code is unique
      let attempts = 0;
      while (attempts < 10) {
        const existing = await ctx.db.link.findFirst({
          where: {
            shortCode,
            domain: input.domain,
          },
        });

        if (!existing) break;
        
        if (input.customCode) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Custom short code already exists",
          });
        }
        
        shortCode = generateShortCode();
        attempts++;
      }

      if (attempts >= 10) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not generate unique short code",
        });
      }

      // Create the link
      const link = await ctx.db.link.create({
        data: {
          url: input.url,
          shortCode,
          domain: input.domain,
          title: input.title,
          description: input.description,
          password: input.password,
          expiresAt: input.expiresAt,
          userId: ctx.session?.user?.id,
          projectId: input.projectId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      return {
        ...link,
        shortUrl: `https://${input.domain}/${shortCode}`,
      };
    }),

  // Protected endpoint to get user's links
  getMyLinks: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(10),
      cursor: z.string().optional(),
      projectId: z.string().optional(),
      search: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const where = {
        userId: ctx.session.user.id,
        ...(input.projectId && { projectId: input.projectId }),
        ...(input.search && {
          OR: [
            { title: { contains: input.search, mode: "insensitive" as const } },
            { url: { contains: input.search, mode: "insensitive" as const } },
            { shortCode: { contains: input.search, mode: "insensitive" as const } },
          ],
        }),
      };

      const links = await ctx.db.link.findMany({
        where,
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          project: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: {
              clickEvents: true,
            },
          },
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (links.length > input.limit) {
        const nextItem = links.pop();
        nextCursor = nextItem!.id;
      }

      return {
        links: links.map(link => ({
          ...link,
          shortUrl: `https://${link.domain}/${link.shortCode}`,
          clicks: link._count.clickEvents,
        })),
        nextCursor,
      };
    }),

  // Protected endpoint to update a link
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      password: z.string().optional(),
      expiresAt: z.date().optional(),
      publicStats: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // Verify ownership
      const existingLink = await ctx.db.link.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });

      if (!existingLink) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Link not found",
        });
      }

      const updatedLink = await ctx.db.link.update({
        where: { id },
        data: updateData,
        include: {
          project: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      return {
        ...updatedLink,
        shortUrl: `https://${updatedLink.domain}/${updatedLink.shortCode}`,
      };
    }),

  // Protected endpoint to delete a link
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const existingLink = await ctx.db.link.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!existingLink) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Link not found",
        });
      }

      await ctx.db.link.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),

  // Protected endpoint to get link analytics
  getAnalytics: protectedProcedure
    .input(z.object({
      linkId: z.string(),
      interval: z.enum(["24h", "7d", "30d", "90d"]).default("7d"),
    }))
    .query(async ({ ctx, input }) => {
      // Verify ownership
      const link = await ctx.db.link.findFirst({
        where: {
          id: input.linkId,
          userId: ctx.session.user.id,
        },
      });

      if (!link) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Link not found",
        });
      }

      // Calculate date range
      const now = new Date();
      const intervals = {
        "24h": new Date(now.getTime() - 24 * 60 * 60 * 1000),
        "7d": new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        "30d": new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        "90d": new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
      };
      const startDate = intervals[input.interval];

      // Get click events
      const clickEvents = await ctx.db.clickEvent.findMany({
        where: {
          linkId: input.linkId,
          timestamp: {
            gte: startDate,
          },
        },
        orderBy: { timestamp: "asc" },
      });

      // Aggregate data
      const totalClicks = clickEvents.length;
      const uniqueClicks = new Set(clickEvents.map(e => e.ip)).size;
      
      const countries = clickEvents.reduce((acc, event) => {
        if (event.country) {
          acc[event.country] = (acc[event.country] ?? 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const devices = clickEvents.reduce((acc, event) => {
        if (event.device) {
          acc[event.device] = (acc[event.device] ?? 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const browsers = clickEvents.reduce((acc, event) => {
        if (event.browser) {
          acc[event.browser] = (acc[event.browser] ?? 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const referrers = clickEvents.reduce((acc, event) => {
        if (event.referer) {
          try {
            const domain = new URL(event.referer).hostname;
            acc[domain] = (acc[domain] ?? 0) + 1;
          } catch {
            acc.Direct = (acc.Direct ?? 0) + 1;
          }
        } else {
          acc.Direct = (acc.Direct ?? 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return {
        totalClicks,
        uniqueClicks,
        countries: Object.entries(countries)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10),
        devices: Object.entries(devices)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10),
        browsers: Object.entries(browsers)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10),
        referrers: Object.entries(referrers)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10),
        clickEvents: clickEvents.slice(-100), // Last 100 clicks for timeline
      };
    }),

  // Public endpoint to record click events
  recordClick: publicProcedure
    .input(z.object({
      linkId: z.string(),
      ip: z.string().optional(),
      userAgent: z.string().optional(),
      referer: z.string().optional(),
      country: z.string().optional(),
      region: z.string().optional(),
      city: z.string().optional(),
      device: z.string().optional(),
      browser: z.string().optional(),
      os: z.string().optional(),
      utmSource: z.string().optional(),
      utmMedium: z.string().optional(),
      utmCampaign: z.string().optional(),
      utmTerm: z.string().optional(),
      utmContent: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create click event
      await ctx.db.clickEvent.create({
        data: input,
      });

      // Increment link click count
      await ctx.db.link.update({
        where: { id: input.linkId },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });

      return { success: true };
    }),
});
