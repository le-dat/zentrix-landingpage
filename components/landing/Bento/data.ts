export interface BentoCard {
  id: string;
  title: string;
  description: string;
  image?: string;
  size: "small" | "large";
}

export const bentoCards: BentoCard[] = [
  {
    id: "pool",
    title: "Pool & explorer",
    description: "Track rebate accrual and every on-chain claim with hashes you can verify yourself.",
    image: "/images/glass-ring.png",
    size: "small",
  },
  {
    id: "dashboard",
    title: "Rebate dashboard",
    description:
      "Volume, settlement status, and balances across all linked brokers in one place.",
    size: "large",
  },
  {
    id: "reports",
    title: "Settlement clarity",
    description:
      "See when broker payouts landed, when rebates opened for claim, and what you withdrew.",
    size: "large",
  },
  {
    id: "wallet",
    title: "Wallet claims",
    description: "Withdraw to your BEP20 wallet with a clear, fixed fee — no opaque approvals.",
    image: "/images/glass-cone.png",
    size: "small",
  },
];
