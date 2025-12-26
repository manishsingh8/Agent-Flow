import { useState, useEffect } from "react";

export const useRCMFlowsLogic = () => {
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("activetab") || "rcm"
  );
  useEffect(() => {
    sessionStorage.setItem("activetab", activeTab);
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
  };
};
