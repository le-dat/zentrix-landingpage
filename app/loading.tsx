"use client";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#020103]">
      <div className="relative pt-[82px] min-h-[800px] overflow-hidden flex flex-col items-center">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-transparent via-transparent to-[#020103]" />

        <div className="relative z-10 flex flex-col items-center pt-20">
          <div className="mb-10 mx-auto flex w-max items-center gap-2.5 rounded-full border border-white/15 bg-black/70 px-4 py-2">
            <div className="h-6 w-20 shrink-0 rounded-md bg-white/10 animate-pulse" />
            <div className="h-4 w-48 shrink-0 rounded bg-white/10 animate-pulse" />
          </div>

          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-0 px-4 text-center font-bold tracking-tight">
            <div className="h-14 w-80 rounded bg-white/5 animate-pulse md:h-20 md:w-[600px]" />
            <div className="mt-4 h-14 w-96 rounded bg-white/5 animate-pulse md:h-20 md:w-[600px]" />
          </div>

          <div className="mt-7 h-12 w-[460px] max-w-[560px] rounded bg-white/5 animate-pulse px-4 md:mt-6" />

          <div className="mt-8 flex items-center gap-4">
            <div className="h-12 w-36 rounded-full bg-white/5 animate-pulse" />
          </div>

          <div className="mt-16 flex items-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-16 w-16 rounded-full bg-white/5 animate-pulse" />
                <div className="h-4 w-20 rounded bg-white/5 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#020103] via-transparent to-transparent" />
      </div>
    </main>
  );
}
