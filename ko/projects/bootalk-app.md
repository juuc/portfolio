# 부톡 앱

[← 포털로 돌아가기](../../README.md) | [English](../../en/projects/bootalk-app.md)

## 프로젝트 개요

부톡 React Native 모바일 앱 — 아파트 검색, AI 채팅, 실시간 알림, 중개사 소통 기능 제공.

**Expo 프레임워크 마이그레이션**을 주도 — `ios/`와 `android/` 네이티브 폴더를 제거하고, EAS를 통한 OTA 업데이트를 가능하게 하며, 전체 앱 아키텍처를 현대화한 7단계 마이그레이션 계획을 설계 및 실행.

> **에픽 참고:**
> - [Issue #84 — Expo 단계적 전환 Milestone 제안](https://github.com/uitiorg/bootalk_app/issues/84) (7단계 마이그레이션 계획)
> - [Discussion #35 — React Native 버전업 및 Expo 도입에 관하여](https://github.com/uitiorg/team-discussions/discussions/35) (타당성 분석)
> - [Discussion #45 — App Expo 도입기](https://github.com/uitiorg/team-discussions/discussions/45) (도입 보고서)

**레포:** [uitiorg/bootalk_app](https://github.com/uitiorg/bootalk_app)

## 지표

| 지표 | 수치 |
|------|------|
| 커밋 | 517 |
| 풀 리퀘스트 | 46 (42건 머지) |
| 추가 라인 | +257,525 |
| 삭제 라인 | -267,426 |
| 기술 스택 | TypeScript, Kotlin, React Native (Expo) |

## 비즈니스 임팩트

### 1. Expo 프레임워크 마이그레이션 — Bare RN에서 Managed 워크플로우로

**문제:** 앱이 bare React Native로 동작하며 분산된 네이티브 의존성, 수동 iOS/Android 설정, OTA 업데이트 불가, 느린 CI/CD (모든 변경에 네이티브 빌드 필요).

**해결:** 7단계 마이그레이션 계획을 설계하고 실행 ([Issue #84](https://github.com/uitiorg/bootalk_app/issues/84)):
1. **Expo Dev Client** — 코드 변경 없이 Expo 생태계 진입
2. **React Navigation v6** — v4/v5/v6 혼재를 네이티브 스택 네비게이션으로 통일
3. **유틸리티 라이브러리** — clipboard, netinfo, secure-store, status-bar를 expo-* 모듈로 교체
4. **UI/미디어 라이브러리** — expo-image, expo-media-library, expo-image-picker로 마이그레이션
5. **Config Plugins** — iamport, Firebase, Facebook, AppsFlyer를 app.json으로 이전
6. **Prebuild 검증** — CNG를 통해 ios/android를 소스 관리에서 제거
7. **EAS 도입** — 클라우드 빌드 + EAS Update를 통한 OTA 업데이트

**임팩트:**
- **OTA 업데이트** — JS 변경사항이 수분 내 배포, 앱스토어 심사 불필요. 긴급 버그 수정 (v3.4.15 계약보고서 계산) 당일 사용자 전달.
- **CI/CD** — EAS 클라우드 빌드, 로컬 네이티브 툴체인 불필요
- **개발자 경험** — CNG로 `app.json`이 모든 네이티브 설정 제어

> **Expo SDK 54 마이그레이션:** [Issue #7](https://github.com/uitiorg/frontend-monorepo/issues/7)

### 2. 테스트 커버리지 90% — 제로에서 마일스톤까지

**문제:** 0% 테스트 커버리지. 테스트가 하나도 없었음.

**해결:** 앱 전체에 체계적으로 테스트 스위트 구축, 90% 라인 커버리지 달성.

**임팩트:** 리팩토링 신뢰성 확보. 리그레션 예방. 프로페셔널 품질 보증.

**핵심 PR:** `test: Achieve 90% test coverage milestone (Issue #109)` (#229)

### 3. 딥링크 통합 — 원활한 웹↔앱 경험

**문제:** 웹과 앱의 URL 체계가 달라 딥링크가 단편적이고 불안정.

**해결:** 딥링크 핸들링 통합. Universal Links 전환.

**임팩트:** 웹과 앱 모두에서 작동하는 공유 링크. 마케팅 캠페인 단일 URL 사용 가능.

**핵심 PR:** `feat: 딥링크 핸들링 통합 - 웹/앱 URL 통일 및 Universal Links 전환` (#201)

### 4. 타입 안전성 — 100% ANY-FREE

[모노레포 타입 안전성 캠페인](frontend-monorepo.md)의 일환으로 앱 모듈의 122개 `any` 타입 전체 제거 — **100% ANY-FREE** 달성, **99.19% 타입 커버리지**. 전 과정에서 1,184건 테스트 통과 유지.

> [완료 보고서 #219](https://github.com/uitiorg/frontend-monorepo/issues/219), [품질 보고서 #540](https://github.com/uitiorg/frontend-monorepo/issues/540) 참고.

### 5. 릴리스 관리 — v3.0.0부터 v3.5.0까지

PO로서 모든 앱스토어/플레이스토어 릴리스 사이클을 직접 관리 — 기능 기획부터 QA 테스트, 스토어 제출까지.

| 버전 | 시기 | 주요 내용 |
|------|------|----------|
| v3.0.0 | 2025년 12월 | 메이저 플랫폼 업그레이드 — 네비게이션 마이그레이션, Amplify 제거, Sentry 통합 |
| v3.1.0 | 2025년 12월 | Expo Push Notifications (Pinpoint 교체), 커스텀 알림음, 화면 캡쳐 방지 |
| v3.2.0 | 2025년 12월 | 에이전틱 워크플로우, 친구초대 이벤트, 크로스 플랫폼 동시 배포 |
| v3.3.0 | 2025년 12월 | 새 로고, 웰컴 페이지 플로우, 이벤트 배너 |
| v3.4.x | 2026년 1월 | nCloud CDN 마이그레이션, 계약보고서 수정 (긴급 OTA v3.4.15) |
| v3.5.0 | 2026년 2월 | 50% 할인 쿠폰 시스템, 테스트 가이드라인 |
