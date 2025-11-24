import { useCallback, useEffect, useMemo, useState } from "react";
import {
  operationalMetrics as initialOperationalMetrics,
  type OperationalMetrics,
  type KpiCardItem,
  buildKpiCards,
} from "@/constants/RCMDashboardData";


export default function useRCMDashboard() {
  const [operationalMetrics, setOperationalMetrics] = useState<OperationalMetrics>(
    initialOperationalMetrics
  );

  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  const kpiCards: KpiCardItem[] = useMemo(() => {
    return buildKpiCards(operationalMetrics);
  }, [operationalMetrics]);

 
  const refresh = useCallback(() => {
    setOperationalMetrics(initialOperationalMetrics);
  }, []);

  return {
    operationalMetrics,
    kpiCards,
    loading,
    error,
    refresh,
    setOperationalMetrics,
  };
}

