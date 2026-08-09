#!/usr/bin/env node

import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { renderActivityAssets } from './lib/ai-activity.mjs'

function parseArgs(argv) {
  const options = { stdin: false }
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === '--stdin') {
      options.stdin = true
      continue
    }
    if (argument === '--as-of' || argument === '--output-dir' || argument === '--input') {
      const value = argv[index + 1]
      if (!value || value.startsWith('--')) throw new Error(`${argument} requires a value`)
      const key = argument === '--as-of' ? 'asOf' : argument === '--output-dir' ? 'outputDir' : 'inputPath'
      options[key] = value
      index += 1
      continue
    }
    throw new Error(`unsupported argument: ${argument}`)
  }

  if (options.stdin === Boolean(options.inputPath)) {
    throw new Error('choose exactly one input source: --stdin or --input')
  }
  if (!options.asOf) throw new Error('--as-of is required')
  if (!options.outputDir) throw new Error('--output-dir is required')
  return options
}

async function writeAssets(outputDir, assets) {
  await mkdir(outputDir, { recursive: true })
  const temporaryFiles = []
  try {
    for (const [name, svg] of assets) {
      const temporaryPath = join(outputDir, `.${name}.${process.pid}.${temporaryFiles.length}.tmp`)
      await writeFile(temporaryPath, svg, { encoding: 'utf8', flag: 'wx' })
      temporaryFiles.push({ temporaryPath, finalPath: join(outputDir, name) })
    }
    for (const file of temporaryFiles) await rename(file.temporaryPath, file.finalPath)
  } finally {
    await Promise.all(temporaryFiles.map(({ temporaryPath }) => unlink(temporaryPath).catch(() => undefined)))
  }
}

async function readStdin() {
  let input = ''
  process.stdin.setEncoding('utf8')
  for await (const chunk of process.stdin) input += chunk
  return input
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const input = options.inputPath ? await readFile(options.inputPath, 'utf8') : await readStdin()
  const payload = JSON.parse(input)
  const assets = renderActivityAssets(payload, options.asOf)
  await writeAssets(options.outputDir, assets)
  process.stdout.write(`Generated ${assets.size} AI activity SVGs for ${options.asOf}.\n`)
}

main().catch((error) => {
  process.stderr.write(`AI activity generation failed: ${error.message}\n`)
  process.exitCode = 1
})
