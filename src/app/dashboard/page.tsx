"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import nextDynamic from "next/dynamic";

// Force dynamic rendering to prevent prerendering issues with useSession
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Dynamically import the dashboard content to prevent SSR issues
const DashboardContent = nextDynamic(() => import("./dashboard-content"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading Dashboard...</p>
      </div>
    </div>
  ),
});

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-gray-400 mb-8">
            You need to be signed in to access the dashboard.
          </p>
          <Link href="/api/auth/signin">
            <Button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <DashboardContent />;
}