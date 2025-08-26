"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DashboardContent from "./dashboard-content";

// Force dynamic rendering to prevent prerendering issues with useSession
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3d85b8] mx-auto mb-4"></div>
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
          <Link href="/signin">
            <Button className="px-6 py-3 bg-[#3d85b8] text-white rounded-lg hover:bg-[#2c6a94]">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <DashboardContent />;
}