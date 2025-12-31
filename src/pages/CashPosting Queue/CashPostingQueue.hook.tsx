import { useState, useMemo, type ReactNode, useEffect } from "react";
import { type Cash_Posting_Transaction } from "@/constants/TableData";
import { API_ENDPOINTS } from "@/config/api";

const CASH_POSTING_COLUMN_LABELS: Partial<
  Record<keyof Cash_Posting_Transaction, string>
> = {
  cheque: "Check Number",
  payerName: "Payer Name",
  region: "Region",
  postingType: "Posting Method",
  totalAmount: "Total Payment Amount",
  postedAmount: "Amount Successfully Posted",
  remittance: "Remittance Amount Received",
  attemptedOn: "Last Attempt Date",
  status: "Status",
  reason: "Posting Exception Reason",
};

export const useCashPostingQueueLogic = () => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-10-30");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["CH"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState<Cash_Posting_Transaction[]>([]);
  const [tableLoading, setTableLoading] = useState(false);

  const fetchTable = async () => {
    try {
      setTableLoading(true);
      const payload = {
        fromDate: from,
        toDate: to,
        pageNo: 1,
        pageSize: rowsPerPage,
      };
      const response = await fetch(API_ENDPOINTS.CASH_POSTING_QUEUE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to fetch table data");
      const tableRes = await response.json();
      setTableData(tableRes?.data ?? []);
      console.log(tableRes, "tres");
    } catch (error) {
      console.error("Table API error:", error);
      setTableData([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTable();
  }, [from, to, rowsPerPage]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return tableData;
    return tableData.filter((t) =>
      t.payerName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tableData, selectedBrands, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleSelectAll = () => {
    if (
      selectedRows.size === paginatedData.length &&
      paginatedData.length > 0
    ) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((t) => t.id)));
    }
  };

  const handleBrandToggle = (region: string) => {
    setSelectedBrands((prev) =>
      prev.includes(region)
        ? prev.filter((b) => b !== region)
        : [...prev, region]
    );
    setCurrentPage(1);
  };

  const handleExport = () => {
    if (!tableData.length) return;

    const headers = Object.keys(tableData[0]);
    const rows = filteredData.map((t) =>
      headers.map((key) => t[key as keyof Cash_Posting_Transaction])
    );
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tableData.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const columnRules: Record<
    string,
    {
      bodyClassName?: string;
      conditionalClassName?: (
        value: unknown,
        row: Cash_Posting_Transaction
      ) => string;
    }
  > = {
    region: {
      conditionalClassName: () =>
        "bg-white border border-[#E5E5E5] px-2 py-1 rounded-[6px] inline-block mt-1",
    },
    status: {
      conditionalClassName: (value) => {
        if (typeof value !== "string") return "";
        switch (value) {
          case "Partially Posted":
            return "text-[#FF9500] bg-yellow-100 px-2 py-1 rounded-[6px]";
          case "Fully Posted":
            return "text-[#34A255] bg-green-100 px-2 py-1 rounded-[6px]";
          case "Exception":
            return "text-[#E63435] bg-red-100 px-2 py-1 rounded-[6px]";
          default:
            return "";
        }
      },
    },
    cheque: { conditionalClassName: () => "text-[#0090FF]" },
    variance: { conditionalClassName: () => "text-[#E63435]" },
    reason: {
      conditionalClassName: () =>
        "text-[#E63435] px-2 py-1 rounded-[6px] mx-auto",
    },
    email: { bodyClassName: "text-blue-600" },
  };

  const columns = useMemo(() => {
    if (!tableData.length) return [];

    const amountFields = ["totalAmount", "postedAmount", "remittance"];

    return (Object.keys(tableData[0]) as Array<keyof Cash_Posting_Transaction>)
      .filter((key) => key !== "cashPostingId")
      .map((key) => {
        const rule = columnRules[String(key)] || {};
        const isAmount = amountFields.includes(String(key));

        return {
          key,
          label:
            CASH_POSTING_COLUMN_LABELS[key] ??
            String(key)
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),

          isAmount,
          render: isAmount
            ? undefined
            : (val: unknown): ReactNode => {
                if (val === null || val === undefined || val === "") {
                  return "-";
                }
                return String(val);
              },

          bodyClassName: rule.bodyClassName ?? "",
          conditionalClassName: rule.conditionalClassName,
        };
      });
  }, [tableData, columnRules]);

  return {
    toggle,
    setToggle,
    from,
    setFrom,
    to,
    setTo,
    paginatedData,
    columns,
    selectedRows,
    handleRowSelect,
    handleSelectAll,
    searchTerm,
    setSearchTerm,
    selectedBrands,
    handleBrandToggle,
    handleExport,
    currentPage,
    totalPages,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    tableLoading,
    tableData,
  };
};
