import { useState, useMemo, type ReactNode } from "react";
import { type Column } from "@/components/DataTable/DataTable";
import {
  DUMMY_RECONCILED_TABLE_DATA as transactions,
  type ReconciledTransaction,
} from "@/constants/TableData";

const payerOptions = [
  { value: "all", label: "All Payers" },
  { value: "payer1", label: "Payer 1" },
  { value: "payer2", label: "Payer 2" },
];
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const useReconciledReportLogic = () => {
  const [toggle, setToggle] = useState("dateRange");
  const [from, setFrom] = useState("2025-06-01");
  const [to, setTo] = useState("2025-06-01");
  const [selectedPayer, setSelectedPayer] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["CH"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState<
    Partial<ReconciledTransaction>[]
  >([]);

  const filteredData = useMemo(() => {
    return transactions.filter((t) => {
      const matchesBrand = selectedBrands.includes(t.region);
      const matchesSearch =
        t.transactionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.account.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [selectedBrands, searchTerm]);

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
    const headers = Object.keys(transactions[0]);
    const rows = filteredData.map((t) =>
      headers.map((key) => t[key as keyof typeof t])
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
    field: keyof ReconciledTransaction,
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
      conditionalClassName?: (
        value: unknown,
        row: ReconciledTransaction
      ) => string;
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
  const columns: Column<ReconciledTransaction>[] = (
    Object.keys(transactions[0]) as Array<keyof ReconciledTransaction>
  )
    .filter((key) => key !== "id")
    .map((key) => {
      const rule = columnRules[String(key)] || {};

      return {
        key,
        label: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
        render: (val: unknown): ReactNode => {
          if (typeof val === "number") return `$${val.toFixed(2)}`;
          return String(val);
        },
        bodyClassName: rule.bodyClassName || "",
        conditionalClassName: rule.conditionalClassName || undefined,
      };
    });

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
  };
};
