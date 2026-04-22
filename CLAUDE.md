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

- **App Router**: `app/page.tsx` is a thin server wrapper that renders `LandingPageClient` from `components/landing/`. All landing components are client components.
- **Tailwind CSS v4**: CSS-based config via `@import "tailwindcss"` and `@theme` directive in `app/globals.css` — no `tailwind.config.js`. Mobile-first: base styles are mobile, `md:` prefix adds desktop styles.
- **i18n**: No external i18n library. Translations live in `messages/en.json` and `messages/vi.json`, accessed via `useLanguage().t()` from `context/LanguageContext`. The context manages locale state (persisted to `localStorage`).
- **API Routes**: Next.js Route Handlers in `app/api/`. `app/api/subscribers/register/route.ts` proxies to `NOTI_API_BASE` env var (the noti-server). Client-side calls go through `lib/api/notiApi.ts`.
- **TypeScript**: Strict mode, path alias `@/*` → project root. Types in `types/` (e.g. `types/locale.ts`).
- **ESLint 9**: Flat config in `eslint.config.mjs` with `eslint-config-next/core-web-vitals`.
- **Storybook 8**: Component library with addon-essentials and addon-interactions.

## Design System

Full spec in `docs/spec.md` (LP-01 through LP-11). Key points:

- Brand teal `#18CBA8`, mint `#29FFB5`, dark `#146255`
- Inter font, 48-64px headlines, 16-18px body, 1.7 line-height
- Mobile breakpoint at 768px
- Subtle animations respecting `prefers-reduced-motion`

## Project Structure

```
app/
  api/subscribers/register/route.ts  # API route proxying to noti-server
  layout.tsx                         # Root layout with CombinedProviderWrapper
  page.tsx                           # Thin wrapper → LandingPageClient
components/
  landing/         # Landing page sections (HeroSection, Navbar, FAQ, Footer, etc.)
  ui/              # Shared primitives (shadcn/ui, LanguageToggle, InfoModal, ComingSoonModal, etc.)
context/
  LanguageContext.tsx   # i18n: locale + t()
  ModalContext.tsx       # Global modal state (ComingSoonModal, InfoModal)
hooks/             # useDevice, useScrolled
lib/
  api/notiApi.ts   # registerSubscriber() — calls /api/subscribers/register
  utils.ts         # cn() helper
messages/
  en.json, vi.json   # i18n translation files
types/
  locale.ts         # Locale type ("en" | "vi")
  index.ts          # Shared types
```

## Providers

`CombinedProviderWrapper` wraps `LanguageProvider` (outer) + `ModalProvider` (inner). `ModalContext` manages `isComingSoonOpen` / `isInfoModalOpen` + their open/close setters — import `useModal` from `@/context/ModalContext`.

## Development Workflow

Feature branches (`feat/*`) with automated `Merge-forward` workflow — see `.github/workflows/merge-forward-feat.yml`. Every merge to master triggers lint + tsc validation before forward-merging to active `feat/*` branches.

## Related Services

The landing page proxies subscriber registration to a separate `noti-server` (NestJS) via `NOTI_API_BASE`. The noti-server repo is a sibling: `../noti-server/`.
