"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AmpliosoftLogo } from "@/components/ampliosoft-logo";

interface RedirectPageProps {
  targetUrl: string;
  shortCode: string;
  linkTitle?: string;
}

export default function RedirectPage({ targetUrl, shortCode, linkTitle }: RedirectPageProps) {
  const [countdown, setCountdown] = useState(3);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRedirecting(true);
          // Small delay for the animation, then redirect
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetUrl]);



  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-2 h-2 bg-[#3d85b8] rounded-full opacity-60"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-[#3d85b8] rounded-full opacity-50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AmpliosoftLogo className="w-16 h-16 text-white" />
            <span className="ml-3 text-2xl font-bold text-white">rdr.nu</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-2xl font-semibold text-white mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isRedirecting ? "Redirecting..." : "Redirecting to your link"}
          </motion.h1>

          {/* Link info */}
          {linkTitle && (
            <motion.p
              className="text-gray-400 mb-6 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {linkTitle}
            </motion.p>
          )}

          {/* Countdown or loading */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {isRedirecting ? (
              <motion.div
                className="flex items-center justify-center space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-2 h-2 bg-[#3d85b8] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#3d85b8] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-[#3d85b8] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </motion.div>
            ) : (
              <motion.div
                key={countdown}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-6xl font-bold text-[#3d85b8]"
              >
                {countdown}
              </motion.div>
            )}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-full bg-neutral-800 rounded-full h-1 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="bg-[#3d85b8] h-1 rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: isRedirecting ? "100%" : `${((3 - countdown) / 3) * 100}%` 
              }}
              transition={{ duration: isRedirecting ? 0.5 : 1 }}
            />
          </motion.div>

          {/* Destination URL */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-xs text-gray-500 break-all"
          >
            Taking you to: <span className="text-gray-400">{new URL(targetUrl).hostname}</span>
          </motion.div>
        </motion.div>

        {/* Skip button */}
        {!isRedirecting && (
          <motion.button
            onClick={() => {
              setIsRedirecting(true);
              window.location.href = targetUrl;
            }}
            className="text-gray-400 hover:text-white text-sm underline transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Skip and go now
          </motion.button>
        )}
      </div>

      {/* Powered by */}
      <motion.div
        className="absolute bottom-4 right-4 text-xs text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Powered by rdr.nu
      </motion.div>
    </div>
  );
}
