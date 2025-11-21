import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { DataTable } from "@/components/DataTable/DataTable";
import { useCashPostingLogic } from "./CashPosting.hook";
import { BRANDS } from "@/constants/TableData";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";

const CashPostingPage = () => {
  const {
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
  } = useCashPostingLogic();

  const [open, setOpen] = useState(false);
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      {/* Header */}
      <div className="w-full border-[1px] border-[#E6ECF0] p-[16px] pt-[10px] rounded-[14px] h-[80px]">
        <div
          className="text-[20px] font-[600] text-[#0A0A0A]"
          onClick={() => setOpen(true)}
        >
          Cash Posting Report
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#249563]">Cash Posting Report</span>
        </div>
      </div>
      {/* Filter/Search */}
      <div className="border-[1px] border-[#E6ECF0] p-[4px] rounded-[14px]">
        <FilterSearchBar
          toggleOptions={[
            { value: "List", label: "List" },
            { value: "Queue", label: "Queue" },
          ]}
          selectedToggle={toggle}
          onToggleChange={setToggle}
          enableDateRange
          fromDate={from}
          onFromDateChange={setFrom}
          toDate={to}
          onToDateChange={setTo}
          showAdvancedSearch
          onAdvancedSearch={() => console.log("adv search")}
        />
      </div>
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
        />
      </div>

      {/* modal */}
      <Dialog open={open} />
    </div>
  );
};

export default CashPostingPage;
