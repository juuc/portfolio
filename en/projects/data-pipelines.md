# Data Pipelines

[← Back to Portal](../../README.md) | [한국어](../../ko/projects/data-pipelines.md)

## Project Overview

Dagster-based ETL infrastructure managing apartment data — enrichment, floor plans, daily listing statistics, and stored procedure modernization.

**Repo:** [uitiorg/data](https://github.com/uitiorg/data)

## Metrics

| Metric | Value |
|--------|-------|
| Commits | 109 |
| Pull Requests | 1 |
| Lines Added | +155,527 |
| Lines Removed | -82,172 |
| Stack | Python, Dagster |

## Business Impact

### 1. Dagster-Based Crawler Migration

**Problem:** Legacy crawlers scattered across different systems with no unified orchestration.

**Solution:** Consolidated all data crawlers into a Dagster-based project with proper asset definitions, scheduling, and monitoring.

**Impact:** Single pane of glass for all data operations. Automatic retries. Dependency tracking between assets.

### 2. Daily Listing Statistics

**Problem:** No aggregated view of daily property listing counts.

**Solution:** Built ETL pipeline for daily listing statistics table.

**Impact:** Business intelligence for understanding market dynamics — which areas have more listings, trends over time.

### 3. Stored Procedure Modernization

**Problem:** Legacy stored procedures for apartment supply data were fragile and hard to maintain.

**Solution:** Iterative modernization of apartment supply data stored procedures.

**Impact:** Reliable data transformations. Easier maintenance and debugging.

### 4. Apartment Detail Enrichment

**Problem:** Apartment listings lacked enriched data — floor plans, entrance info.

**Solution:** Built ETL jobs for apartment entrance information and floor plan processing.

**Impact:** Richer property listings with visual data for users.

### 5. Floor Plan (도면) Data Integration

**Problem:** Apartment listings lacked visual floor plan data. Naver had floor plan images but they weren't connected to Bootalk's data model.

**Solution:** Built ETL pipeline connecting external floor plan images to Bootalk's apartment data via multi-key mapping (region code, apartment ID, building key). Explored AI-based image processing for floor plan enhancement as a future Bootalk asset.

**Impact:** Richer property listings with visual floor plan data for users. Foundation for AI-powered floor plan analysis.

### 6. Telegram Monitoring

**Solution:** Integrated Telegram bot for pipeline monitoring and alerting.

**Impact:** Immediate notification of pipeline failures or data anomalies.
