export interface HowItWorksStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
  digit: string;
  variant: "default" | "highlight";
}

export const steps: HowItWorksStep[] = [
  {
    id: "01",
    titleKey: "howItWorks.steps.broker",
    descriptionKey: "howItWorks.steps.brokerDesc",
    digit: "1",
    variant: "highlight",
  },
  {
    id: "02",
    titleKey: "howItWorks.steps.engine",
    descriptionKey: "howItWorks.steps.engineDesc",
    digit: "2",
    variant: "highlight",
  },
  {
    id: "03",
    titleKey: "howItWorks.steps.pool",
    descriptionKey: "howItWorks.steps.poolDesc",
    digit: "3",
    variant: "highlight",
  },
  {
    id: "04",
    titleKey: "howItWorks.steps.wallet",
    descriptionKey: "howItWorks.steps.walletDesc",
    digit: "4",
    variant: "highlight",
  },
];

export const CARD_INNER_RADIUS = "rounded-[calc(1.5rem-1px)]";
export const STEP_GRID_CLASSES = "grid-cols-2 md:grid-cols-4 gap-4 md:gap-5";
export const SECTION_PY = "py-[120px]";

export const highlightColors = {
  border: "border-[#18CBA8]/30",
  borderHover: "group-hover:border-[#18CBA8]/40",
  bg: "bg-[#18CBA8]/[0.08]",
  bgHover: "group-hover:bg-[#18CBA8]/[0.12]",
  shadow: "shadow-[0_0_40px_-18px_rgba(24,203,168,0.22),inset_0_1px_0_0_rgba(24,203,168,0.12)]",
  shadowHover:
    "group-hover:shadow-[0_0_40px_-18px_rgba(24,203,168,0.28),inset_0_1px_0_0_rgba(24,203,168,0.16)]",
  digitGradient:
    "bg-[linear-gradient(180deg,#2dd4bf_0%,#18CBA8_22%,#149f8c_38%,#0d6d5f_50%,#0a4540_68%,#082b28_82%,#020807_100%)]",
  digitOpacity: "opacity-88",
  digitOpacityHover: "group-hover:opacity-95",
  titleText: "text-[#e8fffa]",
  descText: "text-[#c6f7ec]",
  descTextHover: "group-hover:text-[#e8fffa]",
} as const;

export const defaultColors = {
  border: "border-white/[0.08]",
  borderHover: "",
  bg: "bg-[#0c1512]/85",
  bgHover: "",
  shadow: "",
  shadowHover: "",
  digitGradient:
    "bg-[linear-gradient(180deg,#14b8a6_0%,#11827a_26%,#0f6b64_42%,#0c4f4a_52%,#083632_70%,#05221f_86%,#010a09_100%)]",
  digitOpacity: "opacity-85",
  digitOpacityHover: "group-hover:opacity-92",
  titleText: "text-white",
  descText: "text-zinc-200",
  descTextHover: "group-hover:text-zinc-100",
} as const;

export const CONNECTOR_POSITIONS = [
  "calc((100% - 3rem) / 4)",
  "calc(2 * (100% - 3rem) / 4 + 1rem)",
  "calc(3 * (100% - 3rem) / 4 + 2rem)",
] as const;
