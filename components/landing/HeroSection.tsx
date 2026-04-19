"use client";

import TrustMetrics from "./TrustMetrics/index";
import { useComingSoonModal } from "@/components/ui/ModalContext";
import { useLanguage } from "@/context/LanguageContext";

export function HeroSection() {
  const { openComingSoon } = useComingSoonModal();
  const { t } = useLanguage();

  return (
    <section className="relative pt-[70px] min-h-[680px] md:pt-[82px] md:min-h-[800px] overflow-hidden flex flex-col items-center">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-transparent via-transparent to-[#020103]" />

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" aria-hidden>
        <div className="absolute left-1/2 top-[8%] h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full border border-white/30" />
        <div className="absolute left-1/2 top-[12%] h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 rounded-full border border-white/25" />
      </div>

      <div className="relative z-10 flex flex-col items-center pt-12 md:pt-20">
        <div className="mb-6 md:mb-10 w-full overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="animate-fade-up mx-auto flex w-max flex-nowrap items-center gap-2 rounded-full border border-white/15 bg-black/70 px-2.5 py-1.5 pr-4 backdrop-blur-sm md:px-4 md:py-2 md:gap-2.5" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-[10px] font-bold tracking-wide text-black uppercase md:px-2.5 md:py-1 md:text-[11px]">
              {t("hero.badge")}
            </span>
            <span className="shrink-0 whitespace-nowrap text-[11px] text-white/90 md:text-sm">
              {t("hero.subtitle")}
            </span>
          </div>
        </div>

        <h1 className="animate-fade-up mx-auto flex w-full max-w-[1200px] flex-col items-center gap-0 px-4 text-center font-bold tracking-tight" style={{ animationDelay: "100ms" }}>
          <span className="text-[1.6rem] leading-[1.1] md:text-5xl md:leading-[1.02] text-white">
            {t("hero.title1")}
          </span>
          <span
            className="mt-1 md:mt-2 tracking-[-1px] md:tracking-[-1.5px] text-[1.6rem] leading-[1.1] md:text-5xl md:leading-[75px] bg-clip-text text-transparent bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(255,255,255,1)_0%,rgba(74,222,128,1)_66%)]"
          >
            {t("hero.title2")}
          </span>
        </h1>

        <p
          className="animate-fade-up mt-5 md:mt-7 max-w-[560px] px-4 text-center text-sm leading-relaxed text-white/85 md:text-lg"
          style={{ animationDelay: "200ms" }}
        >
          {t("hero.description")}
        </p>

        <div
          className="animate-fade-up mt-6 md:mt-8 flex flex-col items-center gap-3 md:gap-4 md:flex-row"
          style={{ animationDelay: "300ms" }}
        >
          <button
            type="button"
            onClick={openComingSoon}
            className="rounded-full bg-white px-6 py-3 text-base font-semibold text-black shadow-xl transition-colors hover:bg-white/90 md:px-8 md:py-4 md:text-lg"
          >
            {t("hero.cta")}
          </button>
        </div>
        <TrustMetrics />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#020103] via-transparent to-transparent" />
    </section>
  );
}