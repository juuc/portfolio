# 데이터 신뢰성 복구

## 왜 중요한가

부동산 제품은 데이터 신선도, 좌표, 랭킹, 라이프사이클 상태를 믿을 수 있을 때 작동합니다.

## 문제

크롤러는 아파트 정보, 매물, 실거래/가격 갱신, 랭킹, 분양, 편의시설, 세대수, 대출, 중개업소, 재건축 데이터를 다루는 프로덕션 데이터 백본이었습니다. 실패는 원인을 만든 writer와 떨어진 downstream에서 드러나는 경우가 많았고, 스크립트 단위 수정만으로는 부족했습니다.

## 산출물

- 크롤러 작업을 Dagster asset/job/schedule 구조로 통합했습니다.
- 중앙 Dagster `Definitions` registry에 18개 job, 19개 schedule, 155개 Python `@asset` 정의를 등록했습니다.
- `AssetSelection` group으로 매물, 아파트 정보, 가격, 랭킹, 분양, 편의시설 작업을 분리 실행했습니다.
- 신선도가 중요한 작업에는 runtime limit과 daily, weekly, monthly, biannual 주기를 붙였습니다.
- run-failure sensor와 root-cause 알림으로 장애 triage 시간을 줄였습니다.
- 좌표, 랭킹, 라이프사이클, 신선도 사고를 repository guard, preflight check, runbook으로 전환했습니다.

## 임팩트

크롤러는 스크립트 운영에서 관측 가능한 ETL 시스템으로 이동했습니다. 데이터 복구는 반복 가능해졌고, 신선도 리스크는 보이게 되었으며, 플랫폼 변경에는 프로덕션 데이터에 닿기 전 검증 gate가 생겼습니다.

## 근거

| 영역 | 근거 |
|------|------|
| 오케스트레이션 | asset, job, schedule, resource, failure sensor를 Dagster `Definitions` registry로 관리 |
| 규모 | 등록 job 18개, schedule 19개, Python `@asset` 정의 155개 |
| 커버리지 | 아파트 정보/매물, 실거래/가격, 매핑/랭킹, 분양/편의시설, 세대수/대출/중개업소/재건축 |
| 운영 | daily, weekly, monthly, biannual schedule과 runtime cap |
| 복구 | 좌표 복구, 라이프사이클 전파 수정, 신선도 점검, 마이그레이션 preflight gate |
