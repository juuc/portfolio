# Portfolio Context For Future LLMs

This file preserves public-safe context that should inform future portfolio
updates but should not dominate the actual portfolio reading path.

The portfolio itself should stay concise and impact-first. Use this file as
source material when deciding what to keep, compress, or move into a case study.

## Exposure Model

- `README.md`, `public/*/overview.md`, `public/*/timeline.md`, and homepage
  cards are the public pitch. Keep them short.
- New case-study pages under `public/*/projects/` are the main evidence path.
  Keep each one focused on Problem -> Output -> Impact.
- Older detailed project pages may remain as source evidence, but they should not
  become the primary navigation path unless a reader needs depth.
- This file is not rendered by the portfolio app. It is for future LLM/editor
  context. Because the repository is public, it must still stay public-safe.

## Public-Safety Boundary

Do not add:

- employee names
- client names or contract terms
- secret names, parameter paths, tokens, credential values, private keys
- exact internal service names, function names, schema/table/column/procedure names
- Sentry issue IDs or internal incident identifiers
- private API/protocol IDs

Use role-level or domain-level descriptions instead.

## Current Positioning

Ju Woocheol is best represented as:

```text
product-platform operator who turns fragile systems into shippable,
commercially useful products using AI-assisted engineering as leverage
```

The portfolio should not read like a work diary. It should prove five substantial
outputs:

1. SemuGPT commercialization
2. Bootalk platform rebuild after CTO transition
3. SEO/performance transformation
4. Autonomous Sentry operations
5. Data reliability recovery

## Headline Metrics

As of 2026-05-19, the portfolio uses GitHub Search API / GraphQL counts for
`juuc` and `jwc-bootalk`:

| Metric | Value |
|--------|-------|
| Authored commits | 8,231 |
| Bootalk-scope commits | 7,895 |
| Pull requests | 1,588 |
| Merged PRs | 1,462 |
| Frontend monorepo authored PRs | 1,130 |
| Peak month | 1,576 commits in 2025-12 |
| Output multiplier | 22x peak increase from pre-Claude baseline |

When these numbers are refreshed, update `README.md`, `src/data.ts`, overview,
timeline, and any affected case studies together.

## Narrative Spine

Use this order when rewriting public copy:

1. Joined Bootalk through data work.
2. CTO transition created a platform ownership gap.
3. Took over engineering execution across web, mobile, backend, data, releases,
   and deployments.
4. Rebuilt the operating system: monorepo, environment separation, monitoring,
   release discipline, tests, SSR, and documentation.
5. Used AI agents as a disciplined execution layer, not as a gimmick.
6. Converted platform leverage into product outcomes: SEO recovery, Sentry
   automation, SemuGPT production handover, and commercial agreement.

Avoid making commit count the lead. Commit count is supporting evidence.

## Case Study Source Material

### SemuGPT Commercialization

Public-safe details:

- AI tax consulting product.
- Public service URL: https://semugpt.co.kr.
- MVP completed around 2026-01.
- RAG/evaluation/prompt observability expanded around 2026-02.
- Production hardening continued through 2026-03 to 2026-05.
- Work included membership entitlement, payment/webhook behavior, data/evaluation
  loops, deployment/runbook preparation, and cutover/handover readiness.
- 2026-05-18: client handover completed and commercial agreement signed.

What to emphasize:

- Prototype -> production operation -> commercial delivery.
- Product ownership beyond code.
- Operating wrapper around AI: evals, observability, payments, runbooks, handover.

What to avoid:

- client identity
- contract amount or terms
- internal hostname, secret, prompt, dataset, or infrastructure identifiers

### Platform Rebuild

Public-safe details:

- CTO transition in 2025-08 led to Tech Lead / PO responsibility.
- Scope included web, mobile app, backend, data, release, deployment, and team
  coordination for a 4-person engineering team.
- Frontend work moved from scattered repositories to a monorepo.
- Dev/prod separation, monitoring, release discipline, and safer phased changes
  were central to making the platform shippable.

What to emphasize:

- "Made a fragile platform operable by a small team."
- Monorepo as operating system, not just repo consolidation.
- Later improvements were possible because the operating surface became unified.

What to avoid:

- low-level repository internals unless needed as proof
- every app release number
- broad laundry lists of touched areas

### SEO And Performance

Public-safe details:

- Public web was previously limited by CSR/static behavior.
- SSR and dynamic sitemap work made public pages indexable.
- Sitemap grew from 5 URLs to 48,706 URLs.
- PageSpeed improved from around 20 to 80.
- Work included canonical URLs, clean routing, structured data, AI-search crawler
  support, LCP optimization, lazy loading, and bundle cleanup.

What to emphasize:

- Discoverability and performance changed the web surface into an acquisition
  channel.
- PageSpeed score is proof, not the whole story.

What to avoid:

- dumping all optimization PRs
- framework trivia unless it explains impact

### Autonomous Sentry Operations

Public-safe details:

- Sentry revealed production error volume that was too expensive to handle
  manually.
- Built workflow from monitoring event to AI-assisted diagnosis and fix PR
  candidate.
- Human review remained the merge gate.
- Reports were routed to lightweight operational channels.

What to emphasize:

- AI-operated production workflow, not just AI-assisted coding.
- Alert -> diagnosis -> PR candidate is the key transformation.

What to avoid:

- Sentry issue IDs
- exact webhook/function names
- private routing or credential details

### Data Reliability Recovery

Public-safe details:

- Data reliability spanned crawlers, backend propagation, ranking logic,
  geospatial data, and public datasets.
- Important incidents included stale/corrupted data recovery, lifecycle
  propagation, and crawler correctness.
- The crawler system used Dagster as the orchestration layer.
- Local source verification on 2026-05-19 showed the central Dagster
  `Definitions` registry registering 18 jobs, 19 schedules, resources, and one
  run-failure sensor.
- Source-level verification on 2026-05-19 found 155 Python `@asset`
  definitions under the crawler Dagster project.
- Dagster coverage included apartment info/listings, real trade/pricing,
  mapping/ranking, presale/facilities, household, loan, dealer, and
  reconstruction domains.
- Operational mechanics included `AssetSelection` groups, runtime caps, daily,
  weekly, monthly, and biannual schedules, and failure notifications with
  root-cause summaries.
- The durable outcome was repository-level guards, preflight checks,
  orchestration, monitoring, and runbooks.

What to emphasize:

- Real-estate products rely on data correctness as user trust.
- The stronger public framing is "script crawlers -> observable Dagster ETL
  operations."
- One-off fixes were converted into safer operating rules.

What to avoid:

- exact table/column/procedure names
- raw production data details
- internal job names

## What Was Intentionally Cut From Public Pitch

These may be useful for future context, but should stay compressed in public
copy unless directly relevant:

- full monthly commit/PR tables
- all app version numbers
- long lists of individual PRs
- complete tool inventories
- detailed AI workflow mechanics
- every migration phase
- minor project pages that do not prove a business, production, or team outcome

## Editing Heuristic

Before adding detail to public copy, ask:

```text
Does this prove a change in business outcome, user experience,
team velocity, production reliability, or commercial delivery?
```

If not, keep it in context/evidence material rather than the main portfolio.
