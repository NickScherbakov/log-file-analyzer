import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MagnifyingGlass, X, Funnel } from '@phosphor-icons/react'
import { SeverityLevel } from '@/lib/types'

interface FilterControlsProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  severityFilter: SeverityLevel | 'ALL'
  onSeverityFilterChange: (value: SeverityLevel | 'ALL') => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function FilterControls({
  searchTerm,
  onSearchChange,
  severityFilter,
  onSeverityFilterChange,
  onClearFilters,
  hasActiveFilters,
}: FilterControlsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full">
        <MagnifyingGlass
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          size={16}
        />
        <Input
          placeholder="Search log messages..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 focus:bg-white/10 transition-colors h-10"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Funnel size={14} />
          Severity
        </label>
        <Select value={severityFilter} onValueChange={onSeverityFilterChange}>
          <SelectTrigger className="w-full bg-white/5 border-white/10 focus:ring-primary/50 h-10">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10">
            <SelectItem value="ALL">All Levels</SelectItem>
            <SelectItem value="ERROR" className="text-destructive focus:text-destructive">Error</SelectItem>
            <SelectItem value="WARN" className="text-yellow-400 focus:text-yellow-400">Warning</SelectItem>
            <SelectItem value="INFO" className="text-primary focus:text-primary">Info</SelectItem>
            <SelectItem value="DEBUG" className="text-muted-foreground focus:text-muted-foreground">Debug</SelectItem>
            <SelectItem value="TRACE" className="text-muted-foreground focus:text-muted-foreground">Trace</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={onClearFilters}
          className="w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 mt-2"
        >
          <X size={16} />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
