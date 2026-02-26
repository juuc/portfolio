# Growth Timeline

[← Back to Portal](../README.md)

## Monthly Activity

```
2025-03:    1
2025-04:  116 ███████████
2025-05:   58 █████
2025-06:   90 █████████
2025-07:   62 ██████
2025-08:  291 █████████████████████████████
2025-09:  163 ████████████████
2025-10:  396 ███████████████████████████████████████
2025-11:  632 ███████████████████████████████████████████████████████████████
2025-12:  838 ███████████████████████████████████████████████████████████████████████████████████
2026-01:  290 █████████████████████████████
2026-02:   47 ████ (in progress)
```

## Weekly Pattern

```
Mon:  471 ██████████████████████████████████████████████
Tue:  611 █████████████████████████████████████████████████████████████
Wed:  556 ███████████████████████████████████████████████████████
Thu:  461 █████████████████████████████████████████████
Fri:  397 ███████████████████████████████████████
Sat:  237 ███████████████████████
Sun:  251 █████████████████████████
```

Active 7 days a week, with peak productivity on Tuesday-Wednesday.

## Growth Narrative

### Phase 1: Onboarding & Data Foundation (Mar–May 2025)
- **~175 commits** | Ramping up under CTO mentorship
- Onboarded with CTO, learned the full codebase architecture
- Built LAAD (아파트 광고 데이터) dashboard for apartment advertising business
- Formed the data team, established data collection strategy
- Developed 부토기 (Bootogi) — RAG-based AI chatbot for apartment recommendations
- Explored apartment ranking system concept with the business team
- Initial work on web platform, admin, and data infrastructure

### Phase 2: Expanding Scope & Business (Jun–Jul 2025)
- **~152 commits** | Broadening into data and mobile
- Co-founded BOOAI (부아이) AI subsidiary with CEO — defined technical strategy
- Built apartment ranking ETL pipeline (Seoul, Gyeonggi, Incheon)
- Started ubuntu-crawler work for real-price data and presale data
- Initial contributions to the mobile app
- Participated in investor relations meetings and TIPS program audits

### Phase 3: CTO Handover & AX Transition (Aug–Sep 2025)
- **~454 commits** | 4.7x velocity increase + leadership transition + AI transformation
- **CTO departed in August** — received full technical handover (infrastructure, deployments, architecture)
- Assumed **Product Owner** role alongside backend lead
- Began leading **daily standups** and **weekly planning sessions** for 4-person dev team
- **Claude Code adopted (Aug 16)** — transitioned from Cline (VS Code extension) to Claude Code CLI. First `CLAUDE.md` committed at 1:14 PM, first Claude-assisted code 11 minutes later. Within 10 days, rolled out across all major repos. Purchased Max 20x plan for entire dev team. Monthly output jumped from ~65 to 291 — the start of a 13x acceleration.
- **First significant frontend commits** — started contributing to the mobile app and web platform (Aug 16). Until this point, my work was focused on data pipelines and crawlers as CDO. The CTO's departure forced a rapid transition to fullstack ownership.
- Expo framework migration planning and initial execution on the mobile app
- Mobile app architecture migrations
- Data pipeline development with Dagster migration
- Managed 3 engineers: mobile, web, backend

### Phase 4: Peak Delivery & Platform Modernization (Oct–Dec 2025)
- **~1,866 commits** | Peak performance — 838 in December alone
- **Dove into bootalk-amplify** (Oct) — inherited legacy serverless backend with 29 Lambda functions, traced DynamoDB Stream flows, documented architecture before any changes
- Created **monorepo** (Nov) — unified web/app/admin into single repository
- **SEO infrastructure overhaul** — SSR on GCP Cloud Run, dynamic sitemap (5→48,706 URLs), canonical URLs, clean URL migration (legacy paths → `/apt`), robots.txt optimization
- **PageSpeed Phase 1-4** — Naver Maps SDK lazy loading, barrel export elimination (-46% bundle), WebP images, dynamic subset fonts
- **Sentry integration** across all platforms — proactive error monitoring
- Phase-based **type safety campaign** — systematic `any` elimination across 50+ PRs
- v3.0.0–v3.3.0 mobile app releases (navigation, push, friend invite, new logo)
- **Privacy compliance** — led KISA audit, consent screens per Korean law
- **전세사기 detection** POC — automated registry document analysis

### Phase 5: AI Products & Maturity (Jan–Feb 2026)
- **~337 commits** | Sustained high output, focus on AI products and refinement
- **SemuGPT (세무GPT)** — AI tax consulting service: built payment UI, law/precedent data pipeline, RAGAS evaluation, feedback system, category classification
- **PageSpeed Phase 5-8** — SSR waterfall elimination, LCP/GTM optimization, skeleton loading, Zustand migration → **PageSpeed 20→80 (4x)**
- **OG meta centralization** — unified 35+ routes into single utility, fixed SSR timeout with lightweight API
- **30 CSR pages → SSR** — server-side UA detection replacing client-side `useMediaQuery`
- **GEO** — 5 JSON-LD structured data schemas + AI crawler directives for ChatGPT, Perplexity, Gemini
- **Next.js v16 upgrade** for SEO/SSR improvements
- **50% brokerage fee discount** coupon system across web and app
- Nonghyup (농협) and Lotte Card webview migration into monorepo
- nCloud CDN migration (image URL and permissions)
- API security hardening
- **Backend batch job optimization** — 2,370x query speedup via covering index, 98% fewer DB round-trips via N+1 elimination. Daily push notification job reduced from 8.4 min to under 1 min. Built AI-automated EXPLAIN forensic analysis tooling to detect inefficient queries across the platform — completed in ~1 week
- **Openclaw** — automated Sentry error detection and PR generation bot
- Privacy law compliance updates
- AI-based agent response for user matching
- Hired AI developer to expand team capacity

## Key Milestones

| Date | Milestone |
|------|-----------|
| 2025-03 | Joined Bootalk as CDO, began onboarding with CTO |
| 2025-04 | First PR merged; LAAD dashboard and 부토기 chatbot development |
| 2025-06 | BOOAI (AI subsidiary) co-founded; apartment ranking system built |
| 2025-08 | **CTO departed** — assumed Tech Lead / PO responsibilities |
| 2025-08-16 | **Claude Code adopted** — transitioned from Cline to Claude Code CLI; 13x output increase begins |
| 2025-08 | **First frontend commits** — transitioned from CDO (data) to fullstack (mobile app, web platform) |
| 2025-08 | Dagster-based crawler infrastructure launched |
| 2025-09 | Sentry error monitoring integrated across all platforms |
| 2025-10 | **bootalk-amplify work begins** — inherited legacy serverless backend, environment separation |
| 2025-10 | Type safety campaign begins — systematic `any` elimination |
| 2025-11 | **Monorepo created** — unified web/app/admin into single repository |
| 2025-11 | Frontend onboarding docs platform launched (Mintlify) |
| 2025-10 | **SEO overhaul begins** — SSR, dynamic sitemap (48K URLs), canonical URLs, clean paths |
| 2025-12 | **SSR deployed on GCP Cloud Run** — migrated from AWS Amplify |
| 2025-12 | **PageSpeed Phase 1-4** — Naver Maps lazy, barrel export -46%, WebP |
| 2025-12 | v3.0.0–v3.3.0 mobile app releases (navigation, push, friend invite, logo) |
| 2025-12 | 90% test coverage achieved on mobile app |
| 2025-12 | Privacy compliance (KISA audit), 대림바스 partnership integration |
| 2026-01 | v3.4.x releases — nCloud CDN migration, contract report fixes |
| 2026-01 | **PageSpeed 20→80** (4x improvement) — OG centralization, SSR migration, bundle optimization |
| 2026-01 | SemuGPT MVP completed — AI tax consulting service |
| 2026-01 | AI developer hired to expand team |
| 2026-02 | 50% discount coupon system and Lotte Card webview integration |
| 2026-02 | GEO structured data for AI search engine optimization |
| 2026-02 | v3.5.0 release preparation with test guidelines |
