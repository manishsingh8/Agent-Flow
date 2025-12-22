import { useState, useMemo, type ReactNode, useEffect } from "react";
import { type Cash_Posting_Transaction } from "@/constants/TableData";

const TABLE_URL =
  "http://13.205.33.24:8101/claimService/api/cashPosting/getCashPostingQueue";

export const useCashPostingQueueLogic = () => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-10-30");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["CH"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState<Cash_Posting_Transaction[]>([]);
  const [tableLoading, setTableLoading] = useState(false);

  const fetchTable = async () => {
    try {
      setTableLoading(true);
      const payload = {
        fromDate: from,
        toDate: to,
        pageNo: 1,
        pageSize: 10,
      };
      const response = await fetch(TABLE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to fetch table data");
      const tableRes = await response.json();
      setTableData(tableRes?.data ?? []);
    } catch (error) {
      console.error("Table API error:", error);
      setTableData([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTable();
  }, [from, to]);

  const filteredData = useMemo(() => {
    return tableData.filter((t) => {
      const matchesBrand = !t.region || selectedBrands.includes(t.region);

      const matchesSearch = t.payerName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesBrand && matchesSearch;
    });
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
      .filter((key) => key !== "id")
      .map((key) => {
        const rule = columnRules[String(key)] || {};
        return {
          key,
          label: String(key)
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()),
          isAmount: amountFields.includes(String(key)),
          render: amountFields.includes(String(key))
            ? undefined
            : (val: unknown): ReactNode => String(val ?? ""),
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
  };
};
