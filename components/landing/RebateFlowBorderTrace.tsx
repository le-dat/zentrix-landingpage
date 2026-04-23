'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface RebateFlowBorderTraceProps {
  className?: string;
  active: boolean;
  insetPx?: number;
  cardRadiusPx?: number;
}

function buildHalfPaths(w: number, h: number, insetPx: number, cardRadiusPx: number) {
  const inset = insetPx;
  const iw = w - 2 * inset;
  const ih = h - 2 * inset;
  const r = Math.min(cardRadiusPx, iw / 2, ih / 2);
  const midY = h / 2;
  const xl = inset;
  const xr = w - inset;
  const yt = inset;
  const yb = h - inset;

  const pathDown = [
    `M ${xl} ${midY}`,
    `L ${xl} ${yb - r}`,
    `A ${r} ${r} 0 0 0 ${xl + r} ${yb}`,
    `L ${xr - r} ${yb}`,
    `A ${r} ${r} 0 0 0 ${xr} ${yb - r}`,
    `L ${xr} ${midY}`,
  ].join(' ');

  const pathUp = [
    `M ${xl} ${midY}`,
    `L ${xl} ${yt + r}`,
    `A ${r} ${r} 0 0 1 ${xl + r} ${yt}`,
    `L ${xr - r} ${yt}`,
    `A ${r} ${r} 0 0 1 ${xr} ${yt + r}`,
    `L ${xr} ${midY}`,
  ].join(' ');

  return { pathDown, pathUp, viewBox: `0 0 ${w} ${h}` as const };
}

export const REBATE_FLOW_DRAW_DURATION_S = 1.65;
export const REBATE_FLOW_DRAW_DURATION_MS = Math.round(REBATE_FLOW_DRAW_DURATION_S * 1000);
export const REBATE_FLOW_DRAW_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1];

const DRAW_DURATION_S = REBATE_FLOW_DRAW_DURATION_S;

export function RebateFlowBorderTrace({
  className,
  active,
  insetPx = 1,
  cardRadiusPx = 15,
}: RebateFlowBorderTraceProps) {
  const gradId = useId().replace(/:/g, '');
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 100, h: 100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    function update() {
      const svg = svgRef.current;
      const box = svg?.parentElement;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      const w = Math.max(rect.width, 1);
      const h = Math.max(rect.height, 1);
      setSize((prev) =>
        Math.abs(prev.w - w) < 0.25 && Math.abs(prev.h - h) < 0.25 ? prev : { w, h }
      );
    }

    const svg = svgRef.current;
    if (!svg?.parentElement) return;

    update();
    const ro = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(update);
      }, 100);
    });
    ro.observe(svg.parentElement);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  const { pathDown, pathUp, viewBox } = buildHalfPaths(size.w, size.h, insetPx, cardRadiusPx);

  const prefix = `rbt-${gradId}-`;
  const strokeW = 2;
  const trackW = 1.2;
  const trackColor = 'rgba(24, 203, 168, 0.3)';

  return (
    <svg
      ref={svgRef}
      className={cn(
        'pointer-events-none absolute inset-0 z-0 size-full overflow-visible [shape-rendering:geometricPrecision]',
        className
      )}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <style>{`
        .${prefix}trace-path {
          transition: opacity 0.2s;
        }
        .${prefix}trace-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          transition: stroke-dashoffset ${DRAW_DURATION_S}s ease-out, opacity 0.2s;
        }
        .${prefix}active {
          stroke-dashoffset: 0;
        }
      `}</style>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18CBA8" />
          <stop offset="100%" stopColor="#29FFB5" />
        </linearGradient>
      </defs>

      <g className={`${prefix}trace-path`} style={{ opacity: active ? 1 : 0 }}>
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
      </g>

      <path
        d={pathDown}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeW}
        className={`${prefix}trace-draw${active ? ` ${prefix}active` : ''}`}
        style={{ opacity: active ? 1 : 0 }}
      />
      <path
        d={pathUp}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeW}
        className={`${prefix}trace-draw${active ? ` ${prefix}active` : ''}`}
        style={{ opacity: active ? 1 : 0 }}
      />
    </svg>
  );
}
