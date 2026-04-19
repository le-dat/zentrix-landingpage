export interface Testimonial {
  quoteKey: string;
  name: string;
  roleKey: string;
}

// Row 1: left-to-right
export const testimonialsRow1: Testimonial[] = [
  {
    quoteKey: "trustTrader.quote1",
    name: "Alex N.",
    roleKey: "trustTrader.role1",
  },
  {
    quoteKey: "trustTrader.quote2",
    name: "Sarah T.",
    roleKey: "trustTrader.role2",
  },
  {
    quoteKey: "trustTrader.quote3",
    name: "Michael K.",
    roleKey: "trustTrader.role3",
  },
];

// Row 2: right-to-left
export const testimonialsRow2: Testimonial[] = [
  {
    quoteKey: "trustTrader.quote4",
    name: "David L.",
    roleKey: "trustTrader.role4",
  },
  {
    quoteKey: "trustTrader.quote5",
    name: "Emma W.",
    roleKey: "trustTrader.role5",
  },
  {
    quoteKey: "trustTrader.quote6",
    name: "James R.",
    roleKey: "trustTrader.role6",
  },
];