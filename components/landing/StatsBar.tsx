"use client";

import React from "react";
import { motion } from "framer-motion";
import { t } from "@/lib/t";
import type { Messages } from "@/lib/translations";
import { Users, BarChart3, Globe, Landmark } from "lucide-react";

export function StatsBar({ messages }: { messages: Messages }) {
  const stats = [
    { 
      id: "volume",
      label: t(messages, "TrustMetrics.totalVolume"), 
      value: "$4,250,000", 
      icon: <BarChart3 className="w-5 h-5 text-teal" /> 
    },
    { 
      id: "traders",
      label: t(messages, "TrustMetrics.activeTraders"), 
      value: "8,400+", 
      icon: <Users className="w-5 h-5 text-teal" /> 
    },
    { 
      id: "brokers",
      label: t(messages, "TrustMetrics.integratedBrokers"), 
      value: "12", 
      icon: <Landmark className="w-5 h-5 text-teal" /> 
    },
    { 
      id: "payouts",
      label: t(messages, "TrustMetrics.totalRebates"), 
      value: "$840,000+", 
      icon: <Globe className="w-5 h-5 text-teal" /> 
    },
  ];

  return (
    <section className="bg-white border-y border-gray-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal/5 flex items-center justify-center border border-teal/10">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-[#101828] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
