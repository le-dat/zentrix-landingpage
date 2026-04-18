export interface FAQItem {
  title: string;
  body: string;
}

export const faqs: FAQItem[] = [
  {
    title: "What is a rebate and where does it come from?",
    body: "It's basically cashback on your trading fees. Your broker returns a part of the commission back to you based on your actual trading volume.",
  },
  {
    title: "Is KYC required?",
    body: "Yes, KYC is needed for withdrawals to keep things secure and follow legal rules. It's usually a quick process and gets approved in just a few hours.",
  },
  {
    title: "What is the on-chain Pool? Is my money safe?",
    body: "The Pool is where your rebates are held on-chain. We only add funds once they're verified from the broker, and you can track everything on BSCScan.",
  },
  {
    title: "How long does it take to receive my rebates?",
    body: "We track your trades as you go. Once the broker settles their weekly or monthly payouts, your rebates are confirmed and ready to claim.",
  },
  {
    title: "Is Zentrix an MLM scheme?",
    body: "Not at all. Your earnings come strictly from the trading volume of people you refer. You never have to buy anything to participate.",
  },
  {
    title: "Can I connect multiple brokers?",
    body: "Definitely! You can link as many broker accounts as you like to your Zentrix profile. All your rebates are consolidated in one place.",
  },
];
