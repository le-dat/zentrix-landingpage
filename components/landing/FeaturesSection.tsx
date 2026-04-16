"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  ListChecks,
  Wand2,
  ChartLine,
  Target,
  MousePointerClick,
  Sparkles,
  Bell,
  Files,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "User-friendly dashboard",
    description: "Perform complex SEO audits and optimizations with a single click.",
    col: 0,
  },
  {
    icon: ListChecks,
    title: "Content evaluation",
    description: "Simple corrections for immediate improvements.",
    col: 0,
  },
  {
    icon: Wand2,
    title: "Link Optimization Wizard",
    description: "Guides you through the process of creating and managing links.",
    col: 0,
  },
  {
    icon: ChartLine,
    title: "Visual reports",
    description: "Visual insights into your site's performance.",
    col: 1,
  },
  {
    icon: Target,
    title: "SEO goal setting",
    description: "Helps you set and achieve SEO goals with guided assistance.",
    col: 1,
  },
  {
    icon: MousePointerClick,
    title: "One-click optimization",
    description: "Perform complex SEO audits and optimizations with a single click.",
    col: 1,
  },
  {
    icon: Sparkles,
    title: "Smart Keyword Generator",
    description: "Automatic suggestions and the best keywords to target.",
    col: 2,
  },
  {
    icon: Bell,
    title: "Automated alerts",
    description: "Automatic notifications about your SEO health, including quick fixes.",
    col: 2,
  },
  {
    icon: Files,
    title: "Competitor reports",
    description: "Provides insights into competitors' keyword strategies and ranking.",
    col: 2,
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[1086px] mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[48px] font-bold leading-tight mb-16"
        >
          Elevate your SEO efforts.
        </motion.h2>

        {/* Features grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}