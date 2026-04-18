# ZENTRIX — Landing Page Design Spec

**Version 1.0 · April 2026 · Internal**

> Design specification for `zentrix.io` — detailed enough for any design bot (v0, Cursor, Locofy, Figma AI, etc.) to build directly.

---

## Overview

| Item     | Detail                                                               |
| -------- | -------------------------------------------------------------------- |
| Goal     | Attract traders and IBs to sign up; build trust through transparency |
| Language | English (primary) · Vietnamese (optional toggle)                     |
| Platform | Responsive web · Mobile first                                        |
| Tone     | Trustworthy · Transparent · Fintech — avoid promising profits        |

---

## LP-01 · Hero / Above the fold

**Goal:** Communicate the core value proposition immediately and drive users to the sign-up CTA.

| Element       | Content                                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Headline      | `Trade — Earn Rebates — Withdraw to Your Wallet` (large, bold)                                                                         |
| Sub-headline  | `Zentrix standardizes the rebate flow from your broker directly to your wallet. Fully on-chain transparent. No hidden intermediaries.` |
| Primary CTA   | Button `Start Earning Rebates` — accent green, highly visible                                                                          |
| Secondary CTA | Link `See Zentrix Cashback System Work? ↓` — scrolls to LP-03                                                                          |
| Visual        | Short looping animation / illustration: trader → network → funds arriving in wallet (~3s loop)                                         |
| Layout        | 2 columns: Text left · Visual right (desktop) / Stacked (mobile)                                                                       |
| Background    | Deep teal `#146255` or white with subtle gradient                                                                                      |

---

## LP-02 · Trust Metrics

**Goal:** Social proof through real numbers, increasing credibility above the fold.

| Metric     | Label                  | Note                              |
| ---------- | ---------------------- | --------------------------------- |
| $X,XXX,XXX | Total Volume Processed | Real-time or updated periodically |
| X,XXX+     | Active Traders         |                                   |
| X          | Integrated Brokers     |                                   |
| $XXX,XXX+  | Total Rebates Paid Out |                                   |

**Layout:** 4 cards in a row · Small icon + large number + label · Light surface background.

---

## LP-03 · Zentrix Cashback System Work?

**Goal:** Explain the rebate flow in 3 simple steps without technical jargon.

### Step 1 — Connect Your Broker

> Sign up for a Zentrix account, complete KYC, and link your trading account (MT4/MT5).

### Step 2 — Trade as Usual

> Keep trading on your broker as normal. Zentrix automatically records your volume and calculates your rebates.

### Step 3 — Receive Rebates to Your Wallet

> Rebates are allocated to your ledger, confirmed after each settlement period, and you can claim them to your BEP20 wallet at any time.

**Layout:** Horizontal timeline with illustrative icons per step (desktop) / Vertical stack (mobile).

---

## LP-04 · Why Zentrix

**Goal:** Differentiate from traditional rebate platforms with 4 core advantages.

| Icon | Title                  | Description                                                                                           |
| ---- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| 🔗   | On-chain Transparency  | A public smart contract Pool. Every claim transaction has a tx hash verifiable on the block explorer. |
| 🏦   | Multi-Broker Support   | Connect multiple brokers under one account. All rebates consolidated in one place.                    |
| 🌐   | Clear Referral Network | F1/F2/F3 referral tree with publicly visible rates. No hidden fees, no secret allocations.            |
| ⚡   | Easy Withdrawals       | Claim to your BEP20 wallet with a fixed $0.50 fee per withdrawal. No manual approval required.        |

**Layout:** 2×2 grid (desktop) / Single column (mobile) · Each card: large icon + bold title + 2-line description.

---

## LP-05 · Referral Network

**Goal:** Explain the ref tree structure and commission rates; clearly distinguish from MLM schemes.

### Commission Structure

| Level | Relationship                | You Earn                            |
| ----- | --------------------------- | ----------------------------------- |
| F1    | People you directly refer   | X% rebate from their trading volume |
| F2    | People referred by your F1s | Y% rebate from their trading volume |
| F3    | People referred by your F2s | Z% rebate from their trading volume |

> _(Replace X/Y/Z with actual rates at go-live)_

### Example

> Your F1 trades 100 lots/month → you earn ~$XX in rebates from F1, regardless of whether F1 refers anyone else.

### Legal Note _(displayed in small text below section)_

> Commissions are derived from actual trading fees — not from selling participation packages or depositing funds into the system.

**Layout:** SVG / animated referral tree infographic · 3 levels clearly visible · Example figures shown.

---

## LP-06 · Integrated Brokers

**Goal:** Build credibility by displaying broker names familiar to traders.

- Logo grid of currently supported brokers (minimum 1, max fits neatly in one row)
- Badge `+ More brokers coming soon` at end of grid
- Hover tooltip: broker name + supported assets

**Layout:** Centered flex row · Grayscale default, colored on hover · White background.

---

## LP-06B · Broker Rebate Listing _(Backcom-style)_

**Goal:** Show all supported brokers with rebate rates, referral codes, and concrete earning examples. Inspired by backcom.ai's broker listing page.

### Page Structure

#### Filter Bar

- Tab filters: `All` · `Forex` · `Crypto`
- Pills/chips style · Active state highlighted in brand teal

#### Broker Card Grid

- 2–3 columns desktop, 1 column mobile
- Each card displays:

| Field         | Content                                      |
| ------------- | -------------------------------------------- |
| Broker Logo   | Top-left, 40×40px                            |
| Broker Name   | Bold, below logo                             |
| Type Badge    | `Auto Daily` or `Auto Monthly` — green pill  |
| Rebate Rate   | Large percentage (e.g., `50%`)               |
| Referral Code | Monospace, copy button on right              |
| Example       | `100$ fee → $50 back` — shows concrete value |
| CTA           | `Register →` button linking to broker        |

#### Card States

- Default: white background, subtle border
- Hover: slight shadow elevation, border color → teal
- Featured: gold/yellow badge `Best Rate` for highest rebate broker

### Placeholder Broker Data

| Broker   | Category | Type         | Rebate | Example              |
| -------- | -------- | ------------ | ------ | -------------------- |
| Broker A | Forex    | Auto Daily   | 50%    | 100$ fee → $50 back  |
| Broker B | Forex    | Auto Monthly | 100%   | 100$ fee → $100 back |
| Broker C | Crypto   | Auto Daily   | 20%    | 100$ fee → $20 back  |

### Why This Section Works

- **Transparency**: Shows exact rebate percentages, no hidden math
- **Social proof**: Referral codes + examples make it feel real and actionable
- **Urgency**: Copy button + CTA creates immediate action incentive
- **Comparison**: Side-by-side rates help traders choose best broker

**Layout:** Card grid · Hover interactions · Filter tabs · Mobile: stacked single column

---

## LP-07 · Zentrix vs Traditional Rebate

**Goal:** Quick comparison table so users immediately see the advantages.

| Criteria               | Traditional Rebate                          | Zentrix                               |
| ---------------------- | ------------------------------------------- | ------------------------------------- |
| Liquidity Transparency | Internal balance, hard to verify externally | On-chain Pool, verifiable on explorer |
| Fund Flow              | Internal transfers, non-public batches      | Broker → Treasury → Pool → Wallet     |
| Reconciliation         | Mostly internal reporting                   | Broker + Ledger + Chain (3-way)       |
| Referral Allocation    | Limited audit tools                         | Ref tree + policy + public log        |
| Withdrawals            | Manual approval process                     | On-chain claim, fixed fee             |

**Layout:** 3-column table · Zentrix column highlighted in green with ✓ checkmarks · Traditional column uses ✗ or muted styling.

---

## LP-08 · Testimonials / Social Proof

**Goal:** Build trust through real user experiences.

### Card Structure

- Avatar (photo or initials)
- Name + role (Trader / IB) + broker they use
- Short quote (2–3 sentences) about their rebate experience

### Placeholder Content

> **Alex N.** · IB · Broker XYZ
> _"I never knew if I was getting the right rebate rate before. Zentrix shows me every single allocation with its status. It's a completely different level of trust."_

> **Sarah T.** · Trader · Broker ABC
> _"Connected my broker and the rebates just showed up automatically. Withdrawal was fast, fees were clear. No need to ask anyone anything."_

**Layout:** 2–3 cards side by side (desktop) / Single column scroll (mobile) · White card background · Quote in italics.

---

## LP-09 · FAQ

**Goal:** Handle common objections and reduce friction before sign-up.

**Layout:** Accordion (click to expand) · `+` / `−` icon · Regular body font.

### Questions

**1. What is a rebate and where does it come from?**

> A rebate is a portion of the trading fee (spread/commission) that your broker returns through Zentrix. This money comes from your actual trading volume — not from any other source.

**2. How much does Zentrix charge?**

> Zentrix charges a platform fee of $0.50–$1.00 per lot traded (varies by broker and asset) and a fixed withdrawal fee of $0.50 per claim. There are no other hidden fees.

**3. Is KYC required?**

> Yes. KYC is mandatory to withdraw funds, in order to comply with AML regulations and protect your account. The process involves uploading a government-issued ID and a selfie — typically processed within a few business hours.

**4. What is the on-chain Pool? Is my money safe?**

> The Pool is a BEP20 smart contract that holds rebate liquidity. Funds enter the Pool only after broker payouts have been received by treasury and verified through 3-way reconciliation. You can check the Pool balance and full claim history directly on BSCScan.

**5. How long does it take to receive my rebates?**

> Rebates are recorded as your trading volume comes in. After each settlement period (typically weekly or monthly depending on the broker), rebates are confirmed and opened for claiming. You can claim at any time after that.

**6. Is Zentrix an MLM scheme?**

> No. Referral commissions come from the actual trading fees generated by people you refer — not from selling participation packages or requiring deposits. Zentrix does not require you to purchase anything to participate.

**7. Can I connect multiple brokers?**

> Yes. You can link multiple broker accounts under a single Zentrix account. Rebates from all brokers are consolidated in one place.

---

## LP-10 · Final CTA

**Goal:** One last call to action before the user leaves the page.

| Element       | Content                                                         |
| ------------- | --------------------------------------------------------------- |
| Headline      | `Start Earning Rebates From Your Trades`                        |
| Sub           | `Free to sign up · Fast KYC · Connect your broker in 5 minutes` |
| Primary CTA   | Button `Sign Up Now` — large, teal accent color                 |
| Secondary CTA | `Or reach us on Telegram →`                                     |
| Background    | Deep teal or gradient, white text                               |

---

## LP-11 · Footer

**Goal:** Legal information, secondary navigation, and social links.

### Left Column

- Zentrix logo + short tagline

### Middle Column — Links

- Terms of Service
- Privacy Policy
- Support / Contact
- Roadmap (if public)

### Right Column — Social

- Telegram
- Twitter / X
- Discord (if available)

### Disclaimer _(full width, small muted text)_

> Zentrix is a rebate platform connecting traders and brokers. Rebates are derived from actual trading fees. Zentrix does not guarantee investment returns. Forex and derivative trading involves significant risk. Please ensure compliance with the regulations applicable in your jurisdiction before participating.

---

## UX Principles

| Group           | Rule                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| **Colors**      | Brand: `#18CBA8` Teal · Mint: `#29FFB5` · Dark: `#146255` · Warning: `#B07000` Amber · Surface: `#F4F4F4` Gray |
| **Typography**  | Font: Inter · Headline: 48–64px bold · Body: 16–18px regular · Line-height: 1.7                                |
| **CTA**         | 1 primary CTA per viewport · Min height 48px · Border radius 9999px (pill) · Action-oriented text              |
| **Mobile**      | Breakpoint 768px · Stacked layout · Touch target min 44px · No font below 14px                                 |
| **Animation**   | Subtle only · Respect prefers-reduced-motion · Scale 1.05 hover on buttons                                     |
| **Performance** | Lazy load images · LCP < 2.5s · No heavy libraries on landing page                                             |

---

## Design Priority Order

1. `LP-01` Hero — highest conversion impact
2. `LP-03` Zentrix Cashback System Work? — product explanation
3. `LP-04` Why Zentrix — key advantages
4. `LP-09` FAQ — handle objections
5. `LP-10` Final CTA — second conversion point
6. `LP-02` Metrics · `LP-05` Ref Tree · `LP-07` Comparison · `LP-08` Testimonials · `LP-06` Brokers · `LP-11` Footer

---

_Zentrix internal document · Update on scope changes · v1.0 / 04-2026_
