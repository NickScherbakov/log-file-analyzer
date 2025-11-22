import { Card } from '@/components/ui/card'
import { LogStats } from '@/lib/types'
import { Warning, Info, Bug, FileText } from '@phosphor-icons/react'

interface StatsOverviewProps {
  stats: LogStats
  filename: string
}

export function StatsOverview({ stats, filename }: StatsOverviewProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return date.toLocaleString()
  }

  const statCards = [
    {
      label: 'Total Lines',
      value: stats.totalLines.toLocaleString(),
      icon: FileText,
      color: 'text-foreground',
      bg: 'bg-white/5',
    },
    {
      label: 'Errors',
      value: stats.errorCount.toLocaleString(),
      icon: Warning,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    {
      label: 'Warnings',
      value: stats.warnCount.toLocaleString(),
      icon: Warning,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
    },
    {
      label: 'Info',
      value: stats.infoCount.toLocaleString(),
      icon: Info,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Debug',
      value: stats.debugCount.toLocaleString(),
      icon: Bug,
      color: 'text-muted-foreground',
      bg: 'bg-muted/50',
    },
  ]

  return (
    <div className="space-y-6 w-full">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Currently Inspecting</p>
        <h2 className="text-3xl font-bold text-foreground break-words tracking-tight">{filename}</h2>
        {stats.timeRange.start && stats.timeRange.end && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center rounded-md bg-white/5 border border-white/10 px-2 py-1 text-xs font-medium">
              Time Range
            </span>
            <span className="font-mono text-xs">
              {formatDate(stats.timeRange.start)} <span className="text-muted-foreground/50">→</span> {formatDate(stats.timeRange.end)}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className={`relative overflow-hidden border-white/5 ${stat.bg} backdrop-blur-sm transition-transform hover:scale-105 duration-300`}
            >
              <div className="p-4 flex flex-col justify-between h-full gap-4">
                <div className="flex items-start justify-between">
                  <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    {stat.label}
                  </p>
                  <Icon className={`${stat.color}`} size={20} weight="duotone" />
                </div>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
