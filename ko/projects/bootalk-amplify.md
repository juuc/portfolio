# Bootalk Amplify

[← 포털로 돌아가기](../../README.md) | [English](../../en/projects/bootalk-amplify.md)

## 프로젝트 개요

부톡의 핵심 비즈니스 로직을 담당하는 AWS Amplify 기반 서버리스 백엔드 — 실시간 채팅, 인증(Cognito OTP), 푸시 알림(Pinpoint), 29개 Lambda 함수의 이벤트 기반 트리거.

**버릴 수 없는 레거시 인프라**였습니다. 백엔드는 모듈러 모놀리스와 MSA 서비스로 재구축 중이었지만, Amplify는 여전히 핵심 경로를 담당: 사용자 인증, 실시간 메시징, 푸시 알림, 대화 생명주기. 프로덕션 안정성을 유지하며 마이그레이션하려면 **변경 전 깊은 이해가 필수**였습니다.

> *"현재 Amplify는 부톡의 큰 기술부채 중 하나"* — 프로젝트 README에서. 이 기술부채를 물려받아 관리 가능하게 만들었습니다.

**Repo:** [uitiorg/bootalk-amplify](https://github.com/uitiorg/bootalk-amplify)

## 지표

| 지표 | 값 |
|------|-----|
| 커밋 | 209 |
| Pull Request | 13 (9 머지) |
| 추가 라인 | +49,038 |
| 삭제 라인 | -40,177 |
| 기술 스택 | Node.js, AWS Lambda, DynamoDB Streams, AppSync (GraphQL), Cognito, Pinpoint, SNS/SQS |

## 이 프로젝트가 중요한 이유

저는 **CDO**로 부톡에 합류했습니다 — 데이터 파이프라인과 크롤러에 집중하던 역할. 이 Amplify 코드베이스를 한 번도 본 적 없었습니다. **2025년 8월 CTO가 퇴사**하면서, 이 레거시 서버리스 백엔드를 포함한 모든 기술적 소유권을 승계받았습니다.

단순한 버그 수정이 아니었습니다 — **운영 중인 시스템을 압박 속에서 읽어내는 것**, 문서화되지 않은 이벤트 흐름(DynamoDB Streams → Lambda → SNS → Legacy API)을 이해하는 것, 실제 사용자의 인증과 메시징을 깨뜨리지 않으며 변경하는 것이었습니다.

이 프로젝트는 제 **코드베이스 적응 능력**을 가장 명확히 보여줍니다: 제로 컨텍스트에서 수 주 만에 시스템을 완전히 소유하기까지.

## 시스템 아키텍처

```
모바일 앱 / 웹 (GraphQL)
    ↓
AppSync (GraphQL 엔드포인트)
    ↓
DynamoDB 테이블 ──→ Stream Trigger
    │                    ↓
    │              Lambda 함수
    │                    ↓
    │              ┌─────┴─────┐
    │              │           │
    │          SNS/SQS    Pinpoint
    │          (MSA)      (푸시)
    │              │
    └──────────────┘
         ↓
    Legacy API (MSA 백엔드)
```

**29개 Lambda 함수** 구성:
- **인증 (4):** Cognito 커스텀 인증 — OTP 생성, 검증, 사전 가입 검증
- **메시징 (4):** DynamoDB Stream 트리거 — 푸시 알림, 읽지 않은 메시지 카운트
- **대화 (2):** 채팅 스레드 생명주기 — 생성 트리거, 링크 관리
- **알림 (8):** 정기 알림(최저가, 분양, 실거래) + 실시간 푸시
- **사용자 관리 (4):** 계정 삭제 캐스케이드, 디바이스 엔드포인트 정리
- **REST 핸들러 (2):** API Gateway 엔드포인트
- **인프라 (4):** 데이터 동기화, 중개사 매칭, 실거래가 업데이트
- **공유 Layer (1):** 공통 유틸리티 레이어 — DynamoDB 유틸리티, 환경 설정, Sentry 래퍼, 서비스 인증

## 비즈니스 임팩트

### 1. 코드베이스 분석 & 환경 분리

**문제:** 처음 이 레포를 열었을 때, 개발과 프로덕션 환경이 뒤섞여 있었습니다. Lambda 함수에 프로덕션 URL이 하드코딩되어 있었고, SNS 토픽이 분리되지 않았으며, 스테이징 배포가 실 사용자에게 영향을 줄 수 있었습니다.

**수행한 작업:** 코드를 한 줄도 쓰기 전에, 모든 Lambda 함수의 데이터 흐름을 며칠간 추적했습니다 — DynamoDB Stream 설정, SNS 토픽 체인, 각 함수가 호출하는 Legacy API 엔드포인트를 매핑. 전체 아키텍처를 35K 단어 이상의 내부 문서로 정리했습니다.

**그 다음 모든 것을 분리:**
- Lambda API URL → 공유 Layer 상수를 통한 환경별 분기
- SNS 토픽 → 스테이징은 환경별 접두사, 프로덕션은 접두사 없음
- DynamoDB Stream ARN → 환경별 CloudFormation 참조
- SSM Parameter Store → 환경별 경로 규칙으로 시크릿 관리

**임팩트:** 팀이 프로덕션 리스크 없이 Lambda 변경을 테스트할 수 있게 된 최초의 순간.

**주요 PR:**
- `feat: Lambda 환경별 Legacy URL 분기 처리` (#8)
- `feat: AWS Amplify 환경 분리 완료 (dev/staging)` (#9)
- `feat: Lambda 함수 API URL 환경 분리 및 MSA 경로 규칙 적용` (#17)

### 2. 중앙 에러 추적 (Sentry 통합)

**문제:** Lambda 에러가 보이지 않았습니다. 인증 실패, 푸시 알림 누락, 대화 트리거 오류가 발생해도 — 알 수 있는 유일한 방법은 사용자 민원이었습니다.

**해결:** 모든 29개 Lambda 함수에 **Layer 래퍼 패턴**으로 Sentry를 통합했습니다. `@sentry/aws-serverless`가 공유 Layer에만 존재하고 개별 Lambda `node_modules`에는 없기 때문에, 직접 import하면 크래시가 발생합니다.

**임팩트:** Lambda 에러가 처음으로 가시화됨. 여러 프로덕션 무소음 장애(401 인증 실패, 누락된 서비스 토큰) 발견 및 수정으로 직결.

**주요 PR:** `feat(lambda): Add centralized Sentry error tracking to all Lambda functions` (#20)

### 3. 서비스 인증 — 무소음 401 오류 수정

**문제:** Sentry 도입 후 `401 Unauthorized` 에러가 대량 노출됨. MSA 마이그레이션 이후 JWT 토큰이 필요한 엔드포인트를 Lambda가 인증 없이 호출하고 있었습니다.

**해결:** 공유 Layer에 JWT 기반 서비스 인증을 구현하고, 모든 Lambda→Legacy HTTP 호출(메시징, 크롤링, 대화 트리거 함수)에 체계적으로 추가.

**임팩트:** 메시징, 크롤링, 대화 흐름 전반의 프로덕션 401 에러 해결. 실패한 API 호출로 인한 무소음 데이터 손실 제거.

**주요 PR:**
- `fix(lambda): add service auth to Lambda→Legacy HTTP calls` (#28)
- `fix(Crawler): add service auth to legacy API save() call` (#29)
- `fix(lambda): add service auth to unread message trigger` (#35)

### 4. DynamoDB Stream 재시도 폭풍 방지

**문제:** Lambda 트리거가 에러(예: 401)를 반환하면, DynamoDB Streams가 무한 재시도 — 에러가 수백 건의 호출로 증폭되는 재시도 폭풍 발생.

**해결:** 대화 트리거 함수에 예상 가능한 실패(401/403)에 대한 에러 삼킴 로직 추가. Sentry로 로깅하되 re-throw하지 않음.

**임팩트:** 컴퓨팅 비용을 소모하고 로그를 범람시키던 Lambda 연쇄 호출 제거.

### 5. 프로덕션 장애 대응 — 인증 Lambda 장애 (2025-12-10)

**상황:** Sentry 통합 중 배포 오류로 인증 Lambda 4개 전체 크래시. **사용자 로그인/회원가입 완전 불가.**

**근본 원인:** 인증 Lambda가 Layer 래퍼 대신 Sentry를 직접 import. OTP 챌린지 Lambda에 `node_modules` 누락(OTP 생성 패키지 필요).

**해결:** CloudFormation 템플릿 검사로 핸들러 파일 식별 → Layer 래퍼 패턴 전환 → npm install → AWS CLI 직접 배포 → Lambda 직접 호출 테스트로 검증.

**후속 조치:** 전체 장애 내역과 배포 절차를 `CLAUDE.md`에 문서화. 팀의 Lambda 배포 체크리스트 확립.

## 타임라인

| 시기 | 이벤트 |
|------|--------|
| 2025-10 | 첫 커밋 — 환경 분리 작업 시작 |
| 2025-11 | dev/staging 환경 완전 분리 완료 |
| 2025-11 | API URL 환경 분리 및 MSA 경로 규칙 적용 |
| 2025-12 | 전체 Lambda 함수 Sentry 통합 |
| 2025-12 | 인증 Lambda 장애 — 수 시간 내 진단 및 해결 |
| 2026-02 | 서비스 인증 캠페인 — 모든 Lambda→Legacy 호출에 JWT 추가 |
| 2026-02 | DynamoDB Stream 재시도 폭풍 방지 |

## 핵심 시사점

이 프로젝트는 새로운 것을 만드는 것이 아닙니다. **레거시 시스템을 물려받아 깊이 이해하고, 신뢰할 수 있게 만드는 것** — 프로덕션을 운영하면서.

여기서 보여주는 역량은 **코드베이스 적응력**: 문서화되지 않은 인프라를 읽고, 이벤트 기반 데이터 흐름을 추적하며, 프로덕션 압박 하에서 안전한 변경을 수행하는 능력. 풀스택 개발자로서, 이것은 그린필드 작업의 보완재이며 — 논란의 여지가 있지만 더 어려운 역량입니다.
