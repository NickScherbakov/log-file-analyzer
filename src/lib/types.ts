export type SeverityLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE' | 'FATAL'

export interface LogEntry {
  id: string
  timestamp: Date | null
  severity: SeverityLevel
  message: string
  rawLine: string
  lineNumber: number
}

export interface ErrorPattern {
  pattern: string
  count: number
  severity: SeverityLevel
  percentage: number
  entries: LogEntry[]
}

export interface LogStats {
  totalLines: number
  errorCount: number
  warnCount: number
  infoCount: number
  debugCount: number
  otherCount: number
  timeRange: {
    start: Date | null
    end: Date | null
  }
}

export interface TimeSeriesData {
  timestamp: string
  errors: number
  warnings: number
  info: number
}
