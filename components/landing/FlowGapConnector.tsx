"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { REBATE_FLOW_DRAW_EASE } from "@/components/landing/RebateFlowBorderTrace";

const GAP_LINE_DURATION_S = 0.55;
const TRACK = "rgba(63, 63, 70, 0.55)";
/** Straight segment length matches viewBox width (px). */
const SEGMENT_LEN = 24;

interface FlowGapConnectorProps {
  /** After border trace completes, parent sets true to run the segment draw. */
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Horizontal gap segment (1.5rem): faint dashed track + gradient stroke “draw” via
 * stroke-dashoffset (more reliable across browsers than pathLength on short paths).
 */
export function FlowGapConnector({ active, className, style }: FlowGapConnectorProps) {
  const gradId = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: GAP_LINE_DURATION_S, ease: REBATE_FLOW_DRAW_EASE };

  const dashAnimate = !active
    ? { strokeDashoffset: SEGMENT_LEN, opacity: 0 }
    : reduceMotion
      ? { strokeDashoffset: 0, opacity: 1 }
      : { strokeDashoffset: 0, opacity: 1 };

  return (
    <svg
      className={cn("pointer-events-none overflow-visible", className)}
      style={style}
      width={24}
      height={8}
      viewBox="0 0 24 8"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#18CBA8" />
          <stop offset="100%" stopColor="#29FFB5" />
        </linearGradient>
      </defs>
      <path
        d="M 0 4 L 24 4"
        fill="none"
        stroke={TRACK}
        strokeDasharray="3 4"
        strokeLinecap="round"
        strokeWidth={1}
      />
      <motion.path
        d="M 0 4 L 24 4"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeDasharray={SEGMENT_LEN}
        strokeLinecap="round"
        strokeWidth={2}
        initial={{ strokeDashoffset: SEGMENT_LEN, opacity: 0 }}
        animate={dashAnimate}
        transition={{
          strokeDashoffset: transition,
          opacity: { duration: 0.12 },
        }}
      />
    </svg>
  );
}
