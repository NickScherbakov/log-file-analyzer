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
      <Card className="p-12 border-dashed border-white/10 bg-white/5">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">No timeline data available</p>
          <p className="text-sm">Log entries don't contain parseable timestamps</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="w-full h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
          />
          <YAxis
            stroke="rgba(255,255,255,0.5)"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(20, 20, 30, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)',
              color: '#fff'
            }}
            labelFormatter={formatTime}
            itemStyle={{ padding: '2px 0' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="errors"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#ef4444', strokeWidth: 0 }}
            name="Errors"
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="warnings"
            stroke="#facc15"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#facc15', strokeWidth: 0 }}
            name="Warnings"
            animationDuration={1000}
          />
          <Line
            type="monotone"
            dataKey="info"
            stroke="#a855f7"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#a855f7', strokeWidth: 0 }}
            name="Info"
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
