<img width="1536" height="1024" alt="ChatGPT Image Mar 20, 2026, 03_53_03 PM" src="https://github.com/user-attachments/assets/bd29f743-8f85-4faf-9c00-65a942338c9d" />

# GigKavach — AI-Powered Parametric Income Insurance & Smart Savings for Gig Workers

> **Guidewire DEVTrails 2026 · Phase 1 Submission**
> Team: **Bug_Hunter**

---

## Table of Contents

1. [The Problem](#1-the-problem)
2. [What GigKavach Builds](#2-what-gigkavach-builds)
3. [Persona — Who We Are Protecting](#3-persona--who-we-are-protecting)
4. [Core Disruptions Covered](#4-core-disruptions-covered)
5. [Parametric Insurance — The Core of GigKavach](#5-parametric-insurance--the-core-of-gigkavach)
6. [Weekly Premium Model](#6-weekly-premium-model)
7. [Parametric Trigger & Payout Logic](#7-parametric-trigger--payout-logic)
8. [Micro-Savings Model](#8-micro-savings-model)
9. [Business Model & Financial Viability](#9-business-model--financial-viability)
10. [AI / ML Integration](#10-ai--ml-integration)
11. [Fraud Detection Architecture](#11-fraud-detection-architecture)
12. [System Architecture](#12-system-architecture)
13. [MVP Features](#13-mvp-features)
14. [Technology Stack](#14-technology-stack)
15. [Development Plan](#15-development-plan)
16. [Key Design Decisions](#16-key-design-decisions)
17. [Future Scope & Scalability](#17-future-scope--scalability)

---

## 1. The Problem

### The Human Reality

Meet **Rahul, 25, a delivery partner for Zepto in Velachery, Chennai.** He rides 10–11 hours a day, completing 15–20 deliveries, and earns between ₹900–₹1,100 on a productive day. There is no salary, no paid leave, no employer-provided safety net. Every rupee he earns is the direct result of hours spent on the road.

Then the monsoon arrives.

Within 90 minutes of heavy rainfall, Velachery is waterlogged. Orders stop flowing. Rahul pulls over. He earns ₹180 that day — not because he gave up, but because the environment made it physically impossible to work. No insurance policy covers this. No platform steps in. The loss is entirely and silently his.

This is not an edge case. **This is Tuesday in October.**

### The Scale of the Problem

| Metric | Figure | Source |
|---|---|---|
| Gig workers in India today | 7.7 million | NITI Aayog, 2022 |
| Projected gig workers by 2029–30 | 23.5 million | NITI Aayog, 2022 |
| Delivery partners as % of gig workforce | ~47% | Industry estimate |
| Average income loss per disruption event | ₹180–₹300 | GigKavach field research |
| Disruption days per year (Chennai) | 40–60 days | IMD historical data |
| Annual income loss per rider from disruptions | ₹7,200–₹18,000 | Calculated estimate |
| Riders with any form of income insurance | Near 0% | — |

### What Existing Insurance Misses

| Insurance Type | What It Covers | What It Misses |
|---|---|---|
| Health / Accidental Insurance | Hospitalisation, injuries | Lost workdays due to weather |
| Vehicle Insurance | Bike damage, third-party liability | Lost income when riding is impossible |
| Personal Accident Cover | Death, permanent disability | Temporary income disruption |
| Platform-linked ESIC | Formal employees only | Gig workers are contractors, not employees |
| **GigKavach** | **Lost daily earnings from external disruptions** | — |

The gap is structural. Every existing product covers the asset (health, vehicle) or the catastrophe (death, disability). **Nobody covers the lost hours** — the 3-hour window on a Tuesday afternoon when Velachery floods and 200 riders lose ₹250 each, simultaneously, with no recourse.

**GigKavach closes exactly that gap.**

---

## 2. What GigKavach Builds

GigKavach is a **hyperlocal, AI-powered parametric income insurance and micro-savings platform** built exclusively for platform-based delivery riders. It continuously monitors environmental conditions across delivery zones, automatically detects disruption events, verifies rider activity through GPS, and disburses instant compensation — without the rider filing a single claim form.

Beyond insurance, GigKavach introduces a **micro-savings layer**: small per-order deductions build a weekly protection pool. If a disruption occurs, the pool funds an instant payout. If the week passes disruption-free, the rider's savings are returned with 4–5% interest — transforming protection into a financial habit.

### The Two-Outcome Promise

```
Every week, Rahul contributes ₹2–₹5 per delivery into his GigKavach pool.
                              ↓
        ┌─────────────────────────────────────┐
        │   Was there a covered disruption?   │
        └─────────────────────────────────────┘
               ↓ YES                  ↓ NO
    ┌──────────────────┐    ┌──────────────────────┐
    │  Instant UPI     │    │  Savings + 4–5%      │
    │  Payout          │    │  Interest returned   │
    │  (₹200–₹400/day) │    │  to Rahul's wallet   │
    └──────────────────┘    └──────────────────────┘
```

**GigKavach is never a pure cost.** Either it protects income on bad days, or it grows savings on good ones.

### Coverage Boundaries (Critical Constraints)

| In Scope ✅ | Out of Scope ❌ |
|---|---|
| Lost earnings from weather disruptions | Health or medical expenses |
| Income loss from waterlogging / flooding | Vehicle damage or repair costs |
| Lost wages during extreme heat events | Accident compensation |
| Earnings dropped during high AQI days | Life insurance payouts |
| Income lost to curfews / local strikes (Phase 2) | Platform service charges or app issues |

---

## 3. Persona — Who We Are Protecting

### Representative Persona

| Attribute | Detail |
|---|---|
| **Name** | Ravi (Representative Persona) |
| **Age** | 25 |
| **Platform** | Swiggy (Primary), Zomato (Secondary) |
| **City** | Chennai — Primary Zone: Velachery |
| **Working Hours** | 9–10 hrs/day, 6 days/week |
| **Avg Deliveries/Day** | 14–17 orders |
| **Avg Hourly Income** | ₹85–₹100/hr |
| **Monthly Net Income** | ₹18,000–₹24,000 (after fuel & maintenance) |
| **Phone** | Android, ₹10,000–₹14,000 range |
| **Connectivity** | Intermittent 4G; signal drops during heavy rain |
| **Current Insurance** | None — zero income protection |
| **Financial Buffer** | Less than ₹3,000 in savings on average |
| **Key Vulnerabilities** | Heavy rain (Oct–Dec), heat waves (May–Jun) |
| **Primary Language** | Tamil |

### Why Food & Q-Commerce Riders Specifically?

| Factor | Why It Matters for GigKavach |
|---|---|
| Outdoor-only work | 100% exposure to environmental conditions — no option to work remotely |
| Per-delivery earnings | Income drops to zero the moment deliveries stop; no floor exists |
| Tight delivery radii | 1.5–3 km zones mean a single waterlogged street can halt an entire shift |
| High disruption frequency | Chennai averages 40–60 disruption-worthy days per year |
| Zero employer obligation | Platforms classify riders as contractors; no statutory income protection |
| Large addressable base | 1.2M+ active food/Q-commerce delivery riders in India's top 10 cities |

### Ravi's Disruption Scenario (Worked Example)

**Normal Working Day:**

| Metric | Value |
|---|---|
| Deliveries per hour | 3 |
| Earnings per delivery | ₹32 |
| Hourly income | ₹96 |
| Working hours | 9 hrs |
| Daily gross income | ₹864 |

**Heavy Rain Disruption (Velachery, 70mm in 2–3 hrs):**

| Metric | Value |
|---|---|
| Deliveries per hour (during disruption) | 1 |
| Earnings per delivery | ₹32 |
| Hourly income (during disruption) | ₹32 |
| Disruption window | 3 hours |
| Income lost in disruption window | ₹192 |
| **GigKavach Estimated Payout** | **₹140–₹175** |
| Ravi's recovery rate | 73–91% of lost income |

---

## 4. Core Disruptions Covered

GigKavach protects against **5 objectively measurable primary disruptions** in Phase 1, expanding to social disruptions in Phase 2. Each threshold is calibrated to the specific point at which delivery completion rates in Chennai demonstrably decline.

### Environmental Disruptions (Phase 1)

| # | Disruption | Trigger Threshold | Monitoring Frequency | Chennai Risk Level | Peak Season |
|---|---|---|---|---|---|
| 1 | Heavy Rainfall | ≥ 40 mm within 3 hrs | Every 15 min | 🔴 High | Oct–Dec |
| 2 | Urban Waterlogging | Rain + low-lying zone flag active | Every 15 min | 🔴 High | Oct–Dec |
| 3 | Extreme Heat | ≥ 42°C for ≥ 2 consecutive hrs | Every 30 min | 🟡 Medium | May–Jun |
| 4 | Air Pollution | AQI ≥ 250 for ≥ 6 hrs | Every 1 hr | 🟢 Low | Jan–Feb |
| 5 | Strong Winds / Storm | Wind ≥ 50 km/h (weather alert issued) | Event-based | 🟠 Moderate | Pre-monsoon |

### Social / Human-Caused Disruptions (Phase 2)

| # | Disruption | Detection Method | Coverage Trigger |
|---|---|---|---|
| 6 | Traffic Congestion | Google Maps API severity index | Congestion score ≥ 0.7 for ≥ 2 hrs |
| 7 | Curfews / Section 144 | Government notification feeds | Official order in rider's zone |
| 8 | Strikes / Roadblocks | Civic alert APIs + GPS anomaly clustering | ≥30% of zone riders show zero movement |
| 9 | Sudden Zone Closures | Geo-fence breach detection | Platform dispatch halted in zone |

### Disruption Impact by Type

| Disruption | Avg. Delivery Reduction | Avg. Income Loss (3-hr window) | Data Source |
|---|---|---|---|
| Heavy Rainfall (>40mm) | 65–75% | ₹175–₹220 | IMD + field estimates |
| Urban Waterlogging | 80–90% | ₹200–₹260 | IMD + rider interviews |
| Extreme Heat (>42°C) | 30–40% | ₹80–₹120 | IMD historical data |
| High AQI (>250) | 15–25% | ₹40–₹75 | CPCB data |
| Storm / High Wind | 50–60% | ₹130–₹175 | IMD data |

---

## 5. Parametric Insurance — The Core of GigKavach

> This section is the conceptual and technical heart of GigKavach. Every downstream design decision — the premium model, the payout formula, the fraud architecture — flows from the choice to build on parametric insurance principles.

### Traditional Insurance vs. Parametric Insurance

| Dimension | Traditional Insurance | GigKavach Parametric Insurance |
|---|---|---|
| **Claim trigger** | Rider must file a claim after the loss | Automatic — triggered by verified external data |
| **Assessment** | Manual loss assessment by an adjuster | Pre-agreed threshold crossed → payout computed algorithmically |
| **Processing time** | Days to weeks | Minutes to hours |
| **Documentation required** | Bills, photos, police reports, receipts | None — the data is the evidence |
| **Payout basis** | Actual assessed damage | Pre-defined formula applied to verified sensor data |
| **Rider effort** | High — multiple steps, follow-ups | Zero — rider receives a notification, not a form |
| **Operational cost** | High (claims adjusters, paper processing) | Low (fully automated pipeline) |
| **Suitability for gig workers** | Poor — riders lack formal documentation | Excellent — objective data replaces paperwork entirely |

### Why Parametric Is the Only Viable Model for Gig Workers

Ravi's income disruptions share three properties that make traditional insurance structurally unworkable:

1. **Simultaneous** — A Chennai monsoon event affects hundreds of riders at the same time. Individual assessment is economically impossible at this scale.
2. **Short-duration** — Events last 2–6 hours. By the time a traditional claim is processed, the week is already over.
3. **Objectively measurable** — Rainfall, AQI, and temperature are published by neutral third-party sources (IMD, CPCB, OpenWeatherMap). There is no ambiguity about whether the event occurred.

Parametric insurance exists precisely for this combination. GigKavach applies it at the hyperlocal, per-rider level — something no existing insurance product does.

### The Parametric Insurance Lifecycle (Per Week)

```
Monday 00:00 — Weekly Zone Risk Score computed by ML Engine
         ↓
Rider purchases weekly policy (or auto-renews)
         ↓
12–24 hr waiting period (anti-backdating protection)
         ↓
Coverage Active for 7-day window
         ↓
Real-time environmental monitoring (every 15–60 min by disruption type)
         ↓
Disruption threshold crossed in rider's zone?
         ↓
   YES                              NO (week ends cleanly)
    ↓                                    ↓
Rider GPS + activity verified       Savings + 4–5% interest
Hybrid Score computed                returned to rider's wallet
Fraud checks passed
    ↓
Payout disbursed via UPI (same day)
         ↓
Event logged → updates zone's historical disruption frequency
         ↓
Feeds back into next week's ML risk score recalculation
```

---

## 6. Weekly Premium Model

### Design Philosophy

Premiums are calculated **once per week** per delivery zone, using historical environmental data — not real-time spikes. This produces stable, predictable costs for the worker and actuarially sound pricing that reflects long-run risk rather than news cycles.

The ML risk model is retrained weekly, so premiums calibrate continuously as climate and urban conditions shift — without exposing riders to intra-week volatility.

### Zone Risk Score Formula

The Gradient Boosting model outputs a zone risk score (0–100) that is the **sole input** to the premium tier lookup. No manual pricing override exists.

```
Risk Score = (Rain Risk    × 0.30)
           + (Flood Risk   × 0.25)
           + (Heat Risk    × 0.20)
           + (Traffic Risk × 0.15)
           + (Storm Risk   × 0.10)
```

**Weight rationale:**

| Factor | Weight | Rationale |
|---|---|---|
| Rain Risk | 0.30 | Most frequent income-stopping disruption in Chennai's climate profile |
| Flood Risk | 0.25 | Causes most severe and complete delivery halts; correlated with rain but distinct threshold |
| Heat Risk | 0.20 | Meaningful impact on rider health and order demand; rarely causes complete stoppage |
| Traffic Risk | 0.15 | Partially correlated with rain; retains independent weight for social disruption contribution |
| Storm Risk | 0.10 | Infrequent but high-impact when it occurs; lower base probability |

### Worked Example — Velachery, Chennai

| Risk Factor | Raw Score (0–100) | Weight | Weighted Contribution |
|---|---|---|---|
| Rain Risk | 65 | 0.30 | 19.50 |
| Flood Risk | 60 | 0.25 | 15.00 |
| Heat Risk | 40 | 0.20 | 8.00 |
| Traffic Risk | 35 | 0.15 | 5.25 |
| Storm Risk | 25 | 0.10 | 2.50 |
| **Total Zone Score** | — | — | **50.25 → Moderate Risk** |

### Weekly Premium Tiers

| Risk Category | Score Range | Weekly Premium | Coverage Limit | Monthly Equivalent | Cost per Day |
|---|---|---|---|---|---|
| Low Risk | 0–30 | ₹20 | ₹1,000 | ~₹87 | ~₹2.86 |
| Moderate Risk | 31–50 | ₹35 | ₹1,500 | ~₹152 | ~₹5.00 |
| High Risk | 51–70 | ₹50 | ₹2,000 | ~₹217 | ~₹7.14 |
| Very High Risk | 71–85 | ₹70 | ₹2,000 | ~₹304 | ~₹10.00 |
| Extreme Risk | 86–100 | ₹90 | ₹2,000 | ~₹391 | ~₹12.86 |

> **For Ravi (Velachery — Moderate Risk):** ₹35/week → ₹1,500 weekly coverage. Less than the cost of one biryani, for a full week of income protection.

### Seasonal Risk Adjustments

| Season | Period | Adjustment | Affected Risk Factor |
|---|---|---|---|
| Monsoon | Oct–Dec | +10% | Rain Risk |
| Summer | May–Jun | +10% | Heat Risk |
| Winter | Jan–Feb | +10% | Pollution Risk |
| Pre-Monsoon | Mar–Apr | +5% | Storm Risk |

Premiums are locked at purchase. Seasonal adjustments only apply at the **next** weekly recalculation — riders are never repriced mid-week.

### Premium-to-Coverage Ratio Analysis

| Risk Tier | Weekly Premium | Max Coverage | Protection Ratio | Break-Even Disruption |
|---|---|---|---|---|
| Low | ₹20 | ₹1,000 | 50× | 0.27 hrs of lost ₹90/hr income |
| Moderate | ₹35 | ₹1,500 | 43× | 0.39 hrs |
| High | ₹50 | ₹2,000 | 40× | 0.56 hrs |
| Very High | ₹70 | ₹2,000 | 28.6× | 0.78 hrs |
| Extreme | ₹90 | ₹2,000 | 22.2× | 1.00 hr |

Even in the most expensive tier, **a single hour of covered disruption more than justifies the full weekly premium.**

### Payout Caps

| Level | Cap | Rationale |
|---|---|---|
| Per Hour | ₹90 | Matches average hourly income ceiling; prevents payout exceeding actual loss |
| Per Disruption Event | ₹1,200 | Single-event cap; multiple events in a week each get their own calculation |
| Per Week | ₹1,500 | Hard weekly ceiling aligned with Moderate tier coverage limit |
| Per Month | ₹5,000 | Monthly safety ceiling across 4 weekly policies |

---

## 7. Parametric Trigger & Payout Logic

### Five-Step Automated Pipeline

```
Step 1 — Environmental Polling
   OpenWeatherMap: Rainfall, temp, wind → every 15–30 min
   AQICN: AQI index → every 1 hr
   Traffic API: Congestion index → every 15 min
              ↓
Step 2 — Zone Threshold Evaluation
   Each 2×2 km zone evaluated independently
   Rainfall ≥ 40mm / Temp ≥ 42°C / AQI ≥ 250 / Wind ≥ 50 km/h
              ↓
Step 3 — Disruption Score Computation
   Env_Score = (0.4 × Rain_norm) + (0.3 × AQI_norm) + (0.3 × Traffic_norm)
   Disruption confirmed: Env_Score ≥ 0.6 AND Activity_Drop ≥ 0.4
              ↓
Step 4 — Rider Eligibility Verification
   ✓ GPS in disruption zone for ≥ 50% of event duration
   ✓ Active work session (GPS moving, no idle > 15 min)
   ✓ Weekly policy active at time of event
   ✓ No Critical fraud flags
              ↓
Step 5 — Hybrid Score + Payout Calculation
   Final Payout = Expected_Income × Hybrid_Score × Lost_Hours
   Disburse via Razorpay → UPI → Push notification to rider
```

### Why Three Signals Beat One — The Hybrid Model

Most parametric insurance uses a **single trigger → fixed payout**. This creates **basis risk**: the threshold fires but the rider wasn't impacted, or the rider was impacted but the trigger didn't fire. GigKavach uses a **weighted composite of three independent signals** to triangulate actual income impact:

```
Hybrid Score = (0.5 × Income Deviation)
             + (0.3 × Activity Drop)
             + (0.2 × Environmental Score)

Final Payout = Expected_Income(zone, time) × Hybrid_Score × Lost_Hours
             (subject to per-hour, per-event, and weekly caps)
```

**Signal Weight Rationale:**

| Signal | Weight | Rationale |
|---|---|---|
| Income Deviation | 50% | Most direct proxy for actual earnings loss; highest signal reliability |
| Activity Drop | 30% | GPS-verified behaviour confirms the disruption impacted real work output |
| Environmental Score | 20% | Third-party data provides objective context; lower weight because it doesn't directly measure the rider's personal loss |

### Ravi's Full Payout Calculation (Worked Example)

**Scenario:** 3-hour monsoon disruption in Velachery. Ravi's baseline rate is ₹90/hr. During disruption, he manages ₹32/hr.

| Signal | Formula | Values | Score |
|---|---|---|---|
| Income Deviation | (Expected − Actual) / Expected | (₹90 − ₹32) / ₹90 | **0.644** |
| Activity Drop | (Normal orders − Actual) / Normal | (16 − 5) / 16 | **0.688** |
| Environmental Score | 0.4×Rain + 0.3×AQI + 0.3×Traffic | Combined API factors | **0.700** |
| **Hybrid Score** | 0.5×0.644 + 0.3×0.688 + 0.2×0.700 | — | **0.662** |
| **Final Payout** | ₹90 × 0.662 × 3 hrs | — | **₹179** ✓ |

### Disruption Scenario Comparison Table

| Scenario | Type | Hours | Hybrid Score | Payout | Cap Check |
|---|---|---|---|---|---|
| Light rain, partial slowdown | Rain 30mm | 1.5 | 0.32 | ₹43 | ✅ |
| Heavy monsoon, full halt | Rain 70mm + Flooding | 3 | 0.66 | ₹179 | ✅ |
| Peak summer heat | Heat 43°C | 2 | 0.38 | ₹68 | ✅ |
| Severe storm + road closure | Wind 55km/h + Traffic | 4 | 0.71 | ₹256 | ✅ |
| Persistent pollution | AQI 280 for 6+ hrs | 4 | 0.28 | ₹101 | ✅ |
| Worst-case combined event | Rain + Flood + Wind | 6 | 0.85 | ₹459 (capped) | ⚠️ Event cap ₹1,200 |

---

## 8. Micro-Savings Model

The micro-savings layer transforms GigKavach from a pure insurance product into a **savings instrument with a floor guarantee** — solving the classic insurance retention problem where riders who don't claim feel they wasted their premium.

### How Micro-Savings Work

| Step | Action | Detail |
|---|---|---|
| 1 | Per-order deduction | ₹2–₹5 automatically deducted per completed delivery |
| 2 | Pool accumulation | Deductions aggregate into the rider's **Weekly Savings Pool** |
| 3 | Coverage activation | Pool balance ≥ tier minimum activates weekly coverage |
| 4a | Disruption occurs | Pool funds the payout (supplemented by platform reserve if needed) |
| 4b | No disruption | Pool returned with 4–5% annualised interest at week end |
| 5 | Service fee | 10% platform fee deducted from undisrupted pool before return |

### Weekly Savings Pool Projection (Ravi — 15 deliveries/day, 6 days/week)

| Day | Deliveries | Deduction/Order | Day's Contribution | Running Pool |
|---|---|---|---|---|
| Monday | 15 | ₹3 | ₹45 | ₹45 |
| Tuesday | 16 | ₹3 | ₹48 | ₹93 |
| Wednesday | 14 | ₹3 | ₹42 | ₹135 |
| Thursday | 17 | ₹3 | ₹51 | ₹186 |
| Friday | 15 | ₹3 | ₹45 | ₹231 |
| Saturday | 16 | ₹3 | ₹48 | ₹279 |

**Scenario A — Disruption on Thursday:** Pool at ₹186. Payout of ₹179 triggered. Remaining ₹7 returned after service fee.

**Scenario B — Clean week:** Pool at ₹279. Service fee (10%) = ₹27.90. Interest at 4.5% annualised on ₹279 for 7 days ≈ ₹2.41. **Total returned to Ravi: ₹253.51**

### Savings vs. Payout Outcome Matrix

| Week Type | Pool Built | Event | Payout | Return to Rider | Net Position |
|---|---|---|---|---|---|
| Excellent — no disruption | ₹279 | None | — | ₹253.51 | Saved ₹253.51 |
| Average — 1 disruption (3 hrs) | ₹186 | Heavy Rain | ₹179 | ₹5 remainder | Protected ₹179 |
| Rough — 2 disruptions | ₹160 | Rain + Heat | ₹150 + ₹68 | Capped at ₹1,500/week | Max protection applied |
| Worst case — no policy | ₹0 | Any event | ₹0 | ₹0 | Fully exposed |

---

## 9. Business Model & Financial Viability

### Revenue Streams

| Revenue Stream | Description | Stage |
|---|---|---|
| **Platform Service Fee** | 10% deduction from undisrupted weekly savings pools | Primary — active from Day 1 |
| **Premium Spread** | Margin between premium tier collected and actual payout cost | Primary — actuarial |
| **Interest Float** | Interest earned on pooled funds during the 7-day coverage window | Secondary — scales with AUM |
| **B2B Platform Licensing** | API license fees from Swiggy, Zomato, Zepto to offer GigKavach as a native benefit | Growth phase |
| **Data Insights (Anonymised)** | Aggregated zone disruption + income pattern reports for urban planners and platforms | Future — opt-in |

### Unit Economics — Per Rider Per Week (Moderate Risk, Ravi's Profile)

| Line Item | Value | Notes |
|---|---|---|
| Revenue: Weekly Premium | ₹35 | Collected upfront |
| Revenue: Service Fee (clean week) | ₹27.90 | 10% of ₹279 pool |
| Gross Revenue (clean week) | ₹62.90 | — |
| Cost: Expected Payout | ₹119 | 40% disruption probability × ₹298 avg payout |
| Cost: Interest Return (clean week) | ₹2.41 | 4.5% annualised on ₹279 for 7 days |
| Cost: API + Infrastructure | ~₹3 | Per-rider per-week estimate |
| Net Margin (clean week) | ~₹57.49 | — |
| Net Margin (disruption week) | ~₹-83 | Payout exceeds premium; covered by pool + risk reserve |
| **Blended Weekly Margin** | **~₹12–₹18** | At 40% disruption rate across portfolio |

### Loss Ratio Projections

| Disruption Frequency | Avg Payout | Blended Loss Ratio | Status |
|---|---|---|---|
| 20% of weeks (Low Risk zone) | ₹120 | 68% | ✅ Healthy |
| 40% of weeks (Moderate Risk) | ₹179 | 82% | ✅ Viable |
| 60% of weeks (High Risk — monsoon) | ₹210 | 101% | ⚠️ Requires reinsurance |
| 80% of weeks (Extreme zone) | ₹250 | 139% | ❌ Premium must increase |

This is precisely why the ML risk engine recalibrates weekly — zones trending toward unsustainable loss ratios trigger premium tier reviews in the next cycle automatically.

### Scale Economics

| Metric | 1,000 Riders | 10,000 Riders | 100,000 Riders |
|---|---|---|---|
| Weekly Premium Revenue | ₹35,000 | ₹3,50,000 | ₹35,00,000 |
| Weekly Service Fee Revenue | ₹27,900 | ₹2,79,000 | ₹27,90,000 |
| Weekly Payout Liability | ₹47,600 | ₹4,76,000 | ₹47,60,000 |
| **Net Weekly Margin** | ₹15,300 | ₹1,53,000 | ₹15,30,000 |
| **Annualised Run Rate** | ₹7.95 lakh | ₹79.5 lakh | ₹7.95 crore |

### Competitive Positioning

| Platform | Segment | Coverage Type | Payout Method | Weekly Model | AI-Driven |
|---|---|---|---|---|---|
| **GigKavach** | Gig delivery riders | Lost income only (disruption) | Instant UPI (parametric) | ✅ | ✅ |
| Bajaj Allianz Gig Cover | General gig workers | Health + accident | Manual claim | ❌ | ❌ |
| ICICI Lombard Gig | Platform workers | Vehicle + accident | Manual claim | ❌ | ❌ |
| Ola / Rapido Insurance | Ride-hailing drivers | Accident only | Claim-based | ❌ | Partial |
| **No existing product** | **Delivery rider income** | **External disruption loss** | **Automated** | — | — |

GigKavach occupies an uncontested space: automated income protection for disruption-caused earnings loss, on a weekly cycle, with zero claim-filing required.

---

## 10. AI / ML Integration

GigKavach's intelligence layer consists of four purpose-built models operating in a continuous feedback loop. Every element of premium pricing, payout calculation, and fraud detection is AI-driven — there is no manual override layer in the production pipeline.

### Model Overview

| Model | Purpose | Algorithm | Retraining Cadence |
|---|---|---|---|
| Risk Scoring Engine | Zone-level weekly premium computation | Gradient Boosting (scikit-learn) | Weekly |
| Fraud Detection Engine | GPS + behavioural anomaly detection | Isolation Forest + rule layer | Continuous |
| Income Baseline Estimator | Per-zone, per-hour expected earnings | Gradient Boosting regression | Weekly |
| Disruption Forecaster | 48-hr ahead disruption probability | Facebook Prophet (time-series) | Daily |

---

### Model 1 — Risk Scoring Engine

| Attribute | Detail |
|---|---|
| **Algorithm** | `GradientBoostingRegressor` (scikit-learn) |
| **Training Data** | 3–5 years: IMD rainfall, CPCB AQI, flood event registry, heatwave days, storm alerts |
| **Input Features** | Rainfall frequency (days >40mm/yr), flood event count, heatwave days/yr, winter AQI avg, storm frequency, zone elevation (m), drainage quality flag (0/1) |
| **Output** | Continuous score 0–100 → mapped to premium tier |
| **Validation Metric** | RMSE against held-out zone disruption frequency |
| **Update Cycle** | Retrained every Monday 00:00 on prior week's event data |

**Why Gradient Boosting over alternatives:**

| Model | Verdict | Reason |
|---|---|---|
| Linear Regression | ❌ Rejected | Cannot capture non-linear threshold effects (flood risk spikes at drainage saturation) |
| Random Forest | ⚠️ Considered | Similar accuracy; less interpretable for regulatory review |
| Neural Network | ❌ Rejected | Overkill for <50 structured features; requires more data than available at launch |
| **Gradient Boosting** | ✅ Selected | Handles non-linearity; works well on small structured datasets; provides feature importance for audit |

---

### Model 2 — Fraud Detection Engine

| Attribute | Detail |
|---|---|
| **Algorithm** | Isolation Forest (unsupervised) + deterministic rule-based validation |
| **Input Features** | GPS speed between points, location jump distance/min, idle time ratio, zone boundary crossing frequency, historical claim rate per rider, claim rate vs. zone average |
| **Output** | Fraud risk score: Low / Medium / High / Critical |
| **Threshold Actions** | Low: auto-pay · Medium: audit log · High: 24-hr hold · Critical: block |
| **Labelled Data Required** | None at launch — model bootstraps on anomaly detection |

**Why Isolation Forest:**

| Property | Benefit |
|---|---|
| Unsupervised | No labelled fraud examples needed at launch — critical for a new platform |
| Anomaly-first | Naturally surfaces outliers (e.g., GPS showing 120 km/h in Velachery) |
| Scalable | Degrades gracefully as volume grows; can be augmented with supervised models once labelled data accumulates |

---

### Model 3 — Income Baseline Estimator

| Attribute | Detail |
|---|---|
| **Algorithm** | Gradient Boosting regression |
| **Input Features** | POI density (restaurants, dark stores), population density, road connectivity index, historical order volume proxy, hour of day (0–23), day of week (0–6) |
| **Output** | Predicted hourly income ₹ for a given zone + time slot |
| **Why not platform data?** | Swiggy / Zomato / Zepto earnings APIs are not publicly accessible. Proxy features (POI density × connectivity / traffic factor) correlate strongly with actual delivery volume in dense urban zones. |

**Estimated Feature Importance:**

| Feature | Est. Importance |
|---|---|
| Hour of day | ~28% |
| Historical order volume proxy | ~24% |
| POI density (restaurants + dark stores) | ~20% |
| Road connectivity index | ~14% |
| Day of week | ~10% |
| Population density | ~4% |

---

### Model 4 — Disruption Forecaster (Phase 3)

| Attribute | Detail |
|---|---|
| **Algorithm** | Facebook Prophet (additive time-series decomposition) |
| **Input Features** | Historical daily rainfall (5 yr), historical AQI (5 yr), seasonal decomposition, IMD forecast signals |
| **Output** | P(disruption) per zone for next 48 hrs in 6-hr bands |
| **Use Cases** | Proactive rider alerts ("High disruption risk tomorrow"), dynamic risk overlays on admin dashboard, optional premium adjustment signal for next week |

### ML Pipeline Architecture

```
Raw Data Sources
  IMD Historical · CPCB AQI · OpenWeatherMap · GPS Logs · Claim Records
              ↓
Data Preprocessing Layer
  Feature Engineering · Normalisation · Zone Aggregation · Time Windowing
              ↓
Model Training (Weekly Batch for Risk/Income · Continuous for Fraud · Daily for Forecast)
              ↓
Model Registry (versioned, rollback-capable)
              ↓
Inference Layer
  Risk Score API · Fraud Score API · Income Estimate API · Forecast API
              ↓
Kavach Core Engine consumes all four APIs in the trigger pipeline
```

---

## 11. Fraud Detection Architecture

Every payout passes through a **four-layer sequential validation pipeline** before disbursement. No single layer can independently block a legitimate claim — only a combination of correlated anomalies escalates the fraud score to a blocking threshold.

### Layer 1 — GPS Anomaly Detection

| Check | Threshold | Action on Breach |
|---|---|---|
| Speed between GPS points | >80 km/h | Flag |
| Location displacement | >5 km in 1 minute | Flag |
| Mock location detection | Developer mode or spoofing app active | Flag |
| Path continuity | Non-road trajectory via map-matching | Flag |
| GPS update interval | Perfectly regular 1.000s cadence (spoofing app pattern) | Flag |

### Layer 2 — Activity Verification

| Check | Threshold | Action |
|---|---|---|
| Minimum distance in 30-min window | <1 km covered | Flag |
| Continuous idle during active session | >15 minutes idle | Flag |
| Speed range consistency | Outside 10–40 km/h for >50% of session | Flag |
| Zone presence during disruption | <50% of event duration in disruption zone | Hard ineligibility — excluded |
| Accelerometer variance (Phase 2) | Near-zero while GPS reports movement | Flag |

### Layer 3 — Duplicate Claim Prevention

| Rule | Implementation |
|---|---|
| Event ID uniqueness | Each disruption event assigned a globally unique `Event_ID` |
| Composite key check | `(Rider_ID + Event_ID + Zone_ID)` must be unique in claims table |
| Duplicate handling | Exact duplicate → silent reject; near-duplicate → manual review queue |
| Enforcement level | Database constraint — cannot be bypassed at application layer |

### Layer 4 — Policy Validation

| Rule | Detail |
|---|---|
| Active policy requirement | Policy must be `ACTIVE` at the disruption event's start timestamp |
| Waiting period enforcement | 12–24 hr mandatory post-purchase waiting period; coverage = `PENDING` during this window |
| Anti-backdating check | Policy purchase timestamp must precede disruption start by ≥ waiting period |
| Coverage limit check | Running weekly payout total must be below weekly cap at time of computation |

### Fraud Risk Score → System Response

| Score Range | Risk Level | System Response | Rider Communication |
|---|---|---|---|
| 0–30 | Low | Payout auto-proceeds | "₹179 credited to your UPI" |
| 31–60 | Medium | Payout proceeds + full audit log | "₹179 credited — session logged for quality assurance" |
| 61–85 | High | Payout held 24 hrs; manual review queued | "Claim under review — you'll hear back in 24 hrs" |
| 86–100 | Critical | Payout blocked; account flagged | "Claim requires additional verification — our team will contact you" |

### Key Fraud Scenarios & Detection Logic

| Fraud Scenario | Detection Signals | Response |
|---|---|---|
| GPS spoofing (rider at home) | Mock location flag + near-zero accelerometer + cell tower mismatch | High/Critical score → hold |
| Duplicate claim for same event | `(Rider_ID + Event_ID + Zone_ID)` already in DB | Hard reject at database |
| Policy purchased after event | Purchase timestamp > event start − waiting period | Policy invalid for that event |
| Coordinated syndicate fraud | ≥30 riders from same zone claim simultaneously; GPS interval clustering | Zone fraud alert; cluster quarantined |
| Idle rider claiming disruption | >15 min idle during claimed window | Layer 2 flag → reduced/zero payout |
| Rider outside disruption zone | GPS centroid in zone <50% of event duration | Hard eligibility exclusion |

### Fraud Detection Flow

![Fraud Detection](images/frauddetection.jpg)

### ML Risk Engine

![ML Risk Engine](images/riskengine.jpg)

---

## 12. System Architecture

### Architecture Diagram

![Architecture Diagram](images/nnew.png)

### Full System Overview

```
                    EXTERNAL DATA SOURCES
   ┌──────────┬──────────┬──────────┬──────────┬──────────┐
   │ Weather  │   AQI    │  GPS /   │ Traffic  │  Flood   │
   │   API    │   API    │  Maps    │   API    │  Alerts  │
   └────┬─────┴────┬─────┴────┬─────┴────┬─────┴────┬─────┘
        └──────────┴──────────┴──────────┴──────────┘
                              ↓
              ┌──────────────────────────────────────────────┐
              │         KAVACH CORE ENGINE (Backend)         │
              │                                              │
              │  Vighna Engine    → Disruption Detection     │
              │  Jokhim Engine    → Risk Scoring             │
              │  Vishwas Engine   → Fraud Detection          │
              │  Payout Engine    → Compensation Logic       │
              │  Activity Engine  → Work Verification        │
              │  ML Engine        → Prediction Pipeline      │
              └──────────────────────┬───────────────────────┘
                                     ↓
              ┌──────────────────────────────────────────────┐
              │       DATA LAYER — Supabase + PostGIS        │
              │  Users · Zones · Policies · Claims           │
              │  GPS Logs · Risk Scores · Audit Trail        │
              └──────────────────────┬───────────────────────┘
                                     ↓
              ┌──────────────────────────────────────────────┐
              │            CLIENT APPLICATIONS               │
              │  Rider App (React Native — Mobile)           │
              │  Admin Dashboard (React — Web)               │
              │  Notification System (Firebase FCM)          │
              │  Payment System (Razorpay)                   │
              └──────────────────────────────────────────────┘
```

### Engine Descriptions

| Engine | Core Function | Key Inputs | Key Outputs |
|---|---|---|---|
| **Vighna Engine** | Monitors environmental + social disruption signals at zone level | Weather API, AQI, Traffic, Flood alerts | Disruption event records per zone |
| **Jokhim Engine** | Calculates dynamic zone risk scores; drives premium pricing | Historical env. data, ML risk model | Zone risk score (0–100), premium tier |
| **Vishwas Engine** | Multi-layer fraud detection before every payout | GPS logs, accelerometer, claim history | Fraud score (Low/Med/High/Critical) |
| **Payout Engine** | Computes hybrid payout; enforces all caps | Income baseline, hybrid score, disruption duration | Final payout ₹ |
| **Activity Engine** | Validates genuine rider presence during disruption window | GPS session data, zone boundaries | Eligibility decision (Yes/No) |
| **ML Engine** | Unified inference layer for all predictive models | All data sources | Risk score, fraud score, income estimate, forecast |

### Database Schema (Key Tables)

| Table | Key Fields | Purpose |
|---|---|---|
| `users` | rider_id, name, phone, zone_id, kyc_status | Rider profiles and onboarding state |
| `zones` | zone_id, polygon (PostGIS), risk_score, premium_tier | 2×2 km monitoring grid cells |
| `policies` | policy_id, rider_id, zone_id, week_start, premium_paid, status | Weekly coverage records |
| `disruption_events` | event_id, zone_id, type, start_time, end_time, env_score | Confirmed disruption events |
| `claims` | claim_id, rider_id, event_id, hybrid_score, payout_amount, fraud_score, status | Payout records |
| `gps_logs` | log_id, rider_id, lat, lng, speed, timestamp, session_id | Raw GPS tracking data |
| `savings_pool` | pool_id, rider_id, week_id, balance, deductions, interest, status | Micro-savings tracking |
| `audit_trail` | audit_id, entity_type, entity_id, action, actor, timestamp | Full immutable audit log |

### Hyperlocal Zone Model

| Property | Detail |
|---|---|
| Grid size | 2 km × 2 km per monitoring cell |
| Chennai zone count | ~185 active monitoring zones |
| Zone assignment | GPS centroid of rider's active sessions → primary zone |
| Independent evaluation | Each zone evaluated separately — Velachery flooding ≠ T. Nagar flooding |
| Spatial queries | PostGIS `ST_Within` for GPS-to-zone; `ST_Intersects` for adjacency alerts |

**Why 2×2 km is the optimal grid size:**

| Data Source | Native Resolution | Compatible? |
|---|---|---|
| OpenWeatherMap | ~1 km | ✅ Yes |
| CPCB Pollution Stations | 3–5 km spacing | ✅ Close enough |
| Swiggy / Zepto dark store radii | 1.5–3 km | ✅ Matches well |
| Urban flood patterns (Chennai) | Sub-2 km variation | ✅ Captures hyperlocal differences |

### Application Workflow

```
RIDER JOURNEY

Sign Up & KYC (name, phone, zone, vehicle, Aadhaar)
         ↓
Zone Assigned · Income Baseline Estimated (ML Engine)
         ↓
Weekly Policy Purchase (select tier · pay via Razorpay)
   → 12–24 hr waiting period → Coverage: ACTIVE
         ↓
Start Work Session (GPS background tracking begins)
         ↓
Every 15–30 min: Zone conditions checked
         ↓
Disruption threshold crossed in rider's zone?
   YES                                      NO
    ↓                                        ↓
GPS presence verified ≥50% in zone      Continue session
Activity Engine confirms active work
Hybrid Score computed
Fraud check: Low/Medium → pay; High → hold; Critical → block
Payout ₹ released via Razorpay → UPI
Push notification: "₹179 credited to your account"
         ↓
Session End → Weekly Summary Dashboard
  Total earnings · Total protected income · Pool balance / interest return
```

---

## 13. MVP Features

Every feature maps to one of three value pillars: **Protect** (insurance core), **Predict** (AI intelligence), or **Empower** (financial growth).

| # | Feature | Pillar | Description |
|---|---|---|---|
| 1 | **Aay Darpan** (Earnings Dashboard) | Empower | Real-time daily/weekly earnings with protected income overlay and full payout history |
| 2 | **Jokhim Soochak** (Risk Indicator) | Predict | Live risk feed from weather and AQI; colour-coded zone status (Green / Yellow / Red) |
| 3 | **Suraksha Kavach** (Smart Insurance) | Protect | Auto-activates weekly coverage; triggers instant UPI payouts during verified disruptions |
| 4 | **Swayam Claim** (Auto Claim System) | Protect | Zero-touch parametric claim processing; live status: Active / Under Review / Approved / Held |
| 5 | **Sahi Chayan** (Smart Order Selection) | Predict | AI-powered order recommendations: best earnings potential, lowest current risk zone |
| 6 | **Surakshit Kshetra Map** (Safe Zone Map) | Predict | Live heatmap of low/medium/high-risk working zones; updated every 15 min |
| 7 | **AI Margdarshak** (AI Assistant) | Predict | Recommends optimal working windows and zones for maximum earnings on any given day |
| 8 | **Vishwas Score** (Trust Score) | Protect | Fraud detection reliability score; visible to platform partners for accountability |
| 9 | **Kaarya Pradarshan** (Performance Tracker) | Empower | Tracks work efficiency, delivery patterns, and earnings trends over time |
| 10 | **SurakshaPay** (Savings Wallet) | Empower | Micro-savings engine; per-order deduction tracking, pool balance, withdrawal history |
| 11 | **Bonus Vaapsi** (Cashback Rewards) | Empower | Pool returned with 4–5% interest on disruption-free weeks |
| 12 | **Bhasha Sathi** (Language Assistant) | Empower | Multilingual voice support: Tamil, Hindi, Kannada, Telugu |
| 13 | **Smart Suchna** (Smart Notifications) | Protect | Real-time push alerts: disruption warnings, payout confirmations, earning opportunities |

---

## Mobile Application Preview

<img width="1536" height="1024" alt="mob" src="https://github.com/user-attachments/assets/77868d3a-869f-414a-a637-24db15b9f1d9" />

---

## 14. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Mobile App** | React Native | Cross-platform; background GPS; offline-tolerant; optimised for ₹10k–₹14k Android range |
| **Admin Dashboard** | React (Web) | Insurer / admin interface; real-time zone monitoring, fraud review queue, loss ratio analytics |
| **Backend API** | FastAPI (Python) + Node.js | FastAPI for ML inference endpoints (async, Python-native); Node.js for auth and business logic |
| **Database** | Supabase (PostgreSQL) | Managed Postgres; built-in auth; real-time subscriptions; Row-Level Security for per-rider data isolation |
| **Geospatial** | PostGIS (via Supabase) | Zone mapping; GPS-to-zone assignment; `ST_Within` / `ST_DWithin` for hyperlocal spatial queries |
| **ML / AI** | Python · scikit-learn · Facebook Prophet | Gradient Boosting (risk + income); Isolation Forest (fraud); Prophet (48-hr forecasting) |
| **Weather API** | OpenWeatherMap (free tier) | Rainfall, temperature, wind speed, storm alerts at ~1 km resolution |
| **Pollution API** | AQICN (free tier) | Real-time AQI by city zone; CPCB station data integration |
| **Payments** | Razorpay | Premium collection + instant payout disbursement; sandbox for Phase 1–2; production in Phase 3 |
| **Notifications** | Firebase Cloud Messaging (FCM) | Push alerts: disruption warnings, payout confirmations, risk notifications |
| **DevOps** | Docker + GitHub Actions | Containerised deployment; CI/CD pipeline for ML model updates and backend releases |

### Why Mobile-First?

| User Reality | GigKavach Response |
|---|---|
| ₹10,000–₹14,000 Android phone | App optimised for low-end devices; minimal RAM footprint |
| Connectivity drops during rain | Offline-tolerant GPS session tracking; local queue for data sync when signal returns |
| App minimised while riding | Background location services persist through minimisation |
| One-handed use between deliveries | Single-thumb navigation; large touch targets; minimal text input |
| Tamil-speaking primary user | Tamil UI default; voice commands available in Tamil |

---

## 15. Development Plan

### Phase 1 — Core Backend & Data Ingestion ✅ Completed

| Task | Status |
|---|---|
| Node.js business logic + authentication setup | ✅ Done |
| API Gateway configuration for secure request routing | ✅ Done |
| Data storage schema: Users, Location, Earnings, Risk Scores | ✅ Done |
| Integration: Weather API, AQI API, Traffic API | ✅ Done |
| Basic Admin Dashboard for live zone tracking | ✅ Done |
| Core architecture planning and finalisation | ✅ Done |

### Phase 2 — ML Engine & Automated Triggers 🔄 In Progress

| Task | Status |
|---|---|
| ML Engine: data preprocessing pipelines + income estimation | 🔄 In Progress |
| Risk prediction modelling via real-time API data | 🔄 In Progress |
| Isolation Forest fraud detection deployment | ⏳ Upcoming |
| Trigger Engine: 5 automated disruption triggers | ⏳ Upcoming |
| Automated ML → Trigger pipeline (risk score → premium assignment) | ⏳ Upcoming |
| Risk heatmap integration on Admin Dashboard | ⏳ Upcoming |

### Phase 3 — Client Applications & Payment Execution 📋 Upcoming

| Task | Status |
|---|---|
| Rider Mobile App: onboarding, KYC, policy purchase, session tracking | 📋 Planned |
| Full backend linkage: GPS → policy → disruption → payout | 📋 Planned |
| Razorpay integration: premium collection + instant UPI payout | 📋 Planned |
| End-to-end auto-payout trigger testing (simulated disruption → payout) | 📋 Planned |
| Payout analytics module on Admin Dashboard | 📋 Planned |
| Prophet-based 48-hr forecasting + proactive notifications | 📋 Planned |
| Final simulation: live trigger → fraud check → instant payout demo | 📋 Planned |

---

## 16. Key Design Decisions

### Parametric Over Traditional Insurance

Ravi's disruptions are **simultaneous** (hundreds of riders at once), **short-duration** (2–6 hours), and **objectively measurable** (third-party APIs). Traditional insurance fails all three: individual loss assessment is too slow, too expensive, and wholly impractical for events that resolve within a shift. Parametric triggers fire automatically when thresholds are crossed, delivering same-day compensation. The rider never files a form.

### Weekly Pricing Cycle Alignment

Gig workers receive platform earnings weekly. A monthly premium requires capital many riders don't hold at month-start. ₹35/week aligns the premium payment timing to earnings receipt, reducing both the psychological and financial barrier to adoption.

### Hybrid Model Over Single-Signal Triggers

Single environmental triggers create basis risk in both directions. Combining income deviation (50%), activity drop (30%), and environmental score (20%) triangulates actual impact from three independent signals — the same principle used in institutional parametric products like those from Swiss Re and Arbol.

### 2×2 km Zone Grid

This is the smallest grid size at which weather API data, CPCB pollution data, and GPS session data are all simultaneously reliable. Ward-level boundaries (15–20 km²) are too coarse — Velachery floods while T. Nagar stays dry. Individual GPS points are too granular for zone-level risk aggregation. The 2×2 km grid is the precision sweet spot.

### Micro-Savings as Engagement Engine

Pure insurance products see low retention when riders don't claim. The savings return model solves this: disruption-free riders receive their pool back with interest. This creates a **positive outcome in every scenario** — critical for trust and word-of-mouth adoption in a community where financial product skepticism is high.

---

## 17. Future Scope & Scalability

### Geographic Expansion Roadmap

| Phase | Cities | Addressable Riders |
|---|---|---|
| Phase 1 (Current) | Chennai | ~80,000 |
| Phase 2 | Chennai + Bengaluru | ~180,000 |
| Phase 3 | + Mumbai, Hyderabad | ~320,000 |
| Phase 4 | Top 10 Indian cities | ~650,000+ |

The 2×2 km zone grid is city-agnostic. Adding a city requires only zone boundary data (OpenStreetMap), historical climate data (IMD archive), and platform zone mapping — no architectural changes.

### Product Depth Expansion

| Feature | Description | Timeline |
|---|---|---|
| Social disruption coverage | Curfews, strikes, zone closures via civic feeds | Phase 2 |
| 48-hr forecasting alerts | Prophet model: proactive warnings before disruptions hit | Phase 3 |
| Platform API integration | Direct Swiggy/Zomato order data replaces proxy income estimation | Partnership-dependent |
| Long-term savings tiers | Annual goal savings: vehicle maintenance fund, emergency fund | Phase 3 |
| Group policies | Co-purchase discount for riders in the same zone | Phase 4 |
| Microfinance bridge | Zero-interest advance against next week's payout during severe disruption weeks | Phase 4 |

### Regulatory & Partnership Pathway

| Milestone | Detail |
|---|---|
| IRDAI Sandbox Registration | Apply under IRDAI's Regulatory Sandbox for InsurTech; parametric products are explicitly supported |
| Reinsurance Backing | Partner with a reinsurer (Swiss Re, Munich Re) for high-risk zone loss ratio coverage |
| Platform B2B Licensing | License GigKavach API to Swiggy/Zomato/Zepto for native in-app insurance offering |
| SEBI-Registered Savings Partner | Partner with RBI-registered entity to manage savings pool for full regulatory compliance |

### Cross-Sector Expansion

The GigKavach core engine — parametric triggers, zone-level risk scoring, hybrid payout model — is not delivery-specific. The same architecture addresses identical income vulnerability across:

| Sector | Worker | Primary Disruption |
|---|---|---|
| Construction | Daily-wage labourers | Rainfall halting site work |
| Auto-rickshaw / cab | Drivers | Flooding, curfews, protests |
| Street vendors | Self-employed traders | Heat, rain, zone closures |
| Agricultural daily labour | Farm workers | Extreme heat, unseasonal rain |

---

## Summary

GigKavach addresses a structural failure in how India's gig economy manages income risk. Millions of workers who power daily urban logistics have zero protection when external events make working impossible — and the losses are individually small, collectively enormous, and entirely invisible to existing financial products.

By combining **parametric insurance** (instant, automatic, data-driven), **AI-powered zone risk scoring** (weekly premiums calibrated to historical disruption), **behavioural fraud detection** (multi-layer GPS and activity validation), and a **micro-savings model** (pool returned with interest on clean weeks), GigKavach transforms a one-sided financial risk into a managed, fair, and scalable safety net.

For Ravi and the 23 million gig workers who will depend on platforms by 2030, GigKavach is not just a product — it is the financial infrastructure that should have existed from the start.

---

> **Bug_Hunter** — *Building intelligent systems that protect, predict, and empower gig workers in real time.*
