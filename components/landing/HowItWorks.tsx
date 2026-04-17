"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, Database, Layers, ShieldCheck, Wallet } from "lucide-react";

import { FlowGapConnector } from "@/components/landing/FlowGapConnector";
import {
  REBATE_FLOW_DRAW_DURATION_MS,
  RebateFlowBorderTrace,
} from "@/components/landing/RebateFlowBorderTrace";

const steps = [
  {
    id: "01",
    title: "Your broker",
    description: "Fees generated from real volume on MT4 / MT5 platforms.",
    icon: Building2,
    variant: "default" as const,
  },
  {
    id: "02",
    title: "Zentrix Engine",
    description: "Records volume, validates settlement & updates rebate ledger.",
    icon: Layers,
    variant: "highlight" as const,
  },
  {
    id: "03",
    title: "On-chain pool",
    description: "BEP20 smart contract pool — balances & claims are fully verifiable.",
    icon: Database,
    variant: "default" as const,
  },
  {
    id: "04",
    title: "Your wallet",
    description: "Withdraw your accumulated rebates whenever you choose.",
    icon: Wallet,
    variant: "default" as const,
  },
];

export function HowItWorks() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  /** Which gap segment (0–2) plays after the card border draw finishes; `null` = idle. */
  const [connectorSegment, setConnectorSegment] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!hoveredCardId) {
      setConnectorSegment(null);
      return;
    }
    const idx = steps.findIndex((s) => s.id === hoveredCardId);
    if (idx < 0 || idx > 2) {
      setConnectorSegment(null);
      return;
    }
    setConnectorSegment(null);
    const delay = reduceMotion ? 0 : REBATE_FLOW_DRAW_DURATION_MS;
    const t = window.setTimeout(() => setConnectorSegment(idx), delay);
    return () => clearTimeout(t);
  }, [hoveredCardId, reduceMotion]);

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden py-24 text-zinc-100"
    >
      {/* Ambient background (match reference) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(39,39,42,0.35),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6">
        {/* Header — classic “How it works” copy */}
        <div className="mb-24 w-full text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">How It Works</h2>
          <p className="mx-auto max-w-[600px] text-white/60">
            Just three steps — connect your broker, keep trading as usual, then claim rebates to your wallet
            when they settle.
          </p>
        </div>

        {/* Flow grid */}
        <div className="relative w-full">
          {/*
            Desktop: dashed segments only in the gaps between 4 equal columns (gap-6 = 1.5rem).
            Column width = (100% - 3 * gap) / 4. Gap k starts at k * col + (k - 1) * gap.
          */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[44px] z-20 hidden md:block"
            aria-hidden
          >
            <FlowGapConnector
              active={connectorSegment === 0}
              className="absolute top-0"
              style={{ left: "calc((100% - 4.5rem) / 4)" }}
            />
            <FlowGapConnector
              active={connectorSegment === 1}
              className="absolute top-0"
              style={{ left: "calc(2 * (100% - 4.5rem) / 4 + 1.5rem)" }}
            />
            <FlowGapConnector
              active={connectorSegment === 2}
              className="absolute top-0"
              style={{ left: "calc(3 * (100% - 4.5rem) / 4 + 3rem)" }}
            />
          </div>
          {/* Mobile: single vertical guide (stacked cards; gap spacing varies with content) */}
          <div
            className="pointer-events-none absolute bottom-[10%] left-[44px] top-[10%] z-5 w-px border-l border-dashed border-zinc-700/60 md:hidden"
            aria-hidden
          />

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isHighlight = step.variant === "highlight";

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group rebate-flow-card relative"
                  onHoverStart={() => setHoveredCardId(step.id)}
                  onHoverEnd={() => setHoveredCardId(null)}
                >
                  <div className="relative overflow-visible rounded-2xl p-px transition-transform duration-300 ease-out group-hover:-translate-y-1">
                    <RebateFlowBorderTrace
                      active={hoveredCardId === step.id}
                      insetPx={1}
                      cardRadiusPx={15}
                    />
                    <div
                      className={`relative z-10 flex flex-col rounded-[15px] border p-6 backdrop-blur-md transition-all duration-300 group-hover:border-transparent ${
                        isHighlight
                          ? "border-[#18CBA8]/25 bg-[#18CBA8]/[0.08] shadow-[0_0_40px_-15px_rgba(24,203,168,0.2),inset_0_1px_0_0_rgba(24,203,168,0.08)] group-hover:bg-[#18CBA8]/[0.12] group-hover:shadow-[0_0_50px_-15px_rgba(24,203,168,0.28)]"
                          : "border-white/[0.04] bg-[#0e0e11]/80 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.02)] group-hover:bg-[#121216]"
                      }`}
                    >
                  <span
                    className={`absolute right-6 top-6 text-xs font-medium transition-colors ${
                      isHighlight
                        ? "text-[#18CBA8]/35 group-hover:text-[#18CBA8]/60"
                        : "text-zinc-800 group-hover:text-zinc-500"
                    }`}
                  >
                    {step.id}
                  </span>

                  <div
                    className={`mb-6 flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105 ${
                      isHighlight
                        ? "border-[#18CBA8]/35 bg-[#18CBA8]/15 text-[#7ee8d3] shadow-[0_0_15px_-3px_rgba(24,203,168,0.25)] group-hover:border-[#18CBA8]/45 group-hover:bg-[#18CBA8]/25 group-hover:text-[#b8ffea]"
                        : "border-white/[0.05] bg-zinc-900/80 text-zinc-400 shadow-sm group-hover:border-white/[0.08] group-hover:bg-zinc-800 group-hover:text-zinc-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </div>

                  <h3
                    className={`mb-2 text-base font-medium tracking-tight ${
                      isHighlight ? "text-[#e8fffa]" : "text-zinc-100"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed transition-colors ${
                      isHighlight
                        ? "text-[#18CBA8]/70 group-hover:text-[#18CBA8]/85"
                        : "text-zinc-400/80 group-hover:text-zinc-400"
                    }`}
                  >
                    {step.description}
                  </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footnote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-20 flex w-full justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.04] bg-[#0e0e11] px-5 py-2.5 text-zinc-400 shadow-sm transition-colors hover:bg-zinc-900">
            <ShieldCheck className="h-4 w-4 shrink-0 text-zinc-500" strokeWidth={1.5} aria-hidden />
            <span className="text-center text-xs font-medium tracking-wide">
              3-way reconciliation: broker payouts · Zentrix ledger · chain history
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
