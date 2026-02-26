# Other Projects

[← Back to Portal](../../README.md) | [한국어](../../ko/projects/other-projects.md)

## Agent Dashboard
**34 commits | 7 PRs (7 merged)**

Admin dashboard for real estate agents — property management, contract reports, payment tracking.

**Business Impact:**
- **API Environment Separation:** Migrated 56 files from hardcoded URLs to environment-based configuration. Zero hardcoded URLs remaining.
- **Error Handling Infrastructure:** Built centralized error handling with runtime environment detection.
- **Legacy API Improvement:** Fixed data processing patterns across all legacy HTTP client usage points.

---

## MSA Backend
**19 commits | 10 PRs (10 merged)**

Kotlin/Spring multi-module MSA backend services.

**Business Impact:**
- **Batch Job Optimization:** Optimized the daily push notification batch job — 2,370x query speedup via covering index, 98% fewer DB round-trips via N+1 elimination. Job time reduced from 8.4 min to under 1 min. Built AI-automated EXPLAIN forensic analysis tooling that audited 8 production queries and identified further optimization targets — enabling repeatable, automated detection of inefficient queries across the platform. Completed in ~1 week.
- **IDOR Security Fixes:** Added `/me/` pattern endpoints across agent services to prevent Insecure Direct Object Reference vulnerabilities. JWT-based authentication replacing path-based agent ID access.
- **Monolithic API Decomposition:** Split a large monolithic API into 5 independent RESTful endpoints, improving maintainability and performance.
- **Data Service Fixes:** Fixed walking trail coordinate mapping, distance parameter types.

---

## Apartment Advertising Dashboard
**11 commits**

Dashboard for managing **LAAD (아파트 광고 데이터)** — Bootalk's apartment advertising business. One of the first projects built during the CDO onboarding phase. Deployed on GCP Cloud Run. LAAD was a key revenue stream allowing developers and property managers to advertise apartment complexes on the Bootalk platform.

---

## Tax Consulting GPT (세무GPT)
**10 commits**

Frontend for 세무GPT — an AI-powered tax consulting service built for a partner tax firm. This was a significant product initiative involving full-stack development:

**What I Built:**
- **Payment System:** Integrated PortOne payment gateway with free/standard/special tier pricing
- **Legal Data Pipeline:** Indexed tax laws (조문 단위), precedents (판례), and execution standards (집행기준) into Elasticsearch. Built law-precedent cross-reference mapping, and collected additional sources including 기본통칙 and PDF-based 집행기준
- **Agentic Workflow:** Implemented mini-model query rewriting and category classification. Built "specific law at specific time" API call for agentic responses
- **Evaluation:** Set up RAGAS framework for response quality evaluation
- **Chat UX:** Dynamic route `/chat/{id}` for conversation history, feedback forms per response, expandable law/precedent/consultation sections, category selection toggle
- **Data Quality:** Fixed broken precedent links (재수집), ensured 3+ precedents per response, improved old/new law comparison display

**Business Impact:** MVP completed by January 2026. First client meeting held. Active iteration on UX and data quality based on partner feedback.

---

## RAG System POC
**7 commits | 1 PR**

Proof-of-concept for a Retrieval-Augmented Generation system for apartment complex and listing search. Connected to Cloud SQL Postgres with vector search.

---

## AI Meeting Recorder
**4 commits**

AI-powered meeting recording and transcription service.

---

## OCR Service
**4 commits**

Image and table OCR (Optical Character Recognition) service for processing property documents.

---

## Jeonse Fraud Detection POC (전세사기 탐지)
**3 commits**

Proof-of-concept for detecting jeonse (전세) fraud through automated analysis of property registration documents (등기부등본). Built during Q4 2025 when jeonse fraud was a major social issue in Korea — young renters were losing deposits to fraudulent landlords. The goal was to give Bootalk users automated risk assessment before signing jeonse contracts.

---

## Openclaw — AI-Powered Error Resolution
**33 commits (earlier error analysis tool) + new initiative (Openclaw)**

Built an automated error analysis system using AI to parse stack traces from centralized logs and notify relevant teams.

**Openclaw (Feb 2026):** Evolution of the error-handler concept — automated Sentry error detection bot that creates PRs with suggested fixes. Built to reduce developer toil by automatically detecting, diagnosing, and proposing solutions for production errors.

---

## Infrastructure & CI/CD
**~13 commits combined**

Various infrastructure, CI/CD, and maintenance contributions across the organization.

---

## Non-Code Contributions

Beyond repositories, significant time was invested in:
- **Domain & Infrastructure Management:** Gabia domain renewals, Kakao/Naver Map API console configuration, nCloud CDN migration
- **Security Operations:** Departed employee credential rotation, DB access audits, API security hardening
- **Compliance:** KISA privacy audit, location information business registration review
- **Business Operations:** Tax invoice processing, stock option administration, TIPS program bank audits (기보)
- **Team Coordination:** GitHub Discussions for team communication, test guidelines documentation, release coordination across 4 platforms
