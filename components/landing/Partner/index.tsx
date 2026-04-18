"use client";

import React from "react";
import { motion } from "motion/react";

export default function PartnerSection() {
  return (
    <section className="relative">
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[98px] rounded-lg bg-white/5 border border-white/5 flex items-center justify-center"
            >
              <div className="w-[155px] h-[34px] bg-white/10 rounded" />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[98px] rounded-lg bg-white/5 border border-white/5 flex items-center justify-center"
            >
              <div className="w-[155px] h-[34px] bg-white/10 rounded" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
