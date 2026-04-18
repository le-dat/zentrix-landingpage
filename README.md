# Zentrix — The Transparent Rebate Trading Platform

**Zentrix** standardizes the rebate flow from your broker directly to your wallet. Fully on-chain transparent. No hidden intermediaries.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9-orange?logo=pnpm)](https://pnpm.io/)

---

## 🚀 Overview

Zentrix is a modern fintech platform designed to bring transparency to the trading rebate ecosystem. By utilizing on-chain verification and a direct-to-wallet flow, we eliminate the "black box" of traditional IB (Introducing Broker) relationships.

- **On-chain Transparency**: Claims are processed via a public smart contract pool.
- **Multi-Broker Hub**: Connect multiple broker accounts (MT4/MT5) under one Zentrix dashboard.
- **Instant Withdrawals**: Claim verified rebates to your BEP20 wallet with fixed, low fees.
- **Social Trust**: Real-time volume metrics and verified user testimonials.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.3 (App Router) |
| **Library** | React 19.x |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Animation** | Framer Motion + Motion + Cobe (Globe) |
| **Icons** | Lucide React |
| **Testing** | Storybook 8 |
| **Environment** | TypeScript 5 + ESLint 9 |

---

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Layouts, Pages, Styles)
├── components/           # UI Components
│   ├── landing/          # Feature-specific landing page sections
│   └── ui/               # Shared shadcn/ui primitives
├── docs/                 # Documentation & Design Specifications
│   └── spec.md             # Core Design Spec (LP-01 to LP-11)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions & Shared logic
└── public/               # Static assets & Fonts
```

---

## 💻 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run dev      # Start dev server at http://localhost:3000
pnpm run lint     # Run ESLint validation
pnpm run storybook # Open component library documentation
```

### Build

```bash
pnpm run build    # Production build
pnpm run start    # Start production server
```

---

## 🔄 Development Workflow

This project follows a professional feature-branch strategy with automated CI/CD:

1.  **Branching**: All new features are developed in `feat/*` branches.
2.  **Automated Sync**: The `Merge-forward` workflow automatically merges `master` into all active `feat/*` branches upon every push to master.
3.  **Validation**: Every merge attempt triggers a `lint` and `tsc` check to ensure stability.
4.  **Deployment**: Production releases are triggered from the `master` branch.

See `landingpage/.github/workflows/merge-forward-feat.yml` for implementation details.

---

*© 2026 Zentrix · Internal Development*
