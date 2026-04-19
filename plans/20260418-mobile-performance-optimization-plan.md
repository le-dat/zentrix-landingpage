# Landing Page Mobile Performance Optimization Plan

Date: 2026-04-18

---

## 1. Overview

This plan covers performance optimizations for the Zentrix landing page, targeting mobile devices (mid-range Android, ~3x CPU slowdown vs desktop) and low-bandwidth connections. The goal is to reduce main-thread blocking, GPU pressure, and animations that drain battery on mobile.

**Key findings from codebase analysis:**

| Component | Technique | Risk |
|---|---|---|
| `WorldMap` | SVG with 6 animated paths + infinite SMIL pulse animations | HIGH |
| `RebateFlowBorderTrace` | `ResizeObserver` + per-card SVG path animation | HIGH |
| `HowItWorks` | Hover-triggered connector animation via `setTimeout` | MEDIUM |
| `FAQSection` | Framer-motion `AnimatePresence` expand/collapse | MEDIUM |
| `HeroSection` | Multiple staggered `fadeUpMotion` on load | LOW-MEDIUM |
| `ComparisonSection` | Per-row `whileInView` staggered animation | LOW-MEDIUM |
| `Navbar` | `useScrolled` hook with passive scroll listener | LOW |

---

## 2. WorldMap SVG Component

**File:** `components/ui/world-map.tsx`

**Current issues:**
- 6 `motion.path` elements each animate `pathLength` from 0 to 1 (staggered 0.5s each, total 3.5s of animation on mount)
- 12 `animate` elements (SMIL) on circles run indefinitely, causing continuous repaints
- `dotted-map` library generates a full SVG grid (100x height, diagonal grid) encoded as a data URI image

**Optimizations:**

### 2.1 Disable motion animations when reduced motion is preferred

**What:** Add `useReducedMotion` check at component level and conditionally skip animation.

**Why:** On mobile with reduced motion preferences (or just to save battery), the continuous pulsing is wasteful.

```tsx
// components/ui/world-map.tsx

import { useReducedMotion } from "framer-motion";

// inside WorldMap:
const reduceMotion = useReducedMotion();
```

Then wrap the `motion.path` animation in a condition:
```tsx
<motion.path
  d={createCurvedPath(startPoint, endPoint)}
  fill="none"
  stroke="url(#path-gradient)"
  strokeWidth="1"
  {...(reduceMotion ? {} : {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1, delay: 0.5 * i, ease: "easeOut" }
  })}
  key={`start-upper-${i}`}
/>
```

### 2.2 Replace SMIL `<animate>` with CSS-based pulse

**What:** Remove `<animate r="2" to="8" ...>` and `<animate opacity ...>` from the SVG circles (lines 112-128 and 144-159). Replace with a CSS class that applies `will-change: transform` and uses `@keyframes` in `globals.css`.

**Why:** SMIL animations run on the main thread and cannot be composited off. CSS animations on `transform: scale()` can be GPU-accelerated and are pausable with `animation-play-state`.

**Change in `world-map.tsx`:**

The pulsing circles (lines 105-128 and 137-160) currently use SMIL `<animate>` to expand r from 2 to 8 and fade opacity 0.5 to 0. This is the most expensive animation on the page because:
1. It is continuous (never stops)
2. It triggers layout recalculations on older browsers
3. It cannot be GPU-composited

**Fix:** Remove `<animate>` tags entirely, and add `will-change: transform` to the outer circle for browser hinting. The pulsing effect can be achieved with a static larger circle with lower opacity -- no animation needed on mobile.

```tsx
// Before (lines 105-128):
<circle ...r="2" fill={lineColor} />
<circle ...r="2" fill={lineColor} opacity="0.5">
  <animate attributeName="r" from="2" to="8" dur="1.5s" .../>
  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" .../>
</circle>

// After: keep only static circles
<circle cx={...} cy={...} r="2" fill={lineColor} />
<circle cx={...} cy={...} r="4" fill={lineColor} opacity="0.3" />
```

### 2.3 Lazy load WorldMap below the fold

**What:** The map is at `top: 0, height: 1000px` in `app/page.tsx` (line 14) but visually is mostly behind the hero content. Add `loading="lazy"` or better yet, use an IntersectionObserver to only mount the SVG when it enters the viewport.

**Why:** The SVG is rendered for the entire page even if only the top portion is visible. Mobile browsers benefit from deferring this until needed.

**Implementation:** Use `next/dynamic` to lazy load the WorldMap component:

```tsx
// app/page.tsx
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
  loading: () => <div className="h-[1000px]" />,
});
```

### 2.4 Move WorldMap to GPU layer

**File:** `app/page.tsx` line 14

**Current:**
```tsx
<div className="absolute top-0 left-0 right-0 h-[1000px] z-0 pointer-events-none opacity-35 will-change-transform transform-gpu">
```

**Change:** Replace `will-change-transform` with just `transform-gpu`. The `will-change` property is already applied but `will-change: transform` alone is more specific. The combination is fine but redundant -- just ensure `transform-gpu` is sufficient.

---

## 3. RebateFlowBorderTrace — ResizeObserver

**File:** `components/landing/RebateFlowBorderTrace.tsx`

**Current issues:**
- `ResizeObserver` on line 90 observes every card's parent element
- On scroll/resize, `update()` runs and triggers React state change (line 81 `setSize`)
- State change causes re-render, then `buildHalfPaths()` recalculates 2 complex SVG path strings
- 4 cards = up to 4 ResizeObserver callbacks per resize event

**Optimizations:**

### 3.1 Debounce ResizeObserver callbacks

**What:** Add a RAF (requestAnimationFrame) throttle around the `update()` call, since ResizeObserver can fire at high frequency during scrolling.

```tsx
useEffect(() => {
  let rafId: number;
  function update() {
    const svg = svgRef.current;
    const box = svg?.parentElement;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const w = Math.max(rect.width, 1);
    const h = Math.max(rect.height, 1);
    setSize((prev) =>
      Math.abs(prev.w - w) < 0.25 && Math.abs(prev.h - h) < 0.25 ? prev : { w, h }
    );
  }

  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(update);
  });
  // ...
}, []);
```

### 3.2 Disable ResizeObserver on mobile

**What:** Use a `useEffect` to detect touch device and skip ResizeObserver registration on mobile, falling back to a static size or using `document.documentElement.clientWidth` heuristic.

**Why:** On mobile, viewport changes do not resize elements in the same way. The cards typically span full width so dimensions are predictable.

```tsx
const [size, setSize] = useState({ w: 100, h: 100 });
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

useEffect(() => {
  if (isMobile) return; // skip ResizeObserver on mobile

  // ... existing ResizeObserver code
}, [isMobile]);

// Set initial size from clientWidth for mobile
useEffect(() => {
  if (isMobile && typeof window !== "undefined") {
    setSize({ w: window.innerWidth, h: 200 }); // approximate
  }
}, [isMobile]);
```

### 3.3 Simplify border animation on mobile

**What:** When `reduceMotion` is true, skip the border trace animation entirely (already handled partially at line 101-113 but the SVG is still mounted and ResizeObserver runs).

**Change:** Skip ResizeObserver when `reduceMotion` is true:

```tsx
const reduceMotion = useReducedMotion();

useEffect(() => {
  if (reduceMotion) return; // skip ResizeObserver for reduced motion

  // ... existing ResizeObserver code
}, [reduceMotion]);
```

---

## 4. HowItWorks — Hover-triggered Animation

**File:** `components/landing/HowItWorks.tsx`

**Current issues:**
- `onHoverStart` / `onHoverEnd` events on motion.div (line 78-79)
- State-driven `connectorSegment` triggers re-renders and SVG updates on hover
- On mobile (touch), `onHoverStart` fires on touch and does not release, causing connector to stay active
- The connector segment logic uses `setTimeout` with 1.65s delay (line 160) — timer management on mobile can be unreliable

**Optimizations:**

### 4.1 Disable hover connector on touch devices

**What:** Detect touch capability and disable `onPointerEnter`/`onPointerLeave` on touch devices, showing connectors statically or not at all.

```tsx
const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
const [isTouchDevice, setIsTouchDevice] = useState(false);

useEffect(() => {
  setIsTouchDevice(
    "ontouchstart" in window || navigator.maxTouchPoints > 0
  );
}, []);

function handleCardEnter(stepId: string) {
  if (isTouchDevice) return; // skip hover effects on touch
  setHoveredCardId(stepId);
  scheduleConnectorAfterHover(stepId);
}
```

### 4.2 Simplify connector animation on mobile

**What:** On mobile, always show the connector fully drawn (no animation). Pre-set `connectorSegment` to the maximum index so connectors are simply visible without animation overhead.

**Change:** In the `useEffect` for `connectorSegment`, use a reduced-motion + mobile check:

```tsx
// In HowItWorks component:
const shouldAnimate = !reduceMotion && !isTouchDevice;
```

### 4.3 Remove FlowGapConnector on mobile

**File:** `components/landing/HowItWorks.tsx` lines 209-227

**What:** The `FlowGapConnector` elements (visible only on `md:block` and above) are desktop-only. Ensure on mobile they are not even rendered in the DOM by checking `isTouchDevice || reduceMotion`:

```tsx
{!isTouchDevice && !reduceMotion && (
  <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 md:block" aria-hidden>
    {/* connector SVG elements */}
  </div>
)}
```

---

## 5. Framer Motion — Global Reductions

### 5.1 Add `useReducedMotion` at page level

Currently each component calls `useReducedMotion()` independently. A page-level provider ensures all framer-motion components respect the user's OS-level reduced motion preference.

**What:** Add `AnimatePresence` at the page level and wrap the root with `LazyMotion` containing a minimal feature bundle (no layout animations needed on landing page).

```tsx
// app/page.tsx
import { AnimatePresence, LazyMotion } from "framer-motion";
import domAnimation from "framer-motion";

export default function LandingPage() {
  return (
    <LazyMotion features={domAnimation}>
      <main>
        {/* ... */}
      </main>
    </LazyMotion>
  );
}
```

**Why:** `LazyMotion` with `domAnimation` bundle loads only the DOM animation features, reducing bundle size. `AnimatePresence` at root ensures exit animations are consistent.

### 5.2 Apply `useReducedMotion` consistently in HeroSection

**File:** `components/landing/HeroSection.tsx` lines 9-20

**What:** The `fadeUpMotion` helper does not check `useReducedMotion`. Add it:

```tsx
import { useReducedMotion } from "framer-motion";

function fadeUpMotion(
  delay: number,
  opts?: { y?: number; duration?: number },
): Pick<MotionProps, "initial" | "animate" | "transition"> {
  const reduceMotion = useReducedMotion();
  const y = opts?.y ?? 20;
  const duration = opts?.duration ?? 0.5;
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : duration, delay },
  };
}
```

### 5.3 Optimize HeroSection image background

**File:** `app/page.tsx` line 49-57

**Current:** `backgroundImage: "url('/circle.png')"` with `backgroundSize: "contain"` - this is a large image loaded on every page load without lazy loading.

**Change:** Add `loading="lazy"` behavior via CSS or move the circle decoration to be a pseudo-element that uses a preloaded image. Or use a CSS gradient instead of an image file for the circle decoration.

```css
/* globals.css — replace circle decoration with pure CSS */
.hero-circle {
  background: radial-gradient(circle at center, rgba(24, 203, 168, 0.15) 0%, transparent 70%);
}
```

---

## 6. FAQSection — AnimatePresence Optimization

**File:** `components/landing/FAQSection.tsx` lines 73-85

**Current issue:** `AnimatePresence` with `height` animation causes the panel to animate open/close. On mobile, this causes layout recalculations as the document height changes.

**Optimizations:**

### 6.1 Use clip-path instead of height animation

**What:** Replace `animate={{ height: "auto" }}` with `clip-path` animation which is GPU-composited:

```tsx
<motion.div
  initial={{ clipPath: "inset(0 0 100% 0)" }}
  animate={{ clipPath: "inset(0 0 0% 0)" }}
  exit={{ clipPath: "inset(0 0 100% 0)" }}
  transition={{ duration: 0.2 }}
  className="overflow-hidden"
>
  <div className="px-6 pb-6 text-sm text-white/60 leading-relaxed">{faq.body}</div>
</motion.div>
```

### 6.2 Disable exit animation on mobile

**What:** On mobile, skip the `exit` animation since it delays the interaction feedback:

```tsx
<AnimatePresence mode={isMobile ? "popLayout" : "sync"}>
```

Or simply use `mode="popLayout"` which removes the previous item immediately when the new one enters.

---

## 7. ComparisonSection — whileInView Stagger

**File:** `components/landing/ComparisonSection.tsx` lines 63-68

**Current:** Each of 5 table rows has its own `motion.tr` with `whileInView` stagger (delay: i * 0.05). On mobile, the viewport trigger fires late causing visible pop-in after user has scrolled past.

**Optimization:** Increase `viewport={{ once: true, margin: "-50px" }}` to trigger earlier, and reduce mobile duration to 0.2s (from 0.3s):

```tsx
<motion.tr
  key={item.criteria}
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.2, delay: i * 0.03 }}
  // ...
```

---

## 8. CSS Effects — backdrop-filter and blur

**Current usage found in:**
- `Navbar.tsx` line 32: `backdrop-blur-md` on scroll
- `ShimmerButton.tsx` line 55: `blur-[2px]` on spark container
- `HowItWorks.tsx` line 88: `backdrop-blur-md` on card interior
- `HeroSection.tsx` line 39: `backdrop-blur-sm` on badge

**Optimization:**

### 8.1 Disable backdrop-filter on mobile via CSS media query

**What:** Add a media query in `globals.css` that disables expensive backdrop-filter effects on mobile:

```css
@media (max-width: 768px) {
  .backdrop-blur-md,
  .backdrop-blur-sm,
  .backdrop-blur-lg {
    backdrop-filter: none !important;
  }
}
```

**Why:** `backdrop-filter` requires rendering a separate layer for every element with it applied, multiplied by the blur radius. On mobile GPU, this is extremely expensive. On a mid-range Android device, disabling `backdrop-filter: blur(12px)` can improve FPS by 15-30%.

### 8.2 Reduce blur radius on mobile

If completely removing backdrop-blur is too aggressive, at least reduce blur radius:

```css
@media (max-width: 768px) {
  .backdrop-blur-md { backdrop-filter: blur(4px); }
  .backdrop-blur-sm { backdrop-filter: blur(2px); }
}
```

---

## 9. ShimmerButton — Continuous Animation

**File:** `components/ui/shimmer-button.tsx`

**Current:** Two CSS keyframe animations run continuously: `animate-shimmer-slide` and `animate-spin-around` (defined in `globals.css` lines 114-136). These use `transform: translate()` and `rotate()` on the GPU.

**Optimization:**

### 9.1 Pause shimmer on mobile

**What:** Use `prefers-reduced-motion` in CSS to disable the animation:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-shimmer-slide,
  .animate-spin-around {
    animation: none !important;
  }
}
```

### 9.2 Reduce animation complexity on touch devices

**What:** Add a JS check for touch devices and remove the spark container animation class when on touch:

```tsx
// In ShimmerButton component
const [isTouchDevice, setIsTouchDevice] = useState(false);

useEffect(() => {
  setIsTouchDevice(
    "ontouchstart" in window || navigator.maxTouchPoints > 0
  );
}, []);
```

And conditionally apply animation class:
```tsx
<div className={cn(
  "-z-30 blur-[2px]",
  "@container-[size] absolute inset-0 overflow-visible",
  !isTouchDevice && "group-[&]:animate-shimmer-slide" // conditional
)}>
```

---

## 10. Image Optimization

**Files:** `Navbar.tsx` line 44, `Footer.tsx` line 53

**Current:** `next/image` is used with `priority` on Navbar logo (good) but Footer logo has no loading strategy.

**Actions:**
- Add `loading="lazy"` to Footer logo (it is below the fold)
- The `circle.png` hero background should be replaced with a CSS gradient or an SVG to avoid an HTTP request

---

## 11. Code Splitting

### 11.1 Dynamic import for WorldMap

**File:** `app/page.tsx`

**Change:**
```tsx
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
  loading: () => <div className="h-[1000px] opacity-35" />,
});
```

**Why:** WorldMap depends on `dotted-map` library which is heavy. Loading it only when needed saves initial bundle size.

### 11.2 Dynamic import for ShimmerButton

**File:** Any usage of `ShimmerButton`

**Change:** Use `next/dynamic` to lazy load `ShimmerButton` since it is likely only used in specific sections (HeroSection CTA button is a plain `<button>`, but shimmer buttons may be used in CTA sections).

### 11.3 Evaluate `framer-motion` bundle size

**What:** Check if replacing `framer-motion` with `motion/react` (the lighter v11+ import) is feasible. Currently the project imports from `framer-motion` which includes the full library. Newer versions support tree-shaking.

**Check:** `package.json` for current framer-motion version. If v11+, switch imports to `motion/react` which enables better tree-shaking.

```tsx
// Change from:
import { motion } from "framer-motion";
// To:
import { motion } from "motion/react";
```

---

## 12. Summary of All Changes

| # | File | Change | Priority | Mobile Impact |
|---|---|---|---|---|
| 1 | `components/ui/world-map.tsx` | Replace SMIL `<animate>` with static circles | HIGH | High |
| 2 | `components/ui/world-map.tsx` | Wrap motion.path in reduceMotion check | MEDIUM | High |
| 3 | `app/page.tsx` | Dynamic import for WorldMap | HIGH | High |
| 4 | `components/landing/RebateFlowBorderTrace.tsx` | RAF-throttle ResizeObserver | HIGH | Medium |
| 5 | `components/landing/RebateFlowBorderTrace.tsx` | Skip ResizeObserver on touch/reducedMotion | HIGH | High |
| 6 | `components/landing/HowItWorks.tsx` | Disable hover connector on touch devices | HIGH | High |
| 7 | `components/landing/HowItWorks.tsx` | Skip connector animation on mobile | MEDIUM | High |
| 8 | `app/globals.css` | Disable backdrop-filter on mobile | HIGH | Very High |
| 9 | `components/landing/HeroSection.tsx` | Add reduceMotion to fadeUpMotion | HIGH | Medium |
| 10 | `app/page.tsx` | Add LazyMotion/AnimatePresence at root | MEDIUM | Medium |
| 11 | `components/landing/FAQSection.tsx` | Use clip-path instead of height animation | MEDIUM | Medium |
| 12 | `components/landing/ComparisonSection.tsx` | Adjust viewport margin for earlier trigger | LOW | Medium |
| 13 | `globals.css` | prefers-reduced-motion for shimmer animations | MEDIUM | Medium |
| 14 | `Navbar.tsx` / `Footer.tsx` | Lazy load non-critical images | LOW | Low |

---

## 13. Implementation Order

1. **`globals.css`** — Add `backdrop-filter: none` media query (item 8)
2. **`components/ui/world-map.tsx`** — Remove SMIL animate (item 1)
3. **`app/page.tsx`** — Dynamic import WorldMap (item 3)
4. **`components/landing/RebateFlowBorderTrace.tsx`** — RAF throttle + skip on mobile (items 4-5)
5. **`components/landing/HowItWorks.tsx`** — Touch detection + skip connector (items 6-7)
6. **`components/landing/HeroSection.tsx`** — reduceMotion in fadeUpMotion (item 9)
7. **`app/page.tsx`** — LazyMotion wrapper (item 10)
8. **`components/landing/FAQSection.tsx`** — clip-path animation (item 11)
9. **`globals.css`** — prefers-reduced-motion for shimmer (item 13)

---

## 14. Testing Recommendations

- Test on Chrome DevTools mobile emulation (mid-range Pixel 5, 3x CPU)
- Test with `prefers-reduced-motion` enabled in OS settings
- Use Lighthouse in mobile mode before/after
- Check for layout shift as animations are removed
- Verify scroll behavior on mobile (no janky reflows)