# August 2026 Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the bilingual public portfolio through 2026-08-09, use private ccusage aggregates to prioritize the narrative, and deploy the verified result to GitHub Pages.

**Architecture:** GitHub remains the authoritative source for public output metrics. ccusage supplies private Claude Code and Codex effort aggregates that influence editorial emphasis but are not published. Existing content hierarchy remains intact: README/homepage for punchlines, overview/timeline for narrative, and project pages for evidence.

**Tech Stack:** React, Vite, TypeScript, Markdown, GitHub Search API, GitHub GraphQL API, ccusage, GitHub Actions, GitHub Pages.

## Global Constraints

- Snapshot date is exactly `2026-08-09` in `Asia/Seoul`.
- GitHub measurement window starts at `2025-03-01` and combines `juuc` with `jwc-bootalk`.
- Re-query every monthly commit row because historical Search API indexing changed.
- Keep English and Korean facts, dates, metrics, and links identical.
- Publish no raw token totals, costs, session titles, prompt content, local paths, secret values, internal identifiers, schemas, or issue IDs.
- Preserve the untracked `.omo/` tree and all unrelated local state.
- Distinguish source/CI, DEV runtime, provider, device, and production evidence.
- Keep `HashRouter`; do not edit Reactbits internals or `dist/` manually.

---

### Task 1: Collect Authoritative GitHub And LLM Aggregates

**Files:**
- Read: `docs/LLM_UPDATE_RUNBOOK.md`
- Read: `docs/PORTFOLIO_CONTEXT.md`
- No repository output file; keep raw reports outside the repository

**Interfaces:**
- Consumes: `AS_OF=2026-08-09`, `START_DATE=2025-03-01`, GitHub authentication, local coding-agent session data
- Produces: verified headline totals, monthly rows, repo activity distribution, and private editorial effort ranking

- [ ] **Step 1: Verify source access and tool version**

Run:

```bash
gh auth status
gh api rate_limit
npx --yes ccusage@latest --version
```

Expected: authenticated GitHub access and a ccusage version that supports unified Claude Code and Codex reports.

- [ ] **Step 2: Re-query GitHub headline and scoped totals**

Use the runbook's commit Search API and GraphQL `issueCount` method for:

```text
authored commits
company-scope commits
authored PRs
merged PRs
frontend-monorepo authored PRs
frontend-monorepo merged PRs
```

Expected snapshot already observed on 2026-08-09:

```text
authored commits=9283
company-scope commits=8855
authored PRs=2504
merged PRs=2325
frontend-monorepo authored PRs=1409
frontend-monorepo merged PRs=1301
```

- [ ] **Step 3: Re-query every monthly row**

Run the same two-author commit and PR queries for each closed month from `2025-03` through `2026-07`, then `2026-08-01..2026-08-09`.

Expected: monthly commit, PR, and merged-PR sums exactly equal the headline totals. July and August initially observed:

```text
2026-07 commits=143 PRs=294 merged=289
2026-08 commits=69 PRs=175 merged=160
```

- [ ] **Step 4: Collect private unified LLM aggregates**

Run reports with JSON output and KST grouping:

```bash
npx --yes ccusage@latest daily --all --since 2025-03-01 --until 2026-08-09 --timezone Asia/Seoul --json
npx --yes ccusage@latest monthly --all --since 2025-03-01 --until 2026-08-09 --timezone Asia/Seoul --json
npx --yes ccusage@latest session --all --since 2025-03-01 --until 2026-08-09 --timezone Asia/Seoul --json
npx --yes ccusage@latest claude daily --instances --since 2025-03-01 --until 2026-08-09 --timezone Asia/Seoul --json
npx --yes ccusage@latest codex daily --since 2025-03-01 --until 2026-08-09 --timezone Asia/Seoul --json
```

Inspect only aggregate fields exposed by ccusage. Do not read transcript bodies.

- [ ] **Step 5: Produce the private editorial ranking**

Rank these public-safe activity groups by active days, sessions, token share, PR volume, merge rate, and evidence maturity:

```text
field-operations productization
Bootalk platform correctness and releases
data reliability and performance
AI product commercialization
release, QA, and operational automation
unclassified
```

Expected: a compact internal summary used to select narrative emphasis; no raw usage report is added to Git.

### Task 2: Refresh All Shared Metrics And Monthly Activity

**Files:**
- Modify: `README.md`, `index.html`, `src/data.ts`, `docs/PORTFOLIO_CONTEXT.md`
- Modify: `public/en/overview.md`, `public/ko/overview.md`
- Modify: `public/en/timeline.md`, `public/ko/timeline.md`
- Modify: `public/en/intelz.md`, `public/ko/intelz.md`
- Modify: `public/en/architectural-decisions.md`, `public/ko/architectural-decisions.md`
- Modify: `public/en/projects/frontend-monorepo.md`, `public/ko/projects/frontend-monorepo.md`
- Modify: `public/en/projects/platform-rebuild.md`, `public/ko/projects/platform-rebuild.md`

**Interfaces:**
- Consumes: Task 1 headline totals and monthly rows
- Produces: one bilingual 2026-08-09 metric snapshot across every active surface

- [ ] **Step 1: Replace headline metrics and snapshot dates**

Apply the exact Task 1 totals to all listed files. Update the career comparison from 17 months to 18 months.

- [ ] **Step 2: Replace the entire monthly table**

Write every refreshed row to both timeline files. Mark only August as partial: `partial through 2026-08-09` / `2026-08-09 기준 부분 집계`.

- [ ] **Step 3: Reconcile both tables mechanically**

Run:

```bash
awk -F'|' '/^\| 20[0-9][0-9]-[0-9][0-9] \|/ { gsub(/,/,"",$3); gsub(/,/,"",$4); gsub(/,/,"",$5); c += $3; p += $4; m += $5 } END { print c, p, m }' public/en/timeline.md
awk -F'|' '/^\| 20[0-9][0-9]-[0-9][0-9] \|/ { gsub(/,/,"",$3); gsub(/,/,"",$4); gsub(/,/,"",$5); c += $3; p += $4; m += $5 } END { print c, p, m }' public/ko/timeline.md
```

Expected for both: `9283 2504 2325`.

- [ ] **Step 4: Commit the metric refresh**

Stage only the files listed in this task and commit with `docs: refresh portfolio metrics through August`.

### Task 3: Add The Field Operations Platform Case Study

**Files:**
- Create: `public/en/projects/field-operations-platform.md`
- Create: `public/ko/projects/field-operations-platform.md`
- Modify: `README.md`, `src/data.ts`
- Modify: `public/en/overview.md`, `public/ko/overview.md`
- Modify: `public/en/timeline.md`, `public/ko/timeline.md`

**Interfaces:**
- Consumes: Task 1 effort ranking, GitHub activity evidence, and verified source/DEV/provider/device boundaries
- Produces: a bilingual flagship card, case-study page, and August milestone

- [ ] **Step 1: Write the English case study**

Use these exact sections:

```markdown
# Field Operations Platform Productization
## Why It Matters
## Problem
## Output
## Impact
## Evidence Boundary
```

Lead with integrated multi-role operations and auditable delivery. Generalize product, provider, API, schema, and issue names.

- [ ] **Step 2: Write the natural Korean counterpart**

Use the same facts and structure with the title `현장 운영 플랫폼 제품화`. Do not translate mechanically or add claims absent from English.

- [ ] **Step 3: Add navigation and narrative links**

Add the case study to both README case-study tables and both `src/data.ts` flagship arrays. Add one overview proof point and one August timeline row.

The August milestone must describe integrated DEV validation and explicitly avoid claiming provider/device/production completion.

- [ ] **Step 4: Commit the case study**

Stage only the files listed in this task and commit with `docs: add field operations platform case study`.

### Task 4: Update The Operating Narrative And Qualify Stale Claims

**Files:**
- Modify: `public/en/skills.md`, `public/ko/skills.md`
- Modify: `public/en/projects/platform-rebuild.md`, `public/ko/projects/platform-rebuild.md`
- Modify: `public/en/projects/frontend-monorepo.md`, `public/ko/projects/frontend-monorepo.md`
- Modify: `public/en/projects/ubuntu-crawler.md`, `public/ko/projects/ubuntu-crawler.md`
- Inspect: `index.vanilla.html`

**Interfaces:**
- Consumes: Task 1 effort ranking and Task 3 narrative vocabulary
- Produces: current skill/output mapping and dated historical claims

- [ ] **Step 1: Refresh the operating stack**

Add concise outcome rows for infrastructure as code/cloud identity, evidence-gated mobile QA, structured OCR observability, and separated provider/device/production proof.

- [ ] **Step 2: Extend the platform-rebuild story**

Add cross-system correctness and guarded migration as post-handover outcomes. Do not claim a completed account-withdrawal cutover.

- [ ] **Step 3: Qualify stale snapshots**

Mark type-safety counts as a dated campaign snapshot and replace the crawler's “perfectly current” wording with a verified historical operational outcome. Keep Search Console numbers explicitly dated through 2026-06-16.

- [ ] **Step 4: Decide the legacy static file by evidence**

Run:

```bash
rg -n 'index\.vanilla\.html' . --glob '!index.vanilla.html' --glob '!node_modules' --glob '!dist'
git log --oneline -- index.vanilla.html | head -20
```

If no active consumer exists, add a top-of-file comment stating that it is an undeployed historical snapshot. Do not delete it in this refresh.

- [ ] **Step 5: Commit the narrative refresh**

Stage only the files listed in this task and commit with `docs: align operating narrative with recent work`.

### Task 5: Verify, Publish, Merge, And Confirm Deployment

**Files:**
- Verify: all changed repository files
- Preserve: `.omo/`

**Interfaces:**
- Consumes: Tasks 1-4 committed changes
- Produces: merged main revision and verified GitHub Pages deployment

- [ ] **Step 1: Run content and security checks**

Run:

```bash
git diff origin/main...HEAD --check
rg -n '2026-07-27|8,603|8,175|2,225|2,059|1,324|1,218' README.md index.html src public docs/PORTFOLIO_CONTEXT.md
rg -n -i 'secret|token|password|private key|parameter store|ssm|sentry.*[0-9]{4,}|schema|table|column|procedure|internal|lambda|handler|endpoint' README.md index.html src public docs/PORTFOLIO_CONTEXT.md
```

Expected: no stale active metrics and no newly introduced sensitive identifiers. Review generic-word matches manually.

- [ ] **Step 2: Build and preview**

Run:

```bash
npm run build
npm run dev -- --host 127.0.0.1
curl -fsSI http://127.0.0.1:5173/portfolio/
curl -fsS http://127.0.0.1:5173/portfolio/en/projects/field-operations-platform.md
curl -fsS http://127.0.0.1:5173/portfolio/ko/projects/field-operations-platform.md
```

Expected: build exit 0, homepage HTTP 200, and both case-study files served.

- [ ] **Step 3: Review final scope**

Run `git status --short`, `git diff --stat origin/main...HEAD`, and `git log --oneline origin/main..HEAD`. Expected: only intended portfolio files plus the preserved untracked `.omo/`.

- [ ] **Step 4: Push and open the PR**

Push `agent/refresh-portfolio-2026-08` and open a draft PR titled `docs: refresh portfolio through August 2026` against `main` with a body covering changes, rationale, impact, and validation.

- [ ] **Step 5: Merge after checks and verify Pages**

Mark the PR ready, wait for required checks, merge it, then verify `deploy.yml` succeeds at the merged SHA and that the live timeline and new case-study URL serve content dated 2026-08-09.
