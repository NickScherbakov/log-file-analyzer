import { Card } from '@/components/ui/card'
import { TimeSeriesData } from '@/lib/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TimelineChartProps {
  data: TimeSeriesData[]
}

export function TimelineChart({ data }: TimelineChartProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (data.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">No timeline data available</p>
          <p className="text-sm">Log entries don't contain parseable timestamps</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold mb-4">Error Trends Over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.005 250)" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatTime}
            stroke="oklch(0.55 0.01 250)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="oklch(0.55 0.01 250)"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'oklch(0.99 0 0)',
              border: '1px solid oklch(0.90 0.005 250)',
              borderRadius: '0.5rem',
              fontSize: '12px',
            }}
            labelFormatter={formatTime}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="errors" 
            stroke="oklch(0.55 0.22 25)" 
            strokeWidth={2}
            dot={{ fill: 'oklch(0.55 0.22 25)', r: 3 }}
            name="Errors"
          />
          <Line 
            type="monotone" 
            dataKey="warnings" 
            stroke="oklch(0.75 0.15 85)" 
            strokeWidth={2}
            dot={{ fill: 'oklch(0.75 0.15 85)', r: 3 }}
            name="Warnings"
          />
          <Line 
            type="monotone" 
            dataKey="info" 
            stroke="oklch(0.35 0.08 250)" 
            strokeWidth={2}
            dot={{ fill: 'oklch(0.35 0.08 250)', r: 3 }}
            name="Info"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
