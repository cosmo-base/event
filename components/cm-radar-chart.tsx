"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"

interface CMRadarChartProps {
  name: string
  data: { subject: string; A: number }[]
}

export function CMRadarChart({ name, data }: CMRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#38bdf8" opacity={0.2} />
        <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} fontWeight="bold" />
        <Radar name={name} dataKey="A" stroke="#00f2fe" fill="#00f2fe" fillOpacity={0.3} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
