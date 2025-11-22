import { useState, useMemo } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { StatsOverview } from '@/components/StatsOverview'
import { ErrorFrequencyTable } from '@/components/ErrorFrequencyTable'
import { TimelineChart } from '@/components/TimelineChart'
import { RawLogViewer } from '@/components/RawLogViewer'
import { ErrorDetailDialog } from '@/components/ErrorDetailDialog'
import { FilterControls } from '@/components/FilterControls'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { ChartLine, ListBullets, FileText, X } from '@phosphor-icons/react'
import { LogEntry, ErrorPattern, SeverityLevel } from '@/lib/types'
import { parseLogFile, calculateStats, extractErrorPatterns, generateTimeSeriesData } from '@/lib/logParser'
import { toast } from 'sonner'

function App() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([])
  const [filename, setFilename] = useState<string>('')
  const [selectedPattern, setSelectedPattern] = useState<ErrorPattern | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'ALL'>('ALL')

  const handleFileSelect = (content: string, name: string) => {
    try {
      const entries = parseLogFile(content)
      setLogEntries(entries)
      setFilename(name)
      setSearchTerm('')
      setSeverityFilter('ALL')
      toast.success(`Loaded ${entries.length} log entries from ${name}`)
    } catch (error) {
      toast.error('Failed to parse log file')
      console.error(error)
    }
  }

  const handleClearLog = () => {
    setLogEntries([])
    setFilename('')
    setSearchTerm('')
    setSeverityFilter('ALL')
  }

  const filteredEntries = useMemo(() => {
    return logEntries.filter((entry) => {
      const matchesSearch = searchTerm === '' || 
        entry.message.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesSeverity = severityFilter === 'ALL' || entry.severity === severityFilter
      
      return matchesSearch && matchesSeverity
    })
  }, [logEntries, searchTerm, severityFilter])

  const stats = useMemo(() => calculateStats(filteredEntries), [filteredEntries])
  const errorPatterns = useMemo(() => extractErrorPatterns(filteredEntries), [filteredEntries])
  const timeSeriesData = useMemo(() => generateTimeSeriesData(filteredEntries), [filteredEntries])

  const hasActiveFilters = searchTerm !== '' || severityFilter !== 'ALL'

  const handleClearFilters = () => {
    setSearchTerm('')
    setSeverityFilter('ALL')
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Log Analyzer</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload and analyze log files to identify error patterns and trends
          </p>
        </header>

        {logEntries.length === 0 ? (
          <FileUpload onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <StatsOverview stats={stats} filename={filename} />
              <Button variant="outline" onClick={handleClearLog} className="ml-4">
                <X size={16} />
                Clear
              </Button>
            </div>

            <FilterControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              severityFilter={severityFilter}
              onSeverityFilterChange={setSeverityFilter}
              onClearFilters={handleClearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            <Tabs defaultValue="frequency" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="frequency" className="flex items-center gap-2">
                  <ListBullets size={16} />
                  <span className="hidden sm:inline">Frequency</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-2">
                  <ChartLine size={16} />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="raw" className="flex items-center gap-2">
                  <FileText size={16} />
                  <span className="hidden sm:inline">Raw Logs</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="frequency" className="mt-6">
                <ErrorFrequencyTable
                  patterns={errorPatterns}
                  onPatternClick={setSelectedPattern}
                />
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <TimelineChart data={timeSeriesData} />
              </TabsContent>

              <TabsContent value="raw" className="mt-6">
                <RawLogViewer entries={filteredEntries} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <ErrorDetailDialog
        pattern={selectedPattern}
        open={selectedPattern !== null}
        onOpenChange={(open) => !open && setSelectedPattern(null)}
      />
    </div>
  )
}

export default App