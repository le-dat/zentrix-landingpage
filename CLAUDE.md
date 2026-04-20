# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zentrix is a Next.js 16.2.3 landing page for a fintech platform that brings transparency to the trading rebate ecosystem. It uses the App Router with React 19 and Tailwind CSS v4. The project uses **pnpm** (not npm).

## Commands

```bash
pnpm run dev         # Start dev server at http://localhost:3000
pnpm run build       # Production build
pnpm run start       # Start production server
pnpm run lint        # Run ESLint
pnpm run storybook   # Open Storybook at http://localhost:6006
pnpm run build-storybook
```

## Architecture

- **App Router**: Pages are in `app/` directory. `app/page.tsx` is a thin wrapper that renders `LandingPageClient` from `components/landing/`
- **Tailwind CSS v4**: CSS-based config with `@import "tailwindcss"` and `@theme` directive in `app/globals.css` — no `tailwind.config.js`
- **TypeScript**: Strict mode enabled, path alias `@/*` maps to project root
- **Fonts**: Inter via `next/font/google` (variable `--font-inter`)
- **ESLint 9**: Flat config in `eslint.config.mjs` with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- **Storybook 8**: Component library with addon-essentials and addon-interactions

## Project Structure

```
app/                  # Next.js App Router (layout, pages, globals.css)
components/
  landing/            # Landing page sections (HeroSection, Navbar, FAQ, Footer, etc.)
  ui/                 # Shared primitives (shadcn/ui, button, skeleton, etc.)
hooks/                # Custom React hooks (useDevice, useScrolled)
lib/                  # Utilities (lib/utils.ts with cn() helper)
docs/spec.md          # Detailed design spec (LP-01 through LP-11)
```

## Design System

The full design specification is in `docs/spec.md` covering LP-01 (Hero) through LP-11 (Footer). Key UX principles:

- Brand teal `#18CBA8`, mint `#29FFB5`, dark `#146255`
- Inter font, 48-64px headlines, 16-18px body, 1.7 line-height
- Mobile breakpoint at 768px
- Subtle animations respecting `prefers-reduced-motion`

## Development Workflow

Feature branches (`feat/*`) with automated `Merge-forward` workflow — see `.github/workflows/merge-forward-feat.yml`. Every merge to master triggers lint + tsc validation before forward-merging to active feature branches.