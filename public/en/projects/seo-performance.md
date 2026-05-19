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
| PageSpeed around 20 | **80** |
| Search visibility blocked by rendering | Listing pages indexable |

The result was not just a better Lighthouse score. It turned the public web surface into an acquisition channel.
