"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, RefreshCcw, DollarSign, Users2 } from "lucide-react";

interface NotFoundClientProps {
  t: {
    title: string;
    description: string;
    backHome: string;
  };
}

export function NotFoundClient({ t }: NotFoundClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Premium Background Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* SVG Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: "radial-gradient(#101828 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
        
        {/* Mesh Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-mint/5 blur-[100px] rounded-full delay-1000 animate-pulse" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto px-4 py-20 flex flex-col items-center"
      >
        {/* Large Animated 404 Section */}
        <motion.div variants={itemVariants} className="relative mb-12 sm:mb-20">
          <div className="relative inline-block">
            {/* Background 404 with multiple layers */}
            <span className="absolute inset-0 -translate-x-2 -translate-y-2 text-[#F2F4F7] text-[15rem] sm:text-[25rem] font-black leading-none select-none">
              404
            </span>
            <span className="absolute inset-0 translate-x-2 translate-y-2 text-[#F9FAFB] text-[15rem] sm:text-[25rem] font-black leading-none select-none">
              404
            </span>
            <h1 className="relative bg-gradient-to-b from-[#101828] via-[#101828]/80 to-teal bg-clip-text text-[15rem] sm:text-[25rem] font-black leading-none text-transparent drop-shadow-sm select-none">
              404
            </h1>

            {/* Floating UI Elements around the 404 */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 hidden lg:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                <RefreshCcw className="w-5 h-5 text-teal" />
              </div>
              <div className="text-sm font-bold text-[#101828]">Auto Reconciliation</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-0 -left-10 hidden lg:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-mint/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-mint" />
              </div>
              <div className="text-sm font-bold text-[#101828]">Total Rebates: $2M+</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content Area */}
        <div className="max-w-2xl text-center">
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 text-sm font-semibold text-teal ring-1 ring-inset ring-teal/20">
              <Search className="h-4 w-4" />
              Page Not Found
            </span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="mb-6 text-5xl sm:text-7xl font-extrabold text-[#101828] tracking-tight">
            {t.title}
          </motion.h2>

          <motion.p variants={itemVariants} className="mb-12 text-xl text-gray-500 leading-relaxed max-w-xl mx-auto">
            {t.description}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#101828] px-10 py-5 text-lg font-bold text-white shadow-2xl transition hover:shadow-[#101828]/20 active:bg-[#1d2939]"
              >
                <Home className="h-5 w-5" />
                {t.backHome}
              </Link>
            </motion.div>
            
            <Link
              href="/"
              className="group flex items-center gap-2 py-4 px-2 text-[#101828] font-bold hover:text-teal transition-all"
            >
              <span>See what's new at Zentrix</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Trust Badges - Social Proof at the bottom */}
      <motion.div 
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
        className="mt-auto pb-10 flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
      >
        <div className="flex items-center gap-2">
           <Users2 className="w-5 h-5" />
           <span className="text-sm font-bold">10k+ Traders</span>
        </div>
        <div className="h-4 w-px bg-gray-300" />
        <div className="text-sm font-bold uppercase tracking-wider">Trusted by IBs Worldwide</div>
      </motion.div>
    </div>
  );
}
