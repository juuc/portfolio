# Portfolio Agent Instructions

This repository is a public portfolio for Ju Woocheol. Every edit can become
visible on GitHub, so keep changes accurate, bilingual, and safe to publish.

## Bilingual Sync

Every content change must be applied to both language versions:

- `public/en/` for English
- `public/ko/` for Korean

Korean should read naturally, not like a mechanical translation. Shared facts
such as dates, PR numbers, and metrics must match across both languages.

Before finishing any edit, verify that both `en` and `ko` were updated when the
change affects portfolio content.

## Public Security Gate

Never publish private operational details. Generalize anything that could expose
internal systems or people.

Do not include:

- Employee names. Use role titles such as "CTO", "backend lead", or "3 engineers".
- Internal service names. Use generic phrases such as "GraphQL endpoint" or
  "common utilities layer".
- Lambda or function names. Use descriptive names such as "conversation trigger
  function" or "OTP challenge Lambda".
- Database schema details. Avoid table names, column names, and stored procedure
  names. Use domain-level descriptions instead.
- Secret names, parameter paths, token names, private keys, or credential values.
- Internal protocol numbers or API identifiers.
- Sentry issue IDs or other private incident identifiers.
- Internal naming conventions, environment prefixes, or layer names.

When in doubt, generalize. The reader needs to understand what was accomplished,
not the exact private identifier.

## Content Hierarchy

Respect the portfolio pyramid:

```text
README.md          -> Punchline: scannable project one-liners
public/*/overview  -> Narrative: role arc, AX philosophy, key metrics
public/*/projects  -> Evidence: Problem -> Solution -> Impact + PR links
```

Rules:

- `README.md` should stay compact and impact-oriented.
- Overview pages tell the broader story and should not duplicate every project
  detail.
- Project pages provide evidence using a Problem -> Solution -> Impact shape.
- Cross-reference instead of duplicating the same explanation across levels.

## Compounding Arc

Show how each project enabled the next breakthrough. Describe the chain of
investments rather than isolated activity.

Good:

- "SSR -> listings indexable -> PageSpeed 20 -> 80 -> SEO rankings improved"
- "Sentry campaign revealed manual triage was unsustainable -> built autonomous bot"

Avoid:

- "Implemented SSR. Improved PageSpeed. Did SEO."
- "Integrated Sentry. Built a triage bot."

The roadmap arc is Modernize -> Unify -> Stabilize -> Optimize -> Automate ->
Harden. Keep that chain visible when adding or revising pages.

## Show Impact, Not Activity

Lead with business or engineering outcomes. Implementation details are
supporting evidence.

Prefer:

- "PageSpeed 20 -> 80"
- "Dynamic sitemap: 5 URLs -> 48,706 apartments"

Avoid:

- "Added lazy loading and changed imports"
- "Built a sitemap generator"

Use metrics only when they demonstrate impact. PR links are evidence, not the
main content.

## Tone And Voice

- Use first person and direct language: "I built X".
- Be confident but factual. Let numbers carry the weight.
- Avoid filler such as "In order to", "As part of the effort to", and
  "It should be noted that".
- Avoid exaggeration. Do not round up beyond verified data.

## AX Section Integrity

The AI Transformation section is a key differentiator.

- Explain principles over mechanics.
- Keep claims concrete with numbers or specific evidence.
- Preserve the five-principles framing unless the portfolio structure changes.
- When GitHub metrics change, update the monthly table and totals together.

## UI And App Constraints

The portfolio is a React + Vite + TypeScript + Tailwind CSS SPA deployed to
GitHub Pages through GitHub Actions.

- `HashRouter` is required for GitHub Pages static hosting. Do not switch to
  `BrowserRouter`.
- Routes live after `#`, for example `/#/en/projects/bootalk-app`.
- Language state and URL language segment must stay in sync.
- Markdown content is fetched from `public/{lang}/...`.
- Reactbits components are vendored in `src/components/ui/` and usually include
  `// @ts-nocheck`; do not type them strictly as drive-by cleanup.
- Keep effects subordinate to the content. One strong accent is better than
  multiple competing visual flourishes.

## Accuracy

- Commit counts, PR counts, and dates must match fresh GitHub data.
- Use `gh` CLI against the actual repositories before changing metrics.
- Distinguish GitHub Search API counts from contribution-graph totals when that
  matters.
- Dates should be verifiable from git or GitHub history.

## Structure Reference

```text
portfolio/
  public/
    en/
      overview.md
      timeline.md
      skills.md
      architectural-decisions.md
      projects/
    ko/
      overview.md
      timeline.md
      skills.md
      architectural-decisions.md
      projects/
  src/
    data.ts
    App.tsx
    context/LangContext.tsx
    components/
      Nav.tsx
      Hero.tsx
      Projects.tsx
      Timeline.tsx
      Skills.tsx
      OtherProjects.tsx
      MarkdownPage.tsx
      ui/
  README.md
  CLAUDE.md
  AGENTS.md
```

Live site: https://juuc.github.io/portfolio/

Deploy: GitHub Actions via `.github/workflows/deploy.yml`; pushes to `main`
trigger deployment.

## Recommended Workflow

For portfolio metric or documentation refreshes, follow
`docs/LLM_UPDATE_RUNBOOK.md` before editing.

1. Read the files you plan to edit in both languages.
2. Check the public security gate before writing.
3. Make matching edits in `public/en` and `public/ko`.
4. Update `src/data.ts` when UI labels, project metadata, or headline metrics
   change.
5. Verify metrics with `gh` when numbers change.
6. Run `npm run build` for app-affecting changes.
7. Run `git diff --check`.
8. Sweep for stale metrics and sensitive identifiers before finalizing.
