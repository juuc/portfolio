# 프론트엔드 모노레포

[← 포털로 돌아가기](../../README.md) | [English](../../en/projects/frontend-monorepo.md)

## 프로젝트 개요

부톡의 모든 클라이언트 애플리케이션을 통합하는 중앙 프론트엔드 모노레포. **2025년 11월에 생성** — 기존에 분산되어 있던 레포지토리(웹, 모바일 앱, 어드민)를 단일 코드베이스로 통합하여 크로스 레포 의존성 문제를 해결하고 공유 인프라를 가능하게 한 전략적 이니셔티브.

> **에픽 참고:** [Discussion #27 — Frontend 프로젝트 통합을 위한 모노레포 도입 마일스톤](https://github.com/uitiorg/team-discussions/discussions/27)

- **apps/web** — Next.js 공개 웹사이트 (bootalk.co.kr)
- **apps/app** — React Native 모바일 앱 컴포넌트
- **apps/admin** — 중개사 관리 대시보드
- **농협** 파트너 웹뷰
- **롯데카드** 파트너 웹뷰
- **packages/** — 공유 타입, API 클라이언트, 유틸리티

**레포:** [uitiorg/frontend-monorepo](https://github.com/uitiorg/frontend-monorepo)

## 지표

| 지표 | 수치 |
|------|------|
| 커밋 | 1,323 |
| 풀 리퀘스트 | 594 (564건 머지) |
| 추가 라인 | +2,318,637 |
| 삭제 라인 | -872,029 |
| 기술 스택 | TypeScript, CSS, HTML, JavaScript |

## 비즈니스 임팩트

### 1. 타입 안전성 캠페인 — 프로덕션 에러 근절

**문제:** 코드베이스 전반의 `any` 사용으로 런타임 에러가 조용히 발생. 사용자는 UI 깨짐과 데이터 불일치를 경험.

**해결:** 웹, 앱, 어드민 모듈 전반에 걸친 페이즈 기반 타입 마이그레이션 주도 — **50+ PR, 30+ 페이즈**. `any` 타입을 적절한 TypeScript 인터페이스로 체계적으로 교체. **AI 기반 tmux 멀티 페인 터미널**을 야간 실행하여 페이즈를 병렬 처리, 1인 엔지니어가 풀팀 규모의 작업을 수행. `@ts-ignore` 어노테이션 전체 제거 병행 ([Issue #25](https://github.com/uitiorg/frontend-monorepo/issues/25)).

**성과:**
| 모듈 | 이전 | 이후 | 커버리지 | 보고서 |
|------|------|------|----------|--------|
| App | 122개 `any` | **0개** (100% ANY-FREE) | **99.19%** | [#219](https://github.com/uitiorg/frontend-monorepo/issues/219), [#540](https://github.com/uitiorg/frontend-monorepo/issues/540) |
| Admin | 246개 `any` | **~2개** (~99%, 15 PR/~20시간) | **97.87%** | [#218](https://github.com/uitiorg/frontend-monorepo/issues/218), [#539](https://github.com/uitiorg/frontend-monorepo/issues/539) |
| Web | 수백 개 | **< 90개** (진행 중) | **98.84%** | [#538](https://github.com/uitiorg/frontend-monorepo/issues/538) |

**임팩트:** 타입 관련 Sentry 에러 감소. 안전한 리팩토링 가능. 명시적 타입을 통한 코드 자기 문서화. 마이그레이션 전 과정에서 1,184건 전체 테스트 통과 유지.

### 2. 포괄적 테스트 커버리지 — 사용자보다 먼저 버그 포착

**문제:** 최소한의 테스트 커버리지로 리그레션이 프로덕션에서 발견됨.

**해결:** 웹과 어드민 모듈 전반에 체계적인 단위 테스트 스위트 구축. 컴포넌트 구현에 맞춘 테스트 인프라 생성.

**임팩트:** 159건의 테스트 관련 PR. 리팩토링 과정에서 리그레션 포착. 자신감 있는 배포 가능.

### 3. Sentry 에러 모니터링 — 선제적 프로덕션 안정화

**문제:** 프로덕션 에러가 보이지 않아 사용자 불만을 통해서만 이슈를 인지.

**해결:** 모노레포 전 앱에 Sentry 통합. 에러 심각도 분류 (크리티컬 vs. 노이즈), Cognito 토큰 만료 처리, OTA 에러 억제, 네트워크 단절 가드 추가.

**임팩트:** 선제적 에러 감지. PR이 Sentry 인시던트를 직접 참조하여 인시던트→수정 워크플로우를 체계화.

### 4. GEO — AI 검색엔진 최적화

**문제:** 부톡 콘텐츠가 AI 검색엔진(ChatGPT, Perplexity, Gemini)에서 검색되지 않음.

**해결:** 구조화 데이터 스키마(JSON-LD)와 AI 크롤러 지시어를 추가하여 Generative Engine Optimization 구현.

**임팩트:** AI 생성 검색 결과에서 부톡 브랜드 인용 가능성 향상.

### 5. 쿠폰 시스템 — 매출 & 사용자 참여

**문제:** 카카오 플러스친구 채널을 통한 사용자 참여 및 전환을 위한 프로모션 메커니즘 필요.

**해결:** 복비 50% 할인 쿠폰 시스템 엔드투엔드 구축 — 랜딩 페이지, 코드 입력, 상태 배지, 배너/모달을 웹과 앱 모두에 구현.

**임팩트:** 프로모션 캠페인을 통한 사용자 확보 및 매출 직접 기여.

### 6. 파트너 플랫폼 확장

**문제:** 비즈니스 파트너십에 전용 웹뷰 애플리케이션(농협, 롯데카드) 필요.

**해결:** 독립 프로젝트를 모노레포로 통합. 기술 스택 업그레이드: Next.js 12→16, React 18→19, styled-components v5→v6, Recoil→Zustand.

**임팩트:** 모노레포 통합으로 유지보수 부담 감소. 파트너 앱용 공유 인프라 활성화.

### 7. 웹 성능 에픽 — PageSpeed 20점 → 80점 (4배 향상)

**문제:** bootalk.co.kr이 [pagespeed.web.dev](https://pagespeed.web.dev)에서 ~20점으로 SEO, 사용자 이탈, 구글 Search Console 순위에 심각한 영향.

**해결:** [Vercel Engineering의 45개 React Best Practices 규칙](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) 기반 체계적 다단계 최적화. **10개 이상의 PR**에 걸쳐 실행:

- **Phase 2–7:** React 모범사례 — SSR 워터폴 제거, useEffect 의존성 최적화, non-urgent update에 `startTransition` 적용
- **Phase 5.1+6.1:** LCP 이미지 최적화 및 GTM 통합
- **Phase 8:** 성능 최적화 및 인증 리팩토링
- **홈페이지 릴리스:** 홈페이지 전용 성능 최적화
- **번들 축소:** 다이나믹 임포트, react-spring 제거
- **Barrel import 정리:** Storybook 10, `_app` 정리
- **스켈레톤 로딩:** 스켈레톤 로딩 시스템 및 레이아웃 리팩토링
- **검색 UX:** 맵 SDK 로딩 대기 없이 검색 UI 즉시 표시
- **상태관리:** Zustand 마이그레이션 기반 아키텍처 정리

**임팩트:** PageSpeed 점수 **~20 → ~80** — **4배 향상**. 구글 Search Console 성능 경고 전체 해결. Core Web Vitals (LCP, FID, CLS) 대폭 개선.

> **에픽 이슈:** [#635 — React Best Practices 적용 - Vercel Engineering 45 Rules 기반 최적화](https://github.com/uitiorg/frontend-monorepo/issues/635)

## 기술 결정

| 결정 | 근거 |
|------|------|
| 모노레포 생성 (2025년 11월) | 3개 레포 → 1개 통합, 크로스 레포 의존성 문제 해결 |
| 공유 패키지 기반 모노레포 | 통일된 타입, 일관된 API 클라이언트, 단일 CI/CD |
| 페이즈 기반 타입 마이그레이션 | 대규모 변경의 리스크 최소화 |
| 앱별 Sentry 설정 | 플랫폼별 에러 심각도 차등 관리 |
| 테스트 우선 리팩토링 | 각 페이즈의 리그레션 방지 |
| Feature-based 아키텍처 | 타입이 아닌 도메인 기준 코드 스플리팅 |
