# 운영 스택

## 제품 플랫폼

| 영역 | 도구 | 산출물 |
|------|------|--------|
| Web | React, Next.js, TypeScript, Tailwind, GraphQL | SSR 전환, 사이트맵 48,706개 URL, PageSpeed 20 -> 80 |
| Mobile | React Native, Expo, EAS Update, 기기 자동화 | 다역할 흐름, 증거 기반 QA, OTA·스토어 릴리스 규율 |
| Backend | Kotlin, Spring, serverless functions, REST APIs | 프로덕션 하드닝, 권한/결제 흐름, 배치 최적화 |
| Data | Python, Dagster, notebooks, 공공/오픈 데이터 API | 부동산 데이터 파이프라인, 크롤러 복구, 신선도 모니터링 |
| Infrastructure | Terraform, cloud identity, GCP Cloud Run, AWS, GitHub Actions, Docker | 재현 가능한 환경, 최소 권한 배포 경로, CI/CD, 배포 정리 |
| Observability | Sentry, 구조화된 OCR telemetry, reporting, runbooks | 에러 분석, 검토 가능한 문서 처리, 프로덕션 피드백 루프 |
| Release evidence | 소스/CI 검사, DEV readback, provider receipt, 기기 검증 | 코드, 런타임, 전달, 기기, 프로덕션 주장을 각각 독립적으로 검증 |

## AI Engineering

| 역량 | 실제 활용 |
|------|-----------|
| Multi-agent execution | 큰 캠페인을 충돌 없는 작업 영역으로 나누고 결과 PR을 리뷰 |
| Repository instructions | 반복 작업이 일관되도록 repo별 agent context 유지 |
| Overnight execution | 제한된 범위의 작업을 밤새 진행하되 merge 전 리뷰 게이트 유지 |
| AI-operated systems | 알림이 진단과 수정 PR 생성으로 이어지는 프로덕션 workflow 구축 |
| Team rollout | AI를 개인 도구가 아니라 팀 단위 엔지니어링 운영 레이어로 전환 |

## 가장 강한 조합

제가 가장 강한 스택은 특정 프레임워크 하나가 아니라 다음 조합입니다.

```text
제품 판단 + 플랫폼 아키텍처 + AI 기반 실행 + 프로덕션 검증
```

이 조합이 세무GPT 상용화, 프론트엔드 모노레포, SEO/성능 복구, 자율 Sentry 운영, 데이터 신뢰성 개선이라는 실질 산출물로 이어졌습니다.
