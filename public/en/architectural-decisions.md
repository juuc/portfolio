# Technical Evidence

## 1. Fragmented Frontend -> Monorepo

**Problem:** Web, mobile, admin, and webview work lived across separate repositories. Shared types and utilities drifted, and cross-platform changes required coordination overhead.

**Decision:** Consolidate the frontend operating layer into a single monorepo.

**Impact:** 1,417 authored PRs landed in the monorepo by 2026-08-16, with 1,310 merged. Shared packages, consistent review patterns, and single-place fixes made later performance, data correctness, and release work safer.

## 2. Search-Invisible Web -> SSR

**Problem:** Important public pages were client-rendered or static in ways that search engines could not reliably index.

**Decision:** Move the public web experience to SSR with dynamic sitemaps, structured data, and production hosting that could support server-rendered pages.

**Impact:** Sitemap coverage moved from 5 URLs to 48,706 listing/apartment URLs. This unlocked the later SEO and AI-search work.

## 3. Slow Public Experience -> Performance Campaign

**Problem:** The public web experience had a PageSpeed score around 20 and suffered from render-blocking code paths.

**Decision:** Run a phased performance campaign instead of a rewrite: remove SSR waterfalls, optimize LCP, lazy-load heavy SDKs, reduce bundle weight, and improve perceived loading.

**Impact:** [PageSpeed moved from 20 to 80](https://pagespeed.web.dev/analysis/https-bootalk-co-kr/4jic9i7it6?form_factor=desktop). The work was shippable because it was divided into small reversible phases.

## 4. Manual Error Triage -> AI-Operated Workflow

**Problem:** Production error volume made manual triage expensive and inconsistent.

**Decision:** Connect monitoring events to an AI-assisted diagnosis and PR-generation workflow, with human review before merge.

**Impact:** Error handling moved from ad hoc investigation to a repeatable operating pipeline.

## 5. Prototype AI Product -> Commercial Delivery

**Problem:** [SemuGPT](https://semugpt.co.kr) needed to move beyond a prototype into a client-operable production product.

**Decision:** Treat productionization as the product: entitlement logic, payment/webhook handling, evaluation, observability, CI/CD, runbooks, handover, and cutover readiness.

**Impact:** [SemuGPT](https://semugpt.co.kr) client handover completed and a commercial agreement was signed on 2026-05-18.

## 6. Fragile Cross-Surface Changes -> Guarded Delivery

**Problem:** After the initial platform rebuild, the riskiest work was no longer one migration. It was coordinating changes that touched frontend, backend, and data surfaces without creating correctness regressions.

**Decision:** Push recent work through guarded, outcome-oriented tracks: rent/lease migration with data correctness checks, SemuGPT production polish, and CI/deployment guard hardening.

**Impact:** The platform moved from "can ship" to "can keep shipping safely." The same operating layer now supported correctness-sensitive migrations, production AI product polish, and tighter release confidence.

## Compounding Pattern

```text
monorepo -> type/release safety -> SSR -> performance -> monitoring -> guarded delivery -> AI operations -> commercial handover
```

The important part is the order. Each decision reduced the cost or risk of the next one.
