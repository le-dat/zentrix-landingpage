# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zentrix landing page (zentrix.io) — a fintech landing page for traders and IBs to sign up and earn rebates. Built with [Astro](https://astro.build) v6, pnpm, no additional framework integrations.

## Commands

```sh
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Build production site to ./dist/
pnpm preview    # Preview production build locally
pnpm astro ...  # Run Astro CLI commands (e.g., astro add, astro check)
```

## Architecture

- `src/pages/index.astro` — Entry page, renders `<Welcome />` inside `<Layout />`
- `src/layouts/Layout.astro` — Base HTML shell with `<slot />` for page content
- `src/components/Welcome.astro` — Main landing page component (currently the Astro starter template — replace with full landing page per spec)
- `src/assets/` — SVG assets imported directly in components via Vite
- `public/` — Static assets served as-is (favicon)
- `astro.config.mjs` — Astro configuration (minimal/defaults)
- `docs/spec.md` — Full design specification (source of truth for this project)

## Design Specification (`docs/spec.md`)

The landing page is divided into 11 sections (LP-01 through LP-11):

| Section | Name | Priority |
|---|---|---|
| LP-01 | Hero / Above the fold | 1 |
| LP-03 | How It Works | 2 |
| LP-04 | Why Zentrix | 3 |
| LP-09 | FAQ (accordion) | 4 |
| LP-10 | Final CTA | 5 |
| LP-02 | Trust Metrics | 6 |
| LP-05 | Referral Network | 6 |
| LP-07 | Zentrix vs Traditional Rebate | 6 |
| LP-08 | Testimonials | 6 |
| LP-06 | Integrated Brokers | 6 |
| LP-11 | Footer | 6 |

### Color System
- Primary: `#1E3A5F` Navy
- Accent: `#1A6B2E` Green
- Warning/Amber: `#B07000`
- Surface: `#F4F4F4` Gray

### Typography
- Font: Inter or Plus Jakarta Sans
- Headline: 48–64px bold
- Body: 16–18px regular, line-height 1.7

### UX Rules
- Mobile breakpoint: 768px
- CTA: 1 per viewport, min height 48px, border-radius 8px
- Touch targets: min 44px
- Respect `prefers-reduced-motion`
- LCP < 2.5s, lazy load images

## TypeScript

Plain Astro project without TypeScript configuration. `.astro` files support TypeScript via Vite's preprocessing.