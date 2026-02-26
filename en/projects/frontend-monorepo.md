# Frontend Monorepo

[← Back to Portal](../../README.md) | [한국어](../../ko/projects/frontend-monorepo.md)

## Project Overview

The central frontend monorepo unifying all client-facing applications for Bootalk. **Created in November 2025** as a strategic initiative to consolidate previously scattered repositories (web, mobile app, admin) into a single, unified codebase — reducing cross-repo dependency issues and enabling shared infrastructure.

> **Epic Reference:** [Discussion #27 — Frontend 프로젝트 통합을 위한 모노레포 도입 마일스톤](https://github.com/uitiorg/team-discussions/discussions/27)

- **apps/web** — Next.js public website (bootalk.co.kr)
- **apps/app** — React Native mobile app components
- **apps/admin** — Real estate agent dashboard
- **Nonghyup (농협)** partner webview
- **Lotte Card** partner webview
- **packages/** — Shared types, API clients, utilities

**Repo:** [uitiorg/frontend-monorepo](https://github.com/uitiorg/frontend-monorepo)

## Metrics

| Metric | Value |
|--------|-------|
| Commits | 1,323 |
| Pull Requests | 594 (564 merged) |
| Lines Added | +2,318,637 |
| Lines Removed | -872,029 |
| Stack | TypeScript, CSS, HTML, JavaScript |

## Business Impact

### 1. Type Safety Campaign — Eliminating Production Errors

**Problem:** The codebase had widespread `any` usage causing silent runtime errors in production. Users experienced broken UI states and data inconsistencies.

**Solution:** Led a phase-based type migration across web, app, and admin modules — **50+ PRs across 30+ phases**. Systematically replaced `any` types with proper TypeScript interfaces. Used **AI-powered tmux multi-pane terminals** running overnight to process phases in parallel, enabling a single engineer to execute work that would typically require a full team. Also conducted cross-monorepo `@ts-ignore` removal ([Issue #25](https://github.com/uitiorg/frontend-monorepo/issues/25)).

**Results:**
| Module | Before | After | Coverage | Report |
|--------|--------|-------|----------|--------|
| App | 122 `any` | **0** (100% ANY-FREE) | **99.19%** | [#219](https://github.com/uitiorg/frontend-monorepo/issues/219), [#540](https://github.com/uitiorg/frontend-monorepo/issues/540) |
| Admin | 246 `any` | **~2** (~99%, 15 PRs in ~20h) | **97.87%** | [#218](https://github.com/uitiorg/frontend-monorepo/issues/218), [#539](https://github.com/uitiorg/frontend-monorepo/issues/539) |
| Web | Hundreds | **< 90** (ongoing) | **98.84%** | [#538](https://github.com/uitiorg/frontend-monorepo/issues/538) |

**Impact:** Reduced type-related Sentry errors. Enabled safe refactoring. Code became self-documenting through explicit types. All 1,184 tests maintained passing throughout the migration.

### 2. Comprehensive Test Coverage — Catching Bugs Before Users

**Problem:** Minimal test coverage meant regressions were discovered in production.

**Solution:** Built unit test suites across web and admin modules with systematic coverage. Created test infrastructure aligned with component implementations.

**Impact:** 159 test-related PRs. Tests caught regressions during refactoring phases. Enabled confident deployments.

**Key PRs:**
- Unit tests for web, admin, and app modules (159 PRs with "test" in title)
- Phase-based test alignment after source changes

### 3. Sentry Error Monitoring — Proactive Production Stability

**Problem:** Production errors were invisible — team only learned about issues from user complaints.

**Solution:** Integrated Sentry across all monorepo apps. Classified error severity (critical vs. noise), added Cognito token expiry handling, OTA error suppression, and network disconnection guards.

**Impact:** Proactive error detection. PRs directly referenced Sentry incidents, showing a disciplined incident-to-fix workflow.

**Key PRs:**
- `fix(app): handle Cognito token expiry gracefully and suppress Sentry noise`
- `fix(app): skip Sentry reporting for ApiError with status 0 (network disconnection)`
- `fix(web): prevent Next.js hard navigation error on /calculator page`

### 4. GEO — AI Search Engine Optimization

**Problem:** Bootalk content was not discoverable by AI search engines (ChatGPT, Perplexity, Gemini).

**Solution:** Added structured data schemas (JSON-LD) and AI crawler directives to enable Generative Engine Optimization.

**Impact:** Increased potential for Bootalk brand citations in AI-generated search results.

**Key PRs:**
- `feat(web): add structured data schemas and AI crawler directives (#759)`

### 5. Coupon System — Revenue & User Engagement

**Problem:** Needed a promotional mechanism to drive user engagement and conversions through Kakao Plus Friend channel.

**Solution:** Built end-to-end 50% brokerage fee discount coupon system — landing pages, code entry, status badges, banners/modals across both web and app.

**Impact:** Directly drives user acquisition and revenue through promotional campaigns.

**Key PRs:**
- `feat: #712 복비 할인 쿠폰 시스템 UI + API 통합`
- `fix(web): initialize coupon store on login via useUserEffects`

### 6. Partner Platform Expansion

**Problem:** Business partnerships required dedicated webview applications (Nonghyup, Lotte Card).

**Solution:** Migrated standalone projects into the monorepo. Upgraded tech stack: Next.js 12→16, React 18→19, styled-components v5→v6, Recoil→Zustand. Fixed 21 TypeScript errors.

**Impact:** Reduced maintenance burden through monorepo consolidation. Enabled shared infrastructure for partner apps.

**Key PRs:**
- Migrated Nonghyup partner webview into monorepo
- Added Lotte Card partner webview to monorepo

### 7. Web Performance Epic — PageSpeed 20 → 80 (4x Improvement)

**Problem:** bootalk.co.kr scored ~20 on [pagespeed.web.dev](https://pagespeed.web.dev), severely hurting SEO, user retention, and Google Search Console rankings.

**Solution:** Conducted a systematic, multi-phase optimization based on [Vercel Engineering's 45 React Best Practices rules](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices). Executed across **10+ PRs** over multiple phases:

- **Phase 2–7:** React best practices — eliminated SSR waterfalls, optimized useEffect dependencies, added `startTransition` for non-urgent updates
- **Phase 5.1+6.1:** LCP image optimization and GTM consolidation
- **Phase 8:** Performance optimizations and auth refactoring
- **Homepage release:** Dedicated homepage performance optimization
- **Bundle reduction:** Dynamic imports, react-spring removal
- **Barrel import cleanup:** Storybook 10 migration, `_app` cleanup, barrel import elimination
- **Skeleton loading:** Skeleton loading system and layout refactoring
- **Search UX:** Show search UI immediately without waiting for map SDK
- **State management:** Architecture cleanup with Zustand migration

**Impact:** PageSpeed score improved from **~20 → ~80** — a **4x improvement**. Resolved all critical Google Search Console performance warnings. Significantly improved Core Web Vitals (LCP, FID, CLS).

> **Epic Issue:** [#635 — React Best Practices 적용 - Vercel Engineering 45 Rules 기반 최적화](https://github.com/uitiorg/frontend-monorepo/issues/635)

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Monorepo creation (Nov 2025) | Consolidate 3 repos → 1, eliminating cross-repo dependency issues |
| @bootalk/common package | Shared API infrastructure — factory pattern for axios instances, adapter pattern for Sentry/Logger ([Issue #1](https://github.com/uitiorg/frontend-monorepo/issues/1)) |
| Full nohoist strategy | Complete workspace isolation for maximum stability over disk savings |
| Circular dependency resolution | Used madge to detect and resolve all circular dependencies ([PR #535](https://github.com/uitiorg/frontend-monorepo/pull/535)) |
| Monorepo with shared packages | Unified types, consistent API clients, single CI/CD |
| Phase-based type migration | Minimize risk of large-scale changes |
| Sentry per-app configuration | Different error severity per platform |
| Test-first refactoring | Ensure each phase doesn't regress |
| Feature-based architecture | Code splitting by domain, not by type |
