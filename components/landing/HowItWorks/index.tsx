"use client";

import { useState, useRef } from "react";
import { FlowGapConnector } from "@/components/landing/FlowGapConnector";
import { RebateFlowBorderTrace } from "@/components/landing/RebateFlowBorderTrace";
import { REBATE_FLOW_DRAW_DURATION_MS } from "@/constants/animation";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import {
  steps,
  CARD_INNER_RADIUS,
  STEP_GRID_CLASSES,
  SECTION_PY,
  highlightColors,
  defaultColors,
  CONNECTOR_POSITIONS,
} from "./data";

interface HowItWorksStepCardProps {
  step: (typeof steps)[number];
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
  const { t } = useLanguage();
  const isHighlight = step.variant === "highlight";
  const colors = isHighlight ? highlightColors : defaultColors;

  const cardBorderClass = cn(colors.border, isHighlight ? colors.borderHover : "");
  const cardBgClass = cn(colors.bg, isHighlight ? colors.bgHover : "");
  const cardShadowClass = cn(isHighlight && colors.shadow, isHighlight && colors.shadowHover);

  const digitGradientClass = cn(colors.digitGradient, colors.digitOpacity, colors.digitOpacityHover);
  const titleClass = colors.titleText;
  const descClass = cn(colors.descText, colors.descTextHover);

  return (
    <div
      className="animate-fade-up group rebate-flow-card relative h-fit w-full"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
    >
      <div className="relative overflow-visible rounded-3xl p-px transition-transform duration-300 ease-out group-hover:-translate-y-1">
        <RebateFlowBorderTrace active={isHovered} insetPx={1} cardRadiusPx={24} />
        <div
          className={cn(
            "relative z-10 flex min-h-0 flex-col overflow-hidden border p-2.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-md md:p-3.5",
            CARD_INNER_RADIUS,
            cardBorderClass,
            cardBgClass,
            cardShadowClass
          )}
        >
          <div className="relative isolate w-full min-h-[14rem] shrink-0 overflow-hidden md:min-h-[16.25rem]">
            <span
              className={cn(
                "pointer-events-none absolute bottom-0 right-1 z-0 block translate-x-[1%] bg-clip-text text-right text-[9rem] font-bold leading-none text-transparent md:translate-x-[2.5%] md:text-[12rem]",
                digitGradientClass
              )}
              aria-hidden
            >
              {step.digit}
            </span>

            <div className="absolute bottom-2 left-0 z-20 flex w-[92%] max-w-[15rem] flex-col items-start text-left md:bottom-3 md:max-w-[17rem]">
              <h3
                className={cn("text-sm font-semibold tracking-tight text-white md:text-lg", titleClass)}
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.85)" }}
              >
                {t(step.titleKey)}
              </h3>
              <p
                className={cn("mt-1.5 text-xs leading-relaxed md:text-sm", descClass)}
                style={{ textShadow: "0 2px 18px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.8)" }}
              >
                {t(step.descriptionKey)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useLanguage();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [connectorSegment, setConnectorSegment] = useState<number | null>(null);
  const [isTouchDevice] = useState(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
  );
  const connectorTimerRef = useRef<number | null>(null);

  function clearConnectorTimer() {
    if (connectorTimerRef.current != null) {
      window.clearTimeout(connectorTimerRef.current);
      connectorTimerRef.current = null;
    }
  }

  function scheduleConnectorUpdate(stepId: string) {
    const idx = steps.findIndex((s) => s.id === stepId);
    if (idx < 0 || idx > 2) {
      setConnectorSegment(null);
      return;
    }

    clearConnectorTimer();
    setConnectorSegment(null);

    const delay = isTouchDevice ? 0 : REBATE_FLOW_DRAW_DURATION_MS;

    if (delay === 0) {
      setConnectorSegment(idx);
    } else {
      connectorTimerRef.current = window.setTimeout(() => {
        connectorTimerRef.current = null;
        setConnectorSegment(idx);
      }, delay);
    }
  }

  function handleCardEnter(stepId: string) {
    if (isTouchDevice) return;
    setHoveredCardId(stepId);
    scheduleConnectorUpdate(stepId);
  }

  function handleCardLeave() {
    setHoveredCardId(null);
    clearConnectorTimer();
    setConnectorSegment(null);
  }

  return (
    <section
      id="how-it-works"
      className={cn("relative scroll-mt-24 overflow-hidden text-zinc-100", SECTION_PY)}
    >
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[#030806]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(24,203,168,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_45%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 md:px-6">
        <div className="animate-fade-up mb-6 w-full text-center md:mb-8" style={{ animationDelay: "50ms" }}>
          <h2 className="mb-2 text-[1.6rem] font-bold tracking-tight text-white md:text-4xl">
            {t("howItWorks.title")}
          </h2>
        </div>

        <div className="relative w-full">
          {/* Desktop: horizontal flow connectors */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 md:block"
            aria-hidden
          >
            {CONNECTOR_POSITIONS.map((left, i) => (
              <FlowGapConnector
                key={i}
                active={connectorSegment === i}
                className="absolute top-0"
                style={{ left }}
              />
            ))}
          </div>

          {/* Mobile: vertical dashed line */}
          <div
            className="pointer-events-none absolute bottom-[10%] left-12 top-[10%] z-5 w-px border-l border-dashed border-zinc-700/60 md:hidden"
            aria-hidden
          />

          <div className={cn("relative z-10 grid w-full items-start", STEP_GRID_CLASSES)}>
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