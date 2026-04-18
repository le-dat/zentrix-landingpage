export interface ComparisonItem {
  criteria: string;
  traditional: string;
  zentrix: string;
}

export const comparisons: ComparisonItem[] = [
  {
    criteria: "Liquidity Transparency",
    traditional: "Internal balance, hard to verify externally",
    zentrix: "On-chain Pool, verifiable on explorer",
  },
  {
    criteria: "Fund Flow",
    traditional: "Internal transfers, non-public batches",
    zentrix: "Broker → Treasury → Pool → Wallet",
  },
  {
    criteria: "Reconciliation",
    traditional: "Mostly internal reporting",
    zentrix: "Broker + Ledger + Chain (3-way)",
  },
  {
    criteria: "Referral Allocation",
    traditional: "Limited audit tools",
    zentrix: "Ref tree + policy + public log",
  },
  {
    criteria: "Withdrawals",
    traditional: "Manual approval process",
    zentrix: "On-chain claim, fixed fee",
  },
];
