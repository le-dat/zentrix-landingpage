import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-background/80 dark:from-black dark:to-black/90">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-center py-20 px-6 sm:px-8 lg:px-16 gap-12">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/logo.png"
            alt="Zentrix"
            width={180}
            height={95}
            priority
            className="dark:invert"
          />
        </div>

        {/* Hero Content */}
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="min-w-[160px]">
            {t("getStarted")}
          </Button>
          <Button size="lg" variant="outline" className="min-w-[160px]">
            {t("learnMore")}
          </Button>
        </div>
      </main>
    </div>
  );
}