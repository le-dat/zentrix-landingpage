# MagicUI Components Research & Design Inspiration

**Priority Reference:** https://magicui.design/docs/components

**Date:** 2026-04-13
**Project:** Zentrix Landing Page — Navigation & UI Components
**Research Source:** https://magicui.design/docs/components

---

## Overview

MagicUI is a React/TypeScript/Tailwind CSS component library with 50+ production-ready components. Key components for Zentrix navigation and landing page improvements.

---

## Key Components for Zentrix

### 1. AnimatedShinyText

A light glare effect that pans across text, making it appear as if it is shimmering.

**Best for:** Navigation links, hero text, CTA buttons
**Effect:** Subtle shine sweep on hover or continuous animation

```tsx
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"

<AnimatedShinyText shimmerWidth={100}>
  Hello
</AnimatedShinyText>
```

**CSS Animation:**
```css
@theme inline {
  --animate-shiny-text: shiny-text 8s infinite;
}
@keyframes shiny-text {
  0%, 90%, 100% {
    background-position: calc(-100% - var(--shiny-width)) 0;
  }
  30%, 60% {
    background-position: calc(100% + var(--shiny-width)) 0;
  }
}
```

**Zentrix application:**
- Nav links: Lime green shimmer sweep on hover
- Hero headlines: Continuous subtle shimmer
- Works well with dark backgrounds (#0f1619)

---

### 2. ShimmerButton

A button with a shimmering light that travels around the perimeter.

**Best for:** CTA buttons, primary actions
**Effect:** Spark/glint animation around the border

```tsx
import ShimmerButton from "@/components/ui/shimmer-button"

<ShimmerButton
  shimmerColor="#9fe870"
  borderRadius="100px"
  background="rgba(0, 0, 0, 1)"
>
  Get Started
</ShimmerButton>
```

**Props:**
| Prop | Default | Description |
|------|---------|-------------|
| shimmerColor | #ffffff | Color of the shimmer |
| shimmerSize | 0.05em | Size of the shimmer |
| shimmerDuration | 3s | Duration of the animation |
| borderRadius | 100px | Border radius |
| background | rgba(0, 0, 0, 1) | Button background |

**Zentrix application:**
- Lime green shimmer (#9fe870) on dark CTA buttons
- Full pill shape (borderRadius: 100px) matching spec
- Apply to "Get Started" and "Sign Up" buttons

---

### 3. ShinyButton

Similar to ShimmerButton but uses Motion/react for animations and supports both light/dark modes.

**Best for:** More modern button with dynamic shine effect

```tsx
import { ShinyButton } from "@/components/ui/shiny-button"

<ShinyButton>
  Shiny Button
</ShinyButton>
```

**Features:**
- Uses motion/react for smooth animations
- Dark/light mode adaptive
- Mask-based shine effect

---

### 4. BorderBeam (Shine Border)

An animated border effect that simulates a light beam traveling around the edges.

**Best for:** Cards, containers, feature boxes
**Effect:** Glowing border that rotates/pulses

**Implementation pattern:**
```tsx
<div className="relative rounded-xl overflow-hidden">
  <div className="absolute inset-0 rounded-xl [background:conic-gradient(from_var(--angle),theme(colors.transparent),theme(colors.lime.500),theme(colors.transparent)] animate-border-beam" />
  <div className="relative z-10 bg-[#0f1619] rounded-xl p-6">
    Content
  </div>
</div>
```

**Zentrix application:**
- Trust metrics cards: Lime green border beam on hover
- Feature cards: Subtle animated border
- Hero section: Animated border accent

---

### 5. InteractiveHoverButton

A button with interactive hover states and transformations.

**Best for:** Navigation buttons, icon buttons

```tsx
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

<InteractiveHoverButton>
  Hover me
</InteractiveHoverButton>
```

---

### 6. NumberTicker

Animated number counter with smooth transitions.

**Best for:** Trust metrics, statistics display

```tsx
import { NumberTicker } from "@/components/ui/number-ticker"

<NumberTicker
  value={1000}
  duration={2000}
  easing={easeOutExpo}
/>
```

---

### 7. Card Components

#### BentoGrid
A flexible grid layout for feature sections.

#### MagicCard
Cards with animated hover effects.

```tsx
import { MagicCard } from "@/components/ui/magic-card"

<MagicCard>
  Content
</MagicCard>
```

---

## Component Categories from MagicUI

| Category | Components |
|----------|-----------|
| **Buttons** | Ripple Button, Shimmer Button, Rainbow Button, Shiny Button, Interactive Hover Button, Pulsating Button |
| **Backgrounds** | Light Rays, Interactive Grid Pattern, Striped Pattern, Grid Pattern, Dot Pattern, Ripple, Retro Grid |
| **Animations** | Blur Fade, Text Reveal, Animated Gradient Text |
| **Text Animations** | Text Highlighter, Spinning Text, Morphing Text, Sparkles Text, Scroll Velocity, Word Rotate, Hyper Text |
| **Special Effects** | Particles, Confetti, Meteors, Shine Border, Border Beam, Animated Beam |
| **Device Mocks** | Android, iPhone, Safari |

---

## Design Patterns for Zentrix

### Pattern 1: Lime Shimmer Nav Links

Navigation links with a lime green shine sweep on hover:

```css
/* Keyframe for shimmer */
@keyframes shimmer-lime {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.nav-link-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(159, 232, 112, 0.3) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  animation: shimmer-lime 3s ease-in-out infinite;
  animation-play-state: paused;
}

.nav-link-shimmer:hover {
  animation-play-state: running;
}
```

### Pattern 2: Glow Button with Lime Accent

CTA buttons with a soft lime glow on hover:

```css
.btn-glow-lime {
  background: transparent;
  border: 1px solid rgba(159, 232, 112, 0.3);
  transition: all 0.3s ease;
}

.btn-glow-lime:hover {
  border-color: #9fe870;
  box-shadow: 0 0 20px rgba(159, 232, 112, 0.3),
              0 0 40px rgba(159, 232, 112, 0.1);
}
```

### Pattern 3: Animated Border Cards

Cards with lime green animated border beam:

```css
.card-beam {
  position: relative;
}

.card-beam::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--angle, 0deg),
    transparent 0%,
    #9fe870 10%,
    transparent 20%
  );
  animation: border-beam 4s linear infinite paused;
}

.card-beam:hover::before {
  animation-play-state: running;
}

@keyframes border-beam {
  to { --angle: 360deg; }
}
```

---

## Navigation Inspiration from MagicUI Blog

### Modern React Navbar Best Practices

1. **Component Structure:**
   - Semantic `<nav>` element
   - Logo + nav links + CTA button
   - Mobile hamburger menu with overlay

2. **Responsive Approach:**
   - `hidden md:flex` for desktop nav
   - `md:hidden` for mobile hamburger
   - Position fixed overlay for mobile menu

3. **Active State:**
   - Use React state or router NavLink
   - Visual indicator (underline, color change)
   - Accessible focus states

4. **Animation Integration:**
   - AnimatedShinyText for nav links
   - ShimmerButton for CTA
   - Smooth transitions between states

---

## Recommendations for Zentrix Header

### Priority 1: Nav Link Shimmer Effect
- Apply lime green shimmer on hover via AnimatedShinyText approach
- No background change on hover (user preference: light underline look)

### Priority 2: CTA Button Enhancement
- Use ShimmerButton pattern with lime green shimmer
- Full pill shape matching design spec

### Priority 3: Icon Language Switcher
- Replace text "EN | VI" with icon-based switcher
- Globe icon for language
- Subtle hover effect

### Priority 4: Border Beam on Cards
- Apply BorderBeam/ShineBorder to TrustMetrics cards
- Lime green animated border on hover

---

## Files to Update

| File | Changes |
|------|---------|
| `src/components/Header.astro` | Nav link shimmer effect, CTA shimmer button, icon language switcher |
| `src/components/TrustMetrics.astro` | BorderBeam hover effect on cards |
| `src/styles/global.css` | Add shimmer keyframes, border-beam animations |

---

## References

- MagicUI Docs: https://magicui.design/docs/components
- React Navbar Guide: https://magicui.design/blog/react-js-navbar
- AnimatedShinyText: https://magicui.design/docs/components/animated-shiny-text
- ShimmerButton: https://magicui.design/docs/components/shimmer-button
- ShineBorder PR: https://github.com/magicuidesign/magicui/pull/94
