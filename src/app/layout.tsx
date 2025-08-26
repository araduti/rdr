import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "rdr.nu - Lightning Fast URL Shortener",
  description: "Transform your long URLs into short, powerful links. Track analytics, customize links, and boost your digital presence with rdr.nu",
  icons: [
    { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
    { rel: "icon", url: "/favicon.ico", sizes: "any" },
  ],
  keywords: ["URL shortener", "link shortener", "analytics", "custom links", "QR codes"],
  authors: [{ name: "rdr.nu Team" }],
  openGraph: {
    title: "rdr.nu - Lightning Fast URL Shortener",
    description: "Transform your long URLs into short, powerful links with advanced analytics",
    url: "https://rdr.nu",
    siteName: "rdr.nu",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rdr.nu - Lightning Fast URL Shortener",
    description: "Transform your long URLs into short, powerful links with advanced analytics",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
