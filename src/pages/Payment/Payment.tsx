// import RightArrow from "../../assets/icons/right-arrow.svg";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import { paymentCardsData } from "@/constants/PaymentsCardData";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { usePaymentLogic } from "./Payment.hook";
import { DataTable } from "@/components/DataTable/DataTable";
import { EditModal } from "@/components/EditModal/EditModal";
import { EDITABLE_FIELDS } from "@/constants/TableData";

// Dummy transactions for demonstration
import { BRANDS } from "@/constants/TableData";

const Payment = () => {
  const {
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
  } = usePaymentLogic();

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      {/* Header */}
      <div className="w-full border-[1px] border-[#E6ECF0] p-[16px] pt-[10px] rounded-[14px] h-[80px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          Variance Queue
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">Variance Queue</span>
          {/* <img src={RightArrow} alt="right-arrow" className="mt-[6px]" />
          <span className="text-sm text-[#249563]">List</span> */}
        </div>
      </div>

      {/* Payment Cards */}
      <div className="grid grid-cols-5 gap-4">
        {paymentCardsData.map((card) => (
          <PaymentCard
            key={card.id}
            headerText={card.headerText}
            amount={card.amount}
            bgColor={card.bgColor}
          />
        ))}
      </div>

      {/* Filter/Search */}
      <div className="border-[1px] border-[#E6ECF0] p-[4px] rounded-[14px]">
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
          enableStatus
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showAdvancedSearch
          onAdvancedSearch={() => console.log("adv search")}
        />
      </div>
      {/* DataTable */}
      <div className="border-[1px] border-[#E6ECF0] p-[16px] rounded-[14px]">
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

      {/* Edit Modal */}
      <EditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        data={editedData}
        columns={columns}
        editableFields={EDITABLE_FIELDS}
        onFieldChange={handleFieldChange}
        onSubmit={handleEditSubmit}
        onCancel={handleEditCancel}
        idKey="id"
        title="Reconciliation Details - e875vned0"
      />
    </div>
  );
};

export default Payment;
