# Language Context Provider Research and Planning

**Date:** 2026-04-19
**Project:** Zentrix Landing Page
**Goal:** Research and plan a language context provider for English (eng) and Vietnamese (vi)

---

## Executive Summary

This landing page currently uses hardcoded English strings in data files. The project requires a language switching mechanism that supports English and Vietnamese. Based on research, I recommend **Option B: Context-based i18n with JSON translation files** for this specific project, with a hybrid approach that leverages Next.js App Router conventions.

---

## 1. Translation Strategy Options

### Option A: next-intl Library

**Pros:**
- First-class Next.js App Router support
- Built-in locale routing (`/[locale]/page.tsx`)
- Server Components native support
- Excellent TypeScript integration
- Handles `generateStaticParams` for static generation automatically
- Built-in locale detection from headers, cookies, domains

**Cons:**
- Requires structural changes to App Router (locale in URL or middleware)
- Additional dependency
- More complex setup for simple needs
- Configuration in multiple files (`next.config.ts`, `i18n/request.ts`)

**Example Setup:**
```tsx
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  return {
    locale: locale || 'en',
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

### Option B: Context-based i18n with JSON Files (Recommended)

**Pros:**
- Simple implementation following existing ModalContext pattern
- No URL structure changes required
- Client-side switching without middleware
- Easy to understand and maintain
- Works with existing component architecture
- Lower complexity for a landing page

**Cons:**
- Not SEO-friendly (locale not in URL)
- Requires hydration handling
- Locale preference not shareable via URL
- No server-side locale detection

**Architecture:**
```tsx
// context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Locale } from "@/types";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const t = useCallback((key: string): string => {
    // Translation lookup logic
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

### Option C: react-i18next

**Pros:**
- Industry standard (most popular i18n library)
- Rich feature set (plurals, nesting, interpolation)
- Extensive ecosystem and tooling
- Good for complex translation needs

**Cons:**
- SSR/hydration complexity requiring `i18next-react` or custom server config
- Larger bundle size
- Overkill for simple landing page
- Requires `useTranslation` hook in every component

### Option D: Inline Translations with useState

**Pros:**
- Zero dependencies
- Simple implementation
- No async loading complexity

**Cons:**
- Bloats component code with translation keys
- Hard to maintain at scale
- No separation of concerns
- Translation files are the standard practice for a reason

---

## 2. Context Provider Architecture vs URL-based Locale Routing

### URL-based Routing (next-intl default)

**Characteristics:**
- Locale encoded in URL: `/en/about`, `/vi/about`
- Requires `app/[locale]/` folder structure
- SEO friendly
- Shareable links with language preserved
- Browser back/forward works correctly

**Implementation Impact:**
```
app/
  [locale]/
    page.tsx
    layout.tsx
  layout.tsx (redirect logic)
middleware.ts (locale detection)
```

### Context-based (Recommended for this project)

**Characteristics:**
- Language state in React Context
- URL remains unchanged
- Simpler structure, no middleware needed
- Good for landing pages where SEO is handled by default locale

**Implementation Impact:**
```
context/
  LanguageContext.tsx
messages/
  en.json
  vi.json
app/
  layout.tsx (wraps with LanguageProvider)
components/ (use t() from context)
```

### Why Context-based is Better for This Project

1. **Landing Page with Single Page Focus:** This is a marketing landing page, not a multi-page app. SEO for English is likely the primary concern.

2. **Existing Architecture:** The app uses client components with data files. Adding a translation context follows the same pattern as `ModalContext`.

3. **Simpler Migration Path:** No structural changes to `app/` directory, no middleware, no `generateStaticParams` needed.

4. **User Preference Storage:** Can still persist preference via localStorage for user convenience.

---

## 3. Translation File Structure

### Recommended Structure

```
messages/
  en.json
  vi.json
```

### Example Translation Files

**messages/en.json:**
```json
{
  "common": {
    "getStarted": "Get started",
    "learnMore": "Learn more"
  },
  "nav": {
    "howItWorks": "How It Works",
    "compare": "Compare",
    "faq": "FAQ"
  },
  "hero": {
    "badge": "REBATES",
    "subtitle": "On-chain transparent · No hidden intermediaries",
    "title1": "Fee Cashback Platform",
    "title2": "Up to 95% Trading Fee Rebates",
    "description": "Zentrix standardizes the rebate flow from your broker directly to your wallet.",
    "cta": "Get started"
  },
  "howItWorks": {
    "title": "How It Works",
    "steps": [
      { "title": "Your broker", "description": "MT4 / MT5 volume feeds the rebate pool." },
      { "title": "Zentrix Engine", "description": "Tracks volume and credits your on-chain balance." },
      { "title": "On-chain pool", "description": "BEP20 pool — balances and claims are verifiable." },
      { "title": "Your wallet", "description": "Withdraw rebates whenever you want." }
    ]
  },
  "faq": {
    "title": "Frequently asked questions",
    "description": "Everything you need to know about rebates, fees, and how Zentrix stays transparent.",
    "items": [
      { "title": "What is a rebate and where does it come from?", "body": "It's basically cashback on your trading fees..." },
      ...
    ]
  },
  "footer": {
    "resources": "Resources",
    "legal": "Legal",
    ...
  }
}
```

### Namespace Organization

For a landing page of this size, a **flat structure by page section** (as shown above) works well:

- `common` - shared strings
- `nav` - navigation strings
- `hero` - hero section
- `howItWorks` - how it works section
- `comparison` - comparison table
- `trustTrader` - trust trader section
- `faq` - FAQ section
- `footer` - footer section

---

## 4. SSR/Hydration Considerations for Language State

### The Hydration Problem

When using client-side language state with server rendering, you face a mismatch:

1. Server renders in language A (e.g., English)
2. Client initializes with different language B (e.g., Vietnamese from localStorage)
3. Hydration fails or causes flicker

### Solutions

#### Solution 1: suppressHydrationWarning (Simplest)

```tsx
<html lang="en" suppressHydrationWarning>
```

- Server always renders default locale
- Client initializes same way, then switches if needed
- Brief flash of default language on switch
- Acceptable for landing pages

#### Solution 2: Initial Locale from Server (More Robust)

Pass initial locale from server to client via props:

```tsx
// In layout.tsx (Server Component)
import { getInitialLocale } from "@/lib/i18n";

// For a context-based approach, this could read from a cookie or header
const initialLocale = getInitialLocale();

export default async function RootLayout({ children }) {
  return (
    <html lang={initialLocale}>
      <body>
        <LanguageProvider initialLocale={initialLocale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

#### Solution 3: Deferred Locale Detection

```tsx
function LanguageProvider({ children, initialLocale }) {
  const [locale, setLocale] = useState(initialLocale || "en");

  // After hydration, check localStorage
  useEffect(() => {
    const stored = localStorage.getItem("locale");
    if (stored && ["en", "vi"].includes(stored)) {
      setLocale(stored);
    }
  }, []); // Empty deps = runs after hydration

  // Sync to localStorage when locale changes
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);
}
```

This approach:
1. Server renders with `initialLocale` (passed from cookie/header)
2. Client hydrates matching content (no mismatch)
3. After hydration, localStorage preference is applied silently

### Recommendation for This Project

**Solution 1 with awareness of Solution 3** - Use `suppressHydrationWarning` with awareness that the language switcher will work correctly post-hydration. The landing page will typically load once for most users, so this is acceptable.

---

## 5. Integration Points with Existing Components

### Data Files to Modify

| Component | Data File | Changes Needed |
|-----------|-----------|----------------|
| Navbar | `components/landing/Navbar/data.ts` | Export `navLinks` and `ctaText` as translation keys |
| HeroSection | Inline in component | Move hardcoded strings to data + translations |
| HowItWorks | `components/landing/HowItWorks/data.ts` | Steps array already structured |
| Comparison | `components/landing/Comparison/data.ts` | Already structured |
| TrustMetrics | `components/landing/TrustMetrics/data.ts` | Check what strings exist |
| FAQ | `components/landing/FAQ/data.ts` | Already structured with `FAQItem` interface |
| Footer | `components/landing/Footer/data.ts` | `footerLinks` and `socials` labels |
| ComingSoonModal | `components/ui/ComingSoonModal.tsx` | Modal text content |
| Footer | `components/landing/Footer/index.tsx` | Social link labels are dynamic |

### Components Using ComingSoonModal

The `Navbar` and `HeroSection` both call `openComingSoon()` from `ModalContext`. The modal itself will need translation support.

### Translation Hook Usage Pattern

```tsx
// Example component integration
"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav>
      <a href="#">{t("nav.howItWorks")}</a>
      <button>{t("common.getStarted")}</button>
    </nav>
  );
}
```

### Type Integration

Add to `types/index.ts`:

```typescript
export type Locale = "en" | "vi";

export interface TranslationKey {
  namespace: string;
  key: string;
}
```

---

## 6. Recommendations for This Project

### Recommended Approach: Context-based i18n with JSON Files

**Rationale:**

1. **Matches Existing Patterns:** The `ModalContext` pattern used in this project translates directly to a `LanguageContext`.

2. **Appropriate Scope:** This is a landing page with straightforward content. URL-based routing adds unnecessary complexity.

3. **Client-Side Only:** All components are already client components (`"use client"`), so a context provider fits naturally.

4. **No URL Changes:** Maintains current URL structure without `/en/` or `/vi/` prefixes.

5. **Maintainable:** JSON translation files are easy for translators to work with, and the structure can grow with the project.

### Implementation Plan Summary

1. **Create `context/LanguageContext.tsx`** following `ModalContext` pattern
2. **Create `messages/en.json` and `messages/vi.json`** with all translations
3. **Create `LanguageProviderWrapper`** (analogous to `ModalProviderWrapper`) in `app/layout.tsx`
4. **Add `types/Locale.ts`** for type safety
5. **Update data files** to reference translation keys instead of hardcoded strings
6. **Add language switcher** to Navbar
7. **Handle hydration** with `suppressHydrationWarning` on `<html>`

### Alternative to Consider

If SEO becomes a priority or the project grows beyond a landing page, consider migrating to **next-intl** with URL-based routing. The investment in proper i18n structure now will pay off in easier migration later.

---

## Files to Create (Summary)

| File | Purpose |
|------|---------|
| `context/LanguageContext.tsx` | Main context provider |
| `context/LanguageProviderWrapper.tsx` | Server-safe wrapper for layout |
| `messages/en.json` | English translations |
| `messages/vi.json` | Vietnamese translations |
| `types/locale.ts` | Locale type definitions |

## Files to Modify (Summary)

| File | Changes |
|------|---------|
| `app/layout.tsx` | Add LanguageProviderWrapper |
| `components/landing/Navbar/index.tsx` | Add language switcher |
| `components/landing/Navbar/data.ts` | Use translation keys |
| `components/landing/HeroSection.tsx` | Use translation keys |
| `components/landing/FAQ/data.ts` | Already structured |
| `components/landing/Footer/data.ts` | Use translation keys |
| `types/index.ts` | Add Locale type |

---

## Next Steps (For Implementation)

When the user is ready to implement:

1. Create the plan document in `./plans/YYYYMMDD-language-context-plan.md`
2. Set up task dependencies
3. Begin with types and context foundation
4. Progress through translation files, then component integration
5. Add tests and language switcher UI

---

## Sources

- [Next.js Internationalization Documentation](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [next-intl Documentation](https://next-intl.dev/docs/getting-started/app-router)
- [next-intl Configuration](https://next-intl.dev/docs/configuration)
