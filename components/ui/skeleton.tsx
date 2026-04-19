"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]", className)}
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
      <Skeleton className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20" />
      <Skeleton className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-6">
            <Skeleton className="h-16 w-full max-w-lg rounded-lg" />
            <Skeleton className="h-6 w-full max-w-xl rounded-lg" />
            <Skeleton className="h-6 w-3/4 max-w-xl rounded-lg" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-14 w-44 rounded-full" />
              <Skeleton className="h-14 w-36 rounded-full" />
            </div>
          </div>

          <Skeleton className="aspect-video rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 px-4 py-3">
        <Skeleton className="h-4 w-[15%] rounded" />
        <Skeleton className="h-4 w-[25%] rounded" />
        <Skeleton className="h-4 w-[20%] rounded" />
        <Skeleton className="h-4 w-[15%] rounded" />
        <Skeleton className="h-4 w-[25%] rounded" />
      </div>
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

export function SkeletonFAQSection() {
  return (
    <section className="relative py-20 overflow-hidden scroll-mt-24">
      <div className="max-w-[826px] mx-auto px-6">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-80 mx-auto mb-12" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl bg-black/40 border border-white/5 overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="w-5 h-5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="text-center space-y-6">
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-full h-full rounded-full border-4 border-teal/30 border-t-teal animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-teal animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white font-semibold text-lg">{message}</p>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-teal animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Landing page section skeletons

export function SkeletonNavbar() {
  return (
    <nav className="fixed top-0 z-50 w-full px-6 py-4">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
        <Skeleton className="w-28 h-8 rounded" />
        <div className="hidden md:flex items-center gap-1">
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-full" />
        </div>
        <Skeleton className="w-24 h-9 rounded-full" />
      </div>
    </nav>
  );
}

export function SkeletonHeroSection() {
  return (
    <section className="relative pt-[82px] min-h-[800px] overflow-hidden flex flex-col items-center">
      <div className="relative z-10 flex flex-col items-center pt-20 px-4 w-full max-w-[1200px]">
        <Skeleton className="h-10 w-[280px] rounded-full mb-10" />
        <div className="text-center space-y-6 w-full max-w-[800px]">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>
        <div className="flex gap-4 mt-8">
          <Skeleton className="h-14 w-40 rounded-full" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-32 rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonHowItWorks() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden py-[120px]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-3xl border border-white/5 bg-[#0c1512]/85 p-3.5 space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonComparisonSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[990px] mx-auto px-6">
        <Skeleton className="h-12 w-64 mx-auto mb-12" />
        <div className="rounded-2xl border border-white/5 bg-black/40 overflow-hidden">
          <div className="flex gap-4 px-4 py-4 border-b border-white/5">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 px-4 py-5 border-b border-white/5">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonTrustTrader() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[990px] mx-auto px-6">
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <Skeleton className="h-6 w-80 mx-auto mb-16" />
        <div className="flex flex-col md:flex-row items-center gap-12 p-6 md:p-10 rounded-2xl bg-black/40 border border-white/5">
          <Skeleton className="w-[217px] h-[217px] shrink-0 rounded-xl" />
          <div className="flex-1 space-y-4 text-center md:text-left">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-24 mt-8" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkeletonPartnerSection() {
  return (
    <section className="relative">
      <div className="flex flex-col gap-4 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[98px] rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[98px] rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonFooter() {
  return (
    <footer className="relative py-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 mb-16">
          <div className="space-y-4 flex-1">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <div className="flex gap-16">
            <div className="space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </footer>
  );
}