# Ubuntu Crawler

## Project Overview

Comprehensive real estate data collection system for the Korean market — crawling government APIs, aggregating apartment data, and feeding the Bootalk platform's data layer.


## Metrics

| Metric | Value |
|--------|-------|
| Commits | 420 |
| Pull Requests | 27 (27 merged — 100% merge rate) |
| Lines Added | +454,393 |
| Lines Removed | -352,665 |
| Stack | Python, Jupyter Notebook, Shell |

## Business Impact

### 1. Real-Price Data Pipeline (실거래가)

**Problem:** Bootalk needed accurate, up-to-date real estate transaction data from government sources.

**Solution:** Built automated pipeline to fetch real-price data from public APIs, with daily statistics computation, apartment ID mapping, and change detection with Telegram notifications.

**Impact:** Core data asset powering Bootalk's property valuation and market insights.

**Key PRs:**
- `feat: apartment ID mapping framework for real-transaction ↔ apartment-info joins` (#8)
- `feat: real-transaction change detection and recording logic` (#7)
- `feat: daily price statistics table for aggregated market data`

### 2. Dagster Migration — From Cron to Modern Orchestration

**Problem:** Crawlers ran as cron jobs with subprocess calls — no monitoring, no retry, no dependency management. Failures were silent.

**Solution:** Migrated all crawlers to Dagster native assets: apartment ranking, loan products, real-price data. Replaced subprocess calls with native Python. Added async support for performance.

**Impact:** Full observability via Dagster UI. Automated retries. Dependency-aware scheduling. Eliminated Windows compatibility issues.

**Key PRs:**
- `feat: real-price data pipeline migrated to Dagster native asset` (#31)
- `feat: loan product pipeline fully migrated to Dagster` (#30)
- `feat: apartment ranking pipeline fully migrated to Dagster` (#29)

### 3. Apartment Ranking System

**Problem:** Users wanted to compare apartments by various criteria.

**Solution:** Built end-to-end data ETL for apartment ranking — collecting and processing data for Seoul, Gyeonggi, and Incheon regions.

**Impact:** Powers the ranking feature on Bootalk's web and app platforms.

**Key PRs:**
- `feat: apartment ranking data ETL implementation` (#4)

### 4. Presale (분양) & Reconstruction (재건축) Data

**Problem:** Users looking for new apartments needed presale information. Reconstruction project data was incomplete — some complexes were filtered out due to strict database constraints.

**Solution:** Built presale data collection with weekly scheduling (Monday 19:00 KST), standalone dry run scripts for testing, and safe database operations (DELETE instead of TRUNCATE for transaction safety). A January 2026 operational check verified a complete scheduled refresh at that point in time. Fixed the collection filter to include reconstruction complexes and documented downstream visibility constraints.

**Impact:** Turned presale and reconstruction collection into a scheduled, observable data operation. Current freshness remains something to verify from run and downstream data evidence, not assume from the schedule alone.

**Key PRs:**
- `feat: enable weekly presale data schedule at Monday 19:00 KST`
- `feat: presale apartment data processing logic` (#2)

### 5. Loan Crawler

**Problem:** Users needed mortgage and jeonse loan information alongside property data.

**Solution:** Built crawlers for jeonse (전세자금) and mortgage (주택담보) loan products.

**Impact:** Comprehensive financial information alongside property listings.

**Key PRs:**
- `전세자금대출 / 주택담보대출 크롤러` (#17)

### 6. Code Architecture — Repository Pattern & Import Standards

**Solution:** Standardized import conventions (relative for domain-internal, absolute for shared). Documented Repository pattern usage.

**Impact:** Maintainable, consistent codebase. Easier onboarding for new developers.

**Key PRs:**
- `refactor: Import 표준화 - 도메인 내부는 상대 경로, 공통/리소스는 절대 경로` (#28)
- `docs: Repository 패턴 사용 가이드 추가` (#27)
