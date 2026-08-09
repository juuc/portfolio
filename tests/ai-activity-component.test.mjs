import assert from 'node:assert/strict'
import test from 'node:test'

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'

test('AIActivityCard renders language-matched accessible public activity', async (context) => {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
  })
  context.after(() => vite.close())
  const { AIActivityCard } = await vite.ssrLoadModule('/src/components/AIActivity.tsx')

  const english = renderToStaticMarkup(React.createElement(AIActivityCard, { lang: 'en' }))
  const korean = renderToStaticMarkup(React.createElement(AIActivityCard, { lang: 'ko' }))

  assert.match(english, /AI-native operating rhythm/)
  assert.match(english, /\/portfolio\/metrics\/ai-activity-dark-en\.svg/)
  assert.match(english, /Relative intensity only/)
  assert.match(english, /alt="53-week relative AI activity calendar"/)
  assert.match(english, /role="region"/)
  assert.doesNotMatch(english, /<a /, 'the horizontally scrollable card must not trigger navigation')

  assert.match(korean, /AI 네이티브 운영 리듬/)
  assert.match(korean, /\/portfolio\/metrics\/ai-activity-dark-ko\.svg/)
  assert.match(korean, /상대 강도만 공개/)
  assert.match(korean, /alt="53주 상대 AI 활동 달력"/)
})
