"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "@/lib/t";
import type { Messages } from "@/lib/translations";
import { Plus, Minus } from "lucide-react";

export function FAQ({ messages }: { messages: Messages }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqItems = [
    {
      id: "whatIsRebate",
      question: t(messages, "FAQ.items.whatIsRebate.question"),
      answer: t(messages, "FAQ.items.whatIsRebate.answer"),
    },
    {
      id: "howMuchCost",
      question: t(messages, "FAQ.items.howMuchCost.question"),
      answer: t(messages, "FAQ.items.howMuchCost.answer"),
    },
    {
      id: "isKycRequired",
      question: t(messages, "FAQ.items.isKycRequired.question"),
      answer: t(messages, "FAQ.items.isKycRequired.answer"),
    },
    {
      id: "isPoolSafe",
      question: t(messages, "FAQ.items.isPoolSafe.question"),
      answer: t(messages, "FAQ.items.isPoolSafe.answer"),
    },
    {
      id: "howLongReceive",
      question: t(messages, "FAQ.items.howLongReceive.question"),
      answer: t(messages, "FAQ.items.howLongReceive.answer"),
    },
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#101828] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500">
            Mọi thắc mắc của bạn đều có lời giải đáp tại đây.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className={`bg-white rounded-3xl border transition-all duration-300 ${
                  isOpen ? "border-teal shadow-xl" : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex items-center justify-between w-full p-6 md:p-8 text-left outline-none"
                >
                  <span className={`text-xl font-bold transition-colors ${isOpen ? "text-teal" : "text-[#101828]"}`}>
                    {item.question}
                  </span>
                  <div className={`p-2 rounded-full transition-all ${isOpen ? "bg-teal text-white rotate-0" : "bg-gray-50 text-gray-400"}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-8 pt-0 text-gray-500 leading-relaxed text-lg border-t border-gray-50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
