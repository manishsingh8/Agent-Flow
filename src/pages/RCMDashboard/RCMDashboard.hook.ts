import { useCallback, useMemo, useState } from "react";
import {
  operationalMetrics as initialOperationalMetrics,
  type OperationalMetrics,
  type KpiCardItem,
  buildKpiCards,
  userProductivityData,
  type UserProductivity,
} from "@/constants/RCMDashboardData";

export default function useRCMDashboard() {
  const [operationalMetrics, setOperationalMetrics] = useState<OperationalMetrics>(
    initialOperationalMetrics
  );

  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [isAssignmentsModalOpen, setAssignmentsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProductivity | null>(
    null,
  );
  const [userAssignments, setUserAssignments] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isReassigning, setIsReassigning] = useState(false);

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
    productivityData: userProductivityData,
    isAssignmentsModalOpen,
    setAssignmentsModalOpen,
    selectedUser,
    setSelectedUser,
    userAssignments,
    setUserAssignments,
    allUsers,
    setAllUsers,
    isReassigning,
    setIsReassigning,
  };
}