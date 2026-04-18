"use client";

import { motion, type MotionProps } from "framer-motion";
import { TrustMetrics } from "./TrustMetrics";

const heroGradientLineClass =
  "bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(255,255,255,1)_0%,rgba(74,222,128,1)_66%)] bg-clip-text text-transparent";

function fadeUpMotion(
  delay: number,
  opts?: { y?: number; duration?: number },
): Pick<MotionProps, "initial" | "animate" | "transition"> {
  const y = opts?.y ?? 20;
  const duration = opts?.duration ?? 0.5;
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay },
  };
}

export function HeroSection() {
  const headlineSize =
    "text-[2rem] leading-[1.03] sm:text-5xl sm:leading-[1.02] md:text-6xl md:leading-[1.02] lg:text-6xl";

  return (
    <section className="relative pt-[82px] min-h-[800px] overflow-hidden flex flex-col items-center">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-transparent via-transparent to-[#020103]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" aria-hidden>
        <div className="absolute left-1/2 top-[8%] h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full border border-white/30" />
        <div className="absolute left-1/2 top-[12%] h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 rounded-full border border-white/25" />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-20">
        <div className="mb-10 w-full overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <motion.div
            {...fadeUpMotion(0)}
            className="mx-auto flex w-max flex-nowrap items-center gap-2.5 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 pr-5 backdrop-blur-sm sm:px-4 sm:py-2"
          >
            <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-[11px] font-bold tracking-wide text-black uppercase sm:text-xs">
              REBATES
            </span>
            <span className="shrink-0 whitespace-nowrap text-xs text-white/90 sm:text-sm">
              On-chain transparent · No hidden intermediaries
            </span>
          </motion.div>
        </div>

        <motion.h1
          {...fadeUpMotion(0.1, { y: 30, duration: 0.6 })}
          className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-0 px-4 text-center font-bold tracking-tight"
        >
          <span className={`block text-white ${headlineSize}`}>Fee Cashback Platform</span>
          <span
            className={`mt-1 tracking-[-1.5px] block max-w-[1200px] text-[2rem] leading-[75px] sm:text-5xl sm:leading-[75px] md:text-6xl md:leading-[75px] lg:text-6xl lg:leading-[75px] ${heroGradientLineClass} sm:mt-1.5 md:mt-2`}
          >
            Up to 95% Trading Fee Rebates
          </span>
        </motion.h1>

        <motion.p
          {...fadeUpMotion(0.2)}
          className="mt-7 max-w-[560px] px-4 text-center text-base leading-relaxed text-white/85 sm:text-lg md:mt-6"
        >
          Zentrix standardizes the rebate flow from your broker directly to your wallet.
        </motion.p>

        <motion.div
          {...fadeUpMotion(0.3)}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:mt-6"
        >
          <button
            type="button"
            className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-black shadow-xl transition-colors hover:bg-white/90"
          >
            Get started
          </button>
        </motion.div>
        <TrustMetrics />
        {/* <PartnerSection /> */}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#020103] via-transparent to-transparent" />
    </section>
  );
}
