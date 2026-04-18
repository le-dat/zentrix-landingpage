"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface RebateFlowBorderTraceProps {
  className?: string;
  active: boolean;
  insetPx?: number;
  cardRadiusPx?: number;
}

function buildHalfPaths(
  w: number,
  h: number,
  insetPx: number,
  cardRadiusPx: number,
) {
  const inset = insetPx;
  const iw = w - 2 * inset;
  const ih = h - 2 * inset;
  const r = Math.min(cardRadiusPx, iw / 2, ih / 2);
  const midY = h / 2;
  const xl = inset;
  const xr = w - inset;
  const yt = inset;
  const yb = h - inset;

  // Arc sweep: bottom half traverses each bottom corner opposite to the usual
  // clockwise rounded-rect convention, so use sweep 0 on bottom-left & bottom-right
  // to keep the 90° bulge on the outside (avoids “broken” / pinched corners).
  const pathDown = [
    `M ${xl} ${midY}`,
    `L ${xl} ${yb - r}`,
    `A ${r} ${r} 0 0 0 ${xl + r} ${yb}`,
    `L ${xr - r} ${yb}`,
    `A ${r} ${r} 0 0 0 ${xr} ${yb - r}`,
    `L ${xr} ${midY}`,
  ].join(" ");

  const pathUp = [
    `M ${xl} ${midY}`,
    `L ${xl} ${yt + r}`,
    `A ${r} ${r} 0 0 1 ${xl + r} ${yt}`,
    `L ${xr - r} ${yt}`,
    `A ${r} ${r} 0 0 1 ${xr} ${yt + r}`,
    `L ${xr} ${midY}`,
  ].join(" ");

  return { pathDown, pathUp, viewBox: `0 0 ${w} ${h}` as const };
}

export const REBATE_FLOW_DRAW_DURATION_S = 1.65;
export const REBATE_FLOW_DRAW_DURATION_MS = Math.round(REBATE_FLOW_DRAW_DURATION_S * 1000);
export const REBATE_FLOW_DRAW_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1];

const DRAW_DURATION_S = REBATE_FLOW_DRAW_DURATION_S;
const DRAW_EASE = REBATE_FLOW_DRAW_EASE;

export function RebateFlowBorderTrace({
  className,
  active,
  insetPx = 1,
  cardRadiusPx = 15,
}: RebateFlowBorderTraceProps) {
  const gradId = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 100, h: 100 });
  const reduceMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    function update() {
      const svg = svgRef.current;
      const box = svg?.parentElement;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      setSize((prev) =>
        Math.abs(prev.w - w) < 0.25 && Math.abs(prev.h - h) < 0.25 ? prev : { w, h },
      );
    }

    const svg = svgRef.current;
    if (!svg?.parentElement) return;

    update();
    const ro = new ResizeObserver(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    });
    ro.observe(svg.parentElement);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  const { pathDown, pathUp, viewBox } = buildHalfPaths(size.w, size.h, insetPx, cardRadiusPx);

  const strokeW = 2;
  const trackW = 1.2;
  const trackColor = "rgba(24, 203, 168, 0.3)";

  const lineTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: DRAW_DURATION_S,
        ease: DRAW_EASE,
      };

  const lineAnimate =
    !active
      ? { pathLength: 0, opacity: 0 }
      : reduceMotion
        ? { pathLength: 1, opacity: 1 }
        : { pathLength: 1, opacity: 1 };

  return (
    <svg
      ref={svgRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 size-full overflow-visible [shape-rendering:geometricPrecision]",
        className,
      )}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18CBA8" />
          <stop offset="100%" stopColor="#29FFB5" />
        </linearGradient>
      </defs>

      <motion.g initial={false} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.2 }}>
        <path
          d={pathDown}
          fill="none"
          stroke={trackColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={trackW}
        />
        <path
          d={pathUp}
          fill="none"
          stroke={trackColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={trackW}
        />
      </motion.g>

      <motion.path
        d={pathDown}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeW}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={lineAnimate}
        transition={{
          pathLength: lineTransition,
          opacity: { duration: 0.2 },
        }}
      />
      <motion.path
        d={pathUp}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeW}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={lineAnimate}
        transition={{
          pathLength: lineTransition,
          opacity: { duration: 0.2 },
        }}
      />
    </svg>
  );
}
