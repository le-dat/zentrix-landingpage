"use client";

import React from "react";
import { motion } from "framer-motion";

const companies = [
  { name: "Acme", row: 1 },
  { name: "Acme", row: 1 },
  { name: "Acme", row: 1 },
  { name: "Acme", row: 1 },
  { name: "Acme", row: 3 },
  { name: "Acme", row: 3 },
  { name: "Acme", row: 3 },
  { name: "Acme", row: 3 },
];

export function CompaniesSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-white/50 tracking-widest uppercase mb-12"
        >
          Partner brokers & integrations
        </motion.p>

        {/* Logo grid */}
        <div className="flex flex-col gap-4">
          {/* Row 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-4 gap-4"
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

          {/* Row 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-4 gap-4"
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
      </div>
    </section>
  );
}