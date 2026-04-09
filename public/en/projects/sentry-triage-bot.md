# Autonomous Sentry Triage Bot

## Project Overview

An autonomous error triage pipeline that receives Sentry webhooks, diagnoses production issues across 4 repositories, and creates fix PRs — all without human intervention. Built on OpenClaw (AI agent orchestration framework) with Cloudflare Tunnel for secure webhook ingestion.

## The Problem

Manual Sentry triage was a constant drain on engineering attention:

- **Context-switching:** Every alert required an engineer to stop current work, read the error, check which repo/environment it came from, and decide what to do
- **Cross-repo diagnosis:** Issues often spanned frontend, backend, legacy service, and serverless layers — each requiring separate investigation
- **Environment confusion:** Development and production alerts mixed together, wasting time triaging non-production noise
- **On-call fatigue:** As the sole Tech Lead after the CTO's departure, every Sentry alert ultimately landed on my desk

## The Solution

### Architecture

```
Sentry webhook
  → Cloudflare Tunnel (public endpoint)
    → Token proxy (auth injection)
      → OpenClaw gateway (webhook handler)
        → Transform layer (noise filtering + triage prompt construction)
          → AI agent (autonomous diagnosis)
            → Telegram group (triage report)
            → GitHub PR (production fixes)
            → Sentry API (issue resolution)
```

### How It Works

**1. Intelligent Noise Filtering**

The transform layer classifies incoming webhooks before the AI agent ever runs — test pings, resolved events, and incomplete payloads are handled without burning tokens. Only real, actionable issues reach the AI.

**2. Mandatory Evidence Collection**

The agent never classifies from webhook payload alone. For every issue:
- Fetches full issue details and latest event from the Sentry API
- Extracts environment proof from host, release tags, breadcrumbs, and URLs
- Identifies whether the issue is production or development

**3. Cross-Repository Verification**

Every issue is investigated across 4 codebases:
- Frontend monorepo (Next.js/React)
- Kotlin/Spring backend
- Legacy Node.js service
- AWS Lambda (Amplify) layer

When needed, the agent performs read-only database queries (MySQL via pymysql) or AWS CLI lookups to verify the root cause — with hard prohibitions against any write operations.

**4. Environment-Aware Policy Gate**

| Environment | Fix PR | GitHub Issue | Sentry Action |
|-------------|--------|-------------|---------------|
| Production | Create in worktree, target integration branch | Allowed | Resolve (inNextRelease) |
| Development | Prohibited | Prohibited | Resolve/keep open based on evidence |

This prevents noise PRs from development environments while ensuring production issues get automated fixes.

**5. Safety Controls**

- All code edits happen in `/tmp` worktrees — never in the repo root
- PRs target integration branches (never `main` directly)
- Read-only database access only — write/delete operations are hard-blocked
- Patch failure recovery: re-read → split hunks → retry 3x → report blocked hunks
- Every investigated issue is logged to `incidents-YYYY-MM.jsonl` and `pr-history.md`

**6. Health Monitoring**

A 15-minute cron job checks the entire pipeline:
- Cloudflare Tunnel process alive
- Local webhook endpoint responding (202)
- Public endpoint responding (202)

Silent when healthy; alerts to Telegram only on failure.

## Business Impact

| Metric | Before | After |
|--------|--------|-------|
| Triage response time | Minutes to hours (human) | Seconds (autonomous) |
| Cross-repo investigation | Manual, 4 separate checkouts | Automated, 4 repos in parallel |
| Dev environment noise | Mixed with production alerts | Automatically filtered |
| Fix deployment | Manual: diagnose → code → PR → review | Automated: webhook → PR in minutes |
| On-call burden | Every alert required human attention | Only edge cases need human review |

## Technical Stack

| Layer | Technology |
|-------|-----------|
| Webhook ingestion | Cloudflare Tunnel + Node.js proxy |
| Agent orchestration | OpenClaw (Gemini 3.1 Pro) |
| Triage logic | JavaScript transform + markdown runbook |
| Code analysis | Multi-repo worktree isolation |
| Database verification | pymysql (read-only) + AWS CLI |
| Notification | Telegram Bot API |
| Health monitoring | Cron-based endpoint polling |
| Version control | Git worktree-first safety pattern |

## Why This Matters

This project represents the evolution from "AI helps me write code" to "AI operates production systems autonomously." It's not a chatbot or a code generator — it's an on-call engineer that never sleeps, investigates every alert with full codebase context, and produces fix PRs that a human only needs to review and merge.

The 5 AX principles (infrastructure mindset, intent delegation, coordination design, quality ownership, team scaling) converge in this single system — it's the practical proof that AI-powered engineering is more than fast typing.
