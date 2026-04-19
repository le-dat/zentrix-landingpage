"use client";

import Link from "next/link";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    <main className="min-h-screen flex items-center justify-center bg-[#020103]">
      <div className="text-center px-6 max-w-md">
        <p className="text-6xl font-bold text-[#18CBA8] mb-4">!</p>

        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>

        <p className="text-white/50 mb-8">
          {process.env.NODE_ENV === "development"
            ? error.message || "An unexpected error occurred."
            : "An unexpected error occurred. Please try again later or contact support if the problem persists."}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-[#18CBA8] text-black font-medium hover:bg-[#29FFB5] hover:cursor-pointer transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 hover:cursor-pointer transition-colors"
          >
            Go home
          </Link>
        </div>

        {error.digest && <p className="mt-12 text-xs text-white/20 font-mono">{error.digest}</p>}
      </div>
    </main>
  );
}
