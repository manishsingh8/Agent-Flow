import { memo, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiLegend } from "./AiLegend";

export interface AiFlowSuccessRateChartDatum {
  flowName: string;
  successRate: number;
  fill: string;
}

interface AiFlowSuccessRateChartProps {
  title: string;
  description: string;
  data: AiFlowSuccessRateChartDatum[];
}

const formatAxisTick = (tick: number): string => `${tick}%`;

function AiFlowSuccessRateChartComponent({
  title,
  description,
  data,
}: AiFlowSuccessRateChartProps) {
  const legendPayload = useMemo(
    () =>
      data.map((item) => ({
        value: item.flowName,
        type: "square" as const,
        color: item.fill,
      })),
    [data],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-1 h-80">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="flowName"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatAxisTick}
              />
              <Tooltip
                cursor={{ fill: "rgba(22, 163, 74, 0.12)" }}
                formatter={(value: number) => `${value.toFixed(1)}%`}
                contentStyle={{
                  backgroundColor: "rgba(240, 253, 244, 0.95)",
                  borderColor: "rgba(34, 197, 94, 0.4)",
                  borderRadius: 8,
                  color: "hsl(var(--card-foreground))",
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.25)",
                }}
                itemStyle={{
                  color: "hsl(var(--card-foreground))",
                }}
                labelStyle={{
                  color: "#15803d",
                  fontWeight: 600,
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="left"
                content={() => <AiLegend payload={legendPayload} />}
              />
              <Bar dataKey="successRate" radius={[3, 3, 0, 0]} barSize={30}>
                {data.map((entry) => (
                  <Cell key={entry.flowName} fill={entry.fill} name={entry.flowName} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">
              No success rate data available.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const AiFlowSuccessRateChart = memo(AiFlowSuccessRateChartComponent);

