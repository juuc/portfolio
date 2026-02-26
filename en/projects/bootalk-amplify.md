# Bootalk Amplify

[← Back to Portal](../../README.md) | [한국어](../../ko/projects/bootalk-amplify.md)

## Project Overview

AWS Amplify-based serverless backend powering Bootalk's core business logic — real-time chat, authentication (Cognito OTP), push notifications (Pinpoint), and event-driven triggers across 29 Lambda functions.

This was **legacy infrastructure that couldn't be thrown away**. The backend was being rebuilt as a modular monolith and MSA services, but Amplify still owned critical paths: user authentication, real-time messaging, push notifications, and conversation lifecycle. Migrating these while keeping production stable required **deep understanding before any changes**.

> *"현재 Amplify는 부톡의 큰 기술부채 중 하나"* — from the project README. I inherited this debt and made it manageable.

**Repo:** [uitiorg/bootalk-amplify](https://github.com/uitiorg/bootalk-amplify)

## Metrics

| Metric | Value |
|--------|-------|
| Commits | 209 |
| Pull Requests | 13 (9 merged) |
| Lines Added | +49,038 |
| Lines Removed | -40,177 |
| Stack | Node.js, AWS Lambda, DynamoDB Streams, AppSync (GraphQL), Cognito, Pinpoint, SNS/SQS |

## Why This Project Matters

I joined Bootalk as **CDO** — focused on data pipelines and crawlers. I had never touched this Amplify codebase. When the **CTO departed in August 2025**, I inherited full technical ownership of everything, including this legacy serverless backend that nobody else fully understood.

The challenge wasn't just fixing bugs — it was **learning to read a production system under pressure**, understanding undocumented event flows (DynamoDB Streams → Lambda → SNS → Legacy API), and making changes without breaking authentication or messaging for live users.

This project is the clearest demonstration of my **codebase adaptation ability**: from zero context to owning the system in weeks.

## System Architecture

```
Mobile App / Web (GraphQL)
    ↓
AppSync (GraphQL endpoint)
    ↓
DynamoDB Tables ──→ Stream Triggers
    │                    ↓
    │              Lambda Functions
    │                    ↓
    │              ┌─────┴─────┐
    │              │           │
    │          SNS/SQS    Pinpoint
    │          (MSA)      (Push)
    │              │
    └──────────────┘
         ↓
    Legacy API (MSA backend)
```

**29 Lambda functions** organized into:
- **Authentication (4):** Cognito custom auth — OTP generation, verification, pre-signup validation
- **Messaging (4):** DynamoDB Stream triggers for real-time chat — push notifications, unread counts
- **Conversations (2):** Chat thread lifecycle — creation triggers, link management
- **Notifications (8):** Scheduled alerts (lowest price, presale, transactions) + real-time push
- **User Management (4):** Account deletion cascade, device endpoint cleanup
- **REST Handlers (2):** API Gateway endpoints for client/admin
- **Infrastructure (4):** Data sync, agent assignment, real-price updates
- **Shared Layer (1):** Common utilities layer — DynamoDB utilities, environment config, Sentry wrapper, service auth

## Business Impact

### 1. Codebase Analysis & Environment Separation

**Problem:** When I first opened this repo, dev and production environments were tangled. Lambda functions had hardcoded production URLs. SNS topics weren't separated. Deploying to staging could affect real users.

**What I did:** Before writing a single line of code, I spent days tracing every Lambda function's data flow — reading DynamoDB Stream configurations, following SNS topic chains, mapping which legacy API endpoints each function called. I documented the entire architecture across 35K+ words of internal documentation.

**Then I separated everything:**
- Lambda API URLs → environment-based via shared Layer constants
- SNS topics → environment-specific prefix for staging vs. bare for production
- DynamoDB Stream ARNs → environment-specific CloudFormation references
- SSM Parameter Store → environment-based path convention for secrets

**Impact:** First time the team could safely test Lambda changes without production risk.

**Key PRs:**
- `feat: Lambda 환경별 Legacy URL 분기 처리` (#8)
- `feat: AWS Amplify 환경 분리 완료 (dev/staging)` (#9)
- `feat: Lambda 함수 API URL 환경 분리 및 MSA 경로 규칙 적용` (#17)

### 2. Centralized Error Tracking (Sentry Integration)

**Problem:** Lambda errors were invisible. When something broke — authentication failure, missed push notification, broken conversation trigger — the only way to know was user complaints. CloudWatch logs existed but nobody monitored them.

**Solution:** Integrated Sentry across all 29 Lambda functions using a **Layer wrapper pattern**. This was non-trivial because `@sentry/aws-serverless` only exists in the shared Layer, not in individual Lambda `node_modules`. Direct imports would crash.

Each Lambda function wraps its handler with a shared Sentry layer — a centralized error tracking wrapper loaded from the common utilities layer. This ensures consistent error capture without duplicating Sentry config across 29 functions.

**Impact:** Lambda errors became visible for the first time. Led directly to discovering and fixing multiple silent production issues (401 auth failures, missing service tokens).

**Key PR:** `feat(lambda): Add centralized Sentry error tracking to all Lambda functions` (#20)

### 3. Service Authentication — Fixing Silent 401 Failures

**Problem:** After Sentry went live, it immediately surfaced a wave of `401 Unauthorized` errors. Lambda functions calling the Legacy API had no service authentication — they were hitting endpoints that now required JWT tokens after the MSA migration.

**Solution:** Implemented JWT-based service authentication in the shared Layer, then systematically added it to every Lambda→Legacy HTTP call across messaging, crawling, and conversation trigger functions.

Also added SSM Parameter Store integration for JWT secrets — injected via CloudFormation dynamic references instead of environment variable hardcoding.

**Impact:** Fixed production-affecting 401 errors across messaging, crawling, and conversation flows. No more silent data loss from failed API calls.

**Key PRs:**
- `fix(lambda): add service auth to Lambda→Legacy HTTP calls` (#28)
- `fix(Crawler): add service auth to legacy API save() call` (#29)
- `fix(lambda): add service auth to unread message trigger` (#35)

### 4. DynamoDB Stream Retry Storm Prevention

**Problem:** When a Lambda trigger returned an error (e.g., 401 from legacy API), DynamoDB Streams would retry indefinitely — creating a retry storm that amplified the error into hundreds of invocations.

**Solution:** Added error swallowing logic for expected failure modes (401/403) in conversation trigger functions. These errors mean the legacy API rejected the request — retrying won't fix it. Log to Sentry for visibility, but don't re-throw.

**Impact:** Eliminated cascading Lambda invocations that were burning compute costs and flooding logs.

### 5. Production Incident Response — Auth Lambda Outage (2025-12-10)

**Context:** During Sentry integration, a deployment error caused all 4 authentication Lambda functions to crash with `Cannot find module '@sentry/aws-serverless'`. **Users could not log in or sign up.**

**Root cause:** The auth Lambdas were modified to directly import Sentry instead of using the Layer wrapper. Additionally, the OTP challenge Lambda was missing `node_modules` (it needs an OTP generation package).

**Resolution:**
1. Identified the exact handler files via CloudFormation template inspection
2. Switched all 4 auth Lambdas to the Layer wrapper pattern
3. Ran `npm install` for the OTP challenge Lambda's dependencies
4. Deployed via AWS CLI (Amplify's `amplify push` can't detect `node_modules` changes)
5. Verified each Lambda with direct invocation tests

**Aftermath:** Documented the entire incident and deployment procedures in `CLAUDE.md`, establishing the team's Lambda deployment checklist that prevents recurrence.

## Technical Depth

### What I Learned by Reading This Codebase

Before I could change anything, I had to understand:

- **GraphQL schema** (524 lines) defining the data model — Users, Messages, Conversations, Assignments
- **DynamoDB Stream trigger chains** — which table mutations fire which Lambda functions
- **Cognito custom auth flow** — 4 Lambda functions orchestrating phone-number-based OTP login
- **Pinpoint integration** — push notification delivery to iOS/Android device endpoints
- **CloudFormation templates** — infrastructure-as-code for each of the 29 functions
- **Amplify CLI limitations** — why `amplify push` silently fails and when AWS CLI is required

This deep reading is what enabled me to make safe, targeted changes to a system that had been running in production for years.

### Environment Complexity

The naming is counterintuitive and I had to discover this through careful reading:

| Environment Name | Actual Purpose | Git Branch |
|------------------|---------------|------------|
| `dev` | **Production** | `main` |
| `staging` | **Development** | `develop` |

Getting this wrong would mean deploying test code to production. My documentation made this explicit for the entire team.

## Timeline

| Date | Event |
|------|-------|
| Oct 2025 | First commits — environment separation work begins |
| Nov 2025 | Full dev/staging environment separation completed |
| Nov 2025 | API URL environment separation + MSA path rules |
| Dec 2025 | Sentry integration across all Lambda functions |
| Dec 2025 | Auth Lambda outage — diagnosed and resolved within hours |
| Feb 2026 | Service auth campaign — JWT tokens added to all Lambda→Legacy calls |
| Feb 2026 | Retry storm prevention for DynamoDB Stream triggers |

## Key Takeaway

This project isn't about building something new. It's about **inheriting a legacy system, understanding it deeply, and making it reliable** — while keeping it running in production.

The skill demonstrated here is **codebase adaptation**: the ability to read undocumented infrastructure, trace event-driven data flows, and make safe changes under production pressure. As a fullstack developer, this is the complement to greenfield work — and arguably the harder skill.
