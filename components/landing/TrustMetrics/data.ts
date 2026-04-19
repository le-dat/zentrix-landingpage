import { BarChart3, Building2, Users, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TrustMetric {
  value: string;
  labelKey: string;
  icon: LucideIcon;
}

export const metrics: TrustMetric[] = [
  { value: "$12.4M+", labelKey: "trustMetrics.volume", icon: BarChart3 },
  { value: "8,200+", labelKey: "trustMetrics.traders", icon: Users },
  { value: "14", labelKey: "trustMetrics.brokers", icon: Building2 },
  { value: "$680K+", labelKey: "trustMetrics.rebates", icon: Wallet },
];