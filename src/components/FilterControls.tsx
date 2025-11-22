import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
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
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <MagnifyingGlass 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
          size={16} 
        />
        <Input
          placeholder="Search log messages..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={severityFilter} onValueChange={onSeverityFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Levels</SelectItem>
          <SelectItem value="ERROR">Error</SelectItem>
          <SelectItem value="WARN">Warning</SelectItem>
          <SelectItem value="INFO">Info</SelectItem>
          <SelectItem value="DEBUG">Debug</SelectItem>
          <SelectItem value="TRACE">Trace</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" onClick={onClearFilters} className="w-full sm:w-auto">
          <X size={16} />
          Clear
        </Button>
      )}
    </div>
  )
}
