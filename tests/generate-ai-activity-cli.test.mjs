import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const cliPath = new URL('../scripts/generate-ai-activity.mjs', import.meta.url)

const payload = JSON.stringify({
  daily: [
    {
      period: '2026-08-09',
      inputTokens: 10,
      outputTokens: 5,
      cacheCreationTokens: 2,
      cacheReadTokens: 999_999,
    },
  ],
})

test('CLI generates all four assets from stdin', async (context) => {
  const outputDir = await mkdtemp(join(tmpdir(), 'ai-activity-cli-'))
  context.after(() => rm(outputDir, { recursive: true, force: true }))

  const result = spawnSync(
    process.execPath,
    [cliPath.pathname, '--stdin', '--as-of', '2026-08-09', '--output-dir', outputDir],
    { input: payload, encoding: 'utf8' },
  )

  assert.equal(result.status, 0, result.stderr)
  assert.deepEqual((await readdir(outputDir)).sort(), [
    'ai-activity-dark-en.svg',
    'ai-activity-dark-ko.svg',
    'ai-activity-light-en.svg',
    'ai-activity-light-ko.svg',
  ])
  assert.match(await readFile(join(outputDir, 'ai-activity-dark-en.svg'), 'utf8'), /AI ACTIVITY/)
})

test('CLI accepts a JSON input file for deterministic regeneration', async (context) => {
  const rootDir = await mkdtemp(join(tmpdir(), 'ai-activity-file-'))
  const inputPath = join(rootDir, 'usage.json')
  const outputDir = join(rootDir, 'assets')
  context.after(() => rm(rootDir, { recursive: true, force: true }))
  await writeFile(inputPath, payload, 'utf8')

  const result = spawnSync(
    process.execPath,
    [cliPath.pathname, '--input', inputPath, '--as-of', '2026-08-09', '--output-dir', outputDir],
    { encoding: 'utf8' },
  )

  assert.equal(result.status, 0, result.stderr)
  assert.equal((await readdir(outputDir)).length, 4)
})

test('CLI rejects ambiguous input without replacing existing assets', async (context) => {
  const rootDir = await mkdtemp(join(tmpdir(), 'ai-activity-ambiguous-'))
  const inputPath = join(rootDir, 'usage.json')
  const outputDir = join(rootDir, 'assets')
  const sentinelPath = join(outputDir, 'ai-activity-dark-en.svg')
  context.after(() => rm(rootDir, { recursive: true, force: true }))
  await writeFile(inputPath, payload, 'utf8')
  await mkdir(outputDir, { recursive: true })
  await writeFile(sentinelPath, 'KEEP-EXISTING-ASSET', 'utf8')

  const result = spawnSync(
    process.execPath,
    [cliPath.pathname, '--stdin', '--input', inputPath, '--as-of', '2026-08-09', '--output-dir', outputDir],
    { input: payload, encoding: 'utf8' },
  )

  assert.notEqual(result.status, 0)
  assert.equal(await readFile(sentinelPath, 'utf8'), 'KEEP-EXISTING-ASSET')
  assert.deepEqual(await readdir(outputDir), ['ai-activity-dark-en.svg'])
})
