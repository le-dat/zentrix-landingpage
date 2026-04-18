"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { FlowGapConnector } from "@/components/landing/FlowGapConnector";
import {
  REBATE_FLOW_DRAW_DURATION_MS,
  RebateFlowBorderTrace,
} from "@/components/landing/RebateFlowBorderTrace";

interface HowItWorksStep {
  id: string;
  title: string;
  description: string;
  digit: string;
  variant: "default" | "highlight";
}

const steps: HowItWorksStep[] = [
  {
    id: "01",
    title: "Your broker",
    description: "MT4 / MT5 volume feeds the rebate pool.",
    digit: "1",
    variant: "default",
  },
  {
    id: "02",
    title: "Zentrix Engine",
    description: "Tracks volume and credits your on-chain balance.",
    digit: "2",
    variant: "highlight",
  },
  {
    id: "03",
    title: "On-chain pool",
    description: "BEP20 pool — balances and claims are verifiable.",
    digit: "3",
    variant: "default",
  },
  {
    id: "04",
    title: "Your wallet",
    description: "Withdraw rebates whenever you want.",
    digit: "4",
    variant: "default",
  },
];

const INNER_RADIUS_CLASS = "rounded-[calc(1.5rem-1px)]";

interface HowItWorksStepCardProps {
  step: HowItWorksStep;
  index: number;
  isHovered: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

function HowItWorksStepCard({
  step,
  index,
  isHovered,
  onPointerEnter,
  onPointerLeave,
}: HowItWorksStepCardProps) {
  const isHighlight = step.variant === "highlight";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group rebate-flow-card relative h-fit w-full"
      onHoverStart={onPointerEnter}
      onHoverEnd={onPointerLeave}
    >
      <div className="relative overflow-visible rounded-3xl p-px transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <RebateFlowBorderTrace
          active={isHovered}
          insetPx={1}
          cardRadiusPx={24}
        />
        <div
          className={`relative z-10 flex min-h-0 flex-col overflow-hidden ${INNER_RADIUS_CLASS} border p-2.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md md:p-3.5 ${
            isHighlight
              ? "border-[#18CBA8]/30 bg-[#18CBA8]/[0.08] shadow-[0_0_40px_-18px_rgba(24,203,168,0.22),inset_0_1px_0_0_rgba(24,203,168,0.12)] group-hover:border-[#18CBA8]/40 group-hover:bg-[#18CBA8]/[0.12]"
              : "border-white/[0.08] bg-[#0c1512]/85"
          }`}
        >
          <div className="relative isolate w-full min-h-[14rem] shrink-0 overflow-hidden md:min-h-[16.25rem]">
            <span
              className={`pointer-events-none absolute bottom-0 right-1 z-0 block translate-x-[1%] bg-clip-text text-right text-[9rem] font-bold leading-none text-transparent transition-opacity md:translate-x-[2.5%] md:text-[12rem] ${
                isHighlight
                  ? "bg-[linear-gradient(180deg,#2dd4bf_0%,#18CBA8_22%,#149f8c_38%,#0d6d5f_50%,#0a4540_68%,#082b28_82%,#020807_100%)] opacity-88 group-hover:opacity-95"
                  : "bg-[linear-gradient(180deg,#14b8a6_0%,#11827a_26%,#0f6b64_42%,#0c4f4a_52%,#083632_70%,#05211f_86%,#010a09_100%)] opacity-85 group-hover:opacity-92"
              }`}
              aria-hidden
            >
              {step.digit}
            </span>

            <div className="absolute bottom-2 left-0 z-20 flex w-[92%] max-w-[15rem] flex-col items-start text-left md:bottom-3 md:max-w-[17rem]">
              <h3
                className={`text-base font-semibold tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.95),0_1px_3px_rgba(0,0,0,0.85)] md:text-lg ${
                  isHighlight ? "text-[#e8fffa]" : "text-white"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-1.5 text-xs leading-relaxed [text-shadow:0_2px_18px_rgba(0,0,0,0.9),0_1px_2px_rgba(0,0,0,0.8)] transition-colors md:text-sm ${
                  isHighlight
                    ? "text-[#c6f7ec] group-hover:text-[#e8fffa]"
                    : "text-zinc-200 group-hover:text-zinc-100"
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [connectorSegment, setConnectorSegment] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const reduceMotion = useReducedMotion();
  const connectorTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  function clearConnectorTimer() {
    if (connectorTimerRef.current != null) {
      window.clearTimeout(connectorTimerRef.current);
      connectorTimerRef.current = null;
    }
  }

  function scheduleConnectorAfterHover(stepId: string) {
    if (reduceMotion) return;
    clearConnectorTimer();
    const idx = steps.findIndex((s) => s.id === stepId);
    if (idx < 0 || idx > 2) {
      setConnectorSegment(null);
      return;
    }

    const delay = isTouchDevice ? 0 : REBATE_FLOW_DRAW_DURATION_MS;
    setConnectorSegment(null);

    if (delay === 0) {
      setConnectorSegment(idx);
      return;
    }

    connectorTimerRef.current = window.setTimeout(() => {
      connectorTimerRef.current = null;
      setConnectorSegment(idx);
    }, delay);
  }

  function handleCardEnter(stepId: string) {
    if (isTouchDevice) return;
    setHoveredCardId(stepId);
    scheduleConnectorAfterHover(stepId);
  }

  function handleCardLeave() {
    setHoveredCardId(null);
    clearConnectorTimer();
    setConnectorSegment(null);
  }

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden py-[120px] text-zinc-100"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-30 bg-[#030806]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(24,203,168,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_45%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 md:px-6">
        <div className="mb-6 w-full text-center md:mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-2 text-2xl font-bold tracking-tight text-white md:text-4xl"
          >
            Zentrix Cashback System Work?
          </motion.h2>
        </div>

        <div className="relative w-full">
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 md:block"
            aria-hidden
          >
            <FlowGapConnector
              active={connectorSegment === 0}
              className="absolute top-0"
              style={{ left: "calc((100% - 3rem) / 4)" }}
            />
            <FlowGapConnector
              active={connectorSegment === 1}
              className="absolute top-0"
              style={{ left: "calc(2 * (100% - 3rem) / 4 + 1rem)" }}
            />
            <FlowGapConnector
              active={connectorSegment === 2}
              className="absolute top-0"
              style={{ left: "calc(3 * (100% - 3rem) / 4 + 2rem)" }}
            />
          </div>
          <div
            className="pointer-events-none absolute bottom-[10%] left-12 top-[10%] z-5 w-px border-l border-dashed border-zinc-700/60 md:hidden"
            aria-hidden
          />

          <div className="relative z-10 grid w-full grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-5">
            {steps.map((step, i) => (
              <HowItWorksStepCard
                key={step.id}
                step={step}
                index={i}
                isHovered={hoveredCardId === step.id}
                onPointerEnter={() => handleCardEnter(step.id)}
                onPointerLeave={handleCardLeave}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
