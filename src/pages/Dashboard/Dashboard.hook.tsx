import { useState, useEffect } from "react";

export const useDashboardLogic = () => {
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("activetab") || "rcm"
  );
  useEffect(() => {
    sessionStorage.setItem("activetab", activeTab);
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab
  };
};
