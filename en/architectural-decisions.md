# Architectural Decisions

[← Back to Portal](../README.md) | [한국어](../ko/architectural-decisions.md)

The most impactful technical decisions I made at Bootalk — each one changed the trajectory of the platform.

---

## 1. Three Repos → One Monorepo

**Decision:** Consolidate web, mobile app, admin + partner webviews (Nonghyup, Lotte Card) into a single Turborepo + pnpm monorepo.

**Why it mattered:**
- Shared types between web and app drifted out of sync, causing runtime errors
- Every cross-app change required coordinating PRs across 3+ repos
- Partner webviews lived in isolated repos with no shared infrastructure
- No single source of truth for `@bootalk/common` utilities

**What I chose over alternatives:**
- ❌ **Keep separate repos + npm packages** — too much publish/version overhead for a 4-person team
- ❌ **Nx** — more opinionated than needed; Turborepo's caching was sufficient
- ✅ **Turborepo + pnpm workspaces** — minimal config, fast builds, works with Expo

**Result:**

```
frontend-monorepo/
├── apps/
│   ├── web/               (Next.js 16)
│   ├── app/               (Expo SDK 54)
│   ├── admin/             (Next.js 16)
│   ├── nonghyup/          ← migrated in
│   └── lotte/             ← migrated in
└── packages/
    └── common/            ← unified shared utilities
```

**Impact:** 594 PRs of systematic migration. Unified type system enabled the type safety campaign. Single CI/CD pipeline for all apps. Partner webview integrations went from days to hours.

> References: [Discussion #27](https://github.com/uitiorg/team-discussions/discussions/27) (monorepo milestone proposal), PRs [#737](https://github.com/uitiorg/frontend-monorepo/pull/737) (Lotte Card webview), [#753](https://github.com/uitiorg/frontend-monorepo/pull/753) (Nonghyup webview)

---

## 2. Bare React Native → Expo Managed Workflow

**Decision:** Migrate the mobile app from bare React Native to Expo SDK managed workflow via a 7-stage plan.

**Why it mattered:**
- Every code change required native iOS/Android rebuild (15-30 min)
- No OTA update capability — bug fixes required app store resubmission (1-3 days)
- React Navigation had version fragmentation (v4/v5/v6 coexisting)
- Native dependencies scattered across `ios/` and `android/` folders with no central config

**What I chose over alternatives:**
- ❌ **Stay on bare RN** — no OTA, slow CI, manual native config
- ❌ **CodePush** — being deprecated, doesn't solve the native dependency problem
- ✅ **Expo managed workflow** — OTA via EAS Update, CNG eliminates native folders, single `app.json` config

**The 7 stages:**

| Stage | What | Why this order |
|-------|------|----------------|
| 1 | Expo Dev Client | Enter ecosystem without code changes |
| 2 | React Navigation v6 | Unify fragmented navigation before touching native deps |
| 3 | Utility libraries → expo-* | Low-risk swaps (clipboard, netinfo, secure-store) |
| 4 | UI/Media libraries → expo-* | Higher-risk swaps (image, media-library, image-picker) |
| 5 | Config Plugins | Move iamport, Firebase, Facebook, AppsFlyer to app.json |
| 6 | Prebuild validation (CNG) | Remove ios/android from source control |
| 7 | EAS adoption | Cloud builds + OTA updates |

**Impact:** JS-only changes deploy in minutes via OTA. Critical bug fix (v3.4.15 contract report calculation) reached users same-day while store review was pending. No more local native toolchain required.

> References: [Issue #84](https://github.com/uitiorg/bootalk_app/issues/84) (7-stage plan), [Discussion #35](https://github.com/uitiorg/team-discussions/discussions/35) (feasibility analysis), [Discussion #45](https://github.com/uitiorg/team-discussions/discussions/45) (adoption report)

---

## 3. PageSpeed 20 → 80 via Systematic React Optimization

**Decision:** Apply Vercel's React performance best practices in a multi-phase campaign to fix bootalk.co.kr's failing Core Web Vitals.

**Why it mattered:**
- PageSpeed score ~20 — Google was penalizing search rankings
- LCP (Largest Contentful Paint) was catastrophic — users saw blank screens for seconds
- Bundle size was bloated from barrel exports and unused dependencies
- SSR waterfalls blocked rendering

**What I chose over alternatives:**
- ❌ **Rewrite in a different framework** — too risky, too slow for a running product
- ❌ **Add a CDN and call it done** — CDN helps static assets, not render-blocking JS
- ✅ **Systematic phase-by-phase optimization** — each phase measurable, reversible, shippable

**The phases:**

| Phase | Target | Key Change |
|-------|--------|------------|
| 2-7 | SSR waterfalls | Remove client-only code from server render path |
| 5.1+6.1 | LCP | Image optimization, GTM lazy loading |
| Bundle | JS size | Dynamic imports, eliminate barrel exports, remove react-spring |
| Skeleton | Perceived perf | Progressive rendering with skeleton UI |
| Map SDK | First paint | Show search UI immediately, lazy-load Naver Map SDK |
| State | Re-renders | Migrate to Zustand, eliminate unnecessary React context |

**Impact:** PageSpeed 20 → 80 (4x). Google Search Console warnings resolved. Users perceive instant loading.

> References: [Issue #635](https://github.com/uitiorg/frontend-monorepo/issues/635) (epic), PRs #639, #641, #663, #678, #690-701, #718

---

## 4. Client-Rendered Site → SSR on GCP Cloud Run

**Decision:** Implement Server-Side Rendering for bootalk.co.kr and migrate hosting from AWS Amplify to GCP Cloud Run.

**Why it mattered:**
- Client-rendered pages were invisible to search engines — zero SEO
- No dynamic sitemap generation — new listings weren't indexed
- AWS Amplify hosting had limitations (no custom server, no SSR support)
- Structured data for Google/AI search engines required server-rendered HTML

**What I chose over alternatives:**
- ❌ **Stay on Amplify + prerendering** — can't handle dynamic content (listings change daily)
- ❌ **Vercel** — cost concerns at scale, less control over infrastructure
- ✅ **GCP Cloud Run** — container-based, auto-scaling, team already used GCP for Cloud SQL

**Implementation:**
- Next.js SSR with dynamic sitemaps (listings, apartments, regions)
- GCP Cloud Run deployment with Docker containers
- Environment separation (dev/staging/prod)
- Structured data injection for SEO and GEO (AI search engines)
- Later: migrated 30 CSR-only pages to SSR/SSG ([PR #704](https://github.com/uitiorg/frontend-monorepo/pull/704))

**Impact:** Search engine indexing restored. Dynamic sitemaps ensure new listings are crawled within hours. GEO structured data makes content visible to ChatGPT, Perplexity, Gemini.

> References: [PR #173](https://github.com/uitiorg/bootalk_web/pull/173) (SSR + GCP deployment), [Issue #703](https://github.com/uitiorg/frontend-monorepo/issues/703) (CSR → SSR migration), [Issue #547](https://github.com/uitiorg/frontend-monorepo/issues/547) (SSR anti-pattern removal)

---

## 5. Phase-Based Type Safety Campaign

**Decision:** Systematically eliminate all `any` types across the monorepo through a phased, AI-parallelized campaign spanning 50+ PRs.

**Why it mattered:**
- 1,000+ `any` types masked runtime errors — users experienced silent data corruption
- Refactoring was impossible without knowing actual types flowing through the system
- GraphQL responses were typed as `any`, so API contract changes broke silently
- No IDE support for type-aware navigation or refactoring

**What I chose over alternatives:**
- ❌ **Big-bang rewrite** — too risky, would break everything at once
- ❌ **Ignore it** — technical debt was causing real production bugs
- ✅ **Phase-based campaign** — each phase targets one module, each PR is independently shippable and testable

**How it worked:**
1. Audit: identify all `any` types per module ([Issues #538-540](https://github.com/uitiorg/frontend-monorepo/issues/538))
2. Prioritize: fix GraphQL API types first (highest blast radius)
3. Phase execution: 4-8 Claude Code agents working overnight on non-overlapping file sets
4. Verification: all 1,184 tests must pass after each phase
5. Measure: type coverage tracked per module

**Result:**

| Module | Before | After | Coverage |
|--------|--------|-------|----------|
| App | 122 `any` | **0** | **99.19%** |
| Admin | 246 `any` | **~2** | **97.87%** |
| Web | hundreds | **<90** | **98.84%** |

**Impact:** Compile-time error detection replaced runtime crashes. IDE autocomplete works everywhere. Safe refactoring at scale. The monorepo decision (Decision #1) made this possible — shared types meant fixing once fixed everywhere.

> References: Issues [#218](https://github.com/uitiorg/frontend-monorepo/issues/218), [#219](https://github.com/uitiorg/frontend-monorepo/issues/219), [#538-540](https://github.com/uitiorg/frontend-monorepo/issues/538), [#25](https://github.com/uitiorg/frontend-monorepo/issues/25) (@ts-ignore removal)

---

## 6. 8 Microservices → Modular Monolith

**Decision:** Consolidate 8 separate Spring Boot microservices into a unified modular monolith.

**Why it mattered:**
- Configuration duplicated across 8 services (QueryDslConfig, OpenApiConfig, ControllerAdvice × 8)
- Circular Feign dependencies between services caused deployment ordering headaches
- Eureka service discovery added operational overhead for a small team
- Per-service infrastructure costs didn't make sense at current scale

**What I chose over alternatives:**
- ❌ **Keep microservices** — operational overhead too high for a 4-person team
- ❌ **Merge into a true monolith** — loses module boundaries, makes future extraction impossible
- ✅ **Modular monolith** — module-level isolation with shared build, can extract modules later if needed

**Architecture:**

```
modular-monolith/
├── agent-module/          ← from agent microservice
├── apart-module/          ← from data microservice
├── ai-module/
├── notification-module/
├── event-module/
├── office-store-module/
├── real-price-module/
├── common-module/         ← shared security, Feign, DTOs
├── app/                   ← Spring Boot entry point
└── build.gradle.kts
```

**Impact:** Eliminated 24 duplicate config files (3 configs × 8 services). Removed Eureka dependency. Unified build cache cut CI time. Inter-module calls replaced Feign with direct `ModuleApi` interfaces — no network overhead for internal calls.

---

## 7. Cron Jobs → Dagster Orchestration

**Decision:** Migrate all data collection pipelines from subprocess-based cron jobs to Dagster native assets.

**Why it mattered:**
- Cron job failures were silent — data would go stale with no alert
- No dependency tracking between crawlers (apartment data depends on regional codes)
- Manual retry logic was prone to cascading failures
- No UI for monitoring pipeline health

**What I chose over alternatives:**
- ❌ **Airflow** — heavier operational footprint, XML-based DAGs
- ❌ **Prefect** — good but less mature asset-based model
- ✅ **Dagster** — asset-based pipelines with built-in UI, dependency tracking, automatic retry

**Migrated pipelines:**
- Real-price data (실거래가), presale data, apartment rankings
- Facilities collection, household data (세대구성도)
- All with `ConfigurableResource` pattern, run monitoring, and max_runtime guards

**Impact:** Full pipeline observability via Dagster UI. Automatic retry with exponential backoff. Run guards prevent hanging jobs (apartment data: 2h max, listings: 1h max). Telegram alerts on failure. Data freshness is now guaranteed, not hoped for.

---

## How These Decisions Connect

These aren't isolated choices — they form an **architectural strategy**:

```
Monorepo (1)
    ↓ enables
Type Safety Campaign (5)     ← shared types across all apps
    ↓ enables
PageSpeed Optimization (3)   ← safe refactoring at scale
    ↓ requires
SSR on Cloud Run (4)         ← server-rendered pages for SEO

Expo Migration (2)           ← independent but complementary
    ↓ enables
OTA updates + fast CI        ← rapid iteration on mobile

Modular Monolith (6)         ← backend architecture alignment
Dagster Migration (7)        ← data infrastructure alignment
```

The monorepo was the **keystone decision** — everything else became possible (or easier) because of it. Shared types enabled the type safety campaign. Safe refactoring enabled the performance optimization. SSR enabled SEO. Each decision reduced the cost of the next one.
