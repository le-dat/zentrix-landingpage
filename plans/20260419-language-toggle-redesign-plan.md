# Language Toggle Redesign Plan

**Date:** 2026-04-19
**Status:** Research Complete - Awaiting Implementation
**Branch:** `feat/mobile-responsive-md-prefix`

---

## 1. Overview

Redesign the language toggle UI in `LanguageToggle` (and the Navbar if it has its own switcher) to replace country flag emoji icons (`🇬🇧` / `🇻🇳`) with plain text characters (`EN` / `VI`) styled like a native OS/browser system language switcher.

**Current behavior:** Pill-shaped toggle with emoji flags + text labels, sliding emerald-green indicator.
**Target behavior:** Same sliding-pill mechanic, but text-only "EN"/"VI" with OS-native styling.

---

## 2. Requirements Analysis

### 2.1 Should the text be UPPERCASE ("EN"/"VI") or Title Case ("En"/"Vi")?

**Recommendation: UPPERCASE**

- System language pickers on macOS, Windows, iOS, and Android all use **UPPERCASE** for language codes in compact UI (e.g., macOS menu bar shows "EN", "VI", "DE").
- UPPERCASE reads clearly at small sizes (the toggle is only 120px wide with ~56px per segment).
- The current implementation already uses `uppercase` in the text: `<span className="text-xs font-medium uppercase">EN</span>` — this is the correct precedent.

**Decision:** Keep `uppercase` text. Do not change to title case.

---

### 2.2 What font styling matches a "browser/OS window" aesthetic?

**Recommendation:**

| Property         | Value                                                                  | Rationale                                                                   |
| ---------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `font-family`    | `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Native OS rendering; avoids loading a custom font for a single tiny element |
| `font-size`      | `11px` or `12px`                                                       | Compact; similar to OS system labels                                        |
| `font-weight`    | `500` (medium) for active, `400` (normal) for inactive                 | Active segment is emphasized                                                |
| `letter-spacing` | `0.02em` to `0.05em`                                                   | Slight tracking for readability — system UI standard                        |
| `text-transform` | `uppercase`                                                            | Already in use; keep it                                                     |

**Tailwind classes:**

```
text-[11px] font-medium tracking-wide
```

Or for the active emphasis:

```
text-[11px] font-semibold tracking-wide
```

**Note on the project font:** `globals.css` defines `--font-sans: var(--font-inter)` via Next.js. Using `system-ui` here is appropriate because:

1. It is a tiny floating utility control — system-ui renders faster and fits the OS-native goal
2. Inter (loaded via Google Fonts) is the brand font for content, not system chrome

---

### 2.3 Should flag emojis be completely removed, or is there a hybrid approach?

**Recommendation: Complete removal of emoji flags**

Rationale:

- The Smashing Magazine article on language selector UX explicitly warns against conflating flags with languages (flags = countries, not languages — e.g., 🇬🇧 means United Kingdom, not English language).
- Emoji rendering is inconsistent across platforms (iOS renders flags differently from Android/Windows).
- The task requirement is a "browser/OS window system language switcher" aesthetic — OS native pickers do not use emoji flags for language selection.
- The existing sliding-pill indicator already provides sufficient visual affordance for which locale is active; the emoji is redundant.
- Removing the emoji reduces visual clutter and allows the text to stand alone crisply at small sizes.

**Decision:** Remove flags entirely. Text-only.

---

### 2.4 How should active/inactive states look in terms of text color, weight, and opacity?

**Current implementation:**

- Active: `text-emerald-400`
- Inactive: `text-white/50`

**Proposed refinements:**

| State                        | Color                    | Weight                | Opacity/Effect                                                      |
| ---------------------------- | ------------------------ | --------------------- | ------------------------------------------------------------------- |
| Active (selected locale)     | White or white/off-white | `font-semibold` (600) | Full opacity                                                        |
| Inactive (unselected locale) | `white/60` or `white/50` | `font-normal` (400)   | Reduced opacity gives clear "inactive" signal without being too dim |

**Tailwind classes per segment:**

```tsx
// Active segment
"text-white font-semibold tracking-wide";

// Inactive segment
"text-white/50 font-normal tracking-wide";
```

**Pill indicator:** Keep the existing emerald-tinted pill (`bg-emerald-500/20`) but consider:

- Making it slightly more opaque (`bg-emerald-500/30`) for a more decisive highlight
- OR using a plain white/light pill with a subtle glow to feel more "system chrome"

The current `bg-emerald-500/20` is very subtle. A system-style toggle often uses a solid-feeling active indicator.

---

### 2.5 Should there be additional polish like a subtle background on the active state, or system-like caption styling?

**Recommended polish:**

1. **Subtle background on the active text segment (inside the pill):** The sliding pill itself already serves as the active indicator. No additional background per segment is needed — the pill IS the active background.

2. **System-like caption styling:** The text should feel like a macOS/Windows system label:
   - Small, slightly tracked, medium weight
   - No drop shadow, no glow (too decorative)
   - Rounded corners on the container (`rounded-full` is already in use — correct)

3. **Container styling refinements:**
   - Keep `border border-white/10` — gives a subtle "window chrome" frame
   - Keep `bg-black/40 backdrop-blur-lg` — correctly conveys "floating UI element"
   - Keep `shadow-lg` — adequate depth
   - Optional: Add a very subtle inner highlight on the top edge to simulate the system UI gloss: `shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`

4. **Width adjustment:** The current width is `w-[120px]`. Text-only content could comfortably shrink to `w-[100px]` or stay at `120px` for generous padding. Recommend keeping `w-[120px]` or `w-[110px]` for comfortable tap targets.

---

## 3. Component-Specific Design Specs

### 3.1 LanguageToggle

**File:** `components/ui/LanguageToggle.tsx`

**Current structure:**

```tsx
<button className="fixed bottom-6 left-6 z-50 flex items-center h-10 w-[120px] rounded-full border border-white/10 bg-black/40 backdrop-blur-lg ...">
  {/* Sliding pill */}
  <div className="absolute top-1 bottom-1 w-[56px] rounded-full bg-emerald-500/20 transition-transform ..." />

  {/* EN segment */}
  <div className="relative z-10 flex-1 flex items-center justify-center gap-1.5 h-full ...">
    <span className="text-sm">🇬🇧</span>
    <span className="text-xs font-medium uppercase">EN</span>
  </div>

  {/* VI segment */}
  <div className="relative z-10 flex-1 flex items-center justify-center gap-1.5 h-full ...">
    <span className="text-sm">🇻🇳</span>
    <span className="text-xs font-medium uppercase">VI</span>
  </div>
</button>
```

**Target structure (text-only):**

```tsx
<button className="fixed bottom-6 left-6 z-50 flex items-center h-10 w-[120px] rounded-full border border-white/10 bg-black/40 backdrop-blur-lg ...">
  {/* Sliding pill — slightly more visible */}
  <div className="absolute top-1 bottom-1 w-[56px] rounded-full bg-emerald-500/30 transition-transform duration-200" />

  {/* EN segment */}
  <div
    className={cn(
      "relative z-10 flex-1 flex items-center justify-center h-full transition-colors duration-200",
      locale === "en"
        ? "text-white font-semibold tracking-wide"
        : "text-white/50 font-normal tracking-wide",
    )}
  >
    <span className="text-[11px]">EN</span>
  </div>

  {/* VI segment */}
  <div
    className={cn(
      "relative z-10 flex-1 flex items-center justify-center h-full transition-colors duration-200",
      locale === "vi"
        ? "text-white font-semibold tracking-wide"
        : "text-white/50 font-normal tracking-wide",
    )}
  >
    <span className="text-[11px]">VI</span>
  </div>
</button>
```

**Key changes:**

1. Remove the `<span>🇬🇧</span>` and `<span>🇻🇳</span>` elements entirely
2. Remove `gap-1.5` from flex containers (no emoji gap needed)
3. Use `text-[11px]` instead of `text-xs` for precise control
4. Apply `tracking-wide` (Tailwind's `letter-spacing: 0.025em`) for system label feel
5. Active text: `text-white font-semibold`; Inactive: `text-white/50 font-normal`
6. Pill: `bg-emerald-500/30` (slightly more visible than `bg-emerald-500/20`)

---

### 3.2 Navbar Language Switcher

**File:** `components/landing/Navbar/index.tsx`

**Finding:** The Navbar (`Navbar/index.tsx`) does NOT have its own language switcher. It only renders navigation links and a CTA button. The language toggle is exclusively in `LanguageToggle`.

**Implication:** Only `LanguageToggle` needs to be updated. The Navbar requires no changes for this task.

---

### 3.3 Shared LanguageContext

**File:** `context/LanguageContext.tsx`

No changes needed. The context correctly manages `locale` ("en"/"vi") and `setLocale`. The redesign is purely visual.

---

## 4. Implementation Checklist

- [ ] **LanguageToggle.tsx** — Remove emoji flag spans
- [ ] **LanguageToggle.tsx** — Remove `gap-1.5` from segment containers
- [ ] **LanguageToggle.tsx** — Update text styling to `text-[11px] font-semibold/normal tracking-wide`
- [ ] **LanguageToggle.tsx** — Update active/inactive color classes
- [ ] **LanguageToggle.tsx** — Increase pill opacity to `bg-emerald-500/30`
- [ ] **LanguageToggle.tsx** — Verify pill `translate-x` positions still align correctly (2px left, 60px right for 56px pill + 2px offset on 120px container)
- [ ] **Navbar/index.tsx** — Verify no changes needed (already confirmed no language switcher present)

---

## 5. Pill Position Calculations (Verification)

Container: `w-[120px]` = 120px
Sliding pill: `w-[56px]` = 56px
Gap between segments: full width - 56px - 56px = 8px total (4px per side)
Pill position formula (from current code):

```tsx
// locale === "vi" ? "translate-x-[60px]" : "translate-x-[2px]"
// 60px = 2px (left inset from rounded-full border) + 56px (pill width) + 2px (right offset)
// 2px  = 2px (left inset from rounded-full border)
```

This math is correct and should remain unchanged.

---

## 6. Accessibility Considerations

- `aria-label="Toggle language"` is already present — keep it
- Consider adding `aria-pressed` to each segment to indicate active state:

```tsx
<div role="radio" aria-checked={locale === "en"} aria-label="English" className="...">
  EN
</div>
```

The button itself can remain the primary interactive element with `aria-pressed` on each segment for screen reader parity.

---

## 7. Alternative: Hybrid Option (For Future Consideration)

If stakeholders want to retain some visual language identity, a hybrid approach could use:

- Small monochrome SVG flag icons (line-drawn, ~12x12px) next to the text
- This is strictly inferior to text-only for the OS-chrome aesthetic goal, but noted for completeness

This plan recommends the pure text approach.

---

## 8. Files Referenced

| File                                  | Purpose                                          |
| ------------------------------------- | ------------------------------------------------ |
| `components/ui/LanguageToggle.tsx`    | Main toggle component — needs redesign           |
| `components/landing/Navbar/index.tsx` | No language switcher present — no changes needed |
| `context/LanguageContext.tsx`         | Shared state — no changes needed                 |
| `lib/utils.ts`                        | `cn()` utility — no changes needed               |
| `app/globals.css`                     | Design tokens — no changes needed                |
