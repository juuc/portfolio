# 아키텍처 의사결정

[← 포털로 돌아가기](../README.md) | [English](../en/architectural-decisions.md)

부톡에서 내린 가장 영향력 있는 기술적 결정들 — 각각이 플랫폼의 방향을 바꿨습니다.

---

## 1. 3개 레포 → 1개 모노레포

**결정:** 웹, 모바일 앱, 어드민 + 파트너 웹뷰(농협, 롯데카드)를 Turborepo + pnpm 모노레포로 통합.

**왜 중요했는가:**
- 웹과 앱 간 공유 타입이 동기화되지 않아 런타임 에러 발생
- 크로스 앱 변경마다 3개 이상 레포에서 PR 조율 필요
- 파트너 웹뷰가 공유 인프라 없이 별도 레포에 고립
- `@bootalk/common` 유틸리티의 단일 소스 오브 트루스 부재

**대안과 비교:**
- ❌ **별도 레포 + npm 패키지** — 4인 팀에 퍼블리시/버전 관리 오버헤드 과다
- ❌ **Nx** — 필요 이상으로 독자적; Turborepo 캐싱이면 충분
- ✅ **Turborepo + pnpm workspaces** — 최소 설정, 빠른 빌드, Expo와 호환

**임팩트:** 594개 PR의 체계적 마이그레이션. 통합 타입 시스템으로 타입 안전성 캠페인 가능. 모든 앱의 단일 CI/CD 파이프라인. 파트너 웹뷰 통합이 수일에서 수시간으로.

> 참고: [Discussion #27](https://github.com/uitiorg/team-discussions/discussions/27) (모노레포 마일스톤 제안), PR [#737](https://github.com/uitiorg/frontend-monorepo/pull/737) (롯데카드 웹뷰), [#753](https://github.com/uitiorg/frontend-monorepo/pull/753) (농협 웹뷰)

---

## 2. Bare React Native → Expo Managed Workflow

**결정:** 모바일 앱을 bare React Native에서 Expo SDK managed workflow로 7단계 계획을 통해 마이그레이션.

**왜 중요했는가:**
- 모든 코드 변경에 네이티브 iOS/Android 리빌드 필요 (15-30분)
- OTA 업데이트 불가 — 버그 수정에 앱스토어 재제출 필요 (1-3일)
- React Navigation 버전 파편화 (v4/v5/v6 공존)
- 네이티브 의존성이 `ios/`, `android/` 폴더에 산재, 중앙 설정 부재

**대안과 비교:**
- ❌ **Bare RN 유지** — OTA 불가, 느린 CI, 수동 네이티브 설정
- ❌ **CodePush** — 지원 중단 추세, 네이티브 의존성 문제 미해결
- ✅ **Expo managed workflow** — EAS Update로 OTA, CNG로 네이티브 폴더 제거, `app.json` 단일 설정

**7단계:**

| 단계 | 내용 | 이 순서인 이유 |
|------|------|----------------|
| 1 | Expo Dev Client | 코드 변경 없이 Expo 생태계 진입 |
| 2 | React Navigation v6 | 네이티브 의존성 건드리기 전 네비게이션 통일 |
| 3 | 유틸리티 라이브러리 → expo-* | 저위험 교체 (clipboard, netinfo, secure-store) |
| 4 | UI/미디어 라이브러리 → expo-* | 고위험 교체 (image, media-library, image-picker) |
| 5 | Config Plugins | iamport, Firebase, Facebook, AppsFlyer를 app.json으로 |
| 6 | Prebuild 검증 (CNG) | ios/android 소스 컨트롤에서 제거 |
| 7 | EAS 도입 | 클라우드 빌드 + OTA 업데이트 |

**임팩트:** JS 변경사항 OTA로 분 단위 배포. 계약보고서 계산 버그(v3.4.15) 당일 수정. 로컬 네이티브 툴체인 불필요.

> 참고: [Issue #84](https://github.com/uitiorg/bootalk_app/issues/84) (7단계 계획), [Discussion #35](https://github.com/uitiorg/team-discussions/discussions/35) (타당성 분석), [Discussion #45](https://github.com/uitiorg/team-discussions/discussions/45) (도입 보고서)

---

## 3. PageSpeed 20 → 80: 체계적 React 최적화

**결정:** Vercel의 React 성능 모범 사례를 다단계 캠페인으로 적용하여 bootalk.co.kr의 Core Web Vitals 실패 상태 해결.

**왜 중요했는가:**
- PageSpeed ~20점 — 구글이 검색 순위 패널티 부과
- LCP(Largest Contentful Paint) 처참 — 사용자가 수 초간 빈 화면
- barrel export와 미사용 의존성으로 번들 사이즈 비대
- SSR 워터폴이 렌더링 차단

**대안과 비교:**
- ❌ **다른 프레임워크로 재작성** — 운영 중 제품에 너무 위험하고 느림
- ❌ **CDN 추가로 해결** — CDN은 정적 에셋에 도움, 렌더 차단 JS에는 효과 없음
- ✅ **체계적 페이즈별 최적화** — 각 페이즈 측정/되돌리기/배포 가능

**페이즈:**

| 페이즈 | 대상 | 핵심 변경 |
|--------|------|-----------|
| 2-7 | SSR 워터폴 | 서버 렌더 경로에서 클라이언트 전용 코드 제거 |
| 5.1+6.1 | LCP | 이미지 최적화, GTM 지연 로딩 |
| 번들 | JS 크기 | 동적 임포트, barrel export 제거, react-spring 제거 |
| 스켈레톤 | 체감 속도 | 스켈레톤 UI 점진적 렌더링 |
| 지도 SDK | 첫 페인트 | 검색 UI 즉시 표시, 네이버 지도 SDK 지연 로드 |
| 상태 | 리렌더 | Zustand 마이그레이션, 불필요한 React Context 제거 |

**임팩트:** PageSpeed 20 → 80 (4배). 구글 Search Console 경고 해소. 사용자 체감 즉시 로딩.

> 참고: [Issue #635](https://github.com/uitiorg/frontend-monorepo/issues/635) (에픽), PR #639, #641, #663, #678, #690-701, #718

---

## 4. 클라이언트 렌더링 → GCP Cloud Run SSR

**결정:** bootalk.co.kr에 서버 사이드 렌더링을 구현하고 호스팅을 AWS Amplify에서 GCP Cloud Run으로 이전.

**왜 중요했는가:**
- 클라이언트 렌더링 페이지가 검색엔진에 보이지 않음 — SEO 제로
- 동적 사이트맵 생성 불가 — 새 매물이 인덱싱되지 않음
- AWS Amplify 호스팅 한계 (커스텀 서버, SSR 미지원)
- Google/AI 검색엔진용 구조화 데이터에 서버 렌더링 HTML 필요

**대안과 비교:**
- ❌ **Amplify + 프리렌더링 유지** — 동적 콘텐츠(매물 매일 변동) 처리 불가
- ❌ **Vercel** — 대규모 비용 우려, 인프라 제어 한계
- ✅ **GCP Cloud Run** — 컨테이너 기반, 오토스케일링, 팀이 이미 GCP Cloud SQL 사용 중

**임팩트:** 검색엔진 인덱싱 복원. 동적 사이트맵으로 새 매물 수시간 내 크롤링. GEO 구조화 데이터로 ChatGPT, Perplexity, Gemini에 콘텐츠 노출.

> 참고: [PR #173](https://github.com/uitiorg/bootalk_web/pull/173) (SSR + GCP 배포), [Issue #703](https://github.com/uitiorg/frontend-monorepo/issues/703) (CSR → SSR 마이그레이션)

---

## 5. 페이즈 기반 타입 안전성 캠페인

**결정:** 모노레포 전반의 모든 `any` 타입을 50+ PR의 페이즈별, AI 병렬 처리 캠페인으로 체계적 제거.

**왜 중요했는가:**
- 1,000+ `any` 타입이 런타임 에러를 은폐 — 사용자가 무소음 데이터 오염 경험
- 실제 타입 흐름을 모르면 리팩토링 불가
- GraphQL 응답이 `any` 타입 — API 계약 변경이 무소음으로 깨짐
- 타입 인식 네비게이션/리팩토링을 위한 IDE 지원 불가

**대안과 비교:**
- ❌ **빅뱅 재작성** — 너무 위험, 모든 것이 한 번에 깨질 수 있음
- ❌ **무시** — 기술 부채가 실제 프로덕션 버그 유발 중
- ✅ **페이즈 기반 캠페인** — 각 페이즈가 하나의 모듈 대상, 각 PR이 독립 배포/테스트 가능

**결과:**

| 모듈 | 이전 | 이후 | 커버리지 |
|------|------|------|----------|
| App | 122 `any` | **0** | **99.19%** |
| Admin | 246 `any` | **~2** | **97.87%** |
| Web | 수백 개 | **<90** | **98.84%** |

**임팩트:** 컴파일 타임 에러 탐지가 런타임 크래시를 대체. IDE 자동완성 전면 활성화. 대규모 안전한 리팩토링. 모노레포 결정(#1)이 이것을 가능하게 함 — 공유 타입으로 한 번 수정이 모든 곳에 적용.

> 참고: Issue [#218](https://github.com/uitiorg/frontend-monorepo/issues/218), [#219](https://github.com/uitiorg/frontend-monorepo/issues/219), [#538-540](https://github.com/uitiorg/frontend-monorepo/issues/538)

---

## 6. 8개 마이크로서비스 → 모듈러 모놀리스

**결정:** 8개 별도 Spring Boot 마이크로서비스를 통합 모듈러 모놀리스로 통합.

**왜 중요했는가:**
- 8개 서비스에 설정 중복 (QueryDslConfig, OpenApiConfig, ControllerAdvice × 8)
- 서비스 간 순환 Feign 의존성으로 배포 순서 문제
- Eureka 서비스 디스커버리의 운영 오버헤드
- 소규모 팀에 서비스별 인프라 비용 부적절

**대안과 비교:**
- ❌ **마이크로서비스 유지** — 4인 팀에 운영 오버헤드 과다
- ❌ **순수 모놀리스로 합병** — 모듈 경계 상실, 향후 추출 불가
- ✅ **모듈러 모놀리스** — 모듈 수준 격리 + 공유 빌드, 필요 시 모듈 추출 가능

**임팩트:** 24개 중복 설정 파일 제거 (3개 설정 × 8개 서비스). Eureka 의존성 제거. 통합 빌드 캐시로 CI 시간 단축. 내부 호출이 Feign에서 직접 `ModuleApi` 인터페이스로 — 네트워크 오버헤드 제거.

---

## 7. Cron → Dagster 오케스트레이션

**결정:** 모든 데이터 수집 파이프라인을 subprocess 기반 cron에서 Dagster 네이티브 에셋으로 마이그레이션.

**왜 중요했는가:**
- Cron 실패가 무소음 — 데이터가 오래되어도 알림 없음
- 크롤러 간 의존성 추적 불가 (아파트 데이터가 지역 코드에 의존)
- 수동 재시도 로직이 연쇄 실패에 취약
- 파이프라인 상태 모니터링 UI 부재

**대안과 비교:**
- ❌ **Airflow** — 더 무거운 운영 부담, XML 기반 DAG
- ❌ **Prefect** — 양호하지만 에셋 기반 모델 덜 성숙
- ✅ **Dagster** — 에셋 기반 파이프라인, 내장 UI, 의존성 추적, 자동 재시도

**임팩트:** Dagster UI로 완전한 파이프라인 가시성. 지수 백오프 자동 재시도. 실행 가드로 행 방지 (아파트 데이터: 2시간, 매물: 1시간). Telegram 실패 알림. 데이터 신선도가 보장됨.

---

## 의사결정 간 연결고리

이 결정들은 고립된 선택이 아닙니다 — **아키텍처 전략**을 형성합니다:

```
모노레포 (1)
    ↓ 가능하게 함
타입 안전성 캠페인 (5)       ← 모든 앱에 공유 타입
    ↓ 가능하게 함
PageSpeed 최적화 (3)        ← 대규모 안전한 리팩토링
    ↓ 필요로 함
Cloud Run SSR (4)           ← SEO를 위한 서버 렌더링

Expo 마이그레이션 (2)       ← 독립적이지만 상호보완적
    ↓ 가능하게 함
OTA 업데이트 + 빠른 CI     ← 모바일 빠른 반복

모듈러 모놀리스 (6)         ← 백엔드 아키텍처 정렬
Dagster 마이그레이션 (7)    ← 데이터 인프라 정렬
```

모노레포가 **키스톤 결정** — 나머지 모든 것이 이것 덕분에 가능하거나 쉬워졌습니다. 공유 타입이 타입 안전성 캠페인을 가능하게 했고, 안전한 리팩토링이 성능 최적화를 가능하게 했고, SSR이 SEO를 가능하게 했습니다. 각 결정이 다음 결정의 비용을 줄였습니다.
