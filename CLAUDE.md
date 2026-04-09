# Portfolio Editing Rules

This is a **public portfolio** for Ju Woocheol (주우철). Every edit is visible on GitHub.

## 1. Bilingual Sync (CRITICAL)

Every content change MUST be applied to both language versions:
- `en/` — English (primary)
- `ko/` — Korean

Korean is NOT a mechanical translation. Each version should read naturally in its own language. Shared elements (PR numbers, dates, metrics) must be identical across both.

**Before completing any edit, verify:** Did I update both `en/` and `ko/`?

## 2. Security Gate (NON-NEGOTIABLE)

This repo is PUBLIC. Never include:

| Category | Examples | What to Write Instead |
|----------|----------|----------------------|
| Employee names | Real names of coworkers | Role titles: "CTO", "backend lead", "3 engineers" |
| Internal service names | Product codenames, endpoint names | Generic: "GraphQL endpoint", "common utilities layer" |
| Lambda/function names | Specific trigger or handler names | Descriptive: "conversation trigger function", "OTP challenge Lambda" |
| Database schemas | Table names, column names, stored procedure names | Generic: "apartment supply data", "multi-key mapping" |
| SSM/secret keys | Parameter Store paths, env var names for secrets | Generic: "JWT secrets", "environment-based configuration" |
| Protocol/API IDs | Internal protocol numbers | Generic: "monolithic API", "apartment detail API" |
| Sentry issue IDs | Numeric Sentry references | Remove or say "specific Sentry issue IDs" |
| Internal naming conventions | Environment prefixes, layer names | Generic: "environment-specific prefix" |

**When in doubt, generalize.** The reader needs to understand *what you did*, not *the exact internal identifier*.

## 3. Content Hierarchy

The portfolio has three levels. Respect the pyramid:

```
README.md          → Punchline (one-liner per project, scannable in 30 seconds)
  overview.md      → Narrative (role arc, AX philosophy, key metrics)
    project/*.md   → Evidence (Problem → Solution → Impact + PR links)
```

**Rules:**
- README shows impact one-liners. Never full descriptions.
- Overview tells the story. Never duplicates project page details.
- Project pages provide evidence. Use Problem → Solution → Impact structure.
- **Cross-reference, don't duplicate.** If content exists at one level, link to it from others.

## 4. Show the Compounding Arc

Each project enabled the next breakthrough. When describing impact, connect it to what it unlocked — not just what it achieved in isolation.

```
GOOD:  "SSR → listings indexable → PageSpeed 20→80 → SEO rankings improved"
BAD:   "Implemented SSR. Separately improved PageSpeed. Also did SEO."

GOOD:  "Sentry campaign revealed manual triage was unsustainable → built autonomous bot"
BAD:   "Integrated Sentry. Built a triage bot."
```

The 12-month roadmap was a **chain of compounding investments**: Modernize → Unify → Stabilize → Optimize → Automate. Each project page should reference what it built upon and what it enabled.

## 5. Show Impact, Not Activity

Lead with business outcomes. Implementation is supporting evidence.

```
GOOD:  "PageSpeed 20 → 80 (4x improvement)"
BAD:   "Added lazy loading to Naver Maps SDK and eliminated barrel exports"

GOOD:  "Dynamic sitemap: 5 URLs → 48,706 apartments"
BAD:   "Built a sitemap generator using Next.js API routes"
```

- Metrics only if they demonstrate impact (commit counts, coverage %, performance gains)
- Cut vanity stats (lines added/removed, file counts)
- PR links are evidence, not content — reference them, don't list titles as bullet points

## 6. Tone & Voice

- **First person, direct.** "I built X" not "X was built"
- **Confident but factual.** Let numbers speak. No superlatives ("amazing", "incredible", "cutting-edge")
- **No filler.** Cut "In order to", "As part of the effort to", "It should be noted that"
- **Show, don't tell.** "1,180 commits in December — 18x pre-Claude output" demonstrates intensity better than "I worked extremely hard"

## 7. AX Section Integrity

The AI Transformation section is a key differentiator. Protect its quality:

- **Principles over mechanics.** "Why it works" matters more than "what tools I used"
- **Concrete examples only.** Every claim must have a number or specific reference
- **Keep the 5 principles section.** It distinguishes "AI user" from "AI-powered engineer"
- **Update the commit numbers** when adding new work — the monthly table and totals must stay accurate

## 8. UI Effects Philosophy

The portfolio is a **React + Vite + TypeScript + Tailwind CSS SPA** deployed to GitHub Pages via GitHub Actions. Animation components come from [reactbits.dev](https://reactbits.dev) and live in `src/components/ui/` (all files have `// @ts-nocheck` — don't remove it, don't type them strictly).

- **One strong accent > three competing ones.** A single well-placed effect demonstrates frontend taste. Multiple effects turn the portfolio into a demo page.
- **Effect must serve the content.** The portfolio's job: "I built impressive things." The effect's job: "...and I have excellent frontend taste." Never let the effect compete with the message.
- **HashRouter is required** for GitHub Pages static hosting — all routes live after `#` (e.g. `/#/en/projects/bootalk-app`). Never switch to BrowserRouter.
- **Lang toggle + URL must stay in sync.** `LangContext` holds UI state; `/:lang/` URL param drives markdown fetches. When toggling language on a detail page, both must update together (see `Nav.tsx`).
- **reactbits components are vendored** — update them by replacing the file, not by patching internals. The one exception: `hasRun` cleanup in `DecryptedText.tsx` (fixes React StrictMode double-mount).

## 9. Accuracy

- Commit counts, PR counts, dates MUST match real GitHub data
- When updating metrics, verify with `gh` CLI against the actual repos
- Don't round up or exaggerate — "754+" is fine, "800+" when the real number is 754 is not
- Dates should be verifiable from git history

## Structure Reference

```
/portfolio/
  public/
    en/
      overview.md, timeline.md, skills.md, architectural-decisions.md
      projects/
        frontend-monorepo.md, bootalk-app.md, bootalk-amplify.md, bootalk-web.md
        sentry-triage-bot.md, ubuntu-crawler.md, data-pipelines.md
        frontend-onboarding.md, other-projects.md
    ko/                        # Mirror of en/ in Korean
  src/
    data.ts                    # All bilingual UI strings + project metadata
    App.tsx                    # HashRouter + route definitions
    context/LangContext.tsx    # en/ko toggle (state + URL must stay in sync)
    components/
      Nav.tsx                  # Fixed nav + lang toggle (hides on detail pages)
      Hero.tsx                 # DecryptedText name + Particles background
      Projects.tsx             # Flagship project cards (SpotlightCard)
      Timeline.tsx, Skills.tsx, OtherProjects.tsx
      MarkdownPage.tsx         # Fetches public/{lang}/*.md, renders with marked
      ui/                      # reactbits vendored components (@ts-nocheck)
  README.md                    # Portal — bilingual project index (GitHub-facing)
  CLAUDE.md                    # This file
```

**Live site:** `https://juuc.github.io/portfolio/`  
**Deploy:** GitHub Actions (`.github/workflows/deploy.yml`) — pushes to `main` trigger auto-deploy.

## Workflow

1. Read the file(s) you plan to edit in BOTH languages
2. Check the security gate before writing anything
3. Make edits in both en/ and ko/
4. Verify no sensitive data leaked with a grep sweep
5. Commit with descriptive message
