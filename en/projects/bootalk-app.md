# Bootalk App

[← Back to Portal](../../README.md) | [한국어](../../ko/projects/bootalk-app.md)

## Project Overview

React Native mobile application for Bootalk — serving home buyers and renters with property search, AI chat, real-time notifications, and agent communication.

Led the **Expo framework migration** — a 7-stage migration plan that eliminated the `ios/` and `android/` native folders, enabled OTA updates via EAS, and modernized the entire app architecture.

> **Epic References:**
> - [Issue #84 — Expo 단계적 전환 Milestone 제안](https://github.com/uitiorg/bootalk_app/issues/84) (7-stage migration plan)
> - [Discussion #35 — React Native 버전업 및 Expo 도입에 관하여](https://github.com/uitiorg/team-discussions/discussions/35) (feasibility analysis)
> - [Discussion #45 — App Expo 도입기](https://github.com/uitiorg/team-discussions/discussions/45) (adoption report)

**Repo:** [uitiorg/bootalk_app](https://github.com/uitiorg/bootalk_app)

## Metrics

| Metric | Value |
|--------|-------|
| Commits | 517 |
| Pull Requests | 46 (42 merged) |
| Lines Added | +257,525 |
| Lines Removed | -267,426 |
| Stack | TypeScript, Kotlin, React Native (Expo) |

## Business Impact

### 1. Expo Framework Migration — From Bare RN to Managed Workflow

**Problem:** The app ran on bare React Native with scattered native dependencies, manual iOS/Android configuration, no OTA updates, and slow CI/CD (native builds required for every change).

**Solution:** Designed and executed a 7-stage migration plan ([Issue #84](https://github.com/uitiorg/bootalk_app/issues/84)):
1. **Expo Dev Client** — entered Expo ecosystem without code changes
2. **React Navigation v6** — unified v4/v5/v6 fragmentation into native stack navigation
3. **Utility libraries** — replaced clipboard, netinfo, secure-store, status-bar with expo-* modules
4. **UI/Media libraries** — migrated to expo-image, expo-media-library, expo-image-picker
5. **Config Plugins** — moved iamport, Firebase, Facebook, AppsFlyer to app.json
6. **Prebuild validation** — removed ios/android from source control via CNG
7. **EAS adoption** — cloud builds + OTA updates via EAS Update

**Impact:**
- **OTA updates** — JS-only changes deploy in minutes, no App Store review needed. Critical bug fix (v3.4.15 contract report calculation) reached users same-day.
- **CI/CD** — cloud builds via EAS, no local native toolchain required
- **Developer experience** — CNG means `app.json` controls all native config

> **Expo SDK 54 migration:** [Issue #7](https://github.com/uitiorg/frontend-monorepo/issues/7)

### 2. 90% Test Coverage — From Zero to Milestone

**Problem:** App had 0% test coverage. No tests existed.

**Solution:** Systematically built test suites across the entire app, achieving 90% line coverage.

**Impact:** Confidence in refactoring. Regression prevention. Professional-grade quality assurance.

**Key PR:** `test: Achieve 90% test coverage milestone (Issue #109)` (#229)

### 3. Deep Link Unification — Seamless Web↔App Experience

**Problem:** Web and app had different URL schemes. Deep links were fragmented and unreliable.

**Solution:** Unified deep link handling. Transitioned to Universal Links for seamless web-to-app navigation.

**Impact:** Users can share links that work correctly on both web and app. Marketing campaigns can use single URLs.

**Key PR:** `feat: 딥링크 핸들링 통합 - 웹/앱 URL 통일 및 Universal Links 전환` (#201)

### 4. Type Safety — 100% ANY-FREE

As part of the [monorepo-wide type safety campaign](frontend-monorepo.md), eliminated all 122 `any` types in the app module — achieving **100% ANY-FREE** status and **99.19% type coverage**. All 1,184 tests maintained passing throughout.

> See [Completion Report #219](https://github.com/uitiorg/frontend-monorepo/issues/219) and [Quality Report #540](https://github.com/uitiorg/frontend-monorepo/issues/540).

### 5. Release Management — v3.0.0 to v3.5.0

As PO, personally managed every App Store / Play Store release cycle — from feature planning through QA testing to store submission.

| Version | Date | Highlights |
|---------|------|------------|
| v3.0.0 | Dec 2025 | Major platform upgrade — navigation migration, Amplify removal, Sentry integration |
| v3.1.0 | Dec 2025 | Expo Push Notifications (replacing Pinpoint), custom alert sounds, screen capture prevention |
| v3.2.0 | Dec 2025 | Agentic workflow, friend invitation event, cross-platform synchronized deployment |
| v3.3.0 | Dec 2025 | New logo, welcome page flow, event banners |
| v3.4.x | Jan 2026 | nCloud CDN migration, contract report fix (emergency OTA v3.4.15) |
| v3.5.0 | Feb 2026 | 50% discount coupon system, test guidelines |
