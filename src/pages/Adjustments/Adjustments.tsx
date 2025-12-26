import React from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { useAdjustmentsLogic } from "./Adjustments.hook";
import { ICANModal } from "./layout/ICANModal";
import { AddNoteModal } from "./layout/AddNoteModal";
import { CreateExceptionModal } from "./layout/CreateExceptionModal";
import { SourceDocumentModal } from "./layout/SourceDocumentModal";

const Adjustments = () => {
  const {
    ledgerColumns,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
    activeModal,
    setActiveModal,
  } = useAdjustmentsLogic();
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Suspense Account
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">Suspense Account</span>
        </div>
      </div>
      <DataTable
        data={paginatedData}
        columns={ledgerColumns}
        idKey="id"
        pageInfo={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          rowsPerPage,
          onRowsPerPageChange: setRowsPerPage,
        }}
      />
      <div>
        {activeModal === "ican" && (
          <ICANModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "note" && (
          <AddNoteModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "exception" && (
          <CreateExceptionModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "source" && (
          <SourceDocumentModal onClose={() => setActiveModal(null)} />
        )}
      </div>
    </div>
  );
};

export default Adjustments;
