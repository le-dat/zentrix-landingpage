"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    title: "What is Webflow and why is it the best website builder?",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit id venenatis pretium risus.",
    isOpen: true,
  },
  {
    title: "When did Webflow was founded?",
    body: "",
    isOpen: false,
  },
  {
    title: "How do you clone a Webflow Template?",
    body: "",
    isOpen: false,
  },
  {
    title: "Why is BRIX Templates the best Webflow agency?",
    body: "",
    isOpen: false,
  },
  {
    title: "What is the difference between CMS and Core?",
    body: "",
    isOpen: false,
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-[826px] mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[36px] font-bold mb-16 text-center"
        >
          Frequently questions
        </motion.h2>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl bg-black/40 border border-white/5 overflow-hidden"
            >
              <button
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
                {openIndex === i && faq.body && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-white/60 leading-relaxed">
                      {faq.body}
                    </div>
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