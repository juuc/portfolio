# Frontend Onboarding

[← Back to Portal](../../README.md) | [한국어](../../ko/projects/frontend-onboarding.md)

## Project Overview

Comprehensive developer documentation platform for the Bootalk frontend team, built on Mintlify. Serves as the single source of truth for architecture, features, APIs, and development workflows.

**Repo:** [uitiorg/frontend_onboarding](https://github.com/uitiorg/frontend_onboarding)

## Metrics

| Metric | Value |
|--------|-------|
| Commits | 342 |
| Pull Requests | 57 (54 merged) |
| Lines Added | +278,057 |
| Lines Removed | -71,134 |
| Stack | MDX, JavaScript, Python (Mintlify) |

## Business Impact

### 1. Complete Feature Map Documentation

**Problem:** No centralized documentation of what the platform does. New developers had no way to understand the system quickly. Knowledge was tribal.

**Solution:** Created exhaustive feature maps for all three platforms:
- **Web:** 56 features documented across maps, apartments, offices, AI, events, rankings
- **Admin:** Dashboard, payment, property, office management
- **App:** Events, notifications, WebView features

**Impact:** Dramatically reduced onboarding time for new team members. Eliminated "ask someone" as the only way to learn.

**Key PRs:**
- `docs: Add Web Feature Map documentation` — 56 features, 100% coverage (#91)
- `docs: Add Admin Feature Map with documentation status` (#87)
- 13 batch documentation PRs for Web features (#73-#85)

### 2. Development Workflow Documentation

**Problem:** No standardized coding conventions, PR process, or testing guides.

**Solution:** Created comprehensive guides for:
- ESLint/Prettier configuration and naming conventions
- Git branching strategy and PR templates
- Testing guides (Jest, Testing Library, Playwright)
- Debugging guides (Sentry, Logger, React DevTools)

**Impact:** Consistent code quality across the team. Faster PR reviews. Self-service debugging.

**Key PRs:**
- `docs: Add coding conventions and PR process documentation` (#90)
- `docs: Add testing and debugging guides` (#92)

### 3. API & Backend Documentation

**Problem:** Lambda functions, stored procedures, and API endpoints were undocumented.

**Solution:** Documented Lambda functions, stored procedures, API auth patterns, and backend/crawler operations.

**Impact:** Frontend team can understand and debug API issues independently.

**Key PRs:**
- Wave-based documentation releases covering all services (#95)
- API auth, App features, Web features, Backend/Crawler updates

### 4. Living Documentation Culture

**Solution:** Established a system for continuously updating documentation through wave-based releases. Each documentation update PR references the specific source PRs being documented.

**Impact:** Documentation stays current with code changes. 44 files changed in a single update covering 7 weeks of changes.

**Key PRs:**
- `docs: 전체 문서 업데이트 (2026-02-06)` — 44 files, +3,917/-1,035 (#95)
