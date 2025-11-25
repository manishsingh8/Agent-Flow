import { useMemo } from "react";
import { BrainCircuit, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { AiFlowSuccessRateChart } from "@/components/AiPerformance/AiFlowSuccessRateChart";
import { AiTaskVolumeChart } from "@/components/AiPerformance/AiTaskVolumeChart";
import {
  AI_PERFORMANCE_COLOR_PALETTE,
  AI_PERFORMANCE_COLORS,
  AI_PERFORMANCE_DATA,
} from "@/constants/AiPerformanceData";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";

export default function AiPerformancePage() {
  const { successRateData, taskVolumeData } = useMemo(() => {
    const successRateData = AI_PERFORMANCE_DATA.successRate.map(
      (item, index) => ({
        flowName: item.name,
        successRate: item.success,
        fill:
          AI_PERFORMANCE_COLOR_PALETTE[
            index % AI_PERFORMANCE_COLOR_PALETTE.length
          ],
      }),
    );

    const taskVolumeData = AI_PERFORMANCE_DATA.taskVolume.map((item, index) => ({
      ...item,
      fill:
        AI_PERFORMANCE_COLOR_PALETTE[
          index % AI_PERFORMANCE_COLOR_PALETTE.length
        ] ?? AI_PERFORMANCE_COLORS.medium,
    }));

    return { successRateData, taskVolumeData };
  }, []);

  return (
    <main
      role="main"
      aria-label="AI Performance Dashboard"
      className="container mx-auto p-4 space-y-6"
    >
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <Button
          asChild
          variant="outline"
          size="sm"
          className="text-sm font-medium text-emerald-800 border-emerald-100 bg-emerald-50 hover:bg-emerald-100"
        >
          <Link to="/dashboard/dashboard1">
            <ArrowLeft className="h-4 w-4 text-emerald-700" />
            Back to RCM Dashboard
          </Link>
        </Button>
      </nav>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-2xl font-headline flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <BrainCircuit className="h-7 w-7 text-primary" aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent>AI performance metrics and analytics</TooltipContent>
            </Tooltip>
            AI Agent Performance Dashboard
          </CardTitle>
          <CardDescription>
            Monitoring the efficiency and accuracy of autonomous agents across key
            workflows.
          </CardDescription>
        </CardHeader>
      </Card>

      <section
        className="grid gap-4 md:grid-cols-2"
        role="region"
        aria-label="AI performance charts"
      >
        <AiFlowSuccessRateChart
          title="AI Flow Success Rate"
          description="Percentage of tasks completed successfully by each AI flow without errors."
          data={successRateData}
        />
        <AiTaskVolumeChart
          title="AI Task Volume"
          description="Total number of tasks processed by each AI flow."
          data={taskVolumeData}
        />
      </section>
    </main>
  );
}

