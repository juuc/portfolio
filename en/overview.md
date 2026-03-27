# Overview

[← Back to Portal](../README.md)

## Executive Summary

Joined Bootalk as **Chief Data Officer (CDO)** in March 2025, rapidly expanding scope beyond data to lead the entire engineering organization. After the CTO's departure in August 2025, assumed **Technical Lead / Product Owner** responsibilities — managing a 4-person development team, owning all platform deployments, and driving product decisions across web, mobile, backend, and data.

Contributed **3,775 commits** and **1,000+ pull requests** across **28 repositories** in 12 months — an unusually broad scope reflecting an engineer who operated as both builder and leader.

## Role & Leadership

| Responsibility | Details |
|---------------|---------|
| **Team Management** | Led daily standups and weekly planning for 4 engineers (backend, mobile, web, design) |
| **Product Ownership** | Defined dev roadmaps, prioritized features, managed App Store/Play Store releases (v3.0–v3.5) |
| **CTO Handover** | Received full technical handover from departing CTO in Aug 2025; assumed infrastructure, deployment, and architectural ownership |
| **Privacy Officer** | Served as Privacy Protection Officer (개인정보처리담당자), led KISA compliance audits |
| **Partner Relations** | Managed technical integrations with Nonghyup (농협), Lotte Card, Daelim Bath (대림바스) |
| **Business Operations** | Participated in investor relations, TIPS program audits (기보), stock option administration, tax invoice processing |
| **Subsidiary Launch** | Co-founded BOOAI (부아이), an AI subsidiary, handling technical strategy and product development |

## AX: AI Transformation as Core Competency

Using AI isn't a nice-to-have — it's a **core engineering skill** that fundamentally changes what a single developer can accomplish.

### The Cline → Claude Code Transition

Before August 2025, I used **Cline** (VS Code extension) for AI-assisted coding. It was useful but limited — single-file context, no autonomous execution, no parallelism.

On **August 16, 2025**, I adopted **Claude Code** (CLI). The first `CLAUDE.md` was committed at 1:14 PM KST, and the first Claude-assisted code commit — Expo migration Stage 1 — landed 11 minutes later. Within 10 days, I had rolled out Claude Code workflows across all major repositories:

| Date | Repo | Event |
|------|------|-------|
| Aug 16 | mobile app | First `CLAUDE.md` + first Claude-assisted code |
| Aug 19 | legacy-service | Claude PR review workflow |
| Aug 25 | MSA backend | Claude PR review workflow |
| Sep 05 | data | Claude PR review workflow |
| Sep 08 | ubuntu-crawler | First Claude co-authored commit |
| Sep 22 | bootalk-amplify | Claude PR review workflow |
| Oct 29 | onboarding docs | First Claude co-authored commit |

I then purchased the **Max 20x plan** for all developers on the team. This wasn't just a personal productivity tool — it was an **organizational AX (AI Transformation)** decision that changed how the entire team shipped software.

### The Numbers Tell the Story

| Period | Commits | Business Impact |
|--------|---------|----------------|
| Mar–Jul 2025 | ~65/mo | Data pipelines, app maintenance, CTO handover preparation |
| **Aug 2025** | **294** | CTO departed Aug 8 → Claude Code adopted Aug 16 → **engineering velocity restored without new hires** |
| Sep 2025 | 168 | Web platform modernized (Next.js 15, SWC) — groundwork for SEO capability |
| Oct 2025 | 447 | **SSR deployed → apartment listings indexable by search engines for the first time**. Dev/prod environments separated across all platforms |
| Nov 2025 | 985 | **3 repos → 1 monorepo → cross-platform features ship in hours, not days**. SSR goes live in production |
| Dec 2025 | **1,180** | 1,184 tests securing production stability. v3.2.0 deployed to all 4 platforms simultaneously |
| Jan 2026 | 660 | **PageSpeed 20→80 (4x) → improved SEO rankings and user retention**. Mobile LCP 3.3s→1.3s |
| Feb 2026 | 594 | Production error noise systematically eliminated. **Led directly to autonomous Sentry triage bot** |

From ~65 commits/month to **1,180 in December** — an **18x increase**. Two months later, PageSpeed went from 20 to 80, and the sitemap grew from 5 URLs to 48,706. This isn't typing faster — it's a fundamentally different operating model.

### How the Workflow Works

**Tmux multi-pane orchestration:**
- 4-8 Claude Code agents running simultaneously in split terminal panes
- Each agent owns a non-overlapping set of files to prevent conflicts
- Agents work autonomously — read codebase, plan changes, implement, self-verify

**Overnight autonomous execution:**
- Queue complex tasks (type safety phases, test suites, refactoring campaigns)
- Agents process continuously through the night
- Wake up to completed PRs ready for review

**Phase-based parallelism:**
- Break large campaigns into independent phases (e.g., 50+ PR type safety epic)
- Distribute phases across concurrent agent sessions
- Coordinate via shared `CLAUDE.md` instructions and issue tracking

This methodology enabled a single engineer to produce output comparable to a team of 5+ — directly responsible for the 3,775 commits and 1,000+ PRs across 28 repositories in 12 months.

### What Makes AI-Powered Engineering Work

The tooling matters less than the approach. Here are the principles that turned AI from a code autocomplete into a force multiplier:

**1. Treat AI as infrastructure, not a tool.**
I didn't just install Claude Code and start prompting. I designed a **production pipeline** around it — tmux orchestration, `CLAUDE.md` conventions per repo, overnight execution queues, phase-based task decomposition. The 13x output increase came from systems engineering around AI, not from better prompts.

**2. Delegate intent, not instructions.**
Effective AI delegation means giving **outcomes and constraints**, not step-by-step directions. "Eliminate all `any` types in the admin module while keeping tests passing" works. "Open file X, change line 42, then open file Y..." doesn't scale. The skill is knowing the right altitude of abstraction for each task.

**3. Design for coordination, not just speed.**
Running 8 AI agents in parallel is useless if they conflict. Each agent owns a **non-overlapping set of files**. Large campaigns are decomposed into independent phases. Shared `CLAUDE.md` files establish conventions that prevent drift. The hard problem isn't making AI fast — it's making parallel AI work **coherent**.

**4. Own quality, delegate execution.**
AI writes the code. I own the architecture, the review, and the decision of what to build. Every PR gets reviewed. Every campaign starts with a human-defined scope. The overnight agents produce PRs — not merged code. This separation is what keeps AI output production-grade rather than demo-grade.

**5. Scale it to the team, not just yourself.**
Buying Max 20x for every developer, establishing PR review workflows across 7 repos within 10 days, writing `CLAUDE.md` conventions that any team member can follow — this was an **organizational transformation**, not a personal productivity hack. The goal was never "I ship faster." It was "the team ships faster."

### Beyond Code: AI-Operated Systems

The 5 principles above accelerate *coding*. But the real AX frontier is building systems where AI operates autonomously — not writing code, but running production operations.

**[Autonomous Sentry Triage Bot](projects/sentry-triage-bot.md)** is the clearest example: a pipeline where Sentry webhooks trigger AI-driven triage across 4 repositories, with environment-aware policy gates, read-only database verification, automatic PR creation for production issues, and Telegram reporting — all without human intervention.

From alert to fix PR in minutes, not hours. No on-call engineer needed.

This represents the evolution from "AI helps me code faster" to "AI handles production operations that previously required a dedicated on-call engineer." The Sentry bot doesn't just use the 5 principles — it *embodies* them: it's infrastructure (not a tool), it receives intent (not instructions), it coordinates across repos (not just speed), it produces PRs for human review (quality ownership), and it runs for the whole team (not just one person).

## What I Built

Led frontend architecture across web (Next.js), mobile (React Native/Expo), and admin systems while simultaneously building data pipelines, backend services, and AI products. Drove major platform modernization initiatives including cloud migration, type safety campaigns, and comprehensive test coverage.

## Key Metrics

| Metric | Value |
|--------|-------|
| Total Commits | **3,775** |
| Pull Requests | **1,000+** (762 merged in monorepo alone) |
| Active Repositories | **28** |
| Peak Month | Dec 2025 — **1,180 commits** |
| Active Days | ~220 (7 days/week including weekends) |
