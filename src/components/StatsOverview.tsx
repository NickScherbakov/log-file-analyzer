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
    },
    {
      label: 'Errors',
      value: stats.errorCount.toLocaleString(),
      icon: Warning,
      color: 'text-destructive',
    },
    {
      label: 'Warnings',
      value: stats.warnCount.toLocaleString(),
      icon: Warning,
      color: 'text-[oklch(0.75_0.15_85)]',
    },
    {
      label: 'Info',
      value: stats.infoCount.toLocaleString(),
      icon: Info,
      color: 'text-primary',
    },
    {
      label: 'Debug',
      value: stats.debugCount.toLocaleString(),
      icon: Bug,
      color: 'text-muted-foreground',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{filename}</h2>
          {stats.timeRange.start && stats.timeRange.end && (
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(stats.timeRange.start)} → {formatDate(stats.timeRange.end)}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide font-medium text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <Icon className={stat.color} size={24} weight="duotone" />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
