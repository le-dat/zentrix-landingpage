# Zentrix — Rebate Trading Platform

**Zentrix** standardizes the rebate flow from your broker directly to your wallet. Fully on-chain transparent. No hidden intermediaries.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS v4 + shadcn/ui
- **i18n**: next-intl (English · Vietnamese)
- **Fonts**: Geist + Geist Mono (Google Fonts)

## Project Structure

```
├── app/
│   ├── [locale]/           # Locale-based routing (en/vi)
│   │   ├── layout.tsx      # Root layout with Header
│   │   └── page.tsx        # Landing page
│   ├── globals.css         # Global styles + CSS variables
│   └── layout.tsx          # Root layout
├── components/
│   └── ui/                 # shadcn/ui components
├── messages/
│   ├── en.json             # English translations
│   └── vi.json             # Vietnamese translations
└── docs/
    └── spec.md             # Design specification
```

## Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Design

See `docs/spec.md` for the full design specification covering:

- Hero section (LP-01)
- Trust metrics (LP-02)
- Zentrix Cashback System Work? (LP-03)
- Why Zentrix (LP-04)
- Referral network (LP-05)
- Integrated brokers (LP-06)
- Comparison table (LP-07)
- Testimonials (LP-08)
- FAQ (LP-09)
- Final CTA (LP-10)
- Footer (LP-11)
