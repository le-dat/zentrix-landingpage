"use client";

import React from "react";
import { motion } from "framer-motion";
import { t } from "@/lib/t";
import type { Messages } from "@/lib/translations";
import { Link2, ShieldCheck, Users2, Zap } from "lucide-react";

export function Benefits({ messages }: { messages: Messages }) {
  const benefits = [
    {
      id: "transparency",
      title: t(messages, "WhyZentrix.items.transparency.title"),
      description: t(messages, "WhyZentrix.items.transparency.description"),
      icon: <Link2 className="w-6 h-6 text-teal" />,
    },
    {
      id: "multiBroker",
      title: t(messages, "WhyZentrix.items.multiBroker.title"),
      description: t(messages, "WhyZentrix.items.multiBroker.description"),
      icon: <ShieldCheck className="w-6 h-6 text-teal" />,
    },
    {
      id: "referral",
      title: t(messages, "WhyZentrix.items.referral.title"),
      description: t(messages, "WhyZentrix.items.referral.description"),
      icon: <Users2 className="w-6 h-6 text-teal" />,
    },
    {
      id: "withdrawals",
      title: t(messages, "WhyZentrix.items.withdrawals.title"),
      description: t(messages, "WhyZentrix.items.withdrawals.description"),
      icon: <Zap className="w-6 h-6 text-teal" />,
    },
  ];

  return (
    <section id="why-zentrix" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#101828] mb-6">
            {t(messages, "WhyZentrix.title")}
          </h2>
          <p className="text-lg text-gray-500">
            Trải nghiệm nền tảng hoàn phí (rebate) minh bạch, hiện đại nhất cho cộng đồng Trader và IB.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal/5 flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
