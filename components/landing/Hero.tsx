"use client";

import React from "react";
import { motion } from "framer-motion";
import { t } from "@/lib/t";
import type { Messages } from "@/lib/translations";
import { Play } from "lucide-react";

export function Hero({ messages }: { messages: Messages }) {
  return (
    <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden bg-white">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-mint/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
              </span>
              Next-Gen Rebate Network
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-[#101828] leading-[1.1] mb-6">
              {t(messages, "Hero.title")}
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
              {t(messages, "Hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#101828] text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                {t(messages, "Hero.getStarted")}
              </motion.button>
              
              <button className="flex items-center gap-2 px-6 py-4 text-[#101828] font-bold hover:text-teal transition-colors">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current text-teal" />
                </div>
                {t(messages, "Hero.learnMore")}
              </button>
            </div>
          </motion.div>

          {/* Right: Video Placeholder / UI Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border-4 border-white dark:border-white/5 group transform hover:scale-[1.01] transition-transform cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal/20 via-transparent to-mint/20 z-0" />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current text-[#101828] ml-1" />
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1611974717482-58a05ae39da1?q=80&w=2070&auto=format&fit=crop" 
                alt="Trading Interface"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Floating UI Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 lg:-right-12 bg-white dark:bg-[#101828] p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-teal" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Total Rebates</div>
                  <div className="text-lg font-bold text-[#101828] dark:text-white">$842,400.00</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
