# Technical Evidence

## 1. Fragmented Frontend -> Monorepo

**Problem:** Web, mobile, admin, and webview work lived across separate repositories. Shared types and utilities drifted, and cross-platform changes required coordination overhead.

**Decision:** Consolidate the frontend operating layer into a single monorepo.

**Impact:** 1,130 authored PRs landed in the monorepo by 2026-05-19. Shared packages, consistent review patterns, and single-place type fixes made later performance, SEO, and release work safer.

## 2. Search-Invisible Web -> SSR

**Problem:** Important public pages were client-rendered or static in ways that search engines could not reliably index.

**Decision:** Move the public web experience to SSR with dynamic sitemaps, structured data, and production hosting that could support server-rendered pages.

**Impact:** Sitemap coverage moved from 5 URLs to 48,706 listing/apartment URLs. This unlocked the later SEO and AI-search work.

## 3. Slow Public Experience -> Performance Campaign

**Problem:** The public web experience had a PageSpeed score around 20 and suffered from render-blocking code paths.

**Decision:** Run a phased performance campaign instead of a rewrite: remove SSR waterfalls, optimize LCP, lazy-load heavy SDKs, reduce bundle weight, and improve perceived loading.

**Impact:** [PageSpeed reached 80](https://pagespeed.web.dev/analysis/https-bootalk-co-kr/4jic9i7it6?form_factor=desktop). The work was shippable because it was divided into small reversible phases.

## 4. Manual Error Triage -> AI-Operated Workflow

**Problem:** Production error volume made manual triage expensive and inconsistent.

**Decision:** Connect monitoring events to an AI-assisted diagnosis and PR-generation workflow, with human review before merge.

**Impact:** Error handling moved from ad hoc investigation to a repeatable operating pipeline.

## 5. Prototype AI Product -> Commercial Delivery

**Problem:** [SemuGPT](https://semugpt.co.kr) needed to move beyond a prototype into a client-operable production product.

**Decision:** Treat productionization as the product: entitlement logic, payment/webhook handling, evaluation, observability, CI/CD, runbooks, handover, and cutover readiness.

**Impact:** [SemuGPT](https://semugpt.co.kr) client handover completed and a commercial agreement was signed on 2026-05-18.

## Compounding Pattern

```text
monorepo -> type/release safety -> SSR -> performance -> monitoring -> AI operations -> commercial handover
```

The important part is the order. Each decision reduced the cost or risk of the next one.
