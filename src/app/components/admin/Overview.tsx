"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const data = [
  { name: "Jan", revenue: 4000, orders: 2400 },
  { name: "Feb", revenue: 3000, orders: 1398 },
  { name: "Mar", revenue: 2000, orders: 9800 },
  { name: "Apr", revenue: 2780, orders: 3908 },
  { name: "May", revenue: 1890, orders: 4800 },
  { name: "Jun", revenue: 2390, orders: 3800 },
  { name: "Jul", revenue: 3490, orders: 4300 },
  { name: "Aug", revenue: 4000, orders: 2400 },
  { name: "Sep", revenue: 3000, orders: 1398 },
  { name: "Oct", revenue: 2000, orders: 9800 },
  { name: "Nov", revenue: 2780, orders: 3908 },
  { name: "Dec", revenue: 1890, orders: 4800 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Bar
          dataKey="revenue"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Bar
          dataKey="orders"
          fill="hsl(var(--secondary))"
          radius={[4, 4, 0, 0]}
          className="fill-secondary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}