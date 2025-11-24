"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    "User Registrations": 45,
    "Transaction Logs": 32,
    "System Audits": 58,
  },
  {
    month: "Feb",
    "User Registrations": 52,
    "Transaction Logs": 38,
    "System Audits": 64,
  },
  {
    month: "Mar",
    "User Registrations": 48,
    "Transaction Logs": 35,
    "System Audits": 60,
  },
  {
    month: "Apr",
    "User Registrations": 61,
    "Transaction Logs": 44,
    "System Audits": 72,
  },
  {
    month: "May",
    "User Registrations": 55,
    "Transaction Logs": 39,
    "System Audits": 68,
  },
  {
    month: "Jun",
    "User Registrations": 67,
    "Transaction Logs": 48,
    "System Audits": 79,
  },
];

// Greenish shades similar to #249563
const colors = {
  high: "#166F4C", // darkest green
  medium: "#249563", // base green
  low: "#6CCBA2", // light green
};

const ProcessingTimeChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Processing Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">
                Task Duration Over Time
              </h3>
              <p className="text-sm text-muted-foreground">
                Historical processing duration trends across workflow
                categories.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={colors.high}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors.high}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={colors.medium}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={colors.medium}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={colors.low}
                      stopOpacity={0.8}
                    />
                    <stop offset="95%" stopColor={colors.low} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#111827", fontWeight: 500 }}
                  itemStyle={{ color: "#111827" }} // ensures values are visible on hover
                  formatter={(value) => `${value} min`}
                />
                <Area
                  type="monotone"
                  dataKey="User Registrations"
                  stroke={colors.high}
                  fillOpacity={1}
                  fill="url(#color1)"
                />
                <Area
                  type="monotone"
                  dataKey="Transaction Logs"
                  stroke={colors.medium}
                  fillOpacity={1}
                  fill="url(#color2)"
                />
                <Area
                  type="monotone"
                  dataKey="System Audits"
                  stroke={colors.low}
                  fillOpacity={1}
                  fill="url(#color3)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingTimeChart;
