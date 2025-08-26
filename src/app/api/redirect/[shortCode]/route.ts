import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { headers } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await params;
  const searchParams = request.nextUrl.searchParams;
  
  // Get domain from host header
  const headersList = headers();
  const host = headersList.get("host") || "rdr.nu";
  const domain = host.split(":")[0]; // Remove port if present

  try {
    // Find the link
    const link = await db.link.findFirst({
      where: {
        shortCode,
        domain: {
          in: [domain, "rdr.nu"], // Allow both custom domain and default
        },
      },
    });

    if (!link) {
      return NextResponse.json(
        { error: "Link not found" },
        { status: 404 }
      );
    }

    // Check if link is expired
    if (link.expiresAt && link.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Link has expired" },
        { status: 410 }
      );
    }

    // Get client information for analytics
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
               request.headers.get("x-real-ip") || 
               "unknown";

    // Extract UTM parameters
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmTerm = searchParams.get("utm_term");
    const utmContent = searchParams.get("utm_content");

    // Parse user agent for device/browser info (simplified)
    const parseUserAgent = (ua: string) => {
      const device = /Mobile|Android|iPhone|iPad/.test(ua) ? "Mobile" : "Desktop";
      let browser = "Unknown";
      
      if (ua.includes("Chrome")) browser = "Chrome";
      else if (ua.includes("Firefox")) browser = "Firefox";
      else if (ua.includes("Safari")) browser = "Safari";
      else if (ua.includes("Edge")) browser = "Edge";
      
      let os = "Unknown";
      if (ua.includes("Windows")) os = "Windows";
      else if (ua.includes("Mac")) os = "macOS";
      else if (ua.includes("Linux")) os = "Linux";
      else if (ua.includes("Android")) os = "Android";
      else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
      
      return { device, browser, os };
    };

    const { device, browser, os } = parseUserAgent(userAgent);

    // Record the click event asynchronously
    // In production, you might want to use a queue for this
    Promise.resolve().then(async () => {
      try {
        await db.clickEvent.create({
          data: {
            linkId: link.id,
            ip,
            userAgent,
            referer: referer || null,
            device,
            browser,
            os,
            utmSource,
            utmMedium,
            utmCampaign,
            utmTerm,
            utmContent,
          },
        });

        // Increment click count
        await db.link.update({
          where: { id: link.id },
          data: {
            clicks: {
              increment: 1,
            },
          },
        });
      } catch (error) {
        console.error("Error recording click:", error);
      }
    });

    // Construct the final URL with UTM parameters if they exist
    const finalUrl = new URL(link.url);
    if (utmSource) finalUrl.searchParams.set("utm_source", utmSource);
    if (utmMedium) finalUrl.searchParams.set("utm_medium", utmMedium);
    if (utmCampaign) finalUrl.searchParams.set("utm_campaign", utmCampaign);
    if (utmTerm) finalUrl.searchParams.set("utm_term", utmTerm);
    if (utmContent) finalUrl.searchParams.set("utm_content", utmContent);

    // Redirect to the original URL
    return NextResponse.redirect(finalUrl.toString(), {
      status: 302,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Error in redirect handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
