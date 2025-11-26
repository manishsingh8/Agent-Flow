import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Clock } from "lucide-react";

// Configuration for a single bar in a stack
export interface BarSegmentConfig {
  dataKey: string;
  color: string;
  label?: string;
}

interface CustomBarChartProps {
  title: string;
  description?: string;
  data: any[];
  xKey: string; // e.g. "workflow"

  // Legacy props for single bar mode
  dataKey?: string; // e.g. "time"
  color?: string; // bar color
  tooltipLabel?: string;
  xAxisLabel?: string; // optional x-axis label
  yAxisLabel?: string;
  // New props for stacked mode
  segments?: BarSegmentConfig[];

  barSize?: number; // bar width
}

const CustomBarChart = ({
  title,
  description,
  data,
  xKey,
  dataKey,
  color = "#249563",
  barSize = 40,
  tooltipLabel,
  segments,
  xAxisLabel,
  yAxisLabel,
}: CustomBarChartProps) => {
  // Determine if we are in stacked mode
  const isStacked = Array.isArray(segments) && segments.length > 0;

  // Generate chart configuration
  const chartConfig: ChartConfig = {};

  if (isStacked) {
    segments.forEach((segment) => {
      chartConfig[segment.dataKey] = {
        label: segment.label || segment.dataKey,
        color: segment.color,
      };
    });
  } else if (dataKey) {
    // Legacy mode config
    chartConfig[dataKey] = {
      label: tooltipLabel || dataKey,
      color: color,
    };
  }

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-start pb-0">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <CardTitle>{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="min-h-[250px] w-full flex justify-center"
        >
          <BarChart
            accessibilityLayer
            data={data}
            width={500}
            height={300}
            margin={{ top: 20, right: 20, left: 20, bottom: 40 }} // Balanced margins
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey={xKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              label={
                xAxisLabel
                  ? {
                      value: xAxisLabel,
                      position: "insideBottom",
                      offset: -10,
                    }
                  : undefined
              }
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                      dy: 60, // Center vertically
                      dx: -10, // Pull inward slightly
                    }
                  : undefined
              }
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel={!isStacked} />}
            />

            {isStacked && <ChartLegend content={<ChartLegendContent />} />}

            {isStacked
              ? segments.map((segment, index) => {
                  const isLast = index === segments.length - 1;
                  const radius = isLast ? [4, 4, 0, 0] : [0, 0, 0, 0];

                  return (
                    <Bar
                      key={segment.dataKey}
                      dataKey={segment.dataKey}
                      stackId="a"
                      fill={segment.color}
                      radius={radius as [number, number, number, number]}
                      barSize={barSize}
                    />
                  );
                })
              : dataKey && (
                  <Bar
                    dataKey={dataKey}
                    fill={color}
                    radius={8}
                    barSize={barSize}
                  />
                )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CustomBarChart;
