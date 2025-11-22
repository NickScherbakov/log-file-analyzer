import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BookOpen, Download } from '@phosphor-icons/react'

interface LearningGuideProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LearningGuide({ open, onOpenChange }: LearningGuideProps) {
  const exportExercises = () => {
    const md = `# Log Analyzer Learning Guide\n\n## Practice Exercises\n\n1. Find how many unique payment error patterns exist.\n2. Filter WARN and identify performance issues.\n3. Locate epoch-based lines and confirm timestamp conversion.\n4. Search for the word \`Shutdown\` to view lifecycle.\n\n## Pattern Normalization Example\n\nOriginal:\n\n\`Payment gateway error code=PGW-442 message="Card declined" orderId=9b9c1f84-45b0-4972-8b71-2af58f9e610e\`\n\nNormalized:\n\n\`Payment gateway error code=PGW-STR message=STR orderId=UUID\`\n\n## Severity Tokens\nFATAL, CRITICAL, ERROR, ERR, WARN, WARNING, INFO, INFORMATION, DEBUG, DBG, TRACE.\n\n## Timestamp Formats\n- ISO-8601\n- US format\n- Textual\n- Epoch seconds / milliseconds\n\nGenerated: ${new Date().toISOString()}`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'log-analyzer-exercises.md'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-card/90 backdrop-blur-xl p-0 shadow-2xl">
        <div className="bg-gradient-to-br from-primary/20 to-transparent px-8 py-8 border-b border-white/5">
          <DialogHeader className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20 text-primary">
                <BookOpen size={32} weight="duotone" />
              </div>
              <div className="space-y-1">
                <DialogTitle className="text-2xl font-bold tracking-tight">Learning Guide</DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  Understand how LogNebula interprets and visualizes your logs.
                </DialogDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="sm" onClick={exportExercises} className="gap-2">
                <Download size={16} />
                Export Exercises (MD)
              </Button>
              <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </DialogHeader>
        </div>
        <ScrollArea className="h-[60vh] px-8 pb-8">
          <div className="space-y-8 text-sm leading-relaxed pr-4 pt-6">
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">1. Overview</h3>
              <p className="text-muted-foreground">
                The tool parses plain text log lines, extracts <strong className="text-foreground">timestamps</strong>, <strong className="text-foreground">severity</strong>, and keeps the raw message. It then computes
                frequency of recurring error/warning patterns and time-based distributions.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">2. Severity Detection</h3>
              <p className="text-muted-foreground mb-3">
                Severity is inferred by matching tokens: <span className="text-xs font-mono bg-white/5 px-1 py-0.5 rounded">FATAL</span>, <span className="text-xs font-mono bg-white/5 px-1 py-0.5 rounded">ERROR</span>, <span className="text-xs font-mono bg-white/5 px-1 py-0.5 rounded">WARN</span>, <span className="text-xs font-mono bg-white/5 px-1 py-0.5 rounded">INFO</span>, <span className="text-xs font-mono bg-white/5 px-1 py-0.5 rounded">DEBUG</span>, etc. If none found, defaults to INFO.
              </p>
              <p className="text-muted-foreground">In the demo log multiple repeated errors like <code className="bg-white/5 px-1 py-0.5 rounded">Payment gateway error</code> form a cluster.</p>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">3. Timestamp Formats</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">ISO-8601</span>
                  <code className="text-xs">2025-11-22T09:15:03.124Z</code>
                </li>
                <li className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">US format</span>
                  <code className="text-xs">11/22/2025 09:15:11</code>
                </li>
                <li className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">Textual</span>
                  <code className="text-xs">Nov 22, 2025 09:15:10</code>
                </li>
                <li className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">Epoch</span>
                  <code className="text-xs">1732276500</code>
                </li>
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">4. Pattern Grouping</h3>
              <p className="text-muted-foreground mb-3">
                Normalization removes variable tokens: numbers → N, UUIDs → UUID, hex values → HEX, quoted strings → STR. This groups similar errors:
              </p>
              <div className="bg-black/40 p-4 rounded-lg border border-white/10 font-mono text-xs overflow-auto">
                <div className="text-red-400 mb-2">Payment gateway error code=PGW-442 message="Card declined" orderId=9b9c1f84...</div>
                <div className="text-muted-foreground text-[10px] uppercase tracking-widest mb-1">Normalized to</div>
                <div className="text-green-400">Payment gateway error code=PGW-STR message=STR orderId=UUID</div>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">5. Using Filters</h3>
              <p className="text-muted-foreground">
                Use search to narrow messages (substring match) and severity dropdown to isolate a level. Clearing filters resets view. Active filter state is indicated above tables.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">6. Interpreting Stats</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Total Lines</strong> – count of parsed lines.</li>
                <li><strong className="text-foreground">Error / Warn Counts</strong> – occurrences by severity.</li>
                <li><strong className="text-foreground">Time Range</strong> – earliest to latest valid timestamp.</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
