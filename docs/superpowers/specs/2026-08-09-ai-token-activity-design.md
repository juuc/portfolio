# AI Token Activity Card Design

Date: 2026-08-09 (Asia/Seoul)

## Goal

Add a public-safe, GitHub-style activity card that shows how consistently Ju
works with coding agents without publishing raw token totals, costs, prompts,
session identifiers, local paths, or private project names.

The card has two consumers:

1. The portfolio homepage, where it supports the existing AI-native operating
   model narrative.
2. The `juuc/juuc` GitHub profile README, where it acts as a compact visual
   proof point and links back to the portfolio.

The primary audience is a hiring manager or engineering leader scanning Ju's
public work. The card's single job is to communicate sustained AI-assisted
execution at a glance, not to expose a usage bill or create a productivity
leaderboard.

## Chosen Approach

Generate versioned static SVG assets from local `ccusage` daily aggregates and
commit only privacy-safe derived activity levels.

Alternatives considered:

- **Hosted live badge:** fastest to adopt, but requires publishing aggregate
  telemetry to a third party and creates an availability dependency.
- **Client-side dashboard:** richer interactions, but the browser cannot read
  Mac-local logs and publishing the source dataset would expose unnecessary
  detail.
- **Static local generator (chosen):** works with the existing local Codex
  automation, renders reliably in GitHub README, is reviewable in Git, and
  keeps raw telemetry off public infrastructure.

## Public Data Contract

The generator reads `ccusage daily --all --json` outside the repository. For
each day it calculates an effort signal from:

```text
inputTokens + outputTokens + cacheCreationTokens
```

`cacheReadTokens` are excluded because repeated context reads can dominate raw
totals without representing equivalent new effort. Reasoning output is not
added separately because it is already represented by output accounting.

Only these derived values may enter committed SVGs:

- calendar date
- relative activity level from 0 through 4
- active-day count within the displayed window
- current streak
- longest streak within the displayed window
- coverage start and end dates

The activity level is calculated from positive-day quantiles, so a cell
communicates relative intensity without allowing the original token count to
be recovered. The repository must never contain the raw `ccusage` JSON, exact
token totals, costs, sessions, model names, agent names, local paths, project
grouping, prompts, or responses.

## Visual Direction

The design extends the portfolio's restrained dark interface instead of
introducing another visual system.

### Palette

- Ink: `#09090B`
- Panel: `#121216`
- Rule: `#27272A`
- Primary text: `#FAFAFA`
- Muted text: `#A1A1AA`
- Activity scale: `#1D2430`, `#223B61`, `#2E5F9E`, `#4E8DD7`, `#8BC3FF`

Light README assets use white and cool gray surfaces with the same blue scale.

### Typography

- Display/body: the portfolio's existing Apple system sans stack
- Data and labels: the existing SFMono-compatible monospace stack

No new webfont dependency is added. In the SVG, portable system font fallbacks
keep rendering deterministic across GitHub and browsers.

### Layout

```text
+--------------------------------------------------------------+
| AI ACTIVITY                                   LOCAL AGGREGATE |
| Sustained agent-assisted execution                            |
|                                                              |
| 131 active days    18 current streak    70 longest streak    |
|                                                              |
| [53 columns x 7 rows of relative-intensity cells]            |
| Sep  Oct  Nov  Dec  Jan  Feb  Mar  Apr  May  Jun  Jul  Aug   |
|                                              Less ■■■■■ More  |
+--------------------------------------------------------------+
```

The signature element is the calm, year-long blue activity field: it resembles
the familiar contribution graph and the supplied Codex profile screen while
remaining visibly part of Ju's existing portfolio.

The surrounding homepage section stays quiet: one heading, one sentence, and
the card. The only motion is the portfolio's existing in-view reveal. The card
itself does not animate, preserving README parity and reduced-motion behavior.

## Assets And Components

The generator produces four SVGs under `public/metrics/`:

- `ai-activity-dark-en.svg`
- `ai-activity-dark-ko.svg`
- `ai-activity-light-en.svg`
- `ai-activity-light-ko.svg`

English and Korean variants share dates, cells, and numbers. Only labels and
descriptive copy differ. Dark variants are used on the portfolio. The GitHub
profile README uses a `<picture>` element to switch between the English light
and dark variants.

The homepage adds a focused `AIActivity` section between the hero and case
studies. It selects the language-matched dark asset from `LangContext` and uses
translated accessible alternative text. The section copy explains that the
chart is a relative, locally aggregated signal.

The portfolio repository README also embeds the local asset. The separate
`juuc/juuc` profile README embeds the raw asset from the portfolio's `main`
branch and links the card to the live portfolio.

## Generator Interface

`scripts/generate-ai-activity.mjs` supports:

```text
node scripts/generate-ai-activity.mjs \
  --input /path/to/ccusage-daily.json \
  --as-of 2026-08-09 \
  --output-dir public/metrics
```

The caller owns collection and temporary-file cleanup. This separation makes
the renderer deterministic and testable without invoking `npx` or accessing
private logs during a normal build.

Validation failures are fail-closed:

- missing or invalid input produces no replacement assets
- future or malformed dates are rejected
- empty input is rejected
- output is written only after all four SVG strings are generated successfully

## Automation

The existing biweekly portfolio automation remains the owner of live data
collection. Before editing public content it will:

1. Create a temporary directory outside the repository.
2. Run the latest `ccusage daily --all --json` for the trailing 12-month window.
3. Run the deterministic SVG generator with the automation's `AS_OF` date.
4. Verify that no raw JSON or prohibited telemetry was added to Git.
5. Continue through the existing bilingual, security, build, PR, merge, Pages,
   and live-site gates.

If `ccusage` or generation fails, the automation preserves the last committed
card and reports the refresh failure. It does not replace the card with an
empty graph or block unrelated evidence gathering.

## Verification

Before publishing:

- run the generator against fresh local aggregate JSON
- run generator-focused Node tests for aggregation, quantiles, streaks,
  bilingual parity, escaping, and invalid-input behavior
- confirm SVGs contain no raw token counts, costs, agent/model names, paths, or
  project identifiers
- render and inspect both light and dark assets
- run `npm run build` and `git diff --check`
- inspect the homepage at desktop and mobile widths in English and Korean
- run the repository's public-security sweep
- update the `juuc/juuc` README only after the portfolio assets are reachable
  from `main`
- confirm the GitHub Pages deployment and live asset URLs after merge

## Scope Boundaries

- No hosted badge service or telemetry upload is introduced.
- No exact token, cost, per-project, per-agent, or per-model breakdown is public.
- No changes are made to GitHub's native contribution graph.
- No unrelated portfolio redesign or broad profile README rewrite is included.
- The existing `HashRouter` and vendored Reactbits components remain unchanged.
