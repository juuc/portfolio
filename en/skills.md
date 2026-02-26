# Technical Skills

[← Back to Portal](../README.md)

## Language Proficiency

Measured by bytes of code across all contributed repositories:

| Language | Share | Primary Usage |
|----------|-------|---------------|
| **TypeScript** | 51.3% | Frontend monorepo, web, app, admin |
| **Kotlin** | 18.3% | React Native native modules, backend services |
| **HTML** | 8.6% | Web templates, SSR pages |
| **Python** | 3.4% + Notebooks 8.2% | Crawlers, data pipelines, ML POCs |
| **MDX** | 4.8% | Developer documentation (Mintlify) |
| **CSS** | 3.4% | Styling, responsive design |
| **JavaScript** | 1.5% | Build configs, legacy code |
| **Shell** | 0.3% | CI/CD scripts, automation |

## Frameworks & Libraries

### Frontend
- **React / Next.js** — SSR, ISR, dynamic sitemaps, structured data for SEO/GEO
- **React Native (Expo)** — OTA updates, deep linking, native modules
- **Zustand** — State management (migrated from Recoil)
- **styled-components** — CSS-in-JS (migrated v5→v6)
- **GraphQL** — Type-safe client integration

### Data Engineering
- **Dagster** — Workflow orchestration, asset-based pipelines
- **Pandas / Jupyter** — Data analysis, transformation
- **Government APIs** — Real-price data (실거래가), presale data, regional codes

### Backend
- **Kotlin / Spring** — MSA backend services
- **AWS Lambda** — Serverless functions, event triggers
- **REST API** — Design, versioning, error handling

### Documentation
- **Mintlify** — Developer documentation platform
- **MDX** — Rich documentation with interactive components

### Monitoring & Observability
- **Sentry** — Error tracking, performance monitoring, release tracking
- **Telegram Bot** — Pipeline monitoring, data change alerts

### Infrastructure & DevOps
- **AWS** — Lambda, Amplify, S3, CloudFront, SNS/SQS
- **GCP** — Cloud Run, Cloud SQL
- **Naver Cloud** — CDN+
- **GitHub Actions** — CI/CD pipelines
- **Expo EAS** — Mobile app build and OTA deployment
- **Docker** — Containerization

### AI Engineering (Core Skill)

Not just using AI — **orchestrating it as a production workflow**.

- **Claude Code** — Primary AI coding agent (migrated from Cline, Aug 2025). Purchased Max 20x plan for entire team.
- **Tmux multi-agent orchestration** — 4-8 concurrent Claude Code sessions on non-overlapping file sets
- **CLAUDE.md architecture** — Per-repo instruction files that encode project context, conventions, and constraints for AI agents
- **Overnight autonomous execution** — Task queues processed by agents continuously, producing review-ready PRs
- **Phase-based parallelism** — Decompose large campaigns into independent phases distributed across agent sessions
- **Claude GitHub Actions** — Automated PR review and code analysis workflows across 6+ repositories
- **oh-my-claudecode** — Advanced multi-agent orchestration framework for complex tasks

**Impact:** 13x output increase (65 → 838 commits/month). Single engineer producing team-equivalent output.

### AI/ML (Products)
- **RAG** — Apartment complex and listing retrieval-augmented generation
- **OCR** — Image and table extraction
- **GPT Integration** — Streaming SSE, tax consulting (세무GPT)
- **GEO** — Generative Engine Optimization for AI search engines

## Architecture Competencies

| Area | Evidence |
|------|----------|
| **Monorepo architecture** | Designed and maintained multi-app monorepo (web, app, admin, webview) |
| **Cloud migration** | Led Amplify → Cloud Run migration across web and app |
| **Type system design** | Phase-based `any` elimination campaign, strict TypeScript adoption |
| **API design** | RESTful API decomposition, IDOR vulnerability fixes via `/me/` pattern |
| **Error handling** | Centralized error systems with Sentry integration across all platforms |
| **Testing strategy** | Achieved 90% test coverage milestone on mobile app, comprehensive unit tests on web |
| **Data pipeline design** | Dagster-based ETL with monitoring, alerting, and incremental processing |
| **Performance engineering** | Production EXPLAIN forensics, query optimization (2,370x speedup), N+1 elimination, covering index design, cross-cloud cost analysis |
| **Security** | IDOR fixes, privacy law compliance, service auth implementation |
