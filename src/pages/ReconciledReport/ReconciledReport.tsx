import PaymentCard from "@/components/PaymentCard/PaymentCard";
// import { reconciledCardsData } from "@/constants/PaymentsCardData";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { useReconciledReportLogic } from "./ReconciledReport.hook";
import { DataTable } from "@/components/DataTable/DataTable";
import { EditModal } from "@/components/EditModal/EditModal";
import { EDITABLE_RECONCILED_FIELDS } from "@/constants/TableData";
import { BRANDS } from "@/constants/TableData";

const ReconciledReport = () => {
  const {
    toggle,
    from,
    to,
    payerOptions,
    selectedPayer,
    selectedStatus,
    setSelectedPayer,
    setSelectedStatus,
    setToggle,
    setFrom,
    setTo,
    columns,
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
    reconciledCardsData,
  } = useReconciledReportLogic();

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Reconciliation Summary Report
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">
            Reconciliation Summary Report
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {reconciledCardsData.map((card) => (
          <PaymentCard
            key={card.id}
            headerText={card.headerText}
            amount={card.amount}
            bgColor={card.bgColor}
          />
        ))}
      </div>
      <div className="border border-[#E6ECF0] p-1 rounded-[14px]">
        <FilterSearchBar
          toggleOptions={[
            { value: "dateRange", label: "Date Range" },
            { value: "dayWise", label: "Day Wise" },
          ]}
          selectedToggle={toggle}
          onToggleChange={setToggle}
          enableDateRange
          fromDate={from}
          toDate={to}
          onFromDateChange={setFrom}
          onToDateChange={setTo}
          enablePayer
          payerOptions={payerOptions}
          selectedPayer={selectedPayer}
          onPayerChange={setSelectedPayer}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showAdvancedSearch
          onAdvancedSearch={() => console.log("adv search")}
        />
      </div>
      <div className="border border-[#E6ECF0] p-4 rounded-[14px]">
        <DataTable
          data={paginatedData}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          searchEnabled
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filtersEnabled
          filterOptions={BRANDS}
          selectedFilters={selectedBrands}
          onFilterChange={handleBrandToggle}
          exportEnabled
          onExport={handleExport}
          idKey="id"
          pageInfo={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            rowsPerPage,
            onRowsPerPageChange: setRowsPerPage,
          }}
          editRow={{
            enabled: true,
            onEditClick: handleEditClick,
          }}
        />
      </div>
      <EditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        data={editedData}
        columns={columns}
        editableFields={EDITABLE_RECONCILED_FIELDS}
        onFieldChange={handleFieldChange}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
        idKey="id"
        title="Reconciliation Details - e875vned0"
      />
    </div>
  );
};

export default ReconciledReport;
