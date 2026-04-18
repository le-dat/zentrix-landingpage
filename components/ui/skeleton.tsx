"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className={cn("rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]", className)}
    />
  );
}

// Pre-built skeleton components for common patterns

export function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#101828] border border-gray-100 dark:border-white/10 p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-20 w-full rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-white dark:bg-[#101828]">
      {/* Background skeletons */}
      <Skeleton className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20" />
      <Skeleton className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <Skeleton className="h-16 w-full max-w-lg rounded-lg" />
            <Skeleton className="h-6 w-full max-w-xl rounded-lg" />
            <Skeleton className="h-6 w-3/4 max-w-xl rounded-lg" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-14 w-44 rounded-full" />
              <Skeleton className="h-14 w-36 rounded-full" />
            </div>
          </div>

          {/* Right: Video Placeholder */}
          <Skeleton className="aspect-video rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 px-4 py-3">
        <Skeleton className="h-4 w-[15%] rounded" />
        <Skeleton className="h-4 w-[25%] rounded" />
        <Skeleton className="h-4 w-[20%] rounded" />
        <Skeleton className="h-4 w-[15%] rounded" />
        <Skeleton className="h-4 w-[25%] rounded" />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-4 bg-white dark:bg-white/5 rounded-xl">
          <Skeleton className="h-10 w-[15%] rounded" />
          <Skeleton className="h-10 w-[25%] rounded" />
          <Skeleton className="h-10 w-[20%] rounded" />
          <Skeleton className="h-10 w-[15%] rounded" />
          <Skeleton className="h-10 w-[25%] rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-3">
          <Skeleton className="h-4 w-1/2 rounded" />
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-3 w-1/3 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonBrokerCard() {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-16 h-16 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-2/3 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonBrokerListing({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBrokerCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonFAQ() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonBentoGrid() {
  const sizes = [
    { cols: "col-span-2", rows: "row-span-2" },
    { cols: "", rows: "" },
    { cols: "", rows: "" },
    { cols: "", rows: "row-span-2" },
    { cols: "col-span-2", rows: "" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
      {sizes.map((size, i) => (
        <Skeleton
          key={i}
          className={`${size.cols} ${size.rows} rounded-3xl`}
        />
      ))}
    </div>
  );
}

// Full page loading overlay
export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/80 backdrop-blur-sm"
    >
      <div className="text-center space-y-6">
        {/* Animated logo placeholder */}
        <div className="relative w-20 h-20 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-4 border-teal/30 border-t-teal"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-4 h-4 rounded-full bg-teal"
            />
          </div>
        </div>

        {/* Loading message */}
        <div className="space-y-2">
          <p className="text-white font-semibold text-lg">{message}</p>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-teal"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
