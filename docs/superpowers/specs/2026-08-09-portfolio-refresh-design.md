# Portfolio Refresh Design — 2026-08-09

## Goal

Refresh the public portfolio through 2026-08-09, use local LLM usage aggregates
to understand where effort concentrated, and deploy one coherent update to
GitHub Pages.

The portfolio remains outcome-first. Token volume is an internal editorial
signal, not a proxy for impact.

## Update Packet

```text
AS_OF=2026-08-09
START_DATE=2025-03-01
GITHUB_LOGINS=juuc,jwc-bootalk
GITHUB_METHOD=GitHub Search API commit counts + GraphQL PR counts
LLM_METHOD=ccusage unified Claude Code and Codex aggregate reports
TIMEZONE=Asia/Seoul
PUBLICATION_RULE=publish outcomes and evidence boundaries; keep raw usage private
```

## Sources And Data Flow

1. Re-query GitHub totals and every monthly row from `START_DATE` through
   `AS_OF`. The full refresh is required because commit-search indexing has
   changed historical counts.
2. Run `ccusage` against locally detected Claude Code and Codex data using JSON
   output. Collect only aggregate dates, source/model breakdowns, sessions,
   tokens, cache tokens, and project/instance groupings exposed by the tool.
3. Map usage aggregates to public-safe activity groups using project roots and
   dates, then compare them with GitHub PR distribution and verified outcomes.
4. Use the combined evidence to decide which work deserves a case study,
   timeline space, or a smaller supporting mention.

No prompt bodies, session transcripts, file contents, secret values, local user
paths, raw project identifiers, or session titles are published.

## Editorial Structure

### Headline Metrics

Update the homepage, README, overview, timeline, architectural evidence,
frontend-monorepo evidence, career comparison, SEO metadata, and internal
portfolio context with one consistent 2026-08-09 snapshot.

### New Major Output

Add a bilingual, public-safe case study titled:

```text
Field Operations Platform Productization
현장 운영 플랫폼 제품화
```

The page will use Problem → Output → Impact → Evidence Boundary:

- Problem: multi-role mobile workflows, live operational data, external
  providers, and field evidence were disconnected.
- Output: role-based workflow integration, dispatch/lifecycle handling,
  document and media flows, reviewable OCR, chat/file handling, offline
  recovery, and evidence-gated QA.
- Impact: moved the product from screen-level implementation toward an
  auditable delivery system backed by live DEV data and release evidence.
- Boundary: do not claim production push delivery, production app-store
  release, final OCR accuracy, or completed external-provider activation where
  current proof is incomplete.

If the product name is not already intentionally public in this repository, use
the generic title above.

### Timeline And Existing Narrative

- Finalize July as a complete month.
- Add August as a partial month through 2026-08-09.
- Add one August milestone covering integrated multi-role DEV validation without
  implying production completion.
- Extend the platform-rebuild narrative with cross-system correctness and
  guarded migration work, while retaining explicit implementation/deployment
  boundaries.
- Update the operating stack with evidence-gated mobile QA, infrastructure as
  code, cloud identity, structured OCR observability, and provider/device proof
  separation.

### Cleanup

- Revalidate or qualify stale ongoing type-safety and crawler freshness claims.
- Keep Search Console results dated unless a fresh authoritative export is
  available.
- Treat `index.vanilla.html` as legacy: either mark it clearly as archived or
  remove it only if current consumers and Git history show it is unused.
- Compress vanity commit counts in secondary project pages rather than
  continuously refreshing them.

## LLM Effort Analysis

The internal analysis ranks broad activity groups by:

- active days and session count;
- input, output, cache-creation, and cache-read tokens;
- share of total measured LLM usage;
- GitHub PR volume and merge rate in the same period;
- evidence maturity: source/CI, DEV runtime, provider, device, or production.

Public copy will not include raw token totals or dollar costs. The analysis
determines editorial emphasis without becoming a public usage dashboard.

## Safety And Error Handling

- Preserve all unrelated dirty work, especially the untracked `.omo/` tree.
- Stage portfolio files explicitly; never use `git add -A` in the mixed tree.
- Generalize internal names, APIs, schemas, functions, issue identifiers, and
  provider configuration.
- When source, CI, DEV, provider, device, and production evidence disagree,
  publish the weakest confirmed boundary.
- If `ccusage` cannot attribute a source or project safely, record it as
  unclassified instead of inspecting transcript content.

## Verification And Deployment

1. Reconcile monthly sums to headline totals in both languages.
2. Compare every changed English/Korean pair manually.
3. Run the stale-metric and public-security sweeps.
4. Run `npm run build` and `git diff --check`.
5. Preview the homepage, timeline, overview, and new case study locally.
6. Stage only intended files, commit, push the agent branch, and open a PR.
7. Merge after checks pass, then verify the GitHub Pages workflow and deployed
   HTTP/content snapshot.

## Success Criteria

- All active portfolio surfaces use the 2026-08-09 metric snapshot.
- The monthly table reconciles exactly with the totals.
- Recent field-operations work has a concise bilingual evidence page.
- LLM effort analysis informs emphasis without leaking raw activity data.
- No unsupported production claims or sensitive identifiers are introduced.
- GitHub Pages serves the merged revision successfully.
