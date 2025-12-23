import { useState, useMemo, type ReactNode, useEffect } from "react";
import { type Column } from "@/components/DataTable/DataTable";
import { type Transaction } from "@/constants/TableData";
import { mapPaymentCardsWithBg } from "@/utils/mapObjectToPaymentCard";
import { API_ENDPOINTS } from "@/config/api";

type VarianceWidgetResponse = {
  data?: {
    headerText: string;
    amount: string;
  }[];
  totalClaims?: number;
  totalAmount?: number;
  pendingCount?: number;
  exceptionCount?: number;
};

const headerTextMap = {
  "Bank Deposit": "Bank Deposit Amount",
  Remittance: "Remittance Amount",
  "Cash Posting": "Posted Amount",
  "Pay Variance": "Variance With Remit",
  "Post Variance": "Variance With Posting",
};

export const usePaymentLogic = () => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-10-30");
  const [selectedPayer, setSelectedPayer] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [payerOptions, setPayerOptions] = useState([
    { value: "all", label: "All Payers" },
  ]);
  const [statusOptions, setStatusOptions] = useState([
    { value: "all", label: "All Status" },
  ]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["CH"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Transaction>[]>([]);
  const [widgetData, setWidgetData] = useState<VarianceWidgetResponse | null>(
    null
  );
  const [widgetLoading, setWidgetLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<Transaction[]>([]);

  const fetchPayers = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.PAYERS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (!res.ok) throw new Error("Payer API failed");

      const response = await res.json();

      const mapped =
        response?.data?.map((payer: any) => ({
          value: payer.id, // ✅ store ID
          label: payer.name,
        })) ?? [];

      setPayerOptions([{ value: "all", label: "All Payers" }, ...mapped]);
    } catch (error) {
      console.error("Payer API error", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.TRANSACTION_STATUSES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (!res.ok) throw new Error("Status API failed");

      const response = await res.json();

      const mapped =
        response?.data?.map((status: any) => ({
          value: status.id, // ✅ already ID
          label: status.name,
        })) ?? [];

      setStatusOptions([{ value: "all", label: "All Status" }, ...mapped]);
    } catch (error) {
      console.error("Status API error", error);
    }
  };

  const getPayerIds = () => {
    if (selectedPayer === "all") {
      return payerOptions.filter((p) => p.value !== "all").map((p) => p.value);
    }
    return [selectedPayer];
  };

  const getStatusIds = () => {
    if (selectedStatus === "all") return null;
    return [selectedStatus];
  };

  const fetchVarianceWidget = async () => {
    const payload = {
      fromDate: from,
      toDate: to,
      payerIds: getPayerIds(), // ✅ dynamic
      statusIds: getStatusIds(), // ✅ dynamic
      pageNo: currentPage,
      pageSize: rowsPerPage,
    };

    try {
      setWidgetLoading(true);
      setTableLoading(true);

      const [widgetRes, tableRes] = await Promise.all([
        fetch(API_ENDPOINTS.VARIANCE_WIDGET, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(payload),
        }),
        fetch(API_ENDPOINTS.VARIANCE_TABLE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(payload),
        }),
      ]);

      if (!widgetRes.ok) throw new Error("Failed to fetch widget data");
      if (!tableRes.ok) throw new Error("Failed to fetch table data");

      const widgetData = await widgetRes.json();
      const tableData = await tableRes.json();

      setWidgetData(widgetData);
      setTableData(tableData?.data || []);
    } catch (error) {
      console.error("Variance API error:", error);
    } finally {
      setWidgetLoading(false);
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchPayers();
    fetchStatuses();
  }, []);
  useEffect(() => {
    fetchVarianceWidget();
  }, [from, to, selectedPayer, selectedStatus]);

  const paymentCardsData = useMemo(() => {
    if (!widgetData?.data) return [];
    return mapPaymentCardsWithBg(widgetData?.data, headerTextMap);
  }, [widgetData]);

  // ✅ USE API TABLE DATA INSTEAD OF DUMMY DATA
  const filteredData = useMemo(() => {
    return tableData.filter((t) => {
      const matchesBrand =
        !t.region || selectedBrands.includes(String(t.region));

      const matchesSearch =
        String(t.transactionNo || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(t.payer || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(t.account || "")
          .toLowerCase()
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
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedRows(newSelected);
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
      headers.map((key) => t[key as keyof Transaction])
    );

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEditClick = () => {
    if (selectedRows.size > 0) {
      // Get selected rows data and initialize edited data
      const selectedRowsData = paginatedData.filter((row) =>
        selectedRows.has(String(row.id))
      );
      setEditedData(
        selectedRowsData.map((row) => ({
          ...row,
        }))
      );
      setIsEditModalOpen(true);
    }
  };

  const handleFieldChange = (
    rowIndex: number,
    field: keyof Transaction,
    value: unknown
  ) => {
    const updated = [...editedData];
    updated[rowIndex] = {
      ...updated[rowIndex],
      [field]: value,
    };
    setEditedData(updated);
  };

  const handleEditSubmit = () => {
    console.log("Updated data:", editedData);
    setIsEditModalOpen(false);
    setEditedData([]);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditedData([]);
  };

  const columnRules: Record<
    string,
    {
      bodyClassName?: string;
      conditionalClassName?: (value: unknown, row: Transaction) => string;
    }
  > = {
    region: {
      conditionalClassName: () => {
        return "bg-white border-1 border-[#E5E5E5] px-2 py-1 rounded-[6px] inline-block mt-1";
      },
    },
    status: {
      conditionalClassName: (value) => {
        if (typeof value !== "string") return "";
        switch (value) {
          case "Pending Approval":
            return "text-[#FF9500] bg-yellow-100 px-2 py-1 rounded-[6px] inline-block mt-1";
          case "Done":
            return "text-[#34A255] bg-green-100 px-2 py-[2px] rounded-[6px] inline-block mt-1";
          case "Exception":
            return "text-[#E63435] bg-red-100 px-2 py-1 rounded-[6px] inline-block mt-1";
          default:
            return "";
        }
      },
    },
    amount: {
      conditionalClassName: (value) => {
        if (typeof value !== "number") return "";
        return value < 0 ? "text-red-600" : "text-green-600";
      },
    },
    Netsmart: {
      conditionalClassName: (value) => {
        if (typeof value !== "number") return "";
        return value <= 0 ? "text-[#EC7723]" : "text-[#0A0A0A]";
      },
    },
    remittance: {
      conditionalClassName: (value) => {
        if (typeof value !== "number") return "";
        return value <= 0 ? "text-[#EC7723]" : "text-[#0A0A0A]";
      },
    },
    transactionNo: {
      conditionalClassName: () => {
        return "text-[#0090FF]";
      },
    },
    variance: {
      conditionalClassName: () => {
        return "text-[#E63435]";
      },
    },
    email: {
      bodyClassName: "text-blue-600",
    },
  };

  // 👇 COLUMNS GENERATED FROM API DATA
  const columns: Column<Transaction>[] = tableData.length
    ? (Object.keys(tableData[0]) as Array<keyof Transaction>)
        .filter((key) => key !== "id")
        .map((key) => ({
          key,
          label: key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()),
          render: (val: unknown): ReactNode => {
            if (typeof val === "number") return `$${val.toFixed(2)}`;
            return String(val ?? "-");
          },
        }))
    : [];

  return {
    toggle,
    from,
    to,
    payerOptions,
    statusOptions,
    selectedPayer,
    selectedStatus,
    setSelectedPayer,
    setSelectedStatus,
    setToggle,
    setFrom,
    setTo,
    columns,
    columnRules,
    handleEditCancel,
    handleEditSubmit,
    handleFieldChange,
    handleEditClick,
    handleExport,
    handleBrandToggle,
    handleSelectAll,
    handleRowSelect,
    totalPages,
    isEditModalOpen,
    setSearchTerm,
    setRowsPerPage,
    paginatedData,
    selectedRows,
    searchTerm,
    selectedBrands,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setIsEditModalOpen,
    editedData,
    paymentCardsData,
    tableLoading,
    widgetLoading,
  };
};
