"use client";

import React from "react";

export default function PartnerSection() {
  return (
    <section className="relative">
      <div className="flex flex-col gap-4">
        <div
          className="animate-fade-up grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{ animationDelay: "100ms" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[98px] rounded-lg bg-white/5 border border-white/5 flex items-center justify-center"
            >
              <div className="w-[155px] h-[34px] bg-white/10 rounded" />
            </div>
          ))}
        </div>

        <div
          className="animate-fade-up grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{ animationDelay: "200ms" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[98px] rounded-lg bg-white/5 border border-white/5 flex items-center justify-center"
            >
              <div className="w-[155px] h-[34px] bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}