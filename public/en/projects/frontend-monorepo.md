# Frontend Monorepo

## Project Overview

The central frontend monorepo unifying all client-facing applications for Bootalk. **Created in November 2025** as a strategic initiative to consolidate previously scattered repositories (web, mobile app, admin) into a single, unified codebase — reducing cross-repo dependency issues and enabling shared infrastructure.

- **apps/web** — Next.js public website (bootalk.co.kr)
- **apps/app** — React Native mobile app components
- **apps/admin** — Real estate agent dashboard
- **partner webviews**
- **packages/** — Shared types, API clients, utilities


## Metrics

| Metric | Value |
|--------|-------|
| Authored PRs | 1,245 |
| Merged PRs | 1,150 |
| Scope | Web, app, admin, partner webviews, shared packages |
| Stack | TypeScript, CSS, HTML, JavaScript |

## Business Impact

### 1. Type Safety Campaign — Eliminating Production Errors

**Problem:** The codebase had widespread `any` usage causing silent runtime errors in production. Users experienced broken UI states and data inconsistencies.

**Solution:** Led a phase-based type migration across web, app, and admin modules. Systematically replaced `any` types with proper TypeScript interfaces and used AI-assisted parallel execution to keep the campaign moving without destabilizing releases.

**Results:**
| Module | Before | After | Coverage |
|--------|--------|-------|----------|
| App | 122 `any` | **0** (100% ANY-FREE) | **99.19%** |
| Admin | 246 `any` | **~2** (~99%, 15 PRs in ~20h) | **97.87%** |
| Web | Hundreds | **< 90** (ongoing) | **98.84%** |

**Impact:** Reduced type-related production errors, made refactoring safer, and turned the monorepo into a reliable base for later performance, correctness, and release work.

### 2. Comprehensive Test Coverage — Catching Bugs Before Users

**Problem:** Minimal test coverage meant regressions were discovered in production.

**Solution:** Built unit test suites across web and admin modules with systematic coverage. Created test infrastructure aligned with component implementations.

**Impact:** Tests caught regressions during refactoring phases and made repetitive cross-surface changes deployable by a small team.

### 3. Sentry Error Monitoring — Proactive Production Stability

**Problem:** Production errors were invisible — team only learned about issues from user complaints.

**Solution:** Integrated Sentry across all monorepo apps. Classified error severity (critical vs. noise), added Cognito token expiry handling, OTA error suppression, and network disconnection guards.

**Impact:** Proactive error detection turned production issues into a disciplined incident-to-fix workflow instead of reactive firefighting.

### 4. GEO — AI Search Engine Optimization

**Problem:** Bootalk content was not discoverable by AI search engines (ChatGPT, Perplexity, Gemini).

**Solution:** Added structured data schemas (JSON-LD) and AI crawler directives to enable Generative Engine Optimization.

**Impact:** Increased the chance that the product would appear in AI-generated search answers, not just conventional search.

### 5. Coupon System — Revenue & User Engagement

**Problem:** Needed a promotional mechanism to drive user engagement and conversions through Kakao Plus Friend channel.

**Solution:** Built end-to-end 50% brokerage fee discount coupon system — landing pages, code entry, status badges, banners/modals across both web and app.

**Impact:** Created a reusable promotion surface that connected marketing campaigns to product conversion.

### 6. Partner Platform Expansion

**Problem:** Business partnerships required dedicated webview applications.

**Solution:** Migrated standalone projects into the monorepo. Upgraded tech stack: Next.js 12→16, React 18→19, styled-components v5→v6, Recoil→Zustand. Fixed 21 TypeScript errors.

**Impact:** Reduced maintenance burden through monorepo consolidation and extended shared infrastructure to partner-facing surfaces.

### 7. Web Performance Epic — PageSpeed 20 → 80 (4x Improvement)

**Problem:** bootalk.co.kr scored ~20 on [pagespeed.web.dev](https://pagespeed.web.dev), severely hurting SEO, user retention, and Google Search Console rankings.

**Solution:** Conducted a systematic multi-phase optimization campaign: eliminated SSR waterfalls, improved LCP, lazy-loaded heavy SDKs, reduced bundle weight, and cleaned up rendering paths that blocked perceived speed.

**Impact:** PageSpeed score improved from **[20 -> 80](https://pagespeed.web.dev/analysis/https-bootalk-co-kr/4jic9i7it6?form_factor=desktop)**. The public web became materially easier to discover, faster to use, and safer to keep iterating.

### 8. Data Correctness, Product Polish, and Release Guards

**Problem:** Once the monorepo was stable enough to move fast, the highest-risk work shifted to correctness-sensitive migrations and release confidence across multiple surfaces.

**Solution:** Used the shared frontend operating layer to coordinate rent/lease migration UI changes, reinforce data correctness checks at handoff points, polish SemuGPT production flows, and harden CI/deployment guards.

**Impact:** The monorepo stopped being just a consolidation project. It became the delivery surface for correctness-sensitive product work and safer releases.

### 9. Custom E2E Test Framework — Testing What Off-the-Shelf Tools Can't

**Problem:** The app uses WebViews extensively (calculator, corporate discount, partner pages). Off-the-shelf mobile testing tools (Detox, Maestro, Appium) cannot inspect WebView DOM — they only see native UI. This left critical user flows untestable.

**Solution:** Built a custom event-driven E2E framework (~3,600 lines TypeScript) with a dual-channel architecture:

```
App (React Native)              Engine (Node.js)
──────────────────              ──────────────────
console.log(E2E_DATA:*)  ──>   LogcatStream  ──>  AssertionWaiter
console.log(E2E_SCREEN:*) ──>  LogcatStream  ──>  Precondition checks
WebView CDP events        ──>   CDPClient     ──>  AssertionWaiter
```

**Key architectural decisions:**

- **Event-driven assertions** — tests react to app-emitted logcat signals (`E2E_DATA:LoginComplete`) instead of polling with fixed sleeps. Faster and more reliable.
- **Dual-channel testing** — ADB `uiautomator dump` for native UI + Chrome DevTools Protocol for WebView DOM, with a recovery pattern for the CDP→ADB corruption problem.
- **TapHint protocol** — app reports its own element coordinates (`E2E_DATA:TapHint:{testId}:{cx}:{cy}`) to solve stale ADB bounds on dynamically positioned elements like map markers.
- **Declarative YAML flows** — 232 test steps across 19 flows. Non-engineers can write test scenarios without TypeScript knowledge.
- **Zero production overhead** — all markers wrapped in `if (__DEV__)`, stripped from production builds.

**Impact:** 19 flows covering login, matching, chat, security, maps, state management, app stability, WebView interactions, auth lifecycle, and AI features. Early runs caught a real API migration bug that unit tests missed.

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Monorepo creation (Nov 2025) | Consolidate fragmented client surfaces into one operating layer |
| Shared packages | Unified types, consistent API clients, single CI/CD surface |
| Phase-based type migration | Minimize risk of large-scale changes |
| Sentry per-app configuration | Different error severity per platform |
| Test-first refactoring | Ensure each phase doesn't regress |
| Feature-based architecture | Code splitting by domain, not by type |
| Custom E2E over Detox/Maestro | Off-the-shelf tools can't test WebView-heavy flows; built event-driven ADB+CDP dual-channel framework |
| `noImplicitAny` strict enforcement | Final gate of type safety campaign — compiler-level guarantee, not just coverage % |
