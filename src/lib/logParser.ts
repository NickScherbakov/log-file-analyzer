import { LogEntry, SeverityLevel, ErrorPattern, LogStats, TimeSeriesData } from './types'

const SEVERITY_PATTERNS = [
  { level: 'FATAL' as SeverityLevel, regex: /\b(FATAL|CRITICAL)\b/i },
  { level: 'ERROR' as SeverityLevel, regex: /\b(ERROR|ERR)\b/i },
  { level: 'WARN' as SeverityLevel, regex: /\b(WARN|WARNING)\b/i },
  { level: 'INFO' as SeverityLevel, regex: /\b(INFO|INFORMATION)\b/i },
  { level: 'DEBUG' as SeverityLevel, regex: /\b(DEBUG|DBG)\b/i },
  { level: 'TRACE' as SeverityLevel, regex: /\bTRACE\b/i },
]

const TIMESTAMP_PATTERNS = [
  /\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?/,
  /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}/,
  /\w{3} \d{2}, \d{4} \d{2}:\d{2}:\d{2}/,
  /\d{10,13}/,
]

function extractTimestamp(line: string): Date | null {
  for (const pattern of TIMESTAMP_PATTERNS) {
    const match = line.match(pattern)
    if (match) {
      const dateStr = match[0]
      
      if (/^\d{10,13}$/.test(dateStr)) {
        const timestamp = parseInt(dateStr)
        const date = timestamp > 10000000000 ? new Date(timestamp) : new Date(timestamp * 1000)
        if (!isNaN(date.getTime())) return date
      }
      
      const date = new Date(dateStr)
      if (!isNaN(date.getTime())) return date
    }
  }
  return null
}

function extractSeverity(line: string): SeverityLevel {
  for (const { level, regex } of SEVERITY_PATTERNS) {
    if (regex.test(line)) {
      return level
    }
  }
  return 'INFO'
}

export function parseLogFile(content: string): LogEntry[] {
  const lines = content.split('\n').filter(line => line.trim().length > 0)
  
  return lines.map((line, index) => ({
    id: `${index}-${Date.now()}`,
    timestamp: extractTimestamp(line),
    severity: extractSeverity(line),
    message: line.trim(),
    rawLine: line,
    lineNumber: index + 1,
  }))
}

export function calculateStats(entries: LogEntry[]): LogStats {
  const stats = {
    totalLines: entries.length,
    errorCount: 0,
    warnCount: 0,
    infoCount: 0,
    debugCount: 0,
    otherCount: 0,
    timeRange: {
      start: null as Date | null,
      end: null as Date | null,
    },
  }

  const timestamps = entries
    .map(e => e.timestamp)
    .filter((t): t is Date => t !== null)
    .sort((a, b) => a.getTime() - b.getTime())

  if (timestamps.length > 0) {
    stats.timeRange.start = timestamps[0]
    stats.timeRange.end = timestamps[timestamps.length - 1]
  }

  entries.forEach(entry => {
    switch (entry.severity) {
      case 'ERROR':
      case 'FATAL':
        stats.errorCount++
        break
      case 'WARN':
        stats.warnCount++
        break
      case 'INFO':
        stats.infoCount++
        break
      case 'DEBUG':
      case 'TRACE':
        stats.debugCount++
        break
      default:
        stats.otherCount++
    }
  })

  return stats
}

function normalizeMessage(message: string): string {
  return message
    .replace(/\d+/g, 'N')
    .replace(/0x[0-9a-fA-F]+/g, 'HEX')
    .replace(/"[^"]*"/g, 'STR')
    .replace(/'[^']*'/g, 'STR')
    .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, 'UUID')
}

export function extractErrorPatterns(entries: LogEntry[]): ErrorPattern[] {
  const errorEntries = entries.filter(
    e => e.severity === 'ERROR' || e.severity === 'FATAL' || e.severity === 'WARN'
  )

  const patternMap = new Map<string, LogEntry[]>()

  errorEntries.forEach(entry => {
    const normalized = normalizeMessage(entry.message)
    const existing = patternMap.get(normalized) || []
    existing.push(entry)
    patternMap.set(normalized, existing)
  })

  const totalErrors = errorEntries.length

  const patterns: ErrorPattern[] = Array.from(patternMap.entries()).map(
    ([pattern, entries]) => ({
      pattern: entries[0].message,
      count: entries.length,
      severity: entries[0].severity,
      percentage: totalErrors > 0 ? (entries.length / totalErrors) * 100 : 0,
      entries,
    })
  )

  return patterns.sort((a, b) => b.count - a.count)
}

export function generateTimeSeriesData(entries: LogEntry[]): TimeSeriesData[] {
  const entriesWithTime = entries.filter(e => e.timestamp !== null)
  
  if (entriesWithTime.length === 0) return []

  const timeMap = new Map<string, { errors: number; warnings: number; info: number }>()

  entriesWithTime.forEach(entry => {
    const hour = new Date(entry.timestamp!).toISOString().slice(0, 13) + ':00:00'
    
    const data = timeMap.get(hour) || { errors: 0, warnings: 0, info: 0 }
    
    if (entry.severity === 'ERROR' || entry.severity === 'FATAL') {
      data.errors++
    } else if (entry.severity === 'WARN') {
      data.warnings++
    } else {
      data.info++
    }
    
    timeMap.set(hour, data)
  })

  return Array.from(timeMap.entries())
    .map(([timestamp, data]) => ({
      timestamp,
      ...data,
    }))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
}
