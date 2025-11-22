#!/usr/bin/env node
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const base = process.env.GH_PAGES_BASE || '/'
const distDir = join(process.cwd(), 'dist')
let errors = []

function assert(condition, message) {
  if (!condition) errors.push(message)
}

assert(existsSync(distDir), 'dist directory missing. Run build first.')

if (existsSync(distDir)) {
  const indexPath = join(distDir, 'index.html')
  assert(existsSync(indexPath), 'index.html missing in dist.')

  if (existsSync(indexPath)) {
    const html = readFileSync(indexPath, 'utf8')
    if (base !== '/') {
      assert(html.includes(`${base}assets/`), `index.html does not reference assets with base '${base}'.`)
    }
    assert(/<script\s+type="module"/.test(html), 'No module script tag found in index.html.')
  }

  const assetsDir = join(distDir, 'assets')
  assert(existsSync(assetsDir), 'assets directory missing in dist.')
  if (existsSync(assetsDir)) {
    const files = readdirSync(assetsDir)
    assert(files.some(f => /\.js$/.test(f)), 'No JS bundle found in assets.')
    const sizeReport = []
    let total = 0
    files.forEach(f => {
      const full = join(assetsDir, f)
      const size = statSync(full).size
      total += size
      sizeReport.push({ file: f, kb: (size/1024).toFixed(1) })
    })
    // Threshold checks
    sizeReport.filter(r => /\.js$/.test(r.file)).forEach(r => {
      const bytes = parseFloat(r.kb) * 1024
      assert(bytes < 5 * 1024 * 1024, `Bundle ${r.file} exceeds 5MB (${r.kb}KB). Consider code splitting.`)
    })
    console.log('\nBundle Size Report:')
    sizeReport.sort((a,b)=>parseFloat(b.kb)-parseFloat(a.kb)).forEach(r => console.log(` - ${r.file}: ${r.kb} KB`))
    console.log(`Total (raw assets): ${(total/1024).toFixed(1)} KB`)
  }

// Analytics env echo
console.log('\nAnalytics configuration:')
console.log(' - Plausible:', process.env.VITE_PLAUSIBLE_DOMAIN ? 'enabled' : 'disabled')
console.log(' - GA:', process.env.VITE_GA_ID ? 'enabled' : 'disabled')
console.log(' - Yandex Metrica:', process.env.VITE_YM_ID ? 'enabled' : 'disabled')
}

if (errors.length) {
  console.error('\nProduction check FAILED:')
  errors.forEach(e => console.error(' -', e))
  process.exit(1)
} else {
  console.log('Production check passed. Base:', base)
}
