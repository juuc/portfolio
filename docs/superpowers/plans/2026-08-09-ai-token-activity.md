# AI Token Activity Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a privacy-safe AI token activity heatmap from local `ccusage` aggregates and publish it on the bilingual portfolio and GitHub profile README.

**Architecture:** A dependency-free Node renderer converts `ccusage daily --all --json` into a normalized 53-by-7 activity model and four static SVG assets. The React homepage embeds the language-matched dark asset, while GitHub READMEs use light/dark `<picture>` sources. The existing local biweekly automation pipes fresh `ccusage` JSON into the renderer and retains the existing PR, merge, Pages, and live verification gates.

**Tech Stack:** Node.js ESM and `node:test`, React 18, TypeScript, Vite, Tailwind CSS, GitHub Markdown/SVG, Codex local automations.

## Global Constraints

- Never publish raw token totals, costs, prompts, responses, sessions, model names, agent names, local paths, or private project names.
- Derive effort from `inputTokens + outputTokens + cacheCreationTokens`; exclude `cacheReadTokens` and do not add reasoning output separately.
- Commit only calendar dates, relative levels 0-4, active-day count, current streak, longest streak, and coverage dates.
- Produce synchronized English/Korean and light/dark assets with identical cells, dates, and numeric summaries.
- Keep the existing `HashRouter`, system font stack, dark portfolio palette, and vendored Reactbits internals unchanged.
- Preserve the original checkout and its `.omo/` directory; work only in the linked `agent/ai-token-activity` worktree.
- Use explicit staging. Never use `git add -A`.

---

### Task 1: Activity Model And SVG Renderer

**Files:**
- Create: `scripts/lib/ai-activity.mjs`
- Create: `tests/ai-activity.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: ccusage payload `{ daily: DailyUsage[] }`, where a row has `period`, `inputTokens`, `outputTokens`, and `cacheCreationTokens`.
- Produces: `buildActivityModel(payload, asOf)` returning `{ asOf, startDate, cells, activeDays, currentStreak, longestStreak }` with cells shaped as `{ date, level, active, future }`.
- Produces: `renderActivitySvg(model, { theme, lang })` returning a complete accessible SVG string.
- Produces: `renderActivityAssets(payload, asOf)` returning a `Map` keyed by the four required filenames.

- [ ] **Step 1: Add a failing model test**

Create a hand-checked fixture with duplicate rows for one date, a cache-heavy row, inactive gaps, and five positive effort values. Assert that duplicate rows aggregate, cache reads do not affect levels, the window has 371 cells, and streaks stop at gaps.

```js
test('buildActivityModel aggregates dates and exposes only relative activity', () => {
  const model = buildActivityModel({ daily: fixtureRows }, '2026-08-09')
  assert.equal(model.cells.length, 371)
  assert.equal(model.activeDays, 5)
  assert.equal(model.currentStreak, 2)
  assert.equal(model.longestStreak, 2)
  assert.deepEqual(Object.keys(model.cells.find((cell) => cell.date === '2026-08-09')).sort(), ['active', 'date', 'future', 'level'])
})
```

- [ ] **Step 2: Run the model test and verify the expected import failure**

Run: `node --test tests/ai-activity.test.mjs`

Expected: FAIL because `scripts/lib/ai-activity.mjs` does not exist.

- [ ] **Step 3: Implement the minimal model**

Implement strict ISO-date parsing, Sunday-aligned 53-week range creation, daily effort aggregation, positive-day percentile bucketing into levels 1-4, zero-level inactive cells, future-cell marking, and current/longest streak calculation. Reject malformed dates, future usage rows, empty payloads, and non-finite or negative token fields.

- [ ] **Step 4: Run the model test and verify green**

Run: `node --test tests/ai-activity.test.mjs`

Expected: PASS with zero failures.

- [ ] **Step 5: Add a failing renderer test**

Assert real output behavior: valid SVG root, accessible title/description, 371 dated cells, identical date/level sequences for both languages and themes, translated labels, and absence of fixture token values or prohibited telemetry field names.

```js
test('renderActivityAssets emits bilingual theme variants without raw telemetry', () => {
  const assets = renderActivityAssets({ daily: fixtureRows }, '2026-08-09')
  assert.deepEqual([...assets.keys()].sort(), expectedAssetNames)
  for (const svg of assets.values()) {
    assert.match(svg, /^<svg[^>]+role="img"/)
    assert.equal((svg.match(/data-date=/g) ?? []).length, 371)
    assert.doesNotMatch(svg, /cacheReadTokens|cost|model|agent|987654321/)
  }
})
```

- [ ] **Step 6: Run the renderer test and verify the expected failure**

Run: `node --test tests/ai-activity.test.mjs`

Expected: FAIL because SVG rendering exports are not implemented.

- [ ] **Step 7: Implement the SVG renderer and asset map**

Render a 760-by-286 responsive SVG with a title row, three stats, month labels, weekday labels, 53-by-7 rounded cells, a relative-intensity legend, per-cell `<title>` labels, and bilingual copy. Escape all text and attribute values. Use the approved dark/light palette and system/monospace font stacks.

- [ ] **Step 8: Run all renderer tests and commit**

Run: `node --test tests/ai-activity.test.mjs`

Expected: PASS with zero failures.

Add `"test:activity": "node --test tests/ai-activity.test.mjs"` to `package.json`.

```bash
git add package.json scripts/lib/ai-activity.mjs tests/ai-activity.test.mjs
git commit -m "feat: add privacy-safe AI activity renderer"
```

---

### Task 2: Fail-Closed Generator CLI

**Files:**
- Create: `scripts/generate-ai-activity.mjs`
- Create: `tests/generate-ai-activity-cli.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `--input <json-file>` or `--stdin`, required `--as-of YYYY-MM-DD`, and required `--output-dir <directory>`.
- Produces: four SVG files only after the complete payload validates and all SVG strings render.

- [ ] **Step 1: Add failing CLI integration tests**

Use real temporary directories and `spawnSync(process.execPath, args, { input })`. Assert successful stdin generation creates exactly four SVGs. Assert malformed JSON and invalid dates exit non-zero without replacing a pre-existing sentinel asset.

- [ ] **Step 2: Run the CLI tests and verify the expected missing-script failure**

Run: `node --test tests/generate-ai-activity-cli.test.mjs`

Expected: FAIL because the CLI does not exist.

- [ ] **Step 3: Implement argument parsing and atomic writes**

Parse exactly one input source, render all assets in memory, create the output directory, write each asset to a unique temporary filename in that directory, then rename all temporary files to final names. On error, remove only temporary files created by the current process and leave existing final assets untouched.

- [ ] **Step 4: Run both test files and verify green**

Run: `node --test tests/ai-activity.test.mjs tests/generate-ai-activity-cli.test.mjs`

Expected: PASS with zero failures.

Add `"generate:activity": "node scripts/generate-ai-activity.mjs"` to `package.json`.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/generate-ai-activity.mjs tests/generate-ai-activity-cli.test.mjs
git commit -m "feat: add fail-closed activity asset generator"
```

---

### Task 3: Generate And Inspect Current Public Assets

**Files:**
- Create: `public/metrics/ai-activity-dark-en.svg`
- Create: `public/metrics/ai-activity-dark-ko.svg`
- Create: `public/metrics/ai-activity-light-en.svg`
- Create: `public/metrics/ai-activity-light-ko.svg`
- Modify: `docs/PORTFOLIO_CONTEXT.md`
- Modify: `docs/LLM_UPDATE_RUNBOOK.md`

**Interfaces:**
- Consumes: `npx --yes ccusage@latest daily --all --json --timezone Asia/Seoul --no-color` through stdin.
- Produces: committed SVGs containing only the approved public data contract.

- [ ] **Step 1: Generate the four current assets without persisting raw JSON**

Run:

```bash
npx --yes ccusage@latest daily --all --json --timezone Asia/Seoul --no-color \
  | node scripts/generate-ai-activity.mjs --stdin --as-of 2026-08-09 --output-dir public/metrics
```

- [ ] **Step 2: Verify the generated privacy boundary**

Run a scripted SVG parser/check that confirms four files, identical 371-cell date/level sequences, and no decimal token totals, cost fields, paths, model names, agent names, prompt text, or project names.

- [ ] **Step 3: Render all four SVGs to PNG and inspect them**

Use the available SVG-capable renderer from the workspace runtime, then inspect desktop and scaled mobile previews for clipping, contrast, label collisions, and parity.

- [ ] **Step 4: Document the public metric and refresh command**

Update the context and runbook to distinguish this intentionally public, normalized chart from prohibited raw telemetry. State that the activity chart is relative, excludes cache reads, and must never be used to infer project-level effort publicly.

- [ ] **Step 5: Commit**

```bash
git add public/metrics docs/PORTFOLIO_CONTEXT.md docs/LLM_UPDATE_RUNBOOK.md
git commit -m "docs: publish normalized AI activity assets"
```

---

### Task 4: Add The Bilingual Portfolio Section

**Files:**
- Create: `src/components/AIActivity.tsx`
- Create: `tests/ai-activity-component.test.mjs`
- Modify: `src/App.tsx`
- Modify: `src/data.ts`
- Modify: `src/index.css`
- Modify: `README.md`

**Interfaces:**
- Consumes: `lang: 'en' | 'ko'` from `LangContext` and `/metrics/ai-activity-dark-${lang}.svg`.
- Produces: a homepage section between Hero and Projects, plus GitHub-renderable `<picture>` markup in the portfolio README.

- [ ] **Step 1: Add a failing SSR component test**

Use Vite's real SSR module loader and `react-dom/server` to render the exported `AIActivityCard` for each language. Assert translated heading/copy, correct asset path, non-empty alt text, and the public-relative-data note.

- [ ] **Step 2: Run the component test and verify the expected module failure**

Run: `node --test tests/ai-activity-component.test.mjs`

Expected: FAIL because `src/components/AIActivity.tsx` does not exist.

- [ ] **Step 3: Implement the component and bilingual data contract**

Add `aiActivity` strings to `PortfolioData`, implement an accessible heading and descriptive paragraph, embed the language-matched SVG, and use one restrained in-view reveal. Add a horizontal overflow fallback and visible focus treatment for the linked card at narrow widths.

- [ ] **Step 4: Place the section and update the portfolio README**

Render `<AIActivity />` after `<Hero />`. In README, add an `AI Activity` section with `<picture>` sources referencing the repository-local light/dark English SVGs and one sentence explaining relative local aggregation. Mirror the explanation naturally in the Korean section.

- [ ] **Step 5: Verify tests and build, then commit**

Run:

```bash
node --test tests/*.test.mjs
npm run build
git diff --check
```

Expected: all tests pass, build exits 0 with only the existing chunk-size warning, and the diff check is empty.

```bash
git add README.md src/App.tsx src/data.ts src/index.css src/components/AIActivity.tsx tests/ai-activity-component.test.mjs
git commit -m "feat: add bilingual AI activity section"
```

---

### Task 5: Publish Portfolio Assets And Update GitHub Profile README

**Files:**
- Modify in separate `juuc/juuc` checkout: `README.md`

**Interfaces:**
- Consumes: raw GitHub URLs for `juuc/portfolio/main/public/metrics/ai-activity-light-en.svg` and `ai-activity-dark-en.svg`.
- Produces: a theme-aware clickable activity card in the public GitHub profile.

- [ ] **Step 1: Complete full portfolio verification**

Run unit/integration tests, `npm run build`, `git diff --check`, bilingual parity checks, stale-prohibited telemetry checks, and the repository public-security sweep. Start Vite and inspect English/Korean desktop and mobile pages.

- [ ] **Step 2: Push the explicit portfolio branch and create a PR**

Push `agent/ai-token-activity`, create a `main` PR describing the privacy boundary and verification, wait for checks, and squash-merge only if the head SHA, mergeability, and checks remain clean.

- [ ] **Step 3: Verify Pages and live assets**

Wait for the exact merged `main` SHA's Pages workflow, then make cache-bypass requests for the homepage and all four SVG URLs. Confirm the built JavaScript references the activity section.

- [ ] **Step 4: Create an isolated profile-repo branch**

Clone or reuse a clean `juuc/juuc` checkout only after checking for existing local state. Branch from fresh `origin/main`; do not edit another checkout's dirty files.

- [ ] **Step 5: Update profile README with focused freshness fixes**

Add the theme-aware activity card and link it to the portfolio. Change only directly conflicting nearby facts: Bootalk period to Present, role to Data Engineer -> Tech Lead / PO, headline activity metrics to the verified 2026-08-09 values, frontend monorepo PR count to 1,409, and SemuGPT wording to production handover/commercial delivery. Remove stale claims that contradict the current portfolio rather than expanding the README.

- [ ] **Step 6: Verify and publish the profile README**

Check links, raw asset HTTP responses, sensitive terms, whitespace, and the rendered GitHub README. Push a branch, open a PR, verify the exact diff, and merge it after checks/mergeability are clean.

---

### Task 6: Extend The Biweekly Automation

**Files:**
- Update through Codex automation API: automation id `automation`

**Interfaces:**
- Consumes: the existing full automation definition.
- Produces: the same biweekly schedule and deployment gates with an added privacy-safe SVG refresh step.

- [ ] **Step 1: View the current automation through the automation API**

Confirm id, name, schedule, project, model, reasoning effort, status, and full prompt before changing anything.

- [ ] **Step 2: Update only the activity-generation instructions**

Preserve all existing fields and add the exact stdin pipeline from Task 3. Require four-file parity, prohibited-data checks, unchanged-assets handling, and fail-closed behavior that preserves the last card if collection/generation fails.

- [ ] **Step 3: View the updated automation and verify preservation**

Confirm the biweekly Sunday 16:00 schedule, active status, local project, model, reasoning effort, existing portfolio refresh gates, and new SVG steps.

- [ ] **Step 4: Record final evidence**

Report portfolio and profile PRs, merge SHAs, Pages run, live card URLs, tests/build, automation id, and any remaining warnings without exposing private token telemetry.
