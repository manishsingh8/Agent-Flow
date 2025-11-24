import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Critical", high: 45, medium: 12, low: 8 },
  { name: "Warnings", high: 22, medium: 18, low: 15 },
  { name: "Notices", high: 15, medium: 25, low: 20 },
];

const ExceptionReasonsChart = () => {
  const colors = {
    high: "#DB3C57FF", // darkest green, high severity
    medium: "#F4B376FF", // base green
    low: "#6CCBA2", // light green, low severity
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Exception Severity Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">
                System Issues by Severity
              </h3>
              <p className="text-sm text-muted-foreground">
                Error distribution across critical, warning, and notice
                categories.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#111827", fontWeight: 500 }}
                  itemStyle={{ color: "#1F2937" }}
                  formatter={(value) => `${value} issues`}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: "#111827" }}>{value}</span>
                  )}
                />
                <Bar
                  dataKey="high"
                  stackId="a"
                  fill={colors.high}
                  name="High Priority"
                />
                <Bar
                  dataKey="medium"
                  stackId="a"
                  fill={colors.medium}
                  name="Medium Priority"
                />
                <Bar
                  dataKey="low"
                  stackId="a"
                  fill={colors.low}
                  name="Low Priority"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-2xl font-bold text-rose-500">82</div>
              <div className="text-xs text-red-600/70">High Priority</div>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="text-2xl font-bold text-amber-500">55</div>
              <div className="text-xs text-orange-600/70">Medium Priority</div>
            </div>
            <div className="p-3 bg-[#CAF1E0FF] dark:bg-amber-950 rounded-lg">
              <div className="text-2xl font-bold text-[#249563]">43</div>
              <div className="text-xs text-[#249563]">Low Priority</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExceptionReasonsChart;
