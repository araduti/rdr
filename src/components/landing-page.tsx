"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Spotlight } from "./ui/spotlight";
import { Button } from "./ui/button";
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
import { AmpliosoftLogo } from "@/components/ampliosoft-logo";

export function LandingPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);



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

      
      {/* Multiple Spotlights for more drama */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="#3d85b8" />
      <Spotlight className="-top-80 right-0 md:right-60 md:-top-40" fill="white" />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          {/* Upper Left Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-8 left-8 z-20"
          >
            <div className="flex items-center space-x-3">
              <AmpliosoftLogo className="w-8 h-8 text-white" />
            </div>
          </motion.div>

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
              className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -top-20 -left-20 w-40 h-40 bg-[#3d85b8]/20 rounded-full blur-3xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl"
              />
              Transform Links.<br />
              <span className="bg-gradient-to-r from-[#3d85b8] via-[#4a90d9] to-[#2c6a94] bg-clip-text text-transparent animate-pulse">
                Track Everything.
              </span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -top-10 left-1/2 w-2 h-2 bg-[#3d85b8] rounded-full"
              />
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

            {/* Modern URL Shortener Widget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 max-w-4xl mx-auto relative"
            >
              {/* Enhanced glowing background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute -inset-4 bg-gradient-to-r from-[#3d85b8]/30 via-cyan-500/20 to-[#3d85b8]/30 rounded-3xl blur-2xl"
              />
              
              {/* Main input container */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    {/* Enhanced input field */}
                    <div className="flex-1 relative group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#3d85b8]/20 to-cyan-500/20 rounded-xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                      />
                      <input
                        type="url"
                        placeholder="Paste your long URL here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="relative w-full px-6 py-4 bg-black/40 border border-white/20 rounded-xl focus:outline-none focus:border-[#3d85b8]/50 focus:bg-black/60 text-white placeholder-neutral-400 transition-all duration-300 text-lg font-medium"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: url ? 1 : 0 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      </motion.div>
                    </div>
                    
                    {/* Enhanced button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleShortenUrl}
                        disabled={!url || isLoading}
                        className="px-8 py-4 bg-gradient-to-r from-[#3d85b8] via-[#4a90d9] to-[#2c6a94] hover:from-[#2c6a94] hover:via-[#3d85b8] hover:to-[#1e4a6e] text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-[#3d85b8]/30 border border-[#3d85b8]/30 min-w-[140px] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {/* Button shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        />
                        
                        <div className="relative flex items-center justify-center">
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                          ) : (
                            <>
                              <ZapIcon className="w-5 h-5 mr-2" />
                              Shorten
                            </>
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                  
                  {/* Quick action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10"
                  >
                    <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                      <QrCodeIcon className="w-4 h-4" />
                      QR Code
                    </button>
                    <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                      <BarChart3Icon className="w-4 h-4" />
                      Analytics
                    </button>
                    <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                      <ShieldIcon className="w-4 h-4" />
                      Custom Domain
                    </button>
                  </motion.div>
                </motion.div>
              </div>
              
              {shortUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="mt-6 relative"
                >
                  {/* Success glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-[#3d85b8]/20 rounded-lg blur-sm"
                  />
                  
                  <div className="relative p-6 bg-gradient-to-r from-neutral-900/90 to-neutral-800/90 backdrop-blur-xl border border-green-400/20 rounded-lg shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        />
                        <span className="text-green-400 font-mono text-lg">{shortUrl}</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            try {
                              if (navigator?.clipboard?.writeText) {
                                await navigator.clipboard.writeText(shortUrl);
                              }
                            } catch (error) {
                              console.warn('Failed to copy to clipboard:', error);
                            }
                          }}
                          className="text-neutral-400 hover:text-green-400 hover:bg-green-400/10 transition-all duration-200"
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="mt-3 h-px bg-gradient-to-r from-green-400 to-[#3d85b8]"
                    />
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

      {/* Enhanced Professional Footer */}
      <footer className="relative bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border-t border-neutral-800/50">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] mask-gradient-to-b"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <AmpliosoftLogo className="w-7 h-7 text-white" />
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
