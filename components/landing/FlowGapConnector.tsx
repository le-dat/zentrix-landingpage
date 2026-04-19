"use client";

import { useId } from "react";

import { cn } from "@/lib/utils";

import { REBATE_FLOW_DRAW_EASE } from "@/components/landing/RebateFlowBorderTrace";

const GAP_LINE_DURATION_S = 0.55;
const TRACK = "rgba(63, 63, 70, 0.55)";
const SEGMENT_LEN = 24;

interface FlowGapConnectorProps {
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function FlowGapConnector({ active, className, style }: FlowGapConnectorProps) {
  const gradId = useId().replace(/:/g, "");

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
      <path
        d="M 0 4 L 24 4"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeLinecap="round"
        strokeWidth={2}
        style={{
          strokeDasharray: SEGMENT_LEN,
          strokeDashoffset: active ? 0 : SEGMENT_LEN,
          opacity: active ? 1 : 0,
          transition: `stroke-dashoffset ${GAP_LINE_DURATION_S}s ease-out, opacity 0.12s`,
        }}
      />
    </svg>
  );
}