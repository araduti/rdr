"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { 
  PlusIcon, 
  LinkIcon, 
  BarChart3Icon, 
  SearchIcon,
  CopyIcon,
  ExternalLinkIcon,
  EditIcon,
  TrashIcon,
  CalendarIcon
} from "lucide-react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface CreateLinkFormData {
  url: string;
  title?: string;
  description?: string;
  customCode?: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState<CreateLinkFormData>({
    url: "",
    title: "",
    description: "",
    customCode: "",
  });

  // Fetch user's links
  const { data: linksData, isLoading, refetch } = api.link.getMyLinks.useQuery({
    limit: 20,
    search: search || undefined,
  });

  // Create link mutation
  const createLinkMutation = api.link.create.useMutation({
    onSuccess: () => {
      setShowCreateForm(false);
      setFormData({ url: "", title: "", description: "", customCode: "" });
      refetch();
    },
  });

  // Delete link mutation
  const deleteLinkMutation = api.link.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) return;

    createLinkMutation.mutate({
      url: formData.url,
      title: formData.title || undefined,
      description: formData.description || undefined,
      customCode: formData.customCode || undefined,
    });
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const handleDeleteLink = (id: string) => {
    if (confirm("Are you sure you want to delete this link?")) {
      deleteLinkMutation.mutate({ id });
    }
  };

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-400 mt-1">
                Manage your links and view analytics
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create Link
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search links..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>
        </div>

        {/* Links List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            </div>
          ) : linksData?.links.length === 0 ? (
            <div className="text-center py-12">
              <LinkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No links yet</h3>
              <p className="text-gray-400 mb-4">Create your first short link to get started</p>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Your First Link
              </Button>
            </div>
          ) : (
            linksData?.links.map((link) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium text-white truncate">
                        {link.title || "Untitled Link"}
                      </h3>
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                        {link.clicks} clicks
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Short:</span>
                        <code className="text-sm text-green-400 bg-green-400/10 px-2 py-1 rounded">
                          {link.shortUrl}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyLink(link.shortUrl)}
                          className="text-gray-400 hover:text-white"
                        >
                          <CopyIcon className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Original:</span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 truncate flex items-center gap-1"
                        >
                          {link.url}
                          <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {new Date(link.createdAt).toLocaleDateString()}
                        </span>
                        {link.expiresAt && (
                          <span className="text-yellow-400">
                            Expires: {new Date(link.expiresAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <BarChart3Icon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Create Link Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Create New Link</h2>
            
            <form onSubmit={handleCreateLink} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Original URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title (optional)
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="My awesome link"
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Code (optional)
                </label>
                <input
                  type="text"
                  value={formData.customCode}
                  onChange={(e) => setFormData({ ...formData, customCode: e.target.value })}
                  placeholder="my-link"
                  className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Will be: rdr.nu/{formData.customCode || "abc123"}
                </p>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createLinkMutation.isPending}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {createLinkMutation.isPending ? "Creating..." : "Create Link"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}