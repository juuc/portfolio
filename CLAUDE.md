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

## 4. Show Impact, Not Activity

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

## 5. Tone & Voice

- **First person, direct.** "I built X" not "X was built"
- **Confident but factual.** Let numbers speak. No superlatives ("amazing", "incredible", "cutting-edge")
- **No filler.** Cut "In order to", "As part of the effort to", "It should be noted that"
- **Show, don't tell.** "838 commits in December — 13x pre-Claude output" demonstrates intensity better than "I worked extremely hard"

## 6. AX Section Integrity

The AI Transformation section is a key differentiator. Protect its quality:

- **Principles over mechanics.** "Why it works" matters more than "what tools I used"
- **Concrete examples only.** Every claim must have a number or specific reference
- **Keep the 5 principles section.** It distinguishes "AI user" from "AI-powered engineer"
- **Update the commit numbers** when adding new work — the monthly table and totals must stay accurate

## 7. Accuracy

- Commit counts, PR counts, dates MUST match real GitHub data
- When updating metrics, verify with `gh` CLI against the actual repos
- Don't round up or exaggerate — "754+" is fine, "800+" when the real number is 754 is not
- Dates should be verifiable from git history

## Structure Reference

```
/tmp/portfolio/
  README.md                    # Portal — bilingual project index
  en/
    overview.md                # Role narrative + AX section + metrics
    timeline.md                # Monthly/weekly activity + growth phases
    skills.md                  # Tech stack
    architectural-decisions.md # 7 key decisions
    projects/
      frontend-monorepo.md     # Flagship
      bootalk-app.md           # Flagship
      bootalk-amplify.md       # Flagship
      bootalk-web.md           # Flagship (SEO focus)
      ubuntu-crawler.md        # Supporting
      data-pipelines.md        # Supporting
      frontend-onboarding.md   # Supporting
      other-projects.md        # Supporting (multiple small projects)
  ko/                          # Mirror of en/ in Korean
    (same structure)
```

## Workflow

1. Read the file(s) you plan to edit in BOTH languages
2. Check the security gate before writing anything
3. Make edits in both en/ and ko/
4. Verify no sensitive data leaked with a grep sweep
5. Commit with descriptive message
