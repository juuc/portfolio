const DAY_MS = 24 * 60 * 60 * 1000
const CELL_COUNT = 53 * 7
const TOKEN_FIELDS = ['inputTokens', 'outputTokens', 'cacheCreationTokens']

function parseIsoDate(value, label = 'date') {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} must use YYYY-MM-DD`)
  }

  const date = new Date(`${value}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime()) || formatIsoDate(date) !== value) {
    throw new Error(`${label} is not a valid calendar date`)
  }
  return date
}

function formatIsoDate(date) {
  return date.toISOString().slice(0, 10)
}

function addDays(date, amount) {
  return new Date(date.getTime() + amount * DAY_MS)
}

function readTokenField(row, field, index) {
  const value = row[field] ?? 0
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new Error(`daily[${index}].${field} must be a non-negative finite number`)
  }
  return value
}

function relativeLevel(signal, sortedSignals) {
  if (signal <= 0) return 0
  let upperRank = 0
  for (let index = 0; index < sortedSignals.length; index += 1) {
    if (sortedSignals[index] <= signal) upperRank = index + 1
  }
  return Math.min(4, Math.max(1, Math.ceil((upperRank / sortedSignals.length) * 4)))
}

export function buildActivityModel(payload, asOfValue) {
  if (!payload || !Array.isArray(payload.daily) || payload.daily.length === 0) {
    throw new Error('ccusage payload must contain at least one daily row')
  }

  const asOfDate = parseIsoDate(asOfValue, 'as-of date')
  const currentWeekSunday = addDays(asOfDate, -asOfDate.getUTCDay())
  const startDate = addDays(currentWeekSunday, -52 * 7)
  const signalByDate = new Map()

  payload.daily.forEach((row, index) => {
    if (!row || typeof row !== 'object') {
      throw new Error(`daily[${index}] must be an object`)
    }

    const rowDate = parseIsoDate(row.period, `daily[${index}].period`)
    if (rowDate > asOfDate) {
      throw new Error(`daily[${index}].period cannot be later than the as-of date`)
    }

    const signal = TOKEN_FIELDS.reduce(
      (sum, field) => sum + readTokenField(row, field, index),
      0,
    )
    signalByDate.set(row.period, (signalByDate.get(row.period) ?? 0) + signal)
  })

  const displayedSignals = []
  for (const [date, signal] of signalByDate) {
    const parsed = parseIsoDate(date)
    if (parsed >= startDate && parsed <= asOfDate && signal > 0) displayedSignals.push(signal)
  }
  displayedSignals.sort((left, right) => left - right)

  const cells = Array.from({ length: CELL_COUNT }, (_, index) => {
    const date = addDays(startDate, index)
    const dateValue = formatIsoDate(date)
    const future = date > asOfDate
    const signal = future ? 0 : (signalByDate.get(dateValue) ?? 0)
    return {
      date: dateValue,
      level: relativeLevel(signal, displayedSignals),
      active: signal > 0,
      future,
    }
  })

  let runningStreak = 0
  let longestStreak = 0
  let currentStreak = 0
  for (const cell of cells) {
    if (cell.future) continue
    if (cell.active) {
      runningStreak += 1
      longestStreak = Math.max(longestStreak, runningStreak)
    } else {
      runningStreak = 0
    }
    if (cell.date === asOfValue) currentStreak = runningStreak
  }

  return {
    asOf: asOfValue,
    startDate: formatIsoDate(startDate),
    cells,
    activeDays: cells.filter((cell) => cell.active).length,
    currentStreak,
    longestStreak,
  }
}

const COPY = {
  en: {
    language: 'en',
    title: 'AI ACTIVITY',
    kicker: 'LOCAL AGGREGATE',
    subtitle: 'Sustained AI-assisted execution',
    description: 'A 53-week calendar of relative AI-assisted activity derived from local usage aggregates.',
    activeDays: 'ACTIVE DAYS',
    currentStreak: 'CURRENT STREAK',
    longestStreak: 'LONGEST STREAK',
    less: 'Less',
    more: 'More',
    asOf: 'AS OF',
    weekdays: ['M', 'W', 'F'],
    weekdayRows: [1, 3, 5],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    levels: ['No activity', 'Light activity', 'Focused activity', 'Deep activity', 'Peak activity'],
  },
  ko: {
    language: 'ko',
    title: 'AI 활동',
    kicker: '로컬 집계',
    subtitle: '지속적인 AI 기반 실행',
    description: '로컬 사용량 집계에서 상대 강도만 산출한 53주 AI 활동 달력입니다.',
    activeDays: '활동 일수',
    currentStreak: '현재 연속',
    longestStreak: '최장 연속',
    less: '낮음',
    more: '높음',
    asOf: '기준',
    weekdays: ['월', '수', '금'],
    weekdayRows: [1, 3, 5],
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    levels: ['활동 없음', '가벼운 활동', '집중 활동', '깊은 활동', '최고 활동'],
  },
}

const THEMES = {
  dark: {
    background: '#121216',
    border: '#27272A',
    text: '#FAFAFA',
    muted: '#A1A1AA',
    faint: '#71717A',
    future: '#17171B',
    levels: ['#1D2430', '#223B61', '#2E5F9E', '#4E8DD7', '#8BC3FF'],
  },
  light: {
    background: '#FFFFFF',
    border: '#D0D7DE',
    text: '#1F2328',
    muted: '#57606A',
    faint: '#6E7781',
    future: '#F6F8FA',
    levels: ['#EBEEF2', '#D9E8FA', '#9EC5EF', '#5C96D1', '#2668A8'],
  },
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function renderText({ x, y, value, size, weight = 400, fill, family = 'sans', anchor = 'start', spacing }) {
  const fontFamily = family === 'mono'
    ? "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace"
    : "-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif"
  const letterSpacing = spacing ? ` letter-spacing="${spacing}"` : ''
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${fontFamily}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}"${letterSpacing}>${escapeXml(value)}</text>`
}

function monthLabels(model, copy, colors) {
  const labels = []
  let previousMonth = null
  for (let week = 0; week < 53; week += 1) {
    const date = parseIsoDate(model.cells[week * 7].date)
    const month = date.getUTCMonth()
    if (week === 0 || month !== previousMonth) {
      labels.push(renderText({
        x: 146 + week * 11,
        y: 139,
        value: copy.months[month],
        size: 9,
        weight: 500,
        fill: colors.faint,
        family: 'mono',
      }))
    }
    previousMonth = month
  }
  return labels.join('\n')
}

export function renderActivitySvg(model, { theme, lang }) {
  const colors = THEMES[theme]
  const copy = COPY[lang]
  if (!colors) throw new Error(`unsupported theme: ${theme}`)
  if (!copy) throw new Error(`unsupported language: ${lang}`)

  const stats = [
    { x: 146, value: model.activeDays, label: copy.activeDays },
    { x: 330, value: model.currentStreak, label: copy.currentStreak },
    { x: 514, value: model.longestStreak, label: copy.longestStreak },
  ]

  const cells = model.cells.map((cell, index) => {
    const week = Math.floor(index / 7)
    const weekday = index % 7
    const fill = cell.future ? colors.future : colors.levels[cell.level]
    const title = cell.future ? cell.date : `${cell.date}: ${copy.levels[cell.level]}`
    return `<g><title>${escapeXml(title)}</title><rect x="${146 + week * 11}" y="${151 + weekday * 11}" width="8" height="8" rx="2" fill="${fill}" data-date="${cell.date}" data-level="${cell.level}" /></g>`
  }).join('\n')

  const weekdayLabels = copy.weekdays.map((label, index) => renderText({
    x: 132,
    y: 158 + copy.weekdayRows[index] * 11,
    value: label,
    size: 9,
    weight: 500,
    fill: colors.faint,
    family: 'mono',
    anchor: 'end',
  })).join('\n')

  const legendCells = colors.levels.map((fill, index) => (
    `<rect x="${637 + index * 12}" y="245" width="8" height="8" rx="2" fill="${fill}" />`
  )).join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="activity-title activity-description" lang="${copy.language}" viewBox="0 0 760 286" width="760" height="286">
  <title id="activity-title">${escapeXml(copy.title)}</title>
  <desc id="activity-description">${escapeXml(copy.description)}</desc>
  <rect x="0.5" y="0.5" width="759" height="285" rx="18" fill="${colors.background}" stroke="${colors.border}" />
  ${renderText({ x: 32, y: 35, value: copy.title, size: 13, weight: 700, fill: colors.text, family: 'mono', spacing: '1.6' })}
  ${renderText({ x: 728, y: 35, value: copy.kicker, size: 9, weight: 600, fill: colors.faint, family: 'mono', anchor: 'end', spacing: '1.2' })}
  ${renderText({ x: 32, y: 57, value: copy.subtitle, size: 12, fill: colors.muted })}
  ${stats.map((stat) => renderText({ x: stat.x, y: 89, value: stat.value, size: 21, weight: 700, fill: colors.text, family: 'mono' })).join('\n  ')}
  ${stats.map((stat) => renderText({ x: stat.x, y: 108, value: stat.label, size: 8, weight: 600, fill: colors.faint, family: 'mono', spacing: '0.8' })).join('\n  ')}
  <line x1="32" y1="121" x2="728" y2="121" stroke="${colors.border}" />
  ${monthLabels(model, copy, colors)}
  ${weekdayLabels}
  ${cells}
  ${renderText({ x: 603, y: 253, value: copy.less, size: 9, fill: colors.faint, family: 'mono', anchor: 'end' })}
  ${legendCells}
  ${renderText({ x: 705, y: 253, value: copy.more, size: 9, fill: colors.faint, family: 'mono' })}
  ${renderText({ x: 32, y: 273, value: `${model.startDate} — ${model.asOf}`, size: 9, fill: colors.faint, family: 'mono' })}
  ${renderText({ x: 728, y: 273, value: `${copy.asOf} ${model.asOf}`, size: 9, fill: colors.faint, family: 'mono', anchor: 'end' })}
</svg>`
}

export function renderActivityAssets(payload, asOfValue) {
  const model = buildActivityModel(payload, asOfValue)
  const assets = new Map()
  for (const theme of ['dark', 'light']) {
    for (const lang of ['en', 'ko']) {
      assets.set(`ai-activity-${theme}-${lang}.svg`, renderActivitySvg(model, { theme, lang }))
    }
  }
  return assets
}
