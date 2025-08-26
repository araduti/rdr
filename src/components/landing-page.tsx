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
  QrCodeIcon
} from "lucide-react";
import { api } from "@/trpc/react";
import Link from "next/link";

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
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <FloatingNav navItems={navItems} />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
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
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
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
                  className="flex-1 px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-neutral-400"
                />
                <Button
                  onClick={handleShortenUrl}
                  disabled={!url || isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200"
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
                      onClick={() => navigator.clipboard.writeText(shortUrl)}
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
                <div className="text-purple-400 mb-4">
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
    </div>
  );
}
