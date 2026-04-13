# Design System — Zentrix Brand

## 1. Visual Theme & Atmosphere

Zentrix is a fintech rebate platform that communicates trust, transparency, and modern professionalism. The design features a dark, sophisticated palette with a signature teal-mint accent — fresh and optimistic, unlike the corporate blues of traditional banking.

The logo features a teal mark (`#18CBA8`) on a dark background (`#146255`), with clean white text. This teal-on-dark identity carries through CTAs and accent elements.

**Key Characteristics:**
- Teal (`#18CBA8`) accent on dark surfaces — signature brand color
- Black (`#0a0a0a`) for header/nav — premium fintech feel
- Mint (`#29FFB5`) highlight for additional accent elements
- White (`#ffffff`) text on dark backgrounds — high contrast readability
- Scale(1.05) hover animations — buttons physically grow
- Pill buttons (9999px radius) and rounded cards (16px–40px)
- Inter font family with weight 600 as default for body

## 2. Color Palette & Roles

### Primary Brand (from logo)
- **Teal** (`#18CBA8`): Logo mark, primary CTA, brand accent
- **Dark Teal** (`#146255`): Header background, logo icon background, dark sections
- **Mint** (`#29FFB5`): Highlight accent, secondary CTAs, hover states
- **White** (`#ffffff`): Logo text, primary text on dark, high contrast elements

### Supporting Colors
- **Navy** (`#1E3A5F`): Alternative dark accent (used sparingly)
- **Teal Dark** (`#0d3d34`): Text on teal buttons/CTA for readability
- **Surface** (`#F4F4F4`): Light section backgrounds
- **Gray** (`#868685`): Muted text, secondary information

### Semantic
- **Positive Teal** (`#0d3d34`): Success states, confirmations
- **Danger Red** (`#d03238`): Error/destructive states
- **Warning Amber** (`#B07000`): Warnings, attention states

## 3. Typography Rules

### Font Families
- **Display**: `Wise Sans`, fallback: `Inter` — OpenType `"calt"` on all text
- **Body / UI**: `Inter`, fallbacks: `Helvetica, Arial`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Mega | Wise Sans | 126px (7.88rem) | 900 | 0.85 (ultra-tight) | normal | `"calt"` |
| Display Hero | Wise Sans | 96px (6.00rem) | 900 | 0.85 | normal | `"calt"` |
| Section Heading | Wise Sans | 64px (4.00rem) | 900 | 0.85 | normal | `"calt"` |
| Sub-heading | Wise Sans | 40px (2.50rem) | 900 | 0.85 | normal | `"calt"` |
| Alt Heading | Inter | 78px (4.88rem) | 600 | 1.10 (tight) | -2.34px | `"calt"` |
| Card Title | Inter | 26px (1.62rem) | 600 | 1.23 (tight) | -0.39px | `"calt"` |
| Feature Title | Inter | 22px (1.38rem) | 600 | 1.25 (tight) | -0.396px | `"calt"` |
| Body | Inter | 18px (1.13rem) | 400 | 1.44 | 0.18px | `"calt"` |
| Body Semibold | Inter | 18px (1.13rem) | 600 | 1.44 | -0.108px | `"calt"` |
| Button | Inter | 18px–22px | 600 | 1.00–1.44 | -0.108px | `"calt"` |
| Caption | Inter | 14px (0.88rem) | 400–600 | 1.50–1.86 | -0.084px to -0.108px | `"calt"` |
| Small | Inter | 12px (0.75rem) | 400–600 | 1.00–2.17 | -0.084px to -0.108px | `"calt"` |

### Principles
- **Weight 900 as identity**: Wise Sans Black (900) is used exclusively for display — the heaviest weight in any analyzed system. It creates text that feels stamped, pressed, physical.
- **0.85 line-height**: The tightest display line-height analyzed. Letters overlap vertically, creating dense, billboard-like text blocks.
- **"calt" everywhere**: Contextual alternates enabled on ALL text — both Wise Sans and Inter.
- **Weight 600 as body default**: Inter Semibold is the standard reading weight — confident, not light.

## 4. Component Stylings

### Buttons

**Primary Teal Pill (CTA)**
- Background: `#18CBA8` (Teal)
- Text: `#0d3d34` (Teal Dark — for readability on teal)
- Padding: 10px 20px
- Radius: 9999px (pill)
- Min height: 44px (touch-friendly)
- Hover: scale(1.05) — button physically grows
- Active: scale(0.95) — button compresses
- Focus: ring outline

**Secondary Pill (Nav/UI)**
- Background: transparent
- Text: White `rgba(255,255,255,0.85)`
- Hover: `rgba(41,255,181,0.4)` mint-tinted background, rounded-full
- Padding: 8px 16px
- Radius: 9999px
- Same scale hover/active behavior

### Cards & Containers
- Radius: 16px (small), 30px (medium), 40px (large cards/tables)
- Border: `1px solid rgba(255,255,255,0.1)` for dark cards
- Shadow: Minimal — ring shadows only on light surfaces

### Navigation
- Header background: `#0a0a0a` (Premium Black)
- Nav link hover: `rgba(41,255,181,0.4)` mint-tinted background
- Clean header with Zentrix logo (left)
- Pill CTAs right-aligned

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 1px, 2px, 3px, 4px, 5px, 8px, 10px, 11px, 12px, 16px, 18px, 19px, 20px, 22px, 24px

### Border Radius Scale
- Minimal (2px): Links, inputs
- Standard (10px): Comboboxes, inputs
- Card (16px): Small cards, buttons, radio
- Medium (20px): Links, medium cards
- Large (30px): Feature cards
- Section (40px): Tables, large cards
- Mega (1000px): Presentation elements
- Pill (9999px): All buttons, images
- Circle (50%): Icons, badges

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow | Default |
| Ring (Level 1) | `rgba(14,15,12,0.12) 0px 0px 0px 1px` | Card borders |
| Inset (Level 2) | `rgb(134,134,133) 0px 0px 0px 1px inset` | Input focus |

**Shadow Philosophy**: Wise uses minimal shadows — ring shadows only. Depth comes from the bold green accent against the neutral canvas.

## 7. Do's and Don'ts

### Do
- Use Teal (`#18CBA8`) for CTAs and accent elements
- Use Black (`#0a0a0a`) for header and dark sections
- Use Mint (`#29FFB5`) for highlights and secondary accents
- Apply scale(1.05) hover and scale(0.95) active on buttons
- Use pill shape (9999px radius) for buttons and nav items
- Use Inter weight 600 as the body default
- Ensure 44px minimum touch targets

### Don't
- Don't use light font weights for display headings — use 700-800 for bold impact
- Don't use the Teal as background for large surfaces — it's for accents and CTAs
- Don't skip the scale animation on buttons
- Don't use heavy shadows — prefer border-based separation
- Don't use the old navy `#1E3A5F` for main branding — the header uses `#0a0a0a`

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <576px | Single column |
| Tablet | 576–992px | 2-column |
| Desktop | 992–1440px | Full layout |
| Large | >1440px | Expanded |

## 9. Agent Prompt Guide

### Quick Color Reference (from logo)
- Teal: `#18CBA8` — logo mark, CTAs, accents
- Dark Teal: `#146255` — header, logo background, dark sections
- Mint: `#29FFB5` — highlights, secondary accents
- White: `#ffffff` — text on dark, logo text
- Button text on teal: `#0d3d34`
- Surface (light): `#F4F4F4`
- Gray: `#868685`

### Example Component Prompts
- "Create hero: dark background (#146255). Headline in white, Inter 700 weight. Teal pill CTA (#18CBA8, 9999px radius, 10px 20px padding, #0d3d34 text). Hover: scale(1.05)."
- "Build a card: 30px radius, border rgba(255,255,255,0.1). Title at 22px Inter weight 600, body at 18px weight 400."

### Iteration Guide
1. Wise Sans 900 at 0.85 line-height — the extreme weight IS the brand
2. Lime Green for buttons only — dark green text on green background
3. Scale animations (1.05 hover, 0.95 active) on all interactive elements
4. "calt" on everything — contextual alternates are mandatory
5. Inter 600 for body — confident reading weight
