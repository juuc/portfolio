# Overview

[← Back to Portal](../README.md)

## Executive Summary

Joined Bootalk as **Chief Data Officer (CDO)** in March 2025, rapidly expanding scope beyond data to lead the entire engineering organization. After the CTO's departure in August 2025, assumed **Technical Lead / Product Owner** responsibilities — managing a 4-person development team, owning all platform deployments, and driving product decisions across web, mobile, backend, and data.

Contributed **3,203 commits** and **754+ pull requests** across **28 repositories** in 11 months — an unusually broad scope reflecting an engineer who operated as both builder and leader.

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
| Aug 16 | bootalk_app | First `CLAUDE.md` + first Claude-assisted code |
| Aug 19 | legacy-service | Claude PR review workflow |
| Aug 25 | btalk2.1_backend | Claude PR review workflow |
| Sep 05 | data | Claude PR review workflow |
| Sep 08 | ubuntu-crawler | First Claude co-authored commit |
| Sep 22 | bootalk-amplify | Claude PR review workflow |
| Oct 29 | frontend_onboarding | First Claude co-authored commit |

I then purchased the **Max 20x plan** for all developers on the team. This wasn't just a personal productivity tool — it was an **organizational AX (AI Transformation)** decision that changed how the entire team shipped software.

### The Numbers Tell the Story

| Period | Monthly Commits | AI Tooling |
|--------|----------------|------------|
| Mar–Jul 2025 | ~65/month avg | Cline (VS Code) |
| **Aug 2025** | **291** | **Claude Code adopted** |
| Sep 2025 | 163 | Workflow refinement |
| Oct 2025 | 396 | Multi-repo rollout complete |
| Nov 2025 | 632 | Parallel orchestration mastered |
| Dec 2025 | **838** | Peak — 13x pre-Claude output |

From ~65 commits/month with Cline to **838 commits in December** with Claude Code — a **13x increase** in output. This isn't typing faster. It's a fundamentally different way of working.

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

This methodology enabled a single engineer to produce output comparable to a team of 5+ — directly responsible for the 3,203 commits and 754+ PRs across 28 repositories in 11 months.

## What I Built

Led frontend architecture across web (Next.js), mobile (React Native/Expo), and admin systems while simultaneously building data pipelines, backend services, and AI products. Drove major platform modernization initiatives including cloud migration, type safety campaigns, and comprehensive test coverage.

## Key Metrics

| Metric | Value |
|--------|-------|
| Total Commits | **3,203** |
| Pull Requests | **754+** (564 merged in monorepo alone) |
| Active Repositories | **28** |
| Peak Month | Dec 2025 — **838 commits** |
| Active Days | ~220 (7 days/week including weekends) |
