export interface AiPerformanceKpi {
  id: string;
  title: string;
  value: string;
  description: string;
  iconName: string;
  trend: string;
}

export interface AiTaskVolumeItem {
  flowName: string;
  tasksProcessed: number;
  fill: string;
}

export interface AiSuccessRateItem {
  name: string;
  success: number;
  error: number;
}

export interface AiPerformanceData {
  kpis: AiPerformanceKpi[];
  taskVolume: AiTaskVolumeItem[];
  successRate: AiSuccessRateItem[];
}

export const AI_PERFORMANCE_COLORS = {
  high: "#166F4C",
  medium: "#249563",
  low: "#6CCBA2",
} as const;

export const AI_PERFORMANCE_COLOR_PALETTE = [
  AI_PERFORMANCE_COLORS.high,
  AI_PERFORMANCE_COLORS.medium,
  AI_PERFORMANCE_COLORS.low,
] as const;

export const AI_PERFORMANCE_DATA: AiPerformanceData = {
  kpis: [
    {
      id: "denial-success",
      title: "Denial Analysis Success Rate",
      value: "95.5%",
      description: "Claims processed without errors",
      iconName: "CheckCircle2",
      trend: "+2.3%",
    },
    {
      id: "secondary-billing",
      title: "Secondary Billing Accuracy",
      value: "97.8%",
      description: "Correctly generated secondary claims",
      iconName: "FileCheck",
      trend: "+1.8%",
    },
    {
      id: "coding-accuracy",
      title: "Coding Accuracy",
      value: "94.2%",
      description: "Correct CPT/ICD code assignments",
      iconName: "Code",
      trend: "+3.1%",
    },
    {
      id: "processing-time",
      title: "Avg Processing Time",
      value: "1.2s",
      description: "Time per claim processed",
      iconName: "Clock",
      trend: "-15%",
    },
  ],
  taskVolume: [
    {
      flowName: "Denial Analysis",
      tasksProcessed: 450,
      fill: AI_PERFORMANCE_COLORS.high,
    },
    {
      flowName: "Secondary Billing",
      tasksProcessed: 1200,
      fill: AI_PERFORMANCE_COLORS.medium,
    },
    {
      flowName: "Coding Assistance",
      tasksProcessed: 890,
      fill: AI_PERFORMANCE_COLORS.low,
    },
    {
      flowName: "Prior Auth",
      tasksProcessed: 670,
      fill: AI_PERFORMANCE_COLORS.high,
    },
    {
      flowName: "Data Extraction",
      tasksProcessed: 3100,
      fill: AI_PERFORMANCE_COLORS.medium,
    },
  ],
  successRate: [
    {
      name: "Denial Analysis",
      success: 95.5,
      error: 4.5,
    },
    {
      name: "Secondary Billing",
      success: 97.8,
      error: 2.2,
    },
    {
      name: "Coding Assistance",
      success: 94.2,
      error: 5.8,
    },
    {
      name: "Prior Auth",
      success: 92.1,
      error: 7.9,
    },
    {
      name: "Data Extraction",
      success: 96.4,
      error: 3.6,
    },
  ],
};

