# SEO And Performance Transformation

## Why It Matters

Bootalk's public web pages needed to be discoverable and fast. A real-estate product cannot rely on a public web surface that search engines cannot fully index or users experience as slow.

## Problem

The web stack relied heavily on client rendering and static behavior. Important apartment/listing pages were not reliably visible to search engines, sitemap coverage was tiny, and PageSpeed was around 20.

## Output

- Moved the public web path to SSR-capable production hosting.
- Built dynamic sitemap generation for listing and apartment pages.
- Added canonical URLs, clean routing, structured data, and AI-search crawler support.
- Ran phased performance work: LCP optimization, render-waterfall removal, heavy SDK lazy loading, bundle cleanup, and skeleton loading.

## Impact

| Before | After |
|--------|-------|
| CSR/static public pages | SSR-capable public web |
| 5 sitemap URLs | **48,706** URLs |
| PageSpeed around 20 | **[80](https://pagespeed.web.dev/analysis/https-bootalk-co-kr/4jic9i7it6?form_factor=desktop)** |
| Search visibility blocked by rendering | Listing pages indexable |
| 2025-07..2025-09 Search Console baseline | **3.9x** clicks, **5.6x** impressions, average position **9.0 -> 5.4** by 2026-03..2026-05 |

The public web surface became an acquisition channel.

## Search Console Release Annotations

I used manual Search Console annotations as release markers for major web updates. The numbers below compare each update's 28-day pre/post window for Web search. They show observed trend shifts around the releases, not strict causal attribution.

| Release/update | What changed | Search Console trend |
|----------------|--------------|----------------------|
| Jan 2026 redirect/canonical cleanup | Removed trailing-slash drift and fixed `www` redirection | 28-day clicks/day **+142%**, impressions/day **+45%**, average position **7.49 -> 6.59** |
| Feb 2026 web v3.5.0 performance release | Removed barrel-import overhead from the web bundle | Lag-aware impressions/day **+36%**, average position **5.99 -> 5.53**; clicks held roughly flat |
| May 2026 web v3.6.0 App Router migration | Completed the App Router migration | Post-release impressions/day **+19%** while average position held around **5.2**; lag-aware clicks/day **+8%** with data through 2026-06-16 |
