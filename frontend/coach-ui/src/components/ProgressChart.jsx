import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const data = [
  { session: 'S1', score: 20 },
  { session: 'S2', score: 40 },
  { session: 'S3', score: 33 },
  { session: 'S4', score: 20 },
  { session: 'S5', score: 55 },
  { session: 'S6', score: 72 },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-surface border border-teal-glow/30 px-4 py-3">
        <p className="font-mono text-xs text-teal-glow">{payload[0].payload.session}</p>
        <p className="font-display text-xl text-white">{payload[0].value}</p>
        <p className="font-mono text-[10px] text-muted">/ 100</p>
      </div>
    )
  }
  return null
}

export default function ProgressChart() {
  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5c8" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#00e5c8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
          <XAxis
            dataKey="session"
            tick={{ fill: '#4a6180', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={{ stroke: '#1e2d45' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#4a6180', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#00e5c8"
            strokeWidth={2}
            fill="url(#scoreGrad)"
            dot={{ fill: '#00e5c8', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#00e5c8', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}