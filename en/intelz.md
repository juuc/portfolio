# Intelz / YouBook — Previous Experience

[← Back to Portal](../README.md) | [한국어](../ko/intelz.md)

## Overview

**App Developer & Data Manager** at [Intelz (인텔즈)](https://youbook.biz) — an AI-powered minibook knowledge sharing platform. "동영상은 YouTube, 미니북은 YouBook" (Videos are YouTube, mini-books are YouBook).

**Organization:** [plootokr](https://github.com/plootokr)
**Period:** 2022.02 — 2025.08 (~3.5 years, during college)
**Education:** Seoul National University — Civil Engineering (Graduated 2025.07)
**Commits:** 368 across 6 repositories

## The Product

YouBook is a knowledge sharing platform where users create, discover, and remix "minibooks" — short-form content under 10 pages. Key features include AI-powered content co-creation (GPT-4), expert mentoring via video, auto-translation to 13+ languages serving 190+ countries, and a 70/30 author revenue share model.

The platform evolved through three brand phases: Plooto → Intelz → YouBook.

## Team

4-person team: backend developer, web developer, **app developer (me)**, and designer.

## What I Learned

This role was as much about business and product as it was about code. Working on a content platform during college taught me how users think about UX, what makes content structures work, and how product decisions shape engineering priorities. The technical work — mobile apps, data pipelines, web integrations — was the vehicle, but product thinking was the real takeaway.

## What I Built

### 1. Mobile App — Three Generations

Led the entire mobile app evolution across 3 rewrites over 3 years. This is where I learned how React Native's native bridge works (from RN 0.73), how to manage the gap between webview and native experiences, and how mobile platform constraints shape product decisions.

| Generation | Repo | Period | Commits | Architecture |
|-----------|------|--------|---------|-------------|
| 1st | service-app | 2022-02 → 2022-09 | 12 | Bare React Native, webview-only |
| 2nd | intelzRN | 2022-07 → 2024-04 | 98 | Native React Native (v1.0→v1.6) |
| 3rd | youbook-app | 2024-04 → 2025-08 | 119 | Expo managed workflow |

**What each generation added:**
- **1st gen:** Basic webview wrapper for the web platform
- **2nd gen:** Native payments (iamport/PortOne), push notifications (Firebase), CodePush OTA updates, Fastlane CI/CD, Kakao/Apple social login, multi-language notification subscriptions
- **3rd gen:** Expo prebuild migration, modern notification handling (Notifee), library modernization

**App Store & Play Store submissions:** Owned the entire release pipeline — app metadata, screenshots, privacy declarations, review guideline compliance, version management, and responding to reviewer feedback. Handled both initial submissions and ongoing updates across iOS and Android.

This experience directly informed the [Bootalk App Expo migration](projects/bootalk-app.md) — same pattern, executed faster the second time.

### 2. Data Automation — 10x Speedup

**Problem:** Content data was being inserted manually — a slow, error-prone process that consumed significant team hours.

**Solution:** Built automated data pipelines using Selenium and Python crawlers to ingest, transform, and load content data.

**Impact:** 10x reduction in data processing time. This work became the foundation for my CDO role at Bootalk, where I built Dagster-based ETL pipelines and led the data team.

### 3. Web-App Integration (121 commits in service-web)

As the app developer, I owned the bridge between the web platform and native app:
- App notification badges and unread count sync
- In-app payment flows (iOS/Android)
- WebView ↔ native bridge (Android back button, screen-awake for audio playback)
- Social login integration (Kakao, Apple)
- Analytics consolidation (GA4, Firebase)

### 4. Backend — AI Chatbot Integration (16 commits)

- Integrated OpenAI GPT-4 for the 인텔즈봇 (knowledge chatbot) with real-time streaming responses
- Firebase push notification infrastructure
- Native app authentication APIs

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Mobile | React Native, Expo, CodePush, Fastlane, Notifee |
| Web | React, JavaScript, CSS |
| Backend | Node.js, Firebase, Neo4j (Cypher) |
| Data | Python, Selenium |
| AI | OpenAI GPT-4 |
| Payments | iamport (PortOne) |
| Auth | Kakao, Apple, Firebase Auth |

## Career Connection

The skills built at Intelz directly enabled what I did at Bootalk:

| Intelz (2022–2025) | → | Bootalk (2025–2026) |
|---------------------|---|---------------------|
| Selenium/Python crawlers | → | Dagster ETL pipelines, CDO role |
| RN → Expo migration | → | Bootalk App Expo migration (7-stage) |
| 4-person team member | → | 4-person team leader |
| In-app payments (iamport) | → | Payment system (SemuGPT) |
| GPT-4 chatbot integration | → | AI products (부토기, SemuGPT) |
| 368 commits / 3.5 years | → | 3,203 commits / 11 months (AI-powered) |
