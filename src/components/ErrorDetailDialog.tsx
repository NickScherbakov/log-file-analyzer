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
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant={getSeverityVariant(pattern.severity)}>
              {pattern.severity}
            </Badge>
            <span className="text-sm font-normal text-muted-foreground">
              {pattern.count} occurrence{pattern.count !== 1 ? 's' : ''} ({pattern.percentage.toFixed(1)}%)
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Error Message</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(pattern.pattern)}
              >
                <Copy size={16} />
              </Button>
            </div>
            <div className="bg-muted p-3 rounded-md font-mono text-sm break-all">
              {pattern.pattern}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">All Occurrences</h4>
            <ScrollArea className="h-[300px] border rounded-md">
              <div className="divide-y divide-border">
                {pattern.entries.map((entry) => (
                  <div key={entry.id} className="p-3 space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Line {entry.lineNumber}</span>
                      <span>{formatTimestamp(entry.timestamp)}</span>
                    </div>
                    <div className="font-mono text-sm break-all">{entry.rawLine}</div>
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
