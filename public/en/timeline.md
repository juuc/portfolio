# Growth Timeline

Updated on **May 19, 2026**. Counts below come from `gh` CLI / GitHub Search API for authored commits and pull requests by `juuc` and `jwc-bootalk` across Bootalk organization and personal repositories. May 2026 is a partial month through May 19.

## Monthly Commit Activity

```
2025-03:    13 █
2025-04:   123 ██████
2025-05:    63 ███
2025-06:    90 ████
2025-07:    64 ███
2025-08:   297 ██████████████
2025-09:   170 ████████
2025-10:   476 ██████████████████████
2025-11:  1065 █████████████████████████████████████████████████
2025-12:  1576 ████████████████████████████████████████████████████████████████████████
2026-01:   819 █████████████████████████████████████
2026-02:   987 █████████████████████████████████████████████
2026-03:  1004 ██████████████████████████████████████████████
2026-04:   930 ██████████████████████████████████████████
2026-05:   554 █████████████████████████
```

## Monthly Pull Requests

```
2025-03:    0
2025-04:    7 █
2025-05:   15 ██
2025-06:    0
2025-07:    0
2025-08:    3
2025-09:   11 █
2025-10:   58 ██████
2025-11:   83 █████████
2025-12:  480 ██████████████████████████████████████████████████
2026-01:  113 ████████████
2026-02:  266 ████████████████████████████
2026-03:  167 █████████████████
2026-04:  205 █████████████████████
2026-05:  180 ███████████████████
```

Total through May 19, 2026: **8,231 commits**, **1,588 PRs**, **1,462 merged PRs**.

## Growth Narrative

### Phase 1: Onboarding & Data Foundation (Mar-May 2025)
- **~199 commits** | Ramping up under CTO mentorship
- Onboarded with CTO, learned the full codebase architecture
- Built LAAD (apartment advertising data) dashboard for apartment advertising business
- Formed the data team, established data collection strategy
- Developed Bootogi — RAG-based AI chatbot for apartment recommendations
- Explored apartment ranking system concept with the business team
- Initial work on web platform, admin, and data infrastructure

### Phase 2: Expanding Scope & Business (Jun-Jul 2025)
- **~154 commits** | Broadening into data and mobile
- Co-founded BOOAI AI subsidiary with CEO — defined technical strategy
- Built apartment ranking ETL pipeline for Seoul, Gyeonggi, and Incheon
- Started crawler work for real-price data and presale data
- Initial contributions to the mobile app
- Participated in investor relations meetings and TIPS program audits

### Phase 3: CTO Handover & AX Transition (Aug-Sep 2025)
- **~467 commits** | Leadership transition + AI transformation
- **CTO departed in August** — received full technical handover for infrastructure, deployment, and architecture
- Assumed **Product Owner** role alongside backend lead
- Began leading daily standups and weekly planning sessions for the 4-person dev team
- **Claude Code adopted (Aug 16)** — transitioned from Cline to Claude Code CLI. First `CLAUDE.md` committed at 1:14 PM, first Claude-assisted code 11 minutes later. Within 10 days, rolled out across all major repos. Purchased Max 20x plan for the dev team.
- **First significant frontend commits** — started contributing to the mobile app and web platform. Until this point, my work was focused on data pipelines and crawlers as Data Engineer. The CTO's departure forced a rapid transition to fullstack ownership.
- Planned and began Expo framework migration on the mobile app
- Built Dagster-based data pipeline foundations
- Managed 3 engineers across mobile, web, and backend

### Phase 4: Peak Delivery & Platform Modernization (Oct-Dec 2025)
- **~3,117 commits, 621 PRs** | Peak output — 1,576 commits and 480 PRs in December alone
- Inherited the legacy serverless backend and documented the architecture before making changes
- Created **frontend monorepo** in November — unified web, app, admin, and partner webviews into one repository
- **SEO infrastructure overhaul** — SSR on GCP Cloud Run, dynamic sitemap (5 -> 48,706 URLs), canonical URLs, clean URL migration, robots.txt optimization
- **PageSpeed Phase 1-4** — map SDK lazy loading, barrel export removal (-46% bundle), WebP images, dynamic subset fonts
- Integrated **Sentry** across platforms for proactive error monitoring
- Ran phase-based **type safety campaign** across 50+ PRs
- Shipped v3.0.0-v3.3.0 mobile app releases: navigation, push notifications, friend invite, new logo
- Led privacy compliance work for Korean regulatory audit requirements
- Built jeonse-fraud detection POC using automated registry-document analysis

### Phase 5: AI Products & Operating Maturity (Jan-Feb 2026)
- **~1,806 commits, 379 PRs** | High output sustained after the December peak
- **SemuGPT** — AI tax consulting service: payment UI, law and precedent data pipelines, RAGAS evaluation, feedback system, category classification
- **PageSpeed Phase 5-8** — SSR waterfall removal, LCP/GTM optimization, skeleton loading, Zustand migration -> **PageSpeed 20 -> 80**
- **OG meta centralization** — unified 35+ routes into one utility and fixed SSR timeout with lightweight meta APIs
- **30 CSR pages -> SSR** — replaced client-side media branching with server-side detection
- **GEO** — JSON-LD structured data + AI crawler directives for ChatGPT, Perplexity, Gemini
- Next.js v16 upgrade, nCloud CDN migration, and coupon system across web and app
- Backend batch job optimization: 2,370x query speedup, 98% fewer DB round-trips, daily push job from 8.4 minutes to under 1 minute
- **Openclaw** — automated Sentry error detection and PR generation bot
- **Sentry noise reduction campaign** — 130+ PRs in one week, shipped across mobile and web releases
- **GitHub-Plane sync** — bidirectional issue sync service with webhook ingestion, queueing, loop prevention, and comment/label sync
- **SemuGPT RAG expansion** — GraphRAG, unified intent routing, prompt observability, 7+ new data collectors
- Polygon-based school assignment delivered end-to-end across backend and frontend in one day
- Custom ADB + CDP E2E test framework for mobile WebView-heavy flows
- Security hardening through user-scoped API patterns

### Phase 6: Production Hardening & Scale-Out (Mar-May 2026)
- **~2,488 commits, 552 PRs** | Continued high-output platform work through May 19
- **SemuGPT productionization** — membership entitlement model, payment/webhook handling, CI/CD migration, production runbooks, domain cutover prep, client handover, and signed commercial agreement
- **Frontend platform modernization** — App Router migration phases, Expo SDK 55 / v3.6 release work, release branch discipline, SEO audit tooling, crawlability fixes
- **Product UX consolidation** — bottom modal unification, design tokens, sell-house flow hardening, mobile release stabilization
- **Backend and crawler data correctness** — apartment lifecycle fixes, coordinate corruption recovery, weekly presale/facility data wiring, migration preflight gates
- **Infrastructure maturity** — self-hosted runners, deployment workflow cleanup, IaC cleanup audits, manifest operations
- **AI assistant operating layer** — Bootalk OpenClaw skills and team assistant context for Slack/workflow automation
- **Registration-document automation** — separate automation pipeline for document issuance and downstream real-estate analysis workflows

## Key Milestones

| Date | Milestone |
|------|-----------|
| 2025-03 | Joined Bootalk as Data Engineer, began onboarding with CTO |
| 2025-04 | First PR merged; LAAD dashboard and Bootogi chatbot development |
| 2025-06 | BOOAI AI subsidiary co-founded; apartment ranking system built |
| 2025-08 | **CTO departed** — assumed Tech Lead / PO responsibilities |
| 2025-08-16 | **Claude Code adopted** — transitioned from Cline to Claude Code CLI |
| 2025-08 | First significant frontend commits — moved from data-only scope to fullstack ownership |
| 2025-08 | Dagster-based crawler infrastructure launched |
| 2025-09 | Sentry error monitoring integrated across platforms |
| 2025-10 | Legacy serverless backend work begins — environment separation and architecture recovery |
| 2025-10 | Type safety campaign begins |
| 2025-10 | SEO overhaul begins — SSR, dynamic sitemap, canonical URLs, clean paths |
| 2025-11 | **Frontend monorepo created** — web/app/admin unified |
| 2025-11 | Frontend onboarding documentation platform launched |
| 2025-12 | **SSR deployed on GCP Cloud Run** |
| 2025-12 | **PageSpeed Phase 1-4** and v3.0.0-v3.3.0 mobile releases |
| 2025-12 | Privacy compliance audit work and partner integrations |
| 2026-01 | v3.4.x releases, CDN migration, contract report fixes |
| 2026-01 | **PageSpeed 20 -> 80** and SemuGPT MVP completed |
| 2026-02 | Coupon system, partner webviews, GEO structured data |
| 2026-02 | **Sentry noise reduction**, GitHub-Plane sync, SemuGPT RAG expansion, school assignment |
| 2026-03 | SemuGPT reference quality upgrades, mobile UI consolidation, backend safety fixes |
| 2026-04 | App Router migration phases, Expo SDK 55 / v3.6 preparation, OpenClaw team layer |
| 2026-05 | SemuGPT production hardening, apartment data lifecycle fixes, crawler recovery, SEO/WebView stability hotfixes |
| 2026-05-18 | **SemuGPT client handover completed** — commercial agreement signed after production handover |
