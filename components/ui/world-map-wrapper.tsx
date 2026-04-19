"use client";

import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
  loading: () => <div className="h-[1000px]" />,
});

interface WorldMapWrapperProps {
  className?: string;
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
}

export function WorldMapWrapper({ className, dots }: WorldMapWrapperProps) {
  return (
    <WorldMap
      className={className}
      dots={dots}
    />
  );
}
