"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Spotlight } from "./ui/spotlight";
import { Button } from "./ui/button";
import { FloatingNav } from "./ui/floating-navbar";
import { 
  LinkIcon, 
  BarChart3Icon, 
  ZapIcon, 
  ShieldIcon,
  ArrowRightIcon,
  CopyIcon,
  QrCodeIcon,
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon
} from "lucide-react";
import { api } from "@/trpc/react";
import Link from "next/link";

// Ampliosoft logo component
const AmpliosoftLogo = ({ className = "", size = 32 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className}>
    <g>
      <path 
        fill="currentColor" 
        fillRule="nonzero" 
        d="m47.38755,168.97282l-46.67661,0l12.17578,-20.62481l49.46724,0c4.25239,-0.01576 8.38852,1.23087 11.8768,3.53478c9.26889,5.99652 14.6508,16.0801 14.25214,26.73178c-12.6907,-6.29631 -26.77674,-9.6102 -41.09535,-9.64175zm0,0"
      />
      <path 
        fill="currentColor" 
        fillRule="nonzero" 
        d="m152.61756,168.97282l46.67665,0l-12.25887,-20.62481l-49.38419,0c-4.25239,-0.01576 -8.38848,1.23087 -11.8768,3.53478c-9.26885,5.99652 -14.6508,16.0801 -14.25214,26.73178c12.69075,-6.29631 26.77679,-9.6102 41.09535,-9.64175zm0,0"
      />
      <path 
        fill="currentColor" 
        fillRule="nonzero" 
        d="m99.46269,75.42741l36.7267,60.40688l43.40427,0l-80.13096,-134.41632l-79.26718,134.41632l42.60694,0l36.66023,-60.40688zm0,0"
      />
    </g>
  </svg>
);

export function LandingPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navItems = [
    { name: "Features", link: "#features", icon: <ZapIcon className="h-4 w-4" /> },
    { name: "Pricing", link: "#pricing", icon: <BarChart3Icon className="h-4 w-4" /> },
    { name: "Analytics", link: "#analytics", icon: <BarChart3Icon className="h-4 w-4" /> },
  ];

  const createLinkMutation = api.link.create.useMutation({
    onSuccess: (data) => {
      setShortUrl(data.shortUrl);
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Error creating link:", error.message);
      setIsLoading(false);
    },
  });

  const handleShortenUrl = async () => {
    if (!url) return;
    setIsLoading(true);
    
    try {
      createLinkMutation.mutate({
        url: url,
        title: `Link created from ${url}`,
      });
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black antialiased relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <AmpliosoftLogo className="text-[#3d85b8]" size={32} />
              <span className="text-xl font-bold text-white">rdr.nu</span>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#analytics" className="text-gray-300 hover:text-white transition-colors">
                Analytics
              </Link>
            </nav>
            
            {/* CTA Button */}
            <Link href="/signin">
              <Button className="bg-[#3d85b8] hover:bg-[#2c6a94] text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto relative z-10 w-full pt-24 md:pt-16">
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50"
            >
              Transform Links.<br />
              <span className="bg-gradient-to-r from-[#3d85b8] to-[#2c6a94] bg-clip-text text-transparent">
                Track Everything.
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mt-8"
            >
              Create powerful short links with advanced analytics, custom domains, 
              and enterprise-grade security. Join thousands of businesses using rdr.nu 
              to amplify their digital presence.
            </motion.p>

            {/* URL Shortener Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 max-w-2xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-neutral-900/50 backdrop-blur-xl border border-neutral-800">
                <input
                  type="url"
                  placeholder="Enter your long URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d85b8] text-white placeholder-neutral-400"
                />
                <Button
                  onClick={handleShortenUrl}
                  disabled={!url || isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-[#3d85b8] to-[#2c6a94] hover:from-[#2c6a94] hover:to-[#1e4a6e] text-white rounded-lg font-medium transition-all duration-200"
                >
                  {isLoading ? "Shortening..." : "Shorten"}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {shortUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-neutral-800/30 rounded-lg border border-neutral-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-mono">{shortUrl}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        try {
                          if (navigator?.clipboard?.writeText) {
                            await navigator.clipboard.writeText(shortUrl);
                            // Could add toast notification here
                          }
                        } catch (error) {
                          console.warn('Failed to copy to clipboard:', error);
                        }
                      }}
                      className="text-neutral-400 hover:text-white"
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="shimmer" asChild>
                <Link href="/dashboard">
                  Get Started Free
                </Link>
              </Button>
              <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800" asChild>
                <Link href="/dashboard">
                  View Dashboard
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Everything you need to manage and track your links effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
            {[
              {
                icon: <BarChart3Icon className="h-8 w-8" />,
                title: "Advanced Analytics",
                description: "Track clicks, geographic data, referrers, and device information with real-time insights."
              },
              {
                icon: <LinkIcon className="h-8 w-8" />,
                title: "Custom Domains",
                description: "Use your own branded domain to maintain consistency and build trust with your audience."
              },
              {
                icon: <QrCodeIcon className="h-8 w-8" />,
                title: "QR Codes",
                description: "Generate beautiful QR codes for your short links to bridge offline and online experiences."
              },
              {
                icon: <ShieldIcon className="h-8 w-8" />,
                title: "Enterprise Security",
                description: "Password protection, expiration dates, and access controls to keep your links secure."
              },
              {
                icon: <ZapIcon className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Global CDN ensures your redirects are blazing fast from anywhere in the world."
              },
              {
                icon: <BarChart3Icon className="h-8 w-8" />,
                title: "Team Collaboration",
                description: "Share workspaces, assign roles, and collaborate with your team on link management."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="text-[#3d85b8] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-neutral-400 mb-8">
              Join thousands of businesses using rdr.nu to power their link management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="shimmer" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="border-neutral-700 text-neutral-300">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Professional Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <AmpliosoftLogo className="text-[#3d85b8]" size={28} />
                <span className="text-lg font-bold text-white">rdr.nu</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Professional URL shortening with advanced analytics and branding. 
                Built by Ampliosoft for modern businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#3d85b8] transition-colors">
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#3d85b8] transition-colors">
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#3d85b8] transition-colors">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a href="mailto:support@rdr.nu" className="text-gray-400 hover:text-[#3d85b8] transition-colors">
                  <MailIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</Link></li>
                <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
                <li><Link href="#analytics" className="text-gray-400 hover:text-white transition-colors text-sm">Analytics</Link></li>
                <li><Link href="/api-docs" className="text-gray-400 hover:text-white transition-colors text-sm">API</Link></li>
                <li><Link href="/integrations" className="text-gray-400 hover:text-white transition-colors text-sm">Integrations</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-gray-400 hover:text-white transition-colors text-sm">Documentation</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</Link></li>
                <li><Link href="/status" className="text-gray-400 hover:text-white transition-colors text-sm">Status</Link></li>
                <li><Link href="/changelog" className="text-gray-400 hover:text-white transition-colors text-sm">Changelog</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Ampliosoft. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
