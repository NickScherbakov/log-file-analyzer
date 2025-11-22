import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ErrorPattern } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Copy } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ErrorDetailDialogProps {
  pattern: ErrorPattern | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ErrorDetailDialog({ pattern, open, onOpenChange }: ErrorDetailDialogProps) {
  if (!pattern) return null

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

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

  const formatTimestamp = (date: Date | null) => {
    if (!date) return 'No timestamp'
    return date.toLocaleString()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] glass border-white/10 bg-card/80 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Badge variant={getSeverityVariant(pattern.severity)} className="shadow-none">
              {pattern.severity}
            </Badge>
            <span className="text-sm font-normal text-muted-foreground">
              {pattern.count} occurrence{pattern.count !== 1 ? 's' : ''} ({pattern.percentage.toFixed(1)}%)
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Error Message</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(pattern.pattern)}
                className="h-8 w-8 p-0 hover:bg-white/10"
              >
                <Copy size={14} />
              </Button>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-lg font-mono text-sm break-all text-foreground/90 shadow-inner">
              {pattern.pattern}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Recent Occurrences</h4>
            <ScrollArea className="h-[300px] border border-white/10 rounded-lg bg-black/20">
              <div className="divide-y divide-white/5">
                {pattern.entries.map((entry) => (
                  <div key={entry.id} className="p-3 space-y-1 hover:bg-white/5 transition-colors">
                    <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                      <span>Line {entry.lineNumber}</span>
                      <span>{formatTimestamp(entry.timestamp)}</span>
                    </div>
                    <div className="font-mono text-sm break-all text-foreground/80">{entry.rawLine}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
