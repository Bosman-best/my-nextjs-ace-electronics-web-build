// Minimal loader so scripts/verify-catalog.mjs can import the app's TypeScript
// catalog modules directly: resolves the '@/...' path alias and extensionless
// relative imports, letting Node's built-in type stripping handle .ts syntax.
import { pathToFileURL, fileURLToPath } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

function withTsExtension(filePath) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return filePath
  for (const ext of ['.ts', '.tsx']) {
    if (fs.existsSync(filePath + ext)) return filePath + ext
  }
  for (const ext of ['.ts', '.tsx']) {
    const idx = path.join(filePath, 'index' + ext)
    if (fs.existsSync(idx)) return idx
  }
  return null
}

export async function resolve(specifier, context, nextResolve) {
  let target = null
  if (specifier.startsWith('@/')) {
    target = path.join(ROOT, specifier.slice(2))
  } else if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
    target = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier)
  }
  if (target) {
    const resolved = withTsExtension(target)
    if (resolved) return { url: pathToFileURL(resolved).href, shortCircuit: true, format: 'module-typescript' }
  }
  return nextResolve(specifier, context)
}
