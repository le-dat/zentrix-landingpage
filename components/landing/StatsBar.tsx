"use client";

import React from "react";
import { motion } from "framer-motion";
import { t } from "@/lib/t";
import type { Messages } from "@/lib/translations";
import { Users2, DollarSign, RefreshCcw, Smile } from "lucide-react";

export function StatsBar({ messages }: { messages: Messages }) {
  const stats = [
    { 
      id: "auto",
      label: t(messages, "TrustMetrics.fullyAutomated"), 
      value: "Auto", 
      icon: <RefreshCcw className="w-5 h-5 text-gray-900" />,
      color: "green"
    },
    { 
      id: "rebates",
      label: t(messages, "TrustMetrics.totalRebates"), 
      value: "$2M+", 
      icon: <DollarSign className="w-5 h-5 text-white" />,
      color: "dark"
    },
    { 
      id: "traders",
      label: t(messages, "TrustMetrics.activeTraders"), 
      value: "10,000+", 
      icon: <Users2 className="w-5 h-5 text-white" />,
      color: "dark"
    },
    { 
      id: "satisfaction",
      label: t(messages, "TrustMetrics.userSatisfaction"), 
      value: "99%", 
      icon: <Smile className="w-5 h-5 text-white" />,
      color: "dark"
    },
  ];

  return (
    <section className="bg-gray-50/50 py-12 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="relative flex-shrink-0">
                {stat.color === "green" ? (
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Dashed outer circle */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-green-400/60" />
                    {/* Main green circle */}
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-sm">  
                      {stat.icon}
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#344054] flex items-center justify-center">
                    {stat.icon}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
