# Overview

I joined Bootalk as a Data Engineer in March 2025 and expanded into Tech Lead / Product Owner after the CTO transition in August 2025. The work was not a single feature push. It was a platform rescue: stabilize the product, rebuild the engineering system, and ship commercial AI products with a small team.

## What Changed

| Before | After |
|--------|-------|
| Fragmented web/app/admin repositories | Unified frontend monorepo with 1,130 authored PRs |
| Static or client-rendered pages invisible to search | SSR, dynamic sitemap, 48,706 indexable listing URLs |
| PageSpeed around 20 | [PageSpeed 80](https://pagespeed.web.dev/analysis/https-bootalk-co-kr/4jic9i7it6?form_factor=desktop) after phased performance work |
| Manual production error triage | Sentry alert -> AI diagnosis -> fix PR pipeline |
| Prototype-stage AI tax assistant | [SemuGPT](https://semugpt.co.kr) production handover and signed commercial agreement |
| Individual AI coding experiments | Team-level AI-assisted engineering workflow |

## Proof Points

- **8,231** GitHub-verified authored commits and **1,588** PRs across `juuc` and `jwc-bootalk` as of 2026-05-19.
- **7,895** authored commits in Bootalk-scope repositories.
- **1,462** merged PRs, with **1,130** authored in the frontend monorepo.
- **22x** peak monthly output increase from the pre-Claude baseline to December 2025.
- **48,706** sitemap URLs generated after SSR/SEO migration.
- **2026-05-18** [SemuGPT](https://semugpt.co.kr) production handover completed and commercial agreement signed.

These numbers are not the story by themselves. They are evidence that the operating model changed: AI-assisted execution, tight review loops, small reversible phases, and production guardrails made a small team capable of sustained platform work.

## Five Substantial Outputs

### 1. SemuGPT Commercialization

I helped move [SemuGPT](https://semugpt.co.kr) from AI product buildout into production operation: entitlement logic, payment/webhook handling, evaluation loops, prompt observability, CI/CD, runbooks, cutover preparation, client handover, and a signed commercial agreement.

### 2. Bootalk Platform Rebuild

After the CTO transition, I owned engineering execution across web, mobile, backend, data, releases, and deployments. The important outcome was not "many repos touched"; it was making a fragile platform shippable by a 4-person team.

### 3. Search And Performance Transformation

The public web experience moved from a search-invisible CSR/static model to SSR with dynamic sitemaps and structured data. [PageSpeed moved from 20 to 80](https://pagespeed.web.dev/analysis/https-bootalk-co-kr/4jic9i7it6?form_factor=desktop), and 48K+ listing pages became indexable.

### 4. Autonomous Production Operations

The Sentry triage bot turned production alerts into AI-assisted diagnosis and fix PRs. This moved error handling from manual on-call effort to a repeatable operating pipeline.

### 5. Data Reliability Recovery

Crawler and backend data issues were handled as system problems, not one-off fixes: lifecycle propagation, coordinate recovery, preflight gates, orchestration, and monitoring made data freshness and correctness operationally visible.

## Operating Model

My core pattern is:

```text
fragile system -> small safe phases -> automated verification -> production handoff
```

AI is part of that system, but not the point. The point is disciplined leverage: define the architecture, split work into non-overlapping phases, let agents execute bounded tasks, review the output, and preserve production safety with tests, monitoring, and rollback paths.

## Current Positioning

I am strongest where product, platform, and execution overlap:

- taking over ambiguous systems without waiting for perfect documentation
- turning scattered codebases into coordinated release systems
- using AI agents as an engineering operating layer, not a demo trick
- converting prototypes into production and commercial outcomes
