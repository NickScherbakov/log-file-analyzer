import { useState, useMemo, useEffect } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { LandingPage } from '@/components/LandingPage'
import { Analytics } from '@/components/Analytics'
import { LearningGuide } from '@/components/LearningGuide'
import { StatsOverview } from '@/components/StatsOverview'
import { ErrorFrequencyTable } from '@/components/ErrorFrequencyTable'
import { TimelineChart } from '@/components/TimelineChart'
import { RawLogViewer } from '@/components/RawLogViewer'
import { ErrorDetailDialog } from '@/components/ErrorDetailDialog'
import { FilterControls } from '@/components/FilterControls'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { ChartLine, ListBullets, FileText, X, CaretLeft } from '@phosphor-icons/react'
import { LogEntry, ErrorPattern, SeverityLevel } from '@/lib/types'
import { parseLogFile, calculateStats, extractErrorPatterns, generateTimeSeriesData } from '@/lib/logParser'
import { demoLogContent } from '@/lib/demoLog'
import { toast } from 'sonner'

function App() {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([])
  const [filename, setFilename] = useState<string>('')
  const [selectedPattern, setSelectedPattern] = useState<ErrorPattern | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'ALL'>('ALL')
  const [showAnalyzer, setShowAnalyzer] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [previousPatternKeys, setPreviousPatternKeys] = useState<Set<string>>(new Set())
  const [newPatternKeys, setNewPatternKeys] = useState<Set<string>>(new Set())

  const handleFileSelect = (content: string, name: string) => {
    try {
      const entries = parseLogFile(content)
      setLogEntries(entries)
      setFilename(name)
      setSearchTerm('')
      setSeverityFilter('ALL')
      setPreviousPatternKeys(new Set())
      setNewPatternKeys(new Set())
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
    setPreviousPatternKeys(new Set())
    setNewPatternKeys(new Set())
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

  useEffect(() => {
    const current = new Set<string>()
    errorPatterns.forEach(p => { if (p.normalizedKey) current.add(p.normalizedKey) })
    const newly = new Set<string>()
    current.forEach(k => { if (!previousPatternKeys.has(k)) newly.add(k) })
    setNewPatternKeys(newly)
    if (newly.size > 0) {
      setPreviousPatternKeys(prev => new Set([...prev, ...newly]))
    }
  }, [errorPatterns, previousPatternKeys])

  const hasActiveFilters = searchTerm !== '' || severityFilter !== 'ALL'

  const handleClearFilters = () => {
    setSearchTerm('')
    setSeverityFilter('ALL')
  }

  const loadDemoLog = async () => {
    try {
      handleFileSelect(demoLogContent, 'demo.log')
      setShowAnalyzer(true)
      setPreviousPatternKeys(new Set())
    } catch (e) {
      console.error('Failed to load embedded demo log', e)
      toast.error('Failed to load demo log')
    }
  }

  if (!showAnalyzer) {
    return (
      <>
        <Analytics />
        <LandingPage
          onGetStarted={() => setShowAnalyzer(true)}
          onLoadDemo={loadDemoLog}
          onOpenGuide={() => setShowGuide(true)}
        />
        <LearningGuide open={showGuide} onOpenChange={setShowGuide} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Persistent Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <Analytics />
      <Toaster theme="dark" />

      <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
        {/* Header */}
        <header className="glass rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setShowAnalyzer(false)} className="hover:bg-white/10">
              <CaretLeft size={20} />
            </Button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">LogNebula Workspace</h1>
              <p className="text-xs text-muted-foreground">
                {filename ? `Analyzing: ${filename}` : 'No file loaded'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowGuide(true)} className="glass border-white/10 hover:bg-white/10">
              Guide
            </Button>
            <Button size="sm" onClick={loadDemoLog} className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20">
              Reset Demo
            </Button>
          </div>
        </header>

        {logEntries.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm animate-fade-up">
            <FileUpload onFileSelect={handleFileSelect} />
          </section>
        ) : (
          <div className="space-y-6 animate-fade-up">
            {/* Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <section className="glass-card rounded-2xl p-6 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">Overview</h2>
                    <Button variant="ghost" size="sm" onClick={handleClearLog} className="text-muted-foreground hover:text-destructive">
                      <X size={16} className="mr-2" /> Clear
                    </Button>
                  </div>
                  <StatsOverview stats={stats} filename={filename} />
                </section>
              </div>
              <div className="lg:col-span-1">
                <section className="glass-card rounded-2xl p-6 h-full flex flex-col">
                  <h2 className="text-lg font-semibold mb-4">Filters</h2>
                  <FilterControls
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    severityFilter={severityFilter}
                    onSeverityFilterChange={setSeverityFilter}
                    onClearFilters={handleClearFilters}
                    hasActiveFilters={hasActiveFilters}
                  />
                </section>
              </div>
            </div>

            {/* Main Content Tabs */}
            <section className="glass-card rounded-2xl p-6">
              <Tabs defaultValue="frequency" className="w-full">
                <TabsList className="w-full justify-start bg-white/5 p-1 rounded-xl mb-6">
                  <TabsTrigger value="frequency" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                    <ListBullets size={16} className="mr-2" /> Frequency
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                    <ChartLine size={16} className="mr-2" /> Timeline
                  </TabsTrigger>
                  <TabsTrigger value="raw" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                    <FileText size={16} className="mr-2" /> Raw Logs
                  </TabsTrigger>
                </TabsList>

                <div className="min-h-[500px]">
                  <TabsContent value="frequency" className="mt-0 animate-fade-in">
                    <ErrorFrequencyTable patterns={errorPatterns} onPatternClick={setSelectedPattern} newKeys={newPatternKeys} />
                  </TabsContent>
                  <TabsContent value="timeline" className="mt-0 animate-fade-in">
                    <TimelineChart data={timeSeriesData} />
                  </TabsContent>
                  <TabsContent value="raw" className="mt-0 animate-fade-in">
                    <RawLogViewer entries={filteredEntries} />
                  </TabsContent>
                </div>
              </Tabs>
            </section>
          </div>
        )}
      </div>

      <ErrorDetailDialog
        pattern={selectedPattern}
        open={selectedPattern !== null}
        onOpenChange={(open) => !open && setSelectedPattern(null)}
      />
      <LearningGuide open={showGuide} onOpenChange={setShowGuide} />
    </div>
  )
}

export default App