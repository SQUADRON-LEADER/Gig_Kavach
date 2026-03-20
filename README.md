<img width="1536" height="1024" alt="ChatGPT Image Mar 20, 2026, 03_53_03 PM" src="https://github.com/user-attachments/assets/bd29f743-8f85-4faf-9c00-65a942338c9d" />

# GigKavach — AI-Powered Income Protection & Smart Savings for Gig Workers

> **Guidewire DEVTrails 2026 · Phase 1 Submission**
> Team: **Bug_Hunter**

---

## The Problem We're Solving

Meet **Rahul, 25, a delivery partner for Zepto in BTM Layout, Bengaluru.** He rides 10–11 hours a day, completes 15–20 deliveries, and earns between ₹900–₹1,100 on a productive day. There is no salary, no paid leave, no employer-provided safety net. Every rupee he earns is the direct result of hours spent on the road.

Then the rain comes.

Within 90 minutes of heavy rainfall, BTM Layout is waterlogged. Orders stop flowing. Rahul pulls over. He earns ₹180 that day — not because he stopped trying, but because the environment made it impossible to work. No insurance policy covers this. No platform steps in. The loss is entirely and silently his.

This is not an edge case. **India has 7.7 million gig workers today**, projected to reach **23.5 million by 2029–30** (NITI Aayog, 2022). Delivery partners across food, grocery, and Q-commerce platforms form the fastest-growing labour segment in the country. They work entirely outdoors, earn strictly per delivery, and carry zero income protection against events beyond their control. Existing insurance products cover vehicles, health, and accidents. **No product today covers lost daily earnings caused by external disruptions.**

GigKavach closes that gap — with parametric insurance, AI-driven risk assessment, and an integrated micro-savings model built specifically for the gig economy.

---

## What GigKavach Builds

GigKavach is a **hyperlocal, AI-powered parametric income protection and savings platform** for platform-based delivery riders. It continuously monitors environmental conditions across delivery zones, automatically detects disruption events, verifies rider activity through GPS data, and releases instant compensation — all without the rider filing a single claim form.

Beyond insurance, GigKavach introduces a **micro-savings model**: small per-order deductions build a weekly protection pool. If a disruption occurs, the pool funds an instant payout. If the week passes disruption-free, the rider's savings are returned with interest — turning protection into a financial habit.

**Coverage scope:** Lost income from external disruptions only. Health, vehicle, and accident claims are strictly excluded per platform guidelines.
**Pricing model:** Weekly premiums, aligned to the gig worker's earnings cycle.
**Payout model:** Fully automated and parametric — triggered by verified data, not paperwork.

---

## How GigKavach Works (End-to-End Flow)

```
Rahul completes a delivery
        ↓
₹2–₹5 micro-deduction per order → Weekly Savings Pool
        ↓
Coverage Activated
        ↓
Continuous Disruption Monitoring (Rain · AQI · Heat · Traffic · Storm)
        ↓
        ├── Disruption Detected?
        │       YES → AI calculates payout (₹200–₹400/day)
        │             GPS + activity verified
        │             Fraud checks pass
        │             → Instant UPI payout to Rahul
        │
        └── No Disruption?
                → Week ends normally
                → 10% platform service fee deducted
                → 4–5% interest added to remaining pool
                → Savings + Interest returned to Rahul
```

This dual-outcome model means GigKavach is never a pure cost for the worker — it either protects their income during bad days or grows their savings during good ones.

---

## Persona: Who We Are Protecting

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
| **Current Insurance** | None — no income protection |
| **Key Vulnerabilities** | Heavy rain (Oct–Dec), heat waves (May–Jun) |

### Why Food & Q-Commerce Riders?

Delivery riders operate in some of the most volatile income environments of any profession. Their earnings are directly and immediately tied to:

- **Weather conditions** — rain halts operations faster than any policy can respond
- **Local demand patterns** — hyperlocal zone blockages reduce orders within minutes
- **Road accessibility** — a single waterlogged underpass can shut down an entire shift

In dense urban areas, even a **small disruption within 1 km** of a rider's operating zone can eliminate 60–70% of their earning potential for that window. Q-commerce and food delivery riders are especially exposed because their delivery radii are tight (1.5–3 km), making hyperlocal conditions disproportionately impactful.

### Ravi's Disruption Scenario (Worked Example)

| Condition | Deliveries/hr | Rate/Delivery | Hourly Earnings |
|---|---|---|---|
| Normal Day | 3 | ₹32 | ₹96 |
| Heavy Rain (70mm in 2–3 hrs) | 1 | ₹32 | ₹32 |

- **Disruption Window:** 3 hours
- **Estimated Income Loss:** ₹192
- **GigKavach Estimated Payout:** ₹140–₹175 (hybrid model)

---

## Core Disruptions Covered

GigKavach protects against **5 objectively measurable disruptions** that directly reduce delivery activity in Chennai. Each threshold is verifiable via third-party APIs and calibrated to the actual point at which delivery performance degrades.

| # | Disruption | Trigger Threshold | Monitoring Frequency | Risk Level |
|---|---|---|---|---|
| 1 | Heavy Rainfall | ≥ 40 mm within 3 hrs | Every 15 min | 🔴 High |
| 2 | Urban Waterlogging | Rain + low-lying zone flag | Every 15 min | 🔴 High |
| 3 | Extreme Heat | ≥ 42°C for ≥ 2 hrs | Every 30 min | 🟡 Medium |
| 4 | Air Pollution | AQI ≥ 250 for ≥ 6 hrs | Every 1 hr | 🟢 Low |
| 5 | Strong Winds / Storm | Wind ≥ 50 km/h | Event-based | 🟠 Moderate |

**Selection rationale:** These five disruptions are objectively measurable via public APIs, historically frequent in Chennai's climate profile, and directly correlated with measurable drops in delivery completion rates. Human-created disruptions (curfews, strikes, zone closures) are covered in Phase 2 expansion.

---

## Weekly Premium Model

### Design Philosophy

Premiums are calculated once per week based on the rider's primary delivery zone using historical environmental data — not real-time spikes. This approach ensures:

- **Stable, predictable costs** for the worker (no mid-week surprises)
- **Actuarially sound pricing** grounded in historical patterns
- **Seasonal recalibration** without day-to-day volatility

### Zone Risk Score Formula

The core of GigKavach's premium engine is a weighted risk score computed per zone by our ML model (Gradient Boosting):

```
Risk Score = (Rain Risk   × 0.30)
           + (Flood Risk  × 0.25)
           + (Heat Risk   × 0.20)
           + (Traffic Risk × 0.15)
           + (Storm Risk  × 0.10)
```

### Worked Example — Velachery, Chennai

| Risk Factor | Score (0–100) | Weight | Contribution |
|---|---|---|---|
| Rain Risk | 65 | 0.30 | 19.5 |
| Flood Risk | 60 | 0.25 | 15.0 |
| Heat Risk | 40 | 0.20 | 8.0 |
| Traffic Risk | 35 | 0.15 | 5.25 |
| Storm Risk | 25 | 0.10 | 2.5 |
| **Total Zone Score** | | | **50.25 → Moderate** |

### Weekly Premium Tiers

| Risk Category | Score Range | Weekly Premium | Coverage Limit |
|---|---|---|---|
| Low Risk | 0–30 | ₹20 | ₹1,000 |
| Moderate Risk | 31–50 | ₹35 | ₹1,500 |
| High Risk | 51–70 | ₹50 | ₹2,000 |
| Very High Risk | 71–85 | ₹70 | ₹2,000 |
| Extreme Risk | 86–100 | ₹90 | ₹2,000 |

> **For Ravi (Velachery):** ₹35/week → ₹1,500 weekly coverage. Less than the cost of one meal out, for a full week of income protection.

### Seasonal Adjustments

Applied at the start of each week to keep pricing climatically honest:

- **Monsoon (Oct–Dec):** Rain risk +10%
- **Summer (May–Jun):** Heat risk +10%
- **Winter (Jan–Feb):** Pollution risk +10%

Premiums are locked on purchase for the week. Real-time disruption events feed back into the zone's historical data, adjusting future weekly recalculations through the ML pipeline — so pricing improves continuously without exposing riders to intra-week shocks.

### Payout Caps

| Level | Limit |
|---|---|
| Per Hour | ₹90 |
| Per Event | ₹1,200 |
| Per Week | ₹1,500 |
| Per Month | ₹5,000 |

---

## Parametric Trigger & Payout Logic

### Automated Five-Step Flow

```
1. Poll environmental APIs (Rain: 15 min · Temp: 30 min · AQI: 1 hr)
         ↓
2. Evaluate thresholds per delivery zone
         ↓
3. Compute zone disruption score
   Env_Score = (0.4 × Rain_norm) + (0.3 × AQI_norm) + (0.3 × Traffic_norm)
   Disruption confirmed: Env_Score ≥ 0.6 AND Activity_Drop ≥ 0.4
         ↓
4. Verify rider eligibility
   GPS presence in disruption zone ≥ 50% of event duration
   Active session · Policy active · No fraud flags
         ↓
5. Compute payout via Hybrid Model → disburse via UPI
```

### Why the Hybrid Model?

A single-signal parametric trigger creates **basis risk** — the trigger fires but the rider wasn't actually impacted, or the rider was impacted but the trigger missed the threshold. GigKavach uses a **weighted composite of three independent signals** to triangulate actual income impact with precision:

```
Hybrid Score = (0.5 × Income Deviation)
             + (0.3 × Activity Drop)
             + (0.2 × Environmental Score)

Final Payout = Expected Income × Hybrid Score × Lost Hours
             (subject to hourly, event, and weekly caps)
```

### Ravi's Payout Calculation (Worked Example)

| Signal | Calculation | Score |
|---|---|---|
| Income Deviation | (₹90 − ₹32) / ₹90 | 0.64 |
| Activity Drop | (16 − 5) / 16 | 0.69 |
| Environmental Score | Combined API factors | 0.70 |
| **Hybrid Score** | 0.5×0.64 + 0.3×0.69 + 0.2×0.70 | **0.66** |
| **Final Payout** | ₹90 × 0.66 × 3 hrs | **₹178** ✓ |

---

## AI / ML Integration

GigKavach's intelligence layer consists of four purpose-built models that work in concert across risk assessment, fraud prevention, income estimation, and disruption forecasting.

### 1. Risk Scoring Engine — Zone-Level Disruption Prediction

| Attribute | Detail |
|---|---|
| **Model** | Gradient Boosting (`scikit-learn`) |
| **Input Features** | Rainfall frequency (3–5 yr historical), flood event count, heatwave days/yr, winter AQI baseline, storm frequency, zone elevation, drainage quality flag |
| **Output** | Zone risk score (0–100) → sole input to weekly premium tier lookup |
| **Retraining Cadence** | Weekly, on new disruption event data |

**Why Gradient Boosting?** Flood risk is non-linear in rainfall — it spikes sharply when drainage capacity is exceeded rather than scaling proportionally. Gradient Boosting captures these threshold effects and outperforms linear regression on structured environmental datasets of this size. The ML model's score is the **sole driver** of premium calculation — there is no separate manual pricing step.

### 2. Fraud Detection Engine — GPS & Behavioural Anomaly Detection

| Attribute | Detail |
|---|---|
| **Model** | Isolation Forest + rule-based validation layer |
| **Input Features** | GPS speed between consecutive points, location jump distance/min, idle time ratio, zone boundary crossing frequency, historical claim rate per rider |
| **Output** | Fraud risk score: Low / Medium / High / Critical → payout held at Critical |

**Why Isolation Forest?** It is unsupervised — no labelled fraud examples are needed at launch. It naturally surfaces outliers (e.g., a rider whose GPS logs show 120 km/h through Velachery) and scales gracefully as claim data accumulates.

### 3. Income Baseline Estimator — Per-Zone, Per-Hour Expected Earnings

| Attribute | Detail |
|---|---|
| **Model** | Gradient Boosting regression |
| **Input Features** | POI density (restaurants, dark stores), population density, road connectivity index, historical order volume, time of day, day of week |
| **Output** | `Expected_Income(zone, time)` — baseline for payout calculation |

Platform earnings APIs are not publicly available. GigKavach uses proxy features (POI density × connectivity / traffic factor) that exhibit strong correlation with actual delivery volume in urban Q-commerce zones.

### 4. Disruption Forecasting — 48-Hour Predictive Alerts (Phase 3)

| Attribute | Detail |
|---|---|
| **Model** | Facebook Prophet (time-series) |
| **Input Features** | Historical weather data, seasonal patterns, IMD forecast signals |
| **Output** | Probability of disruption event in next 48 hrs → proactive rider notifications + dynamic risk alerts |

---

## Fraud Detection Architecture

Every payout passes through a **four-layer validation pipeline** before disbursement. No single layer alone can block a legitimate claim — only a combination of correlated signals elevates the fraud score to a blocking threshold.

### Layer 1 — GPS Anomaly Detection
- Speed check: >80 km/h between consecutive GPS points → Flag
- Location jump: >5 km displacement within 1 minute → Flag
- Mock location detection: Device-level check for GPS spoofing apps / developer mode active
- Path continuity: Non-road trajectories flagged via map-matching

### Layer 2 — Activity Verification
- Minimum distance: >1 km covered within any 30-minute window
- Idle threshold: <15 minutes of continuous idle during an active session
- Speed range: 10–40 km/h (consistent with urban two-wheeler delivery profiles)
- Zone presence: Rider must be physically inside the disruption zone for ≥50% of the event duration

### Layer 3 — Duplicate Claim Prevention
- Each disruption event is assigned a unique `Event_ID`
- Composite uniqueness key: `(Rider_ID + Event_ID + Zone_ID)` — duplicate records are rejected at the database level
- Enforced: one payout per rider per disruption event, no exceptions

### Layer 4 — Policy Validation
- An active weekly policy must exist at the exact time of the disruption
- A **12–24 hr waiting period** is enforced post-purchase to prevent retroactive policy buying

### ML Risk Engine

![ML Risk Engine](images/riskengine.jpg)

### Fraud Score → System Action

| Risk Level | System Response |
|---|---|
| **Low** | Session monitored; payout proceeds automatically |
| **Medium** | Session flagged; payout proceeds with full audit log |
| **High** | Payout held 24 hrs; manual review queued; rider notified |
| **Critical** | Payout blocked; account explicitly flagged for investigation |

### Fraud Detection Flow

![Fraud Detection](images/frauddetection.jpg)

---

## System Architecture

### Architecture Diagram

![Architecture Diagram](images/nnew.png)

### Component Overview

```
External Data Sources
  Weather API · AQI Data · GPS / Maps · Traffic APIs · Flood Alerts
                              ↓
              Kavach Core Engine (Backend System)
    ┌─────────────────────────────────────────────────┐
    │  Vighna Engine    →  Disruption Detection       │
    │  Jokhim Engine    →  Risk Scoring               │
    │  Vishwas Engine   →  Fraud Detection            │
    │  Payout Engine    →  Compensation Logic         │
    │  Activity Engine  →  Work Session Verification  │
    │  ML Engine        →  Prediction Pipeline        │
    └─────────────────────────────────────────────────┘
                              ↓
              Data Layer — Supabase + PostGIS
       Users · Zones · Policies · Claims · GPS Logs · Audit Logs
                              ↓
         ┌──────────────────────────────────────────┐
         │  Rider App (React Native — Mobile)       │
         │  Admin Dashboard (React — Web)           │
         │  Notification System (Firebase FCM)      │
         │  Payment System (Razorpay)               │
         └──────────────────────────────────────────┘
```

### Engine Descriptions

| Engine | Role |
|---|---|
| **Vighna Engine** | Continuously monitors environmental and social disruption signals at hyperlocal zone level |
| **Jokhim Engine** | Calculates dynamic zone risk scores from environmental data and historical patterns; drives weekly premium pricing |
| **Vishwas Engine** | Detects fraudulent activity using GPS anomaly detection, behavioural analysis, and multi-layer validation |
| **Payout Engine** | Computes compensation using the hybrid model — combines income deviation, activity drop, and environmental score |
| **Activity Engine** | Validates genuine rider presence and activity during claimed disruption windows |
| **ML Engine** | Houses all predictive models: risk scoring, income estimation, fraud detection, and disruption forecasting |

### Hyperlocal Zone Model

GigKavach divides the city into **2 km × 2 km monitoring grid cells**, each evaluated independently. This scale was chosen deliberately:

- Weather APIs provide ~1 km resolution data
- Urban flooding in Chennai is highly localised (Velachery floods while Adyar remains dry)
- Blinkit / Zepto / Swiggy dark stores serve 1.5–3 km radii
- CPCB pollution station spacing averages 3–5 km

This means disruption detection, risk scoring, and payout calculation all operate at the granularity that actually matches a rider's real working environment.

### Application Workflow

```
User Signup & KYC (name, phone, zone, vehicle)
           ↓
Zone Assignment + Income Baseline Estimated
           ↓
Weekly Policy Purchase (Razorpay)
   → 12–24 hr waiting period → Coverage Active
           ↓
Work Session Begins (GPS tracking starts)
           ↓
Background: Zone monitored every 15–30 min
           ↓
Disruption Detected?
   YES → Rider Eligibility Verified (GPS + Activity + Policy)
       → Hybrid Model Calculates Payout
       → Fraud Checks Pass?
           YES → Razorpay Disburse → Push Notification
           NO  → Held for Review (rider notified)
   NO  → Session Continues
           ↓
Session End → Earnings Summary + Payout History Displayed
```

---

## MVP Features

GigKavach's feature set is designed around a single principle: every feature must directly improve the gig worker's financial stability or reduce their exposure to income risk.

| # | Feature (Hindi Name) | Description |
|---|---|---|
| 1 | **Aay Darpan** (Earnings Dashboard) | Real-time daily and weekly earnings view with protected income tracking |
| 2 | **Jokhim Soochak** (Risk Indicator) | Live risk feed using weather and AQI data; colour-coded zone alerts |
| 3 | **Suraksha Kavach** (Smart Insurance) | Auto-activates weekly coverage; triggers instant payouts on verified disruptions |
| 4 | **Swayam Claim** (Auto Claim System) | Zero-touch claim processing with real-time status visibility |
| 5 | **Sahi Chayan** (Smart Order Selection) | AI-powered order recommendations based on earnings potential, distance, and demand |
| 6 | **Surakshit Kshetra Map** (Safe Zone Map) | Live heatmap of low, medium, and high-risk working zones |
| 7 | **AI Margdarshak** (AI Assistant) | Suggests optimal working times and zones for maximum earnings on any given day |
| 8 | **Vishwas Score** (Trust Score) | Fraud detection score with rider reliability rating for platform transparency |
| 9 | **Kaarya Pradarshan** (Performance Tracker) | Monitors work efficiency and delivery patterns over time |
| 10 | **SurakshaPay** (Savings Wallet) | Micro-savings engine with easy deposit tracking and withdrawal |
| 11 | **Bonus Vaapsi** (Cashback Rewards) | Returns savings with 4–5% interest if no claims are made in the week |
| 12 | **Bhasha Sathi** (Language Assistant) | Multilingual voice support (Tamil, Hindi, Kannada, Telugu) for accessibility |
| 13 | **Smart Suchna** (Smart Notifications) | Real-time push alerts for risks, disruptions, and earning opportunities |

---

## Mobile Application Preview

<img width="1536" height="1024" alt="mob" src="https://github.com/user-attachments/assets/77868d3a-869f-414a-a637-24db15b9f1d9" />

---

## Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Mobile App** | React Native | Cross-platform; background GPS tracking; optimised for low-end Android devices with intermittent connectivity |
| **Web Dashboard** | React | Admin monitoring interface; insurers work at desks, not on phones |
| **Backend API** | FastAPI / Node.js | Async-first architecture ideal for real-time polling loops and event-driven triggers |
| **Database** | Supabase (PostgreSQL) | Managed Postgres with built-in auth, real-time subscriptions, and Row-Level Security |
| **Geospatial** | PostGIS (via Supabase) | Zone mapping, GPS-to-zone assignment, spatial queries for hyperlocal disruption detection |
| **AI / ML** | Python · scikit-learn · Prophet | Gradient Boosting for risk scoring and fraud; Prophet for 48-hr disruption forecasting |
| **Weather API** | OpenWeatherMap | Rainfall, temperature, wind speed, storm alerts |
| **Pollution API** | AQICN | Real-time AQI data per city zone |
| **Payments** | Razorpay | Premium collection and instant payout disbursement (sandbox for Phase 1–2) |
| **Notifications** | Firebase Cloud Messaging | Push alerts for disruption events, payout confirmations, risk warnings |

### Why Mobile-First?

Ravi does not work at a desk. He uses a ₹10,000–₹14,000 Android phone, often with intermittent connectivity, in weather conditions that may be actively compromising signal quality. GigKavach's mobile app is designed with this reality in mind:

- Offline-tolerant GPS session tracking
- Background location services that persist through app minimisation
- Push notifications for disruption alerts during active shifts
- Single-handed UI navigation optimised for use between deliveries

---

## Development Plan

### Phase 1 — Core Backend & Data Ingestion ✅ Completed

- [x] Node.js business logic and authentication setup
- [x] API Gateway configuration for secure request routing
- [x] Data storage schema: User Profiles, Location Data, Earnings Data, Risk Scores
- [x] Integration with external APIs (Weather, AQI, Traffic)
- [x] Basic Admin Dashboard for live tracking
- [x] Core architecture planning and finalisation

### Phase 2 — ML Engine & Automated Triggers 🔄 In Progress

- [ ] ML Engine setup: data preprocessing pipelines, income estimation model
- [ ] Risk prediction modelling using real-time API data
- [ ] Statistical fraud detection deployment (Isolation Forest)
- [ ] Trigger Engine: Rain, AQI, Traffic, and Heat automated triggers
- [ ] Automated risk score evaluation pipeline (ML Engine → Trigger Engine)
- [ ] Risk heatmap integration on Admin Dashboard

### Phase 3 — Client Applications & Payment Execution 📋 Upcoming

- [ ] Rider Mobile App (React Native): onboarding, KYC, policy purchase, session tracking
- [ ] Full backend linkage: continuous GPS ingestion → policy management → disruption monitoring
- [ ] Razorpay integration: premium collection + instant payout to wallet / UPI
- [ ] End-to-end auto-payout trigger testing (Trigger Engine → Payment System)
- [ ] Payout analytics module on Admin Dashboard
- [ ] Final simulation: live disruption trigger → fraud verification → instant payout
- [ ] Prophet-based 48-hr disruption forecasting and proactive notifications

---

## Key Design Decisions

### Parametric Over Traditional Insurance

Ravi's income disruptions are simultaneous (affecting hundreds of riders at once), short-duration (3–8 hours), and objectively measurable via third-party data. Traditional insurance requires individual damage assessment — too slow, too expensive, and wholly impractical for events that resolve within a working shift. Parametric triggers fire automatically when thresholds are crossed, delivering compensation the same day. The rider never files a claim.

### Weekly Pricing Cycle

Gig workers are paid weekly by platforms. A monthly premium requires upfront capital many workers simply don't have at month-start. ₹35/week is a psychologically and financially accessible number, closely aligned with when workers actually receive their earnings.

### Hybrid Payout Model Over Single-Signal Triggers

Single environmental triggers create basis risk — the threshold fires but the specific rider may not have been impacted, or vice versa. Combining income deviation (50%), activity drop (30%), and environmental score (20%) triangulates actual impact from three independent data sources, minimising both false payouts and missed legitimate claims.

### 2 km × 2 km Zone Grid

Smaller than administrative ward boundaries (which average 15–20 km²), larger than individual GPS points. This is the smallest grid size at which weather APIs, CPCB pollution data, and GPS data are all simultaneously reliable — giving GigKavach the best possible resolution without degrading data quality.

---

## Future Scope & Scalability

| Dimension | Expansion Plan |
|---|---|
| **Geography** | Pilot in Chennai and Bengaluru; extend to Mumbai, Hyderabad, Delhi NCR using the same zone-grid model |
| **Disruption Types** | Add social disruptions: curfews, local strikes, sudden zone closures; integrate civic API feeds |
| **Platform Partnerships** | Direct API access to Swiggy / Zomato order data would replace proxy income estimation with actual earnings verification |
| **Savings Deepening** | Long-term savings tiers for annual goals (vehicle maintenance, emergency fund); integration with RBI-regulated micro-savings frameworks |
| **Regulatory Path** | Partner with IRDAI-licensed insurers under the parametric insurance sandbox; GigKavach operates as a tech layer, not a direct insurer |
| **Cross-Sector Expansion** | Construction daily-wage workers, auto-rickshaw drivers, and street vendors share identical income vulnerability profiles — the core engine generalises |

---

## Summary

GigKavach addresses a structural gap in India's gig economy: millions of workers who power daily urban logistics have no protection when external events make working impossible. By combining parametric insurance, AI-driven risk scoring, behavioural fraud detection, and a micro-savings model, GigKavach transforms a one-sided financial risk into a managed, data-driven safety net.

For Ravi and the 23 million gig workers who will depend on platforms by 2030, GigKavach is not just a product — it is the financial infrastructure that should have existed from the start.

---

> **Bug_Hunter** — *Building intelligent systems that protect, predict, and empower gig workers in real time.*
