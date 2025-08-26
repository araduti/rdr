import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { headers } from "next/headers";
import Link from "next/link";
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

interface PageProps {
  params: Promise<{
    shortCode: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function recordClick(linkId: string, request: { headers: ReadonlyHeaders }) {
  try {
    // This would be better done in the API route, but for now we'll handle it here
    const userAgent = request.headers.get("user-agent") ?? "";
    const referer = request.headers.get("referer") ?? "";
    
    // Parse user agent for device/browser info (simplified)
    const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? "Mobile" : "Desktop";
    let browser = "Unknown";
    
    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";
    
    let os = "Unknown";
    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "macOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";

    await db.clickEvent.create({
      data: {
        linkId,
        userAgent,
        referer: referer ?? null,
        device,
        browser,
        os,
      },
    });

    // Increment click count
    await db.link.update({
      where: { id: linkId },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error("Error recording click:", error);
  }
}

export default async function ShortCodePage({ params, searchParams }: PageProps) {
  const { shortCode } = await params;
  const resolvedSearchParams = await searchParams;
  
  // Get domain from headers
  const headersList = await headers();
  const host = headersList.get("host") ?? "rdr.nu";
  const domain = host.split(":")[0] ?? "rdr.nu";

  try {
    // Find the link
    const link = await db.link.findFirst({
      where: {
        shortCode,
        domain: {
          in: [domain, "rdr.nu"],
        },
      },
    });

    if (!link) {
      // Return 404 page
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">404 - Link Not Found</h1>
            <p className="text-gray-400 mb-8">
              The short link you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link 
              href="/" 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      );
    }

    // Check if link is expired
    if (link.expiresAt && link.expiresAt < new Date()) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Link Expired</h1>
            <p className="text-gray-400 mb-8">
              This link has expired and is no longer available.
            </p>
            <Link 
              href="/" 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      );
    }

    // Record click analytics (async)
    void Promise.resolve().then(() => recordClick(link.id, { headers: headersList }));

    // Construct the final URL with UTM parameters if they exist
    const finalUrl = new URL(link.url);
    
    // Add UTM parameters from search params
    Object.entries(resolvedSearchParams).forEach(([key, value]) => {
      if (key.startsWith("utm_") && typeof value === "string") {
        finalUrl.searchParams.set(key, value);
      }
    });

    // Redirect to the original URL
    redirect(finalUrl.toString());
  } catch (error) {
    console.error("Error in redirect:", error);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error</h1>
          <p className="text-gray-400 mb-8">
            Something went wrong. Please try again later.
          </p>
          <Link 
            href="/" 
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }
}
