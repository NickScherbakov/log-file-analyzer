import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ErrorPattern } from '@/lib/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface ErrorFrequencyTableProps {
  patterns: ErrorPattern[]
  onPatternClick: (pattern: ErrorPattern) => void
  newKeys?: Set<string>
}

export function ErrorFrequencyTable({ patterns, onPatternClick, newKeys }: ErrorFrequencyTableProps) {
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
        return 'text-yellow-400'
      default:
        return 'text-primary'
    }
  }

  if (patterns.length === 0) {
    return (
      <Card className="p-12 border-dashed border-white/10 bg-white/5">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">No errors or warnings found</p>
          <p className="text-sm">This log file appears to be healthy!</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="glass-card border-white/5">
      <ScrollArea className="h-[500px]">
        <div className="divide-y divide-white/5">
          {patterns.map((pattern, index) => {
            const isNew = pattern.normalizedKey && newKeys?.has(pattern.normalizedKey)
            return (
              <div
                key={index}
                className={cn(
                  "p-4 hover:bg-white/5 cursor-pointer transition-all duration-200 group",
                  isNew && "bg-primary/5 hover:bg-primary/10"
                )}
                onClick={() => onPatternClick(pattern)}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Badge variant={getSeverityVariant(pattern.severity)} className="shrink-0 shadow-none">
                      {pattern.severity}
                    </Badge>
                    <span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {pattern.count} occurrence{pattern.count !== 1 ? 's' : ''}
                    </span>
                    <span className={cn('text-sm font-bold', getSeverityColor(pattern.severity))}>
                      {pattern.percentage.toFixed(1)}%
                    </span>
                    {isNew && (
                      <Badge variant="outline" className="text-xs border-primary/50 text-primary animate-pulse">
                        NEW
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="font-mono text-sm text-foreground/80 break-all line-clamp-2 group-hover:text-foreground transition-colors">
                  {pattern.pattern}
                </p>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </Card>
  )
}
