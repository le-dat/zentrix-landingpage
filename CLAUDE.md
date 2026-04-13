# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.2.3 landing page project bootstrapped with `create-next-app`. It uses the App Router architecture with React 19 and Tailwind CSS v4.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

- **App Router**: Pages are in `app/` directory using Next.js App Router conventions
- **Tailwind CSS v4**: Uses CSS-based configuration with `@import "tailwindcss"` and `@theme` directive in `app/globals.css` — no `tailwind.config.js`
- **TypeScript**: Strict mode enabled, path alias `@/*` maps to project root
- **Fonts**: Geist and Geist_Mono via `next/font/google`
- **ESLint 9**: Uses flat config format in `eslint.config.mjs` with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`

## Key Dependencies

- `next` 16.2.3 (App Router)
- `react` / `react-dom` 19.2.4
- `tailwindcss` v4 with `@tailwindcss/postcss`
- `typescript` v5
