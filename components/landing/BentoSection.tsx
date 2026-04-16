"use client";

import React from "react";
import { motion } from "framer-motion";

const bentoCards = [
  {
    id: "seo",
    title: "SEO goal setting",
    description: "Helps you set and achieve SEO goals with guided assistance.",
    hasImage: true,
    imageColor: "#00ff99",
    size: "small",
  },
  {
    id: "dashboard",
    title: "User-friendly dashboard",
    description: "Perform complex SEO audits and optimizations with a single click.",
    hasImage: true,
    imageColor: null,
    size: "large",
  },
  {
    id: "reports",
    title: "Visual reports",
    description: "Visual insights into your site's performance.",
    hasImage: true,
    imageColor: null,
    size: "large",
  },
  {
    id: "generator",
    title: "Smart Keyword Generator",
    description: "Automatic suggestions and the best keywords to target.",
    hasImage: true,
    imageColor: "#00ff99",
    size: "small",
  },
];

export function BentoSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[32px] font-medium text-center mx-auto leading-tight mb-16 max-w-[553px]"
        >
          Harness the power of AI, making search engine optimization intuitive and effective.
        </motion.h2>

        {/* Bento grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Top row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-black rounded-2xl overflow-hidden border border-white/5"
            style={{ gridColumn: "span 1" }}
          >
            {/* SEO card - left small */}
            <div className="relative p-8 h-[400px]">
              <div className="absolute top-8 left-8 w-[265px] h-[206px] rounded-xl bg-[#00ff99]/10" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-lg font-semibold mb-2">{bentoCards[0].title}</h3>
                <p className="text-sm text-white/60 max-w-[259px]">{bentoCards[0].description}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-black rounded-2xl overflow-hidden border border-white/5"
            style={{ gridColumn: "span 1" }}
          >
            {/* Dashboard card - right large */}
            <div className="relative p-8 h-[400px]">
              <div className="absolute inset-8 rounded-xl bg-white/5 border border-white/5" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-lg font-semibold mb-2">{bentoCards[1].title}</h3>
                <p className="text-sm text-white/60 max-w-[259px]">{bentoCards[1].description}</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black rounded-2xl overflow-hidden border border-white/5"
            style={{ gridColumn: "span 1" }}
          >
            {/* Visual reports - left large */}
            <div className="relative p-8 h-[400px]">
              <div className="absolute inset-8 rounded-xl bg-white/5 border border-white/5" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-lg font-semibold mb-2">{bentoCards[2].title}</h3>
                <p className="text-sm text-white/60 max-w-[189px]">{bentoCards[2].description}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-black rounded-2xl overflow-hidden border border-white/5"
            style={{ gridColumn: "span 1" }}
          >
            {/* Smart Generator - right small */}
            <div className="relative p-8 h-[400px]">
              <div className="absolute top-8 right-8 w-[234px] h-[234px] rounded-xl bg-[#622a9a]/30" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-lg font-semibold mb-2">{bentoCards[3].title}</h3>
                <p className="text-sm text-white/60 max-w-[225px]">{bentoCards[3].description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}