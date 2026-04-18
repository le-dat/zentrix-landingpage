import { BarChart3, Building2, Users, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TrustMetric {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const metrics: TrustMetric[] = [
  { value: "$12.4M+", label: "Volume", icon: BarChart3 },
  { value: "8,200+", label: "Traders", icon: Users },
  { value: "14", label: "Brokers", icon: Building2 },
  { value: "$680K+", label: "Rebates", icon: Wallet },
];
