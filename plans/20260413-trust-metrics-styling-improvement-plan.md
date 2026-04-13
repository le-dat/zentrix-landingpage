# TrustMetrics.astro Styling Improvement Plan

**Date:** April 13, 2026
**Component:** `/src/components/TrustMetrics.astro`
**Status:** Research Complete - Planning

---

## 1. Overview

This plan outlines specific design improvements for the Trust Metrics section (LP-02) of the Zentrix landing page. The goal is to enhance visual appeal, improve animation smoothness, and better communicate trust signals inspired by Wise/Revolut's fintech design patterns.

---

## 2. Current Implementation Analysis

### What's Working Well
- 4-card grid layout with responsive breakpoints
- Intersection Observer for scroll-triggered animations
- Hover effects with ambient glow and gradient border
- `prefers-reduced-motion` and touch-device handling
- Tabular-nums for number alignment
- Data attributes for target values

### Areas for Improvement
1. **Number formatting** - Numbers display as "8.7M" rather than "$8.7M" for Total Volume due to formatNumber logic stripping prefix
2. **Animation smoothness** - Current ease-out-cubic is decent but can be improved with spring physics
3. **Visual hierarchy** - Cards lack clear visual grouping or connective tissue between metrics
4. **Icon containers** - Rounded squares are generic; fintech platforms use more distinctive icon treatments
5. **Card interiors** - Too much symmetry; Wise/Revolut use more editorial spacing
6. **Trust signals** - Missing subtle "verified" or "live" indicators common in fintech

---

## 3. Research Findings

### A. Wise-Style Trust Metrics
Wise displays metrics with:
- Massive, bold numbers (80px+)
- Minimal labels below
- Editorial whitespace
- Subtle supporting context
- No decorative cards - just clean typography on background

### B. Animated Counter Best Practices
From StackOverflow/CSS-Tricks research:
- **requestAnimationFrame** is the correct approach (not setInterval)
- **Ease-out cubic** (`1 - Math.pow(1 - progress, 3)`) is good
- **Duration should be constant** (2000-2500ms) regardless of target value
- **Stagger animations** by 100-150ms between cards for visual rhythm
- Consider **spring physics** for more premium feel

### C. Card Hover Effects (Fintech Style)
- Revolut uses: subtle scale (1.02), soft shadow lift, gentle border glow
- Avoid: aggressive shadows, large transforms, flashy effects
- Best: `transform: translateY(-2px) scale(1.01)` with `box-shadow` transition

### D. Color for Trust
- Lime green `#9fe870` signals: growth, money, success, transparency
- Dark navy `#0f1619` signals: stability, professionalism, trust
- Light gray `#F4F4F4` signals: cleanliness, openness
- Trust indicators: subtle "live" pulsing dots, verification badges

---

## 4. Proposed Design Decisions

### 4.1 Typography & Number Display

| Element | Current | Proposed |
|---------|---------|----------|
| Number size | 3xl-5xl (responsive) | 4xl-6xl (more impact) |
| Font weight | Bold (700) | Extra Bold (800) |
| Number color | Gradient text (#0f1619 to #1a2a3a) | Solid dark #0f1619 |
| Label | 1 line, muted | May add 1-line context below |

**Number formatting fix:**
```javascript
// Current (broken for decimals):
if (num >= 1000000) {
  return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
}

// Better approach - preserve prefix in final output:
const formatted = prefix + formatNumber(currentValue) + suffix;
// where formatNumber returns only the numeric string
```

### 4.2 Card Design

**Current:**
- `rounded-[30px]` corners
- Ambient glow on hover (top-right)
- Gradient border on hover (::before pseudo-element)
- Icon in rounded square container

**Proposed improvements:**

1. **Subtle live indicator** - Small pulsing green dot on "Active Traders" card to indicate real-time count
2. **Better icon treatment** - Replace rounded square with circle or pill-shaped container
3. **Gradient accent line** - Add subtle lime green top border (2px) to each card
4. **Micro-badge** - Add "verified" or "+" indicator for "Integrated Brokers"

**Card CSS (proposed):**
```css
.metric-card {
  border-top: 2px solid transparent;
  border-top-color: transparent;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.metric-card:hover {
  border-top-color: #9fe870;
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 12px 32px rgba(159, 232, 112, 0.08);
}
```

### 4.3 Animation Improvements

**Current animation:**
```javascript
const easeOut = 1 - Math.pow(1 - progress, 3);
```

**Proposed (spring-like):**
```javascript
// Spring physics approximation for smoother feel
const easeOutSpring = (t) => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0 ? 0 : t === 1 ? 1 :
    Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

// OR use ease-out-expo for fintech feel:
const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
```

**Staggered animation trigger:**
```javascript
// Add 100ms delay between each card
const delay = index * 100;
setTimeout(() => animateValue(...), delay);
```

### 4.4 Visual Enhancements

1. **Subtle background texture** - Already has grid pattern (good), keep but reduce opacity to 0.02

2. **Card connector** - Consider subtle dotted line or shared background gradient connecting cards visually

3. **Icon enhancements:**
   - Use Lucide icons (cleaner than Heroicons for fintech)
   - Circle container with lime green stroke instead of fill
   - Or: pill-shaped container with gradient fill

4. **Trust micro-signals:**
   - "Live" badge for active trader count (pulsing dot)
   - "+" indicator for broker count
   - Shield icon enhancement for rebates paid

---

## 5. Implementation Steps

### Step 1: Fix Number Formatting
**File:** `/src/components/TrustMetrics.astro`
**Location:** JavaScript `formatNumber` function

Change the formatNumber function to only return the numeric string without prefix/suffix:

```javascript
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
};
```

The prefix ("$") and suffix ("+") should be concatenated in the final output, not inside formatNumber.

### Step 2: Improve Card Design
**File:** `/src/components/TrustMetrics.astro`
**Location:** HTML `.metric-card` elements

Add a top border accent:

```html
<div class="metric-card bg-white rounded-[30px] p-6 md:p-8 text-center relative overflow-hidden group border-t-2 border-t-transparent hover:border-t-[#9fe870]">
```

Or add via CSS:
```css
.metric-card {
  border-top: 2px solid #9fe870;
  border-top-color: transparent;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.metric-card:hover {
  border-top-color: #9fe870;
}
```

### Step 3: Upgrade Animation
**File:** `/src/components/TrustMetrics.astro`
**Location:** JavaScript section

Replace ease-out-cubic with ease-out-expo:

```javascript
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};
```

Add stagger:

```javascript
const animateValue = (el: HTMLElement, target: number, prefix: string = '', suffix: string = '', duration: number = 2000, delay: number = 0) => {
  // ... existing code
  const update = (currentTime: number) => {
    const adjustedStart = startTime + delay;
    const elapsed = currentTime - adjustedStart;
    // ...
  };
};
```

Then update the observer:
```javascript
document.querySelectorAll('.metric-card').forEach((card, index) => {
  observer.observe(card);
  // Pass index for stagger delay
});
```

### Step 4: Add Trust Micro-Signals
**File:** `/src/components/TrustMetrics.astro`

For "Active Traders" card, add a pulsing live indicator:

```html
<div class="flex items-center justify-center gap-2">
  <div class="metric-value" data-animate="true">0+</div>
  <span class="relative flex h-2 w-2">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9fe870] opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-[#9fe870]"></span>
  </span>
</div>
```

### Step 5: Refine Icon Treatment
**File:** `/src/components/TrustMetrics.astro`

Replace rounded-square icon containers with pill/circle variants:

```html
<!-- Option: Circle with lime stroke -->
<div class="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-[#9fe870]/30 flex items-center justify-center">
  <svg class="w-6 h-6 text-[#9fe870]" ...></svg>
</div>
```

### Step 6: Update Hover Effects
**File:** `/src/components/TrustMetrics.astro`
**Location:** `<style>` section

```css
.metric-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 40px rgba(159, 232, 112, 0.1);
}

.metric-card:active {
  transform: translateY(-1px) scale(0.99);
  transition-duration: 0.1s;
}
```

### Step 7: Ensure Mobile Optimization
**File:** `/src/components/TrustMetrics.astro`

Add specific mobile overrides:
```css
@media (max-width: 768px) {
  .metric-card {
    padding: 1.25rem;
  }

  .metric-card:hover {
    transform: none; /* Disable hover transform on touch */
  }

  .metric-card:active {
    transform: scale(0.98);
  }
}
```

---

## 6. Testing Checklist

- [ ] Numbers display correctly with prefix/suffix ($8.7M, 2.8K+, 12, $1.2M+)
- [ ] Animations trigger on scroll into viewport
- [ ] Animations are staggered (100ms between cards)
- [ ] Animation completes in ~2 seconds
- [ ] Hover effects work on desktop (scale, shadow, border)
- [ ] Mobile touch devices show scale feedback on tap
- [ ] `prefers-reduced-motion` users see instant numbers, no animations
- [ ] No layout shift during animation
- [ ] All 4 metrics visible without scrolling on mobile (320px+)
- [ ] Lighthouse performance score maintained (>90)

---

## 7. File Changes Summary

| File | Changes |
|------|---------|
| `/src/components/TrustMetrics.astro` | HTML structure, CSS styles, JavaScript animation logic |

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Animation timing feels "floaty" | Use ease-out-expo instead of spring; tune duration to 2000ms |
| Mobile hover effects cause confusion | Use `@media (hover: none)` to disable hover transforms |
| Reduced motion still shows animation | Ensure `@media (prefers-reduced-motion: reduce)` sets animation duration to 0 |
| Large numbers (8.7M) cause overflow | Test with max-width and responsive font sizing |

---

## 9. Additional Considerations

### Future Enhancement (Out of Scope)
- Real-time WebSocket updates for "Live" metrics
- Animated odometer-style number rolls (Wise-style)
- Confetti or subtle celebration animation on first view
- Video background instead of grid pattern

### References
- [Wise Mission Page](https://wise.com/our-mission) - Clean metric display
- [CSS-Tricks: Animating Number Counters](https://css-tricks.com/animating-number-counters/) - Animation patterns
- [Revolut/N26 Design Analysis](https://valmax.agency/insights/designing-for-trust-what-fintech-websites-get-right-and-why-it-matters/) - Trust design principles
