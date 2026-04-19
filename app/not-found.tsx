"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020103]">
      <div className="text-center px-6">
        <h1 className="text-[80px] md:text-[120px] font-bold text-white leading-none mb-4">404</h1>

        <p className="text-lg md:text-xl text-white/50 mb-8">Page not found</p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#18CBA8] text-black font-medium hover:bg-[#29FFB5] hover:cursor-pointer transition-colors"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
