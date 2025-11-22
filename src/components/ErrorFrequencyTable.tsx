import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ErrorPattern } from '@/lib/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface ErrorFrequencyTableProps {
  patterns: ErrorPattern[]
  onPatternClick: (pattern: ErrorPattern) => void
}

export function ErrorFrequencyTable({ patterns, onPatternClick }: ErrorFrequencyTableProps) {
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'ERROR':
      case 'FATAL':
        return 'destructive'
      case 'WARN':
        return 'default'
      default:
        return 'secondary'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'ERROR':
      case 'FATAL':
        return 'text-destructive'
      case 'WARN':
        return 'text-[oklch(0.75_0.15_85)]'
      default:
        return 'text-primary'
    }
  }

  if (patterns.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">No errors or warnings found</p>
          <p className="text-sm">This log file appears to be healthy!</p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <ScrollArea className="h-[500px]">
        <div className="divide-y divide-border">
          {patterns.map((pattern, index) => (
            <div
              key={index}
              className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => onPatternClick(pattern)}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Badge variant={getSeverityVariant(pattern.severity)} className="shrink-0">
                    {pattern.severity}
                  </Badge>
                  <span className="font-medium text-sm">
                    {pattern.count} occurrence{pattern.count !== 1 ? 's' : ''}
                  </span>
                  <span className={cn('text-sm font-medium', getSeverityColor(pattern.severity))}>
                    {pattern.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="font-mono text-sm text-foreground/90 break-all line-clamp-2">
                {pattern.pattern}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
