import { useState, useCallback, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/api";

export const useHCDLogic = () => {
  const [from, setFrom] = useState("2025-10-01");
  const [to, setTo] = useState("2025-12-01");
  const [dateFilter, setDateFilter] = useState("custom");
  const [dateFilterText, setDateFilterText] = useState(
    "Showing records for today.",
  );
  const [customDate, setCustomDate] = useState(false);
  const handleDateOptionChange = useCallback((value: string) => {
    setDateFilter(value);
    setCustomDate(false);
    console.log(value, "val");

    const today = new Date();
    const format = (d: Date) => d.toISOString().split("T")[0];

    if (value === "today") {
      console.log("called");
      const t = format(today);
      setFrom(t);
      setTo(t);
      setDateFilterText("Showing records for today.");
    }

    if (value === "lastMonth") {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      setFrom(format(start));
      setTo(format(end));
      setDateFilterText("Showing records from last month.");
    }

    if (value === "custom") {
      setCustomDate(true);
      setDateFilterText("Showing records for the selected date range.");
    }
  }, []);
  useEffect(() => {
    if (dateFilter === "custom" && from && to) {
      setDateFilterText(`Showing records from ${from} to ${to}.`);
    }
  }, [dateFilter, from, to]);

  const buildDateQuery = () =>
    new URLSearchParams({
      startDate: from,
      endDate: to,
    }).toString();

  const fetchHCDWidgets = async () => {
    if (!from || !to) return;

    const query = buildDateQuery();

    try {
      const [docRes, volumeRes] = await Promise.all([
        fetch(`${API_ENDPOINTS.HCD_DOCUMENT_PROCESSING}?${query}`, {
          method: "GET",
        }),
        fetch(`${API_ENDPOINTS.HCD_DAILY_PROCESSING_VOLUME}?${query}`, {
          method: "GET",
        }),
      ]);

      const docData = await docRes.json();
      const volumeData = await volumeRes.json();

      console.log("Document Processing:", docData);
      console.log("Daily Processing Volume:", volumeData);
    } catch (error) {
      console.error("HCD API error:", error);
    }
  };

  const fetchHCDPostWidgets = async () => {
    if (!from || !to) return;
    const query = buildDateQuery();

    try {
      
      const [statusOverview, documentIntelligence] = await Promise.allSettled([
        // fetch(API_ENDPOINTS.HCD_DOCUMENT_STATUS_OVERVIEW, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json;charset=UTF-8",
        //   },
        //   body: JSON.stringify(payload),
        // }),
        // fetch(API_ENDPOINTS.HCD_DOCUMENT_INTELLIGENCE, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json;charset=UTF-8",
        //   },
        //   body: JSON.stringify(payload),
        // }),
        fetch(`${API_ENDPOINTS.HCD_DOCUMENT_STATUS_OVERVIEW}?${query}`, {
          method: "POST",
        }),
        fetch(`${API_ENDPOINTS.HCD_DOCUMENT_INTELLIGENCE}?${query}`, {
          method: "POST",
        }),
      ]);
      console.log(statusOverview, documentIntelligence);
    } catch (error) {
      console.error("POST dashboard API error:", error);
    }
  };

  useEffect(() => {
    fetchHCDWidgets();
    fetchHCDPostWidgets();
  }, [from, to]);

  return {
    from,
    setFrom,
    to,
    setTo,
    dateFilterText,
    setDateFilterText,
    dateFilter,
    setDateFilter,
    handleDateOptionChange,
    customDate,
  };
};
