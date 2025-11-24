import { useCallback, useEffect, useMemo, useState } from "react";

export interface TransactionPostingMetrics {
  autoPostRate: number; 
  autoPostedCount: number;
  totalTransactionsPosted: number;
}

export interface PerformanceMetrics {
  avgProcessingTimeMinutes: number;
  mtdComparison: {
    percentageChange: number; 
  };
}

export interface PostingReportsMetrics {
  exceptionRate: number;
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

export default function useRCMDashboard() {
  const [operationalMetrics, setOperationalMetrics] = useState<OperationalMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate network latency
      await new Promise((res) => setTimeout(res, 250));

      const data: OperationalMetrics = {
        transactionPosting: {
          autoPostRate: 78.0, // "78.0%"
          autoPostedCount: 2480, // "2,480 of 3,179 auto-posted"
          totalTransactionsPosted: 3179,
        },
        performance: {
          avgProcessingTimeMinutes: 16.0, // "16.0 min"
          mtdComparison: {
            percentageChange: 2.7,
          },
        },
        postingReports: {
          exceptionRate: 4.3,
          totalExceptions: 117,
        },
      };

      setOperationalMetrics(data);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const kpiCards: KpiCardItem[] = useMemo(() => {
    if (!operationalMetrics) return [];

    const { transactionPosting, performance, postingReports } = operationalMetrics;

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
  }, [operationalMetrics]);

  // Expose a refresh method for manual reloads
  const refresh = useCallback(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return {
    operationalMetrics,
    kpiCards,
    loading,
    error,
    refresh,
  };
}
