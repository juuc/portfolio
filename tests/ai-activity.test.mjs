import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildActivityModel,
  renderActivityAssets,
} from '../scripts/lib/ai-activity.mjs'

const fixtureRows = [
  {
    period: '2026-08-01',
    inputTokens: 1,
    outputTokens: 0,
    cacheCreationTokens: 0,
    cacheReadTokens: 987_654_321,
    totalTokens: 987_654_322,
  },
  { period: '2026-08-04', inputTokens: 6, outputTokens: 4, cacheCreationTokens: 0 },
  { period: '2026-08-05', inputTokens: 12, outputTokens: 8, cacheCreationTokens: 0 },
  { period: '2026-08-08', inputTokens: 20, outputTokens: 10, cacheCreationTokens: 0 },
  { period: '2026-08-09', inputTokens: 10, outputTokens: 5, cacheCreationTokens: 0 },
  { period: '2026-08-09', inputTokens: 15, outputTokens: 10, cacheCreationTokens: 0 },
]

test('buildActivityModel aggregates dates and exposes only relative activity', () => {
  const model = buildActivityModel({ daily: fixtureRows }, '2026-08-09')
  const firstDay = model.cells.find((cell) => cell.date === '2026-08-01')
  const lastDay = model.cells.find((cell) => cell.date === '2026-08-09')

  assert.equal(model.cells.length, 371)
  assert.equal(model.startDate, '2025-08-10')
  assert.equal(model.activeDays, 5)
  assert.equal(model.currentStreak, 2)
  assert.equal(model.longestStreak, 2)
  assert.equal(firstDay.level, 1, 'cache reads must not raise activity intensity')
  assert.equal(lastDay.level, 4, 'duplicate rows for a date must be aggregated')
  assert.deepEqual(Object.keys(lastDay).sort(), ['active', 'date', 'future', 'level'])
  assert.equal(model.cells.at(-1).future, true)
})

test('renderActivityAssets emits bilingual theme variants without raw telemetry', () => {
  const assets = renderActivityAssets({ daily: fixtureRows }, '2026-08-09')
  const expectedNames = [
    'ai-activity-dark-en.svg',
    'ai-activity-dark-ko.svg',
    'ai-activity-light-en.svg',
    'ai-activity-light-ko.svg',
  ]

  assert.deepEqual([...assets.keys()].sort(), expectedNames)

  for (const [name, svg] of assets) {
    assert.match(svg, /^<svg[^>]+role="img"/)
    assert.equal((svg.match(/data-date=/g) ?? []).length, 371, name)
    assert.match(svg, /<title id="activity-title">/)
    assert.match(svg, /<desc id="activity-description">/)
    assert.doesNotMatch(svg, /cacheReadTokens|totalTokens|cost|model|agent|987654321/i)
  }

  assert.match(assets.get('ai-activity-dark-en.svg'), /AI ACTIVITY/)
  assert.match(assets.get('ai-activity-dark-ko.svg'), /AI 활동/)
  assert.match(assets.get('ai-activity-light-en.svg'), /#FFFFFF/)
  assert.match(assets.get('ai-activity-dark-en.svg'), /#121216/)
})
