# Data Reliability Recovery

## Why It Matters

Real-estate products depend on trust in data freshness and correctness. A crawler or lifecycle bug is not just a backend defect; it can change what users believe about the market.

## Problem

Data work spanned crawlers, backend propagation, ranking logic, geospatial fields, and external public datasets. Failures could appear far downstream from the writer that caused them, making one-off fixes insufficient.

## Output

- Treated data incidents as system problems, not isolated patches.
- Added repository-level guards around high-risk data fields.
- Recovered corrupted or stale production data where needed.
- Used orchestration, monitoring, and preflight checks to make freshness visible.
- Documented operational runbooks so future handover did not depend on memory.

## Impact

The data layer became easier to reason about under production pressure. The important output was not a single crawler fix; it was a safer operating model for data lifecycle, recovery, and migration work.

## Evidence

- Crawler recovery and coordinate correction work.
- Apartment lifecycle propagation fixes.
- Batch/data pipeline modernization through orchestration.
- Migration preflight gates for safer backend changes.
