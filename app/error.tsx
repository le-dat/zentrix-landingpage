"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#101828] flex items-center justify-center relative overflow-hidden">
      {/* Danger-tinted background orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-danger/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal/8 blur-[120px] rounded-full" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-danger" />
              </div>
              <div className="absolute inset-0 blur-xl bg-danger/20 rounded-full animate-pulse" />
            </div>
          </motion.div>

          {/* Error code badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-danger/10 border border-danger/20 text-danger text-sm font-mono mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            {error.digest ? `Error: ${error.digest.slice(0, 8)}` : "Unexpected Error"}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Something Went Wrong
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-400 mb-6 max-w-md mx-auto leading-relaxed"
          >
            We encountered an unexpected error. Our team has been notified and is working to resolve the issue.
          </motion.p>

          {/* Error message (dev only) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10 text-left"
            >
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Error Details</div>
              <code className="text-sm text-gray-300 font-mono break-all">{error.message}</code>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-teal text-white font-bold text-lg shadow-xl shadow-teal/20 hover:bg-teal/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Support hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-sm text-gray-500"
          >
            If this problem persists, please contact our support team.
          </motion.p>

          {/* Decorative chart with X mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block absolute top-1/3 right-[12%] w-48 h-32 rounded-2xl border border-danger/20 bg-danger/5 backdrop-blur-sm p-4"
          >
            <div className="flex items-center justify-center h-full">
              <div className="relative">
                <svg className="w-16 h-16 text-danger/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l18 18M21 3L3 21" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Loading indicator decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden lg:block absolute bottom-1/4 left-[10%] w-40 h-28 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4"
          >
            <div className="w-full h-full flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-gray-600 animate-spin" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
