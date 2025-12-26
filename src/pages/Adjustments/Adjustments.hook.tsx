import { RowActions } from "./layout/ActionModal";
import { useState, useMemo } from "react";
import { DUMMY_LEDGER_DATA } from "@/constants/AdjustmentsData";

type ActionModalType = "ican" | "note" | "exception" | "source" | null;

export const useAdjustmentsLogic = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeModal, setActiveModal] = useState<ActionModalType>(null);

  const ledgerColumns = [
    {
      key: "id",
      label: "Actions",
      render: (_: any, row: any) => (
        <RowActions rowId={row.id} onOpenModal={setActiveModal} />
      ),
    },
    {
      key: "effectiveDate",
      label: "Effective Date",
    },
    {
      key: "type",
      label: "Type",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "source",
      label: "Source / Provider",
    },
    {
      key: "amount",
      label: "Amount",
      isAmount: true,
    },
    {
      key: "openBalance",
      label: "Open Balance",
      isAmount: true,
    },
    {
      key: "status",
      label: "Status",
      conditionalClassName: (value: any) =>
        value === "Open"
          ? "text-orange-600 font-medium"
          : value === "Closed"
          ? "text-green-600 font-medium"
          : "text-blue-600 font-medium",
    },
  ];
  const totalPages = Math.ceil(DUMMY_LEDGER_DATA.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return DUMMY_LEDGER_DATA.slice(start, end);
  }, [currentPage, rowsPerPage]);
  return {
    ledgerColumns,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
    activeModal,
    setActiveModal,
  };
};
