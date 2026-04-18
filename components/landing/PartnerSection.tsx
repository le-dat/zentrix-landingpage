"use client";

import React from "react";
import { motion } from "motion/react";

const partners = [
  { name: "Binance", image: "/binance.png" },
  { name: "Kucoin", image: "/kucoin.png" },
  { name: "Bitget", image: "/bitget.png" },
  { name: "Bybit", image: "/bybit.png" },
  { name: "OKX", image: "/okx.png" },
  { name: "Huobi", image: "/huobi.png" },
  { name: "Gate.io", image: "/gate.io.png" },
  { name: "Bitfinex", image: "/bitfinex.png" },
];

export function PartnerSection() {
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
