"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, MailIcon } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const result = await signIn("email", { 
        email, 
        callbackUrl: "/dashboard",
        redirect: false 
      });
      
      if (result?.ok) {
        setEmailSent(true);
      } else {
        console.error("Sign in failed:", result?.error);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-full max-w-md mx-4 text-center">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-6">
            <MailIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-gray-400 mb-4">
              We've sent a magic link to <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Click the link in the email to sign in to your account.
            </p>
          </div>
          
          <Button
            onClick={() => {
              setEmailSent(false);
              setEmail("");
            }}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            Try a different email
          </Button>
          
          <div className="mt-6">
            <Link 
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">
            Enter your email to receive a magic link
          </p>
        </div>

        {/* Email sign-in form */}
        <form onSubmit={handleEmailSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d85b8] text-white placeholder-neutral-400"
            />
          </div>
          
          <Button
            type="submit"
            disabled={!email || loading}
            className="w-full py-3 bg-[#3d85b8] hover:bg-[#2c6a94] text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending magic link...
              </>
            ) : (
              <>
                <MailIcon className="w-4 h-4" />
                Send magic link
              </>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-[#3d85b8] hover:text-[#2c6a94]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#3d85b8] hover:text-[#2c6a94]">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
