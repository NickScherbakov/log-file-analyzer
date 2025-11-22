import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LogEntry, SeverityLevel } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface RawLogViewerProps {
  entries: LogEntry[]
}

export function RawLogViewer({ entries }: RawLogViewerProps) {
  const getSeverityVariant = (severity: SeverityLevel) => {
    switch (severity) {
      case 'ERROR':
      case 'FATAL':
        return 'destructive'
      case 'WARN':
        return 'default'
      case 'INFO':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'ERROR':
      case 'FATAL':
        return 'bg-destructive/5'
      case 'WARN':
        return 'bg-[oklch(0.75_0.15_85)]/5'
      default:
        return ''
    }
  }

  return (
    <Card>
      <ScrollArea className="h-[600px]">
        <div className="divide-y divide-border">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={cn(
                'p-3 space-y-2 transition-colors hover:bg-muted/30',
                getSeverityColor(entry.severity)
              )}
            >
              <div className="flex items-center gap-2 text-xs">
                <Badge variant={getSeverityVariant(entry.severity)} className="shrink-0">
                  {entry.severity}
                </Badge>
                <span className="text-muted-foreground">Line {entry.lineNumber}</span>
                {entry.timestamp && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {entry.timestamp.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              <div className="font-mono text-sm break-all leading-relaxed">
                {entry.rawLine}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
