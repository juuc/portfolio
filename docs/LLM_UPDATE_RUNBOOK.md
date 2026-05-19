# LLM Portfolio Update Runbook

Use this when an LLM needs to refresh this portfolio with recent GitHub activity,
career metrics, project progress, or timeline changes.

This repo is public. Collect private evidence locally, but publish only safe
aggregates and public-friendly descriptions.

## 0. Operating Rules

Before editing:

1. Read `AGENTS.md` and `CLAUDE.md`.
2. Read `docs/PORTFOLIO_CONTEXT.md` for public-safe source material and the
   current impact-first structure.
3. Set the update date explicitly. Do not rely on "today" in prose.
4. Keep English and Korean content in sync:
   - `public/en/...`
   - `public/ko/...`
5. Use fresh `gh` output for metrics. Do not copy old counts forward.
6. Do not publish private names, internal service identifiers, schema names,
   secret names, Sentry issue IDs, or exact internal API/protocol IDs.

## 1. Define The Update Packet

Write down these values before making changes:

```text
AS_OF=<YYYY-MM-DD>
START_DATE=2025-03-01
LOGINS=juuc,jwc-bootalk
METRIC_METHOD=GitHub Search API authored commit counts + GraphQL PR search counts
PUBLISHING_RULE=publish aggregates only; generalize private operational details
```

Recommended metric categories:

- Total GitHub-verified authored commits
- Bootalk/company-scope authored commits, if still part of the portfolio
- Total authored PRs
- Merged authored PRs
- Monthly authored commits
- Monthly authored PRs
- Key repo/project counts that appear on project pages

If the source scope changes, document the method in prose, not private owner
names. For example: "company-scope repositories accessible through the GitHub
account" is safer than exposing a private org name.

## 2. Check GitHub Access

```bash
gh auth status
gh api rate_limit
```

The active account can differ from the account being queried. That is fine as
long as the token can read the required repositories.

If private repositories are needed, verify access locally but do not commit raw
repo lists or private repo names into the portfolio.

## 3. Collect Metrics

Use one measurement method consistently. The current portfolio uses GitHub Search
API counts, not the contribution graph.

### Commit Counts

Use commit search totals for each author login and date range:

```bash
gh api --method GET \
  -H "Accept: application/vnd.github.cloak-preview+json" \
  /search/commits \
  -f q="author:juuc committer-date:2026-05-01..2026-05-19" \
  --jq '.total_count'

gh api --method GET \
  -H "Accept: application/vnd.github.cloak-preview+json" \
  /search/commits \
  -f q="author:jwc-bootalk committer-date:2026-05-01..2026-05-19" \
  --jq '.total_count'
```

For scoped metrics, add a safe search qualifier locally, such as `repo:<owner>/<repo>`
or an accessible org/user qualifier. Do not publish private owner names unless
they are already intentionally public in this portfolio.

### PR Counts

Use GraphQL `issueCount`; it returns the full count without needing to paginate
all PR nodes.

```bash
gh api graphql \
  -f query='
query($q: String!) {
  search(type: ISSUE, query: $q, first: 1) {
    issueCount
  }
}' \
  -F q='type:pr author:juuc created:2026-05-01..2026-05-19' \
  --jq '.data.search.issueCount'

gh api graphql \
  -f query='
query($q: String!) {
  search(type: ISSUE, query: $q, first: 1) {
    issueCount
  }
}' \
  -F q='type:pr author:juuc is:merged created:2026-05-01..2026-05-19' \
  --jq '.data.search.issueCount'
```

Repeat for `jwc-bootalk`, then add the totals. For scoped metrics, add the same
safe scope qualifier used for commits.

### Monthly Table

Refresh every month from `START_DATE` through `AS_OF`.

Use closed ranges for complete months and a partial range for the current month:

```text
2026-03-01..2026-03-31
2026-04-01..2026-04-30
2026-05-01..2026-05-19  # partial as of AS_OF
```

When GitHub Search secondary limits appear, slow down and query month-by-month.
Do not replace verified counts with guesses.

## 4. Update The Right Files

Most metric refreshes touch these files:

```text
README.md
src/data.ts
public/en/overview.md
public/ko/overview.md
public/en/timeline.md
public/ko/timeline.md
public/en/skills.md
public/ko/skills.md
public/en/intelz.md
public/ko/intelz.md
public/en/projects/frontend-monorepo.md
public/ko/projects/frontend-monorepo.md
public/en/projects/bootalk-web.md
public/ko/projects/bootalk-web.md
public/en/architectural-decisions.md
public/ko/architectural-decisions.md
```

Project-specific updates may also touch:

```text
public/en/projects/<project>.md
public/ko/projects/<project>.md
```

Rules while editing:

- Update English first only if it helps thinking, then immediately mirror Korean.
- Keep Korean natural and concise.
- Keep shared numbers identical across languages.
- Update `src/data.ts` when card copy, career period, homepage stats, or project
  metadata changes.
- Do not edit `dist/` manually. Let `npm run build` regenerate it if needed.

## 5. Verification Checklist

Run these checks before finalizing.

### Build

```bash
npm run build
```

Large chunk warnings are acceptable only if they already existed or are clearly
unrelated. New build errors must be fixed.

### Whitespace And Patch Hygiene

```bash
git diff --check
git status --short
```

### Stale Metric Sweep

Search for the old numbers you replaced. Adjust the pattern for the specific
update.

```bash
rg -n 'OLD_TOTAL|OLD_PR_COUNT|OLD_PEAK_MONTH|OLD_MULTIPLIER|OLD_DATE_RANGE' \
  README.md src public
```

Example after replacing `3,775`, `754+`, `1,180`, and `18x`:

```bash
rg -n '3,775|754\+|1,180|18x|18배|2025\.03 — 2026\.02|11 months|11개월' \
  README.md src public
```

Expected result: no stale hits, except intentional historical dates in timeline
rows.

### Bilingual Consistency Sweep

Search for the new headline numbers and verify they appear where expected in
both languages.

```bash
rg -n 'NEW_TOTAL|NEW_PR_COUNT|NEW_PEAK_MONTH|NEW_MULTIPLIER|AS_OF' \
  README.md src public/en public/ko
```

Then manually compare the English and Korean versions of each changed document.

### Public Security Sweep

Run a broad sweep, then inspect hits manually. This command is intentionally
noisy.

```bash
rg -n -i \
  'secret|token|password|private key|parameter store|ssm|sentry.*[0-9]{4,}|schema|table|column|procedure|internal|lambda|handler|endpoint' \
  README.md src public docs AGENTS.md CLAUDE.md
```

Expected result: no leaked private identifiers. Generic words such as "secret
management" or "serverless function" may be acceptable if they do not expose
real names or values.

### Local Preview

```bash
npm run dev -- --host 127.0.0.1
```

Open:

```text
http://127.0.0.1:5173/portfolio/
```

At minimum, verify the dev server responds:

```bash
curl -I http://127.0.0.1:5173/portfolio/
curl -s http://127.0.0.1:5173/portfolio/en/timeline.md | sed -n '1,80p'
curl -s http://127.0.0.1:5173/portfolio/ko/timeline.md | sed -n '1,80p'
```

If browser automation is available, also check the rendered homepage and one
English/Korean markdown page.

### Rate Limit Check

```bash
gh api rate_limit
```

Mention any rate-limit or browser-automation limitation in the final response.

## 6. Review The Story

After numbers are updated, read the portfolio as a candidate-facing story:

- Does the first screen still explain who Ju Woocheol is?
- Do the new numbers strengthen the story rather than turning it into a stats
  dump?
- Does each project page still follow Problem -> Solution -> Impact?
- Is the compounding arc still visible?
- Are private implementation details generalized?
- Are English and Korean equally polished?

If a metric is impressive but not meaningful, leave it out.

## 7. Final Response Template

When reporting back, include:

```text
Updated:
- <main files or sections>

Metrics refreshed as of <AS_OF>:
- <headline totals>

Verified:
- npm run build
- git diff --check
- stale metric sweep
- public security sweep
- local preview or HTTP check

Notes:
- <rate limit/browser caveat, if any>
- <whether commit was created, if requested>
```

Do not claim a visual/browser check passed if only HTTP or markdown fetches were
verified.
