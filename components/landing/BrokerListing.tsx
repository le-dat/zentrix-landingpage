"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "@/lib/t";
import type { Messages } from "@/lib/translations";
import { Copy, Check, ExternalLink } from "lucide-react";

const brokers = [
  {
    id: "exness",
    name: "Exness",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Exness_logo.svg/2560px-Exness_logo.svg.png",
    category: "Forex",
    type: "Auto Daily",
    rebate: "40%",
    refCode: "zentrix_exness",
    example: "100$ fee → $40 back",
    bestRate: true,
  },
  {
    id: "icmarkets",
    name: "IC Markets",
    logo: "https://vms-media.s3.amazonaws.com/broker/logo/ICMarkets_Logo.png",
    category: "Forex",
    type: "Auto Monthly",
    rebate: "100%",
    refCode: "zentrix_ic",
    example: "100$ fee → $100 back",
    bestRate: false,
  },
  {
    id: "binance",
    name: "Binance",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1024px-Binance_Logo.svg.png",
    category: "Crypto",
    type: "Auto Daily",
    rebate: "20%",
    refCode: "zentrix_crypto",
    example: "100$ fee → $20 back",
    bestRate: false,
  },
  {
    id: "xm",
    name: "XM Global",
    logo: "https://www.xm.com/assets/img/common/logo/xm-logo.png",
    category: "Forex",
    type: "Auto Daily",
    rebate: "50%",
    refCode: "zentrix_xm",
    example: "100$ fee → $50 back",
    bestRate: false,
  },
];

export function BrokerListing({ messages }: { messages: Messages }) {
  const [filter, setFilter] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "Forex", "Crypto"];
  const filteredBrokers = filter === "All" ? brokers : brokers.filter(b => b.category === filter);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="brokers" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#101828] mb-6">
              Sàn Giao Dịch Liên Kết
            </h2>
            <p className="text-lg text-gray-500">
              Chọn sàn giao dịch yêu thích của bạn và nhận mức hoàn phí cao nhất thị trường.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-full w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat 
                    ? "bg-white text-[#101828] shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBrokers.map((broker) => (
              <motion.div
                key={broker.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative flex flex-col bg-white rounded-[32px] border border-gray-100 hover:border-teal/30 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {broker.bestRate && (
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
                    Best Rate
                  </div>
                )}

                <div className="p-8 pb-4">
                  <div className="flex items-start justify-between mb-8">
                    <div className="relative w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
                      <img src={broker.logo} alt={broker.name} className="w-10 h-10 object-contain" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-teal/10 text-teal text-xs font-semibold">
                      {broker.type}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#101828] mb-2">{broker.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <span className="w-2 h-2 rounded-full bg-teal" />
                    {broker.category}
                  </div>

                  {/* Referral Code Box */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
                    <code className="text-sm font-mono text-gray-600">{broker.refCode}</code>
                    <button 
                      onClick={() => handleCopy(broker.id, broker.refCode)}
                      className="p-2 hover:bg-white rounded-xl transition-colors text-teal"
                    >
                      {copiedId === broker.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Calculation Example */}
                  <div className="flex items-center justify-between text-sm py-4 border-t border-dashed border-gray-100">
                    <span className="text-gray-400">Example Rebate</span>
                    <span className="font-semibold text-[#101828]">{broker.example}</span>
                  </div>
                </div>

                {/* Pricing Footer (Backcom Style) */}
                <div className="mt-auto p-6 bg-teal text-white flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-80 mb-0.5">Rebate Rate</div>
                    <div className="text-4xl font-black">{broker.rebate}</div>
                  </div>
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-2xl font-bold transition-all backdrop-blur-sm">
                    {t(messages, "Navigation.signIn")}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
