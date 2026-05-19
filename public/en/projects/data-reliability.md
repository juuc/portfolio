# Data Reliability Recovery

## Why It Matters

Real-estate products only work when users can trust freshness, coordinates, rankings, and lifecycle state.

## Problem

The crawler had become a production data backbone: apartment info, listings, trade/pricing refreshes, rankings, presales, facilities, households, loans, dealers, and reconstruction data. Failures often showed up downstream from the writer that caused them, so script-level fixes were not enough.

## Output

- Consolidated crawler work into a Dagster asset/job/schedule structure.
- Registered 18 jobs and 19 schedules in the central Dagster `Definitions` registry, with 155 Python `@asset` definitions across domains.
- Split execution by `AssetSelection` groups for targeted listing, info, pricing, ranking, presale, and facility runs.
- Added runtime limits plus daily, weekly, monthly, and biannual cadences for freshness-sensitive work.
- Wired a run-failure sensor with root-cause notification for faster incident triage.
- Turned coordinate, ranking, lifecycle, and freshness incidents into repository guards, preflight checks, and runbooks.

## Impact

The crawler moved from script operations to an observable ETL system. Data recovery became repeatable, freshness risk became visible, and platform changes gained a verification gate before they reached production data.

## Evidence

| Area | Proof |
|------|-------|
| Orchestration | Dagster `Definitions` registry with assets, jobs, schedules, resources, and a failure sensor |
| Scale | 18 registered jobs, 19 registered schedules, 155 Python `@asset` definitions |
| Coverage | Apartment info/listings, trade/pricing, mapping/ranking, presale/facilities, household/loan/dealer/reconstruction |
| Operations | Daily, weekly, monthly, and biannual schedules with runtime caps |
| Recovery | Coordinate recovery, lifecycle propagation fixes, freshness checks, and migration preflight gates |
