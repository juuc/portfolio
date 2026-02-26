# 부톡 웹

[← 포털로 돌아가기](../../README.md) | [English](../../en/projects/bootalk-web.md)

## 프로젝트 개요

bootalk.co.kr의 공개 Next.js 웹 플랫폼 — 매물 검색, AI 채팅, 계산기, 이벤트 페이지, 중개사 매칭 서비스 제공.

**레포:** [uitiorg/bootalk_web](https://github.com/uitiorg/bootalk_web) → [uitiorg/frontend-monorepo](https://github.com/uitiorg/frontend-monorepo)로 통합

## 지표

| 지표 | 수치 |
|------|------|
| 커밋 | 273 (bootalk_web) + 1,323 (monorepo) |
| SEO 관련 PR | **~40건** (두 레포 합산) |
| 기술 스택 | TypeScript, Next.js, GCP Cloud Run |

## 비즈니스 임팩트

### 1. SEO 트랜스포메이션 — 검색 불가능에서 완전한 검색 가능으로

사이트는 클라이언트 렌더링, 정적 5개 URL 사이트맵, 깨진 메타 태그, **PageSpeed 20점**, AI 검색엔진에서 완전히 미노출 상태였습니다. 6개월간 두 레포에 걸쳐 ~40건의 PR로 포괄적인 SEO 인프라를 구축하여 **PageSpeed 80점**과 완전한 크롤링 가능 상태를 달성했습니다.

#### 크롤링 가능성 & 인덱싱

**문제:** 클라이언트 사이드 렌더링으로 검색엔진이 빈 페이지를 인식. 사이트맵은 5개 URL의 정적 목록. 개발 환경이 구글에 노출.

**구축한 것:**
- **GCP Cloud Run SSR** — 아파트 상세 페이지에 `getServerSideProps` 구현, AWS Amplify에서 컨테이너 기반 GCP로 마이그레이션 ([bootalk_web #173](https://github.com/uitiorg/bootalk_web/pull/173))
- **동적 사이트맵: 5개 URL → 48,706개 아파트** — 실시간 API 기반 사이트맵, 우선순위 및 업데이트 빈도 설정 ([bootalk_web #51](https://github.com/uitiorg/bootalk_web/issues/51))
- **30개 CSR 페이지 → SSR 전환** — 클라이언트 `useMediaQuery`를 서버 사이드 UA 감지로 마이그레이션, 하이드레이션 불일치 해소 ([monorepo #704](https://github.com/uitiorg/frontend-monorepo/pull/704), -2,347줄)
- **SSR 안티패턴 제거** — 33개 페이지에서 `typeof window === 'undefined'` 가드 정리 ([monorepo #548](https://github.com/uitiorg/frontend-monorepo/pull/548))
- **개발 환경 크롤링 차단** — 3중 방어로 개발 URL 구글 인덱스 유입 방지

#### URL & 크롤링 최적화

**문제:** 중복 URL, 비일관 레거시 경로, 누락된 Canonical 태그로 페이지 권위 분산.

**구축한 것:**
- **Canonical URL 태그** — 중복 URL 문제 해결
- **Clean URL 마이그레이션:** 레거시 경로 → 클린 `/apt` URL로 통일
- **Trailing slash 정규화** — 일관된 URL 구조
- **robots.txt 최적화** — 선택적 크롤링 정책, 계산기 페이지 크롤링 허용
- **Rewrite 기반 `/apt` 페이지 통합** — 단일 URL 권위 확보


#### 메타 태그 & 소셜 공유

**문제:** OG 메타 태그가 6개 이상 파일에 산재, 비일관 패턴. SSR 타임아웃으로 소셜 공유 시 폴백 제목 표시 ("헬리오시티 실거래가 | 33평 시세 - 부톡" 대신 "부톡 - 아파트 실거래가 조회" 표시).

**구축한 것:**
- **OG 메타 태그 중앙화** — 단일 유틸리티에서 35개 이상 라우트를 하나의 소스로 관리 ([monorepo #581](https://github.com/uitiorg/frontend-monorepo/pull/581))
- **SSR OG 타임아웃 수정** — 아파트 상세 API (60개 이상 필드) → 메타 전용 경량 API로 교체 ([monorepo #597](https://github.com/uitiorg/frontend-monorepo/pull/597))
- **10개 누락 페이지 OG 태그 추가** — AI 검색, 매매/전세 리스팅, 중개사 온보딩, 오피스 딜 포함 ([monorepo #548](https://github.com/uitiorg/frontend-monorepo/pull/548))
- **SEO 검색 스니펫 개선** — 키워드 정제된 title/description ([bootalk_web #156](https://github.com/uitiorg/bootalk_web/pull/156))

#### PageSpeed: 20 → 80 (4배 향상)

[Vercel Engineering의 45개 React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) 기반 체계적 다단계 최적화. **14개 PR**에 걸쳐 실행. [모노레포 페이지에서 전체 내역 확인](frontend-monorepo.md).

| 지표 | 이전 | 이후 |
|------|------|------|
| PageSpeed | ~20 | **~80** |
| FCP | 12.6s | < 2s |
| LCP | 36.2s | < 3s |
| 번들 (`_app.js`) | 1.01 MB | **-46%** (barrel export 제거) |

주요 최적화: Naver Maps SDK 지연 로딩 ([#517](https://github.com/uitiorg/frontend-monorepo/pull/517)), LCP 이미지 최적화 ([#641](https://github.com/uitiorg/frontend-monorepo/pull/641)), 다이나믹 임포트 + react-spring 제거 ([#699](https://github.com/uitiorg/frontend-monorepo/pull/699)), 스켈레톤 로딩 ([#701](https://github.com/uitiorg/frontend-monorepo/pull/701)), 이미지 명시적 크기 지정으로 CLS 수정 ([#621](https://github.com/uitiorg/frontend-monorepo/pull/621)).

> **에픽 이슈:** [#635](https://github.com/uitiorg/frontend-monorepo/issues/635) | **트래킹:** [#515](https://github.com/uitiorg/frontend-monorepo/issues/515)

#### GEO — AI 검색엔진 최적화

**문제:** 부톡 콘텐츠가 AI 검색엔진에 크롤링되었으나 한 번도 인용되지 않음 — Organization 스키마 1개만 존재, 상품/FAQ/기사 스키마 없음.

**구축한 것:**
- **5개 JSON-LD 구조화 데이터 스키마:** Organization (로고 포함), WebSite (사이트링크 SearchAction), BreadcrumbList (6단계 계층), FAQPage (12개 Q&A), SoftwareApplication
- **AI 크롤러 지시어** — ChatGPT, Perplexity, Gemini 대응
- SSR 렌더링으로 크롤러 즉시 접근 가능

> **PR:** [#761](https://github.com/uitiorg/frontend-monorepo/pull/761) | **이슈:** [#759](https://github.com/uitiorg/frontend-monorepo/issues/759)

#### SEO 타임라인

| 시기 | 내용 | PR/Issue |
|------|------|----------|
| 2025년 5월 | 정적 사이트맵 (5개 URL), 초기 메타 태그 | bootalk_web #54 |
| 2025년 9월 | SEO 검색 스니펫 키워드 정제 | bootalk_web #156 |
| 2025년 10월 | **SSR + 동적 사이트맵 (48K URL) + GCP Cloud Run** | bootalk_web #173 |
| 2025년 10월 | Canonical URL, clean path, 레거시 → `/apt` 마이그레이션 | 다수 커밋 |
| 2025년 12월 | **PageSpeed Phase 1-4** — Naver Maps 지연 로딩, 폰트, WebP, barrel export (-46%) | monorepo #517-#527 |
| 2025년 12월 | SSR 안티패턴 제거 (33페이지) + OG 10페이지 추가 | monorepo #548 |
| 2026년 1월 | OG 메타 태그 중앙화 (35개 이상 라우트) | monorepo #581 |
| 2026년 1월 | SSR OG 타임아웃 수정 (경량 API) | monorepo #597 |
| 2026년 1월 | **PageSpeed Phase 5-8** — LCP, GTM, 번들, 스켈레톤 로딩 | monorepo #639-#701 |
| 2026년 2월 | 30개 CSR 페이지 → SSR 전환 | monorepo #704 |
| 2026년 2월 | **GEO** — 구조화 데이터 스키마 + AI 크롤러 지시어 | monorepo #761 |

---

### 2. 인증 시스템 현대화

**문제:** 무한 자동 로그인 버그. 로그아웃 레이스 컨디션. 중앙화된 인증 관리 부재.

**해결:** `useAuth` 훅으로 인증 상태 중앙화. 비동기 작업 완료 후 리로드하여 레이스 컨디션 수정.

**임팩트:** 사용자 대면 인증 버그 제거. 깔끔하고 유지보수 가능한 인증 아키텍처.

### 3. 사용자 전환율 최적화

**문제:** 모바일 웹 사용자의 앱 다운로드 전환이 저조.

**해결:** 웹→앱 사용자 여정 변경 — "가입하기" CTA를 "앱 다운로드" 프롬프트로 교체. 웹/앱 웹뷰별 플랫폼 특화 동작 구현.

**임팩트:** 모바일 사용자 전환 퍼널 개선.

### 4. 타입 안전성

[모노레포 타입 안전성 캠페인](frontend-monorepo.md)의 일환 — 30개 이상 페이즈에 걸친 체계적 `any` 제거로 **98.84% 타입 커버리지** 달성 (235,093개 식별자).

> Issues [#538](https://github.com/uitiorg/frontend-monorepo/issues/538), [#219](https://github.com/uitiorg/frontend-monorepo/issues/219), [#218](https://github.com/uitiorg/frontend-monorepo/issues/218) 참고.
