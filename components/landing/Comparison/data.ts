export interface ComparisonItem {
  criteriaKey: string;
  traditionalKey: string;
  zentrixKey: string;
}

export const comparisons: ComparisonItem[] = [
  {
    criteriaKey: "comparison.items.liquidity",
    traditionalKey: "comparison.items.liquidityTraditional",
    zentrixKey: "comparison.items.liquidityZentrix",
  },
  {
    criteriaKey: "comparison.items.fundFlow",
    traditionalKey: "comparison.items.fundFlowTraditional",
    zentrixKey: "comparison.items.fundFlowZentrix",
  },
  {
    criteriaKey: "comparison.items.reconciliation",
    traditionalKey: "comparison.items.reconciliationTraditional",
    zentrixKey: "comparison.items.reconciliationZentrix",
  },
  {
    criteriaKey: "comparison.items.referral",
    traditionalKey: "comparison.items.referralTraditional",
    zentrixKey: "comparison.items.referralZentrix",
  },
  {
    criteriaKey: "comparison.items.withdrawals",
    traditionalKey: "comparison.items.withdrawalsTraditional",
    zentrixKey: "comparison.items.withdrawalsZentrix",
  },
];