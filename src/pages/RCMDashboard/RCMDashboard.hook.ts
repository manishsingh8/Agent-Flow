import { useCallback, useMemo, useState } from "react";
import {
  operationalMetrics as initialOperationalMetrics,
  type OperationalMetrics,
  type KpiCardItem,
  buildKpiCards,
} from "@/constants/RCMDashboardData";

export default function useRCMDashboard() {
  const [operationalMetrics, setOperationalMetrics] =
    useState<OperationalMetrics>(initialOperationalMetrics);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [dateFilter, setDateFilter] = useState("today");
  const [customDate, setCustomDate] = useState(false);

  const kpiCards: KpiCardItem[] = useMemo(() => {
    return buildKpiCards(operationalMetrics);
  }, [operationalMetrics]);

  const refresh = useCallback(() => {
    setOperationalMetrics(initialOperationalMetrics);
  }, []);
  const handleDateOptionChange = useCallback((value: string) => {
    setDateFilter(value);

    const today = new Date();
    const format = (d: Date) => d.toISOString().split("T")[0];

    if (value === "today") {
      const t = format(today);
      setFrom(t);
      setTo(t);
    }
    if (value === "lastMonth") {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      setFrom(format(start));
      setTo(format(end));
    }
    if (value === "custom") {
      setCustomDate(true);
    }
  }, []);

  return {
    operationalMetrics,
    kpiCards,
    loading,
    error,
    refresh,
    setOperationalMetrics,
    from,
    setFrom,
    to,
    setTo,
    handleDateOptionChange,
    dateFilter,
    setDateFilter,
    customDate,
  };
}
