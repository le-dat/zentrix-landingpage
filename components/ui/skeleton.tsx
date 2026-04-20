"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gradient-to-r from-black/60 via-black/50 to-black/60 bg-[length:200%_100%]", className)}
    />
  );
}

// Pre-built skeleton components for common patterns

export function SkeletonCard() {
  return (
    <div className="rounded-3xl bg-black/40 border border-white/5 p-6 space-y-4">
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
    <div className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-black/40">
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
        <div key={i} className="flex gap-4 px-4 py-4 bg-black/40 border border-white/5 rounded-xl">
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
        <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
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
    <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
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
    <section id="faq" className="relative py-16 md:py-20 overflow-hidden scroll-mt-24">
      <div className="max-w-[826px] mx-auto px-6">
        <Skeleton className="h-[1.6rem] md:h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 md:h-6 w-80 mx-auto mb-12 max-w-lg" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl bg-black/40 border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between p-4 md:p-6">
                <Skeleton className="h-4 md:h-5 w-3/4" />
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
        <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
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
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <Skeleton className="h-[1.6rem] md:h-[3rem] w-full max-w-[800px] mx-auto mb-20 text-center" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-1 h-[480px] rounded-3xl bg-black/40 border border-white/5 overflow-hidden">
            <div className="p-8">
              <Skeleton className="h-5 md:h-6 w-2/3 mb-2" />
              <Skeleton className="h-3 md:h-4 w-4/5" />
            </div>
          </div>
          <div className="md:col-span-2 h-[480px] rounded-3xl bg-black/40 border border-white/5 overflow-hidden">
            <div className="p-8">
              <Skeleton className="h-5 md:h-6 w-2/3 mb-2" />
              <Skeleton className="h-3 md:h-4 w-4/5" />
            </div>
          </div>
          <div className="md:col-span-2 h-[480px] rounded-3xl bg-black/40 border border-white/5 overflow-hidden">
            <div className="p-8">
              <Skeleton className="h-5 md:h-6 w-2/3 mb-2" />
              <Skeleton className="h-3 md:h-4 w-4/5" />
            </div>
          </div>
          <div className="md:col-span-1 h-[480px] rounded-3xl bg-black/40 border border-white/5 overflow-hidden">
            <div className="p-8">
              <Skeleton className="h-5 md:h-6 w-2/3 mb-2" />
              <Skeleton className="h-3 md:h-4 w-4/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <nav className="fixed top-0 z-50 w-full px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
        <Skeleton className="w-[110px] h-[34px]" />
        <div className="hidden md:flex items-center gap-1 border rounded-full border-white/10 p-1.5 bg-black/20">
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-full" />
        </div>
        <Skeleton className="w-24 h-9 rounded-full bg-emerald-500" />
      </div>
    </nav>
  );
}

export function SkeletonHeroSection() {
  return (
    <section className="relative pt-[70px] min-h-[680px] md:pt-[82px] md:min-h-[800px] overflow-hidden flex flex-col items-center">
      <div className="relative z-10 flex flex-col items-center pt-12 md:pt-20 px-4 w-full max-w-[1200px]">
        {/* Badge */}
        <Skeleton className="h-8 w-[280px] rounded-full mb-6 md:mb-10" />
        {/* Heading */}
        <div className="text-center space-y-6 w-full max-w-[1200px]">
          <Skeleton className="h-[1.6rem] md:h-[4.5rem] w-full max-w-[800px] mx-auto" />
          <Skeleton className="h-[1.6rem] md:h-[4.5rem] w-full max-w-[800px] mx-auto" />
        </div>
        {/* Description */}
        <Skeleton className="h-5 md:h-7 w-full max-w-[560px] mt-5 md:mt-7" />
        {/* CTA */}
        <div className="mt-6 md:mt-8">
          <Skeleton className="h-12 md:h-14 w-40 md:w-48 rounded-full" />
        </div>
        {/* TrustMetrics */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 md:h-10 w-auto px-4 rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonHowItWorks() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden py-16 md:py-24 text-zinc-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 md:px-6">
        <Skeleton className="h-[1.6rem] md:h-10 w-64 mb-6 md:mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-3xl border border-white/5 bg-black/40 p-2.5 md:p-3.5 space-y-4">
              <Skeleton className="h-[14rem] md:h-[16.25rem] w-full rounded-xl" />
              <Skeleton className="h-5 md:h-6 w-2/3" />
              <Skeleton className="h-3 md:h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonComparisonSection() {
  return (
    <section id="compare" className="relative py-16 md:py-24 overflow-hidden bg-black">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <Skeleton className="h-[1.6rem] md:h-[3rem] w-64 mx-auto mb-4" />
          <Skeleton className="h-4 md:h-6 w-80 mx-auto" />
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[600px] rounded-2xl border border-white/5 bg-black/40 overflow-hidden">
            <div className="flex gap-4 px-3 py-4 md:px-4 md:py-6 border-b border-white/10">
              <Skeleton className="h-3 md:h-4 w-1/4" />
              <Skeleton className="h-3 md:h-4 w-1/4" />
              <Skeleton className="h-3 md:h-4 w-1/4" />
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 px-3 py-6 md:px-4 md:py-8 border-b border-white/5">
                <Skeleton className="h-4 md:h-6 w-1/4" />
                <Skeleton className="h-4 md:h-6 w-1/4" />
                <Skeleton className="h-4 md:h-6 w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkeletonTrustTrader() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-[990px] mx-auto px-6">
        <Skeleton className="h-[1.6rem] w-48 mx-auto mb-4" />
        <Skeleton className="h-4 md:h-6 w-80 mx-auto mb-16" />
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 p-6 md:p-10 rounded-2xl bg-black/40 border border-white/5">
          <Skeleton className="w-[140px] md:w-[217px] h-[140px] md:h-[217px] shrink-0 rounded-xl" />
          <div className="flex-1 space-y-4 text-center md:text-left">
            <Skeleton className="h-4 md:h-6 w-full" />
            <Skeleton className="h-4 md:h-6 w-3/4" />
            <Skeleton className="h-4 md:h-6 w-2/3" />
            <Skeleton className="h-3 md:h-4 w-24 mt-4 md:mt-8" />
            <Skeleton className="h-3 md:h-4 w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkeletonPartnerSection() {
  return (
    <section className="relative">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[98px] rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
              <Skeleton className="w-[155px] h-[34px] rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[98px] rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
              <Skeleton className="w-[155px] h-[34px] rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonFooter() {
  return (
    <footer className="relative py-16 md:py-20 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-8 md:mb-16">
          <div className="shrink-0 max-w-[140px] md:max-w-[200px]">
            <Skeleton className="h-10 w-[127px]" />
            <Skeleton className="h-4 w-32 mt-4" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
          <div className="flex flex-1 justify-center gap-12 md:justify-end md:gap-16">
            <div className="space-y-3 md:space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="space-y-3 md:space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-start">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </footer>
  );
}