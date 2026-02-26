# Bootalk Web

[← Back to Portal](../../README.md) | [한국어](../../ko/projects/bootalk-web.md)

## Project Overview

The public-facing Next.js web platform at bootalk.co.kr — serving property search, AI chat, calculators, event pages, and real estate agent matching.

**Repo:** [uitiorg/bootalk_web](https://github.com/uitiorg/bootalk_web) → merged into [uitiorg/frontend-monorepo](https://github.com/uitiorg/frontend-monorepo)

## Metrics

| Metric | Value |
|--------|-------|
| Commits | 273 (bootalk_web) + 1,323 (monorepo) |
| SEO-Related PRs | **~40** across both repos |
| Stack | TypeScript, Next.js, GCP Cloud Run |

## Business Impact

### 1. SEO Transformation — From Invisible to Discoverable

The site was client-rendered, had a static 5-URL sitemap, broken meta tags, scored **20 on PageSpeed**, and was invisible to AI search engines. Over 6 months and ~40 PRs across two repos, I built a comprehensive SEO infrastructure that took it to **PageSpeed 80** with full crawlability.

#### Crawlability & Indexing

**Problem:** Client-side rendering meant search engines saw empty pages. Sitemap was a static list of 5 URLs. Development environment was leaking into Google.

**What I built:**
- **SSR on GCP Cloud Run** — implemented `getServerSideProps` for apartment detail pages, migrated from AWS Amplify to containerized GCP deployment ([bootalk_web #173](https://github.com/uitiorg/bootalk_web/pull/173))
- **Dynamic sitemap: 5 URLs → 48,706 apartments** — real-time API-driven sitemap with priority and update frequency ([bootalk_web #51](https://github.com/uitiorg/bootalk_web/issues/51))
- **30 CSR pages → SSR** — migrated client-side `useMediaQuery` to server-side UA detection, eliminating hydration mismatches ([monorepo #704](https://github.com/uitiorg/frontend-monorepo/pull/704), -2,347 lines)
- **SSR anti-pattern removal** — cleaned `typeof window === 'undefined'` guards across 33 pages ([monorepo #548](https://github.com/uitiorg/frontend-monorepo/pull/548))
- **Dev environment crawl blocking** — triple-layer defense to prevent dev URLs in Google index

#### URL & Crawl Optimization

**Problem:** Duplicate URLs, inconsistent legacy paths, missing canonical tags diluting page authority.

**What I built:**
- **Canonical URL tags** to resolve duplicate URL issues
- **Clean URL migration:** all legacy paths → clean `/apt` URLs
- **Trailing slash normalization** for consistent URLs
- **robots.txt optimization** — selective crawl policies, calculator page unblocked
- **Rewrite-based `/apt` page consolidation** for single URL authority


#### Meta & Social Sharing

**Problem:** OG meta tags were scattered across 6+ files with inconsistent patterns. SSR timeout caused fallback titles on social shares (showing "부톡 - 아파트 실거래가 조회" instead of "헬리오시티 실거래가 | 33평 시세 - 부톡").

**What I built:**
- **OG meta centralization** — single utility managing 35+ routes from one source of truth ([monorepo #581](https://github.com/uitiorg/frontend-monorepo/pull/581))
- **SSR OG timeout fix** — replaced heavy apartment detail API (60+ fields) with lightweight API for meta-only data ([monorepo #597](https://github.com/uitiorg/frontend-monorepo/pull/597))
- **OG tags for 10 missing pages** — including AI search, buy/sell listings, agent onboarding, and office deals ([monorepo #548](https://github.com/uitiorg/frontend-monorepo/pull/548))
- **SEO snippet improvement** — keyword-refined title/description ([bootalk_web #156](https://github.com/uitiorg/bootalk_web/pull/156))

#### PageSpeed: 20 → 80 (4x Improvement)

Conducted a systematic, multi-phase optimization based on [Vercel Engineering's 45 React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices). Executed across **14 PRs**. See [full breakdown on the monorepo page](frontend-monorepo.md).

| Metric | Before | After |
|--------|--------|-------|
| PageSpeed | ~20 | **~80** |
| FCP | 12.6s | < 2s |
| LCP | 36.2s | < 3s |
| Bundle (`_app.js`) | 1.01 MB | **-46%** (barrel export elimination) |

Key optimizations: Naver Maps SDK lazy loading ([#517](https://github.com/uitiorg/frontend-monorepo/pull/517)), LCP image optimization ([#641](https://github.com/uitiorg/frontend-monorepo/pull/641)), dynamic imports + react-spring removal ([#699](https://github.com/uitiorg/frontend-monorepo/pull/699)), skeleton loading ([#701](https://github.com/uitiorg/frontend-monorepo/pull/701)), CLS fix with explicit image dimensions ([#621](https://github.com/uitiorg/frontend-monorepo/pull/621)).

> **Epic Issue:** [#635](https://github.com/uitiorg/frontend-monorepo/issues/635) | **Tracking:** [#515](https://github.com/uitiorg/frontend-monorepo/issues/515)

#### GEO — AI Search Engine Optimization

**Problem:** Bootalk content was crawled by AI search engines but never cited — only 1 Organization schema existed, no product/FAQ/article schemas.

**What I built:**
- **5 JSON-LD structured data schemas:** Organization (with logo), WebSite (with SearchAction for sitelinks), BreadcrumbList (6-level hierarchy), FAQPage (12 Q&A items), SoftwareApplication
- **AI crawler directives** for ChatGPT, Perplexity, Gemini
- Deployed as SSR-rendered schemas for immediate crawler access

> **PR:** [#761](https://github.com/uitiorg/frontend-monorepo/pull/761) | **Issue:** [#759](https://github.com/uitiorg/frontend-monorepo/issues/759)

#### SEO Timeline

| When | What | PR/Issue |
|------|------|----------|
| May 2025 | Static sitemap (5 URLs), initial meta tags | bootalk_web #54 |
| Sep 2025 | SEO snippet keyword refinement | bootalk_web #156 |
| Oct 2025 | **SSR + dynamic sitemap (48K URLs) + GCP Cloud Run** | bootalk_web #173 |
| Oct 2025 | Canonical URLs, clean paths, legacy → `/apt` migration | multiple commits |
| Dec 2025 | **PageSpeed Phase 1-4** — Naver Maps lazy, fonts, WebP, barrel exports (-46%) | monorepo #517-#527 |
| Dec 2025 | SSR anti-pattern removal (33 pages) + OG for 10 pages | monorepo #548 |
| Jan 2026 | OG meta centralization (35+ routes) | monorepo #581 |
| Jan 2026 | SSR OG timeout fix (lightweight API) | monorepo #597 |
| Jan 2026 | **PageSpeed Phase 5-8** — LCP, GTM, bundle, skeleton loading | monorepo #639-#701 |
| Feb 2026 | 30 CSR pages → SSR migration | monorepo #704 |
| Feb 2026 | **GEO** — structured data schemas + AI crawler directives | monorepo #761 |

---

### 2. Auth System Modernization

**Problem:** Infinite auto-login bug. Logout race conditions. No centralized auth management.

**Solution:** Implemented `useAuth` hook for centralized auth state. Fixed logout race conditions by awaiting async operations before reload.

**Impact:** Eliminated user-facing auth bugs. Clean, maintainable auth architecture.

### 3. User Conversion Optimization

**Problem:** Mobile web users weren't converting to app downloads.

**Solution:** Changed web-to-app user journey — replaced "sign up" CTAs with "download app" prompts. Platform-specific behaviors for web vs. app webview.

**Impact:** Improved mobile user conversion funnel.

### 4. Type Safety

Part of the [monorepo-wide type safety campaign](frontend-monorepo.md) — achieved **98.84% type coverage** (235,093 identifiers) through systematic `any` elimination across 30+ phases.

> See Issues [#538](https://github.com/uitiorg/frontend-monorepo/issues/538), [#219](https://github.com/uitiorg/frontend-monorepo/issues/219), [#218](https://github.com/uitiorg/frontend-monorepo/issues/218).
