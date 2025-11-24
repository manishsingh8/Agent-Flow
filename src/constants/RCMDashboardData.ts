export interface TransactionPostingMetrics {
  autoPostRate: number; // percent
  autoPostedCount: number;
  totalTransactionsPosted: number;
}

export interface PerformanceMetrics {
  avgProcessingTimeMinutes: number;
  mtdComparison: {
    percentageChange: number; // positive => slower, negative => faster
  };
}

export interface PostingReportsMetrics {
  exceptionRate: number; // percent (0-100)
  totalExceptions: number;
}

export interface OperationalMetrics {
  transactionPosting: TransactionPostingMetrics;
  performance: PerformanceMetrics;
  postingReports: PostingReportsMetrics;
}

export interface KpiCardItem {
  title: string;
  value: string;
  description?: string;
  iconName?: string;
  trend?: "up" | "down" | "neutral";
}

export const operationalMetrics: OperationalMetrics = {
  transactionPosting: {
    autoPostRate: 78.0, // "78.0%"
    autoPostedCount: 2480, // "2,480 of 3,179 auto-posted"
    totalTransactionsPosted: 3179,
  },
  performance: {
    avgProcessingTimeMinutes: 16.0, // "16.0 min"
    mtdComparison: {
      // screenshot shows "2.7% slower than last month" => positive 2.7
      percentageChange: 2.7,
    },
  },
  postingReports: {
    // Quality Rate 95.7% => exceptionRate = 100 - 95.7 = 4.3
    exceptionRate: 4.3,
    totalExceptions: 117,
  },
};


export function buildKpiCards(data: OperationalMetrics): KpiCardItem[] {
  const { transactionPosting, performance, postingReports } = data;

  return [
    {
      title: "Auto-Post Rate",
      value: `${transactionPosting.autoPostRate.toFixed(1)}%`,
      description: `${transactionPosting.autoPostedCount.toLocaleString()} of ${transactionPosting.totalTransactionsPosted.toLocaleString()} auto-posted`,
      iconName: "TrendingUp",
      trend: transactionPosting.autoPostRate >= 90 ? "up" : "down",
    },
    {
      title: "Avg. Processing Time",
      value: `${performance.avgProcessingTimeMinutes.toFixed(1)} min`,
      description: `${Math.abs(performance.mtdComparison.percentageChange).toFixed(1)}% ${performance.mtdComparison.percentageChange < 0 ? "faster" : "slower"} than last month`,
      iconName: "Clock",
      trend: performance.mtdComparison.percentageChange < 0 ? "down" : "up",
    },
    {
      title: "Quality Rate",
      value: `${(100 - postingReports.exceptionRate).toFixed(1)}%`,
      description: `${postingReports.totalExceptions} exceptions in reports`,
      iconName: "ShieldCheck",
      trend: postingReports.exceptionRate < 5 ? "up" : "down",
    },
  ];
}
