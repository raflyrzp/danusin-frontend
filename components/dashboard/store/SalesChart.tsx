"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatPrice } from "@/lib/utils";

interface SalesChartProps {
  data: Array<{ month: string; revenue: number | string; orders?: number }>;
}

export default function SalesChart({ data }: SalesChartProps) {
  const normalizedData =
    data && data.length > 0
      ? data.map((item) => ({
          ...item,
          revenue: Number(item.revenue) || 0, // Konversi string ke number
        }))
      : [
          { month: "Jan", revenue: 0 },
          { month: "Feb", revenue: 0 },
          { month: "Mar", revenue: 0 },
          { month: "Apr", revenue: 0 },
          { month: "May", revenue: 0 },
          { month: "Jun", revenue: 0 },
        ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={normalizedData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E3D9BD" />
          <XAxis
            dataKey="month"
            fontSize={12}
            stroke="#74512D"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            fontSize={12}
            stroke="#74512D"
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value: number) => [formatPrice(value), "Pendapatan"]}
            contentStyle={{
              backgroundColor: "#F8F4E1",
              border: "1px solid #E3D9BD",
              borderRadius: "8px",
              color: "#4E1F00",
            }}
            itemStyle={{ color: "#4E1F00" }}
            cursor={{ stroke: "#E3D9BD" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#FEBA17"
            strokeWidth={3}
            dot={{ fill: "#FEBA17", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#4E1F00", strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
