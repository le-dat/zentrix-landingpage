"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    title: "What is a rebate and where does it come from?",
    body: "It's basically cashback on your trading fees. Your broker returns a part of the commission back to you based on your actual trading volume.",
  },
  {
    title: "Is KYC required?",
    body: "Yes, KYC is needed for withdrawals to keep things secure and follow legal rules. It's usually a quick process and gets approved in just a few hours.",
  },
  {
    title: "What is the on-chain Pool? Is my money safe?",
    body: "The Pool is where your rebates are held on-chain. We only add funds once they're verified from the broker, and you can track everything on BSCScan.",
  },
  {
    title: "How long does it take to receive my rebates?",
    body: "We track your trades as you go. Once the broker settles their weekly or monthly payouts, your rebates are confirmed and ready to claim.",
  },
  {
    title: "Is Zentrix an MLM scheme?",
    body: "Not at all. Your earnings come strictly from the trading volume of people you refer. You never have to buy anything to participate.",
  },
  {
    title: "Can I connect multiple brokers?",
    body: "Definitely! You can link as many broker accounts as you like to your Zentrix profile. All your rebates are consolidated in one place.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-20 overflow-hidden scroll-mt-24">
      <div className="max-w-[826px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[28px] md:text-[36px] font-bold mb-4 text-center"
        >
          Frequently asked questions
        </motion.h2>
        <p className="text-center text-white/50 text-sm mb-12 max-w-lg mx-auto">
          Everything you need to know about rebates, fees, and how Zentrix stays transparent.
        </p>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl bg-black/40 border border-white/5 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-base font-medium pr-4">{faq.title}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-white/60 leading-relaxed">{faq.body}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
