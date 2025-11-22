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
        return 'bg-destructive/10 border-l-2 border-l-destructive'
      case 'WARN':
        return 'bg-yellow-400/5 border-l-2 border-l-yellow-400'
      case 'INFO':
        return 'bg-primary/5 border-l-2 border-l-primary'
      default:
        return 'border-l-2 border-l-transparent'
    }
  }

  return (
    <Card className="glass-card border-white/5">
      <ScrollArea className="h-[600px]">
        <div className="divide-y divide-white/5">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={cn(
                'p-3 space-y-2 transition-colors hover:bg-white/5 font-mono text-sm',
                getSeverityColor(entry.severity)
              )}
            >
              <div className="flex items-center gap-3 text-xs">
                <Badge variant={getSeverityVariant(entry.severity)} className="shrink-0 h-5 px-1.5 text-[10px]">
                  {entry.severity}
                </Badge>
                <span className="text-muted-foreground/60 select-none">Line {entry.lineNumber}</span>
                {entry.timestamp && (
                  <span className="text-muted-foreground/80">
                    {entry.timestamp.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-foreground/90 break-all leading-relaxed pl-1">
                {entry.rawLine}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
