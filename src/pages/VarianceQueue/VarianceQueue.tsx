import PaymentCard from "@/components/PaymentCard/PaymentCard";
// import { paymentCardsData } from "@/constants/PaymentsCardData";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { usePaymentLogic } from "./VarianceQueue.hook";
import { DataTable } from "@/components/DataTable/DataTable";
import { EditModal } from "@/components/EditModal/EditModal";
import { EDITABLE_FIELDS } from "@/constants/TableData";
import Logo from "@/assets/icons/rp-logo-icon.svg";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design homepage mockup",
    status: "In Progress",
    priority: "High",
    assignee: "John Doe",
  },
  {
    id: "2",
    title: "Implement authentication",
    status: "To Do",
    priority: "High",
    assignee: "Jane Smith",
  },
  {
    id: "3",
    title: "Write API documentation",
    status: "In Progress",
    priority: "Medium",
    assignee: "Bob Johnson",
  },
  {
    id: "4",
    title: "Fix mobile responsiveness",
    status: "Done",
    priority: "Low",
    assignee: "Alice Brown",
  },
  {
    id: "5",
    title: "Add dark mode support",
    status: "To Do",
    priority: "Medium",
    assignee: "Charlie Wilson",
  },
];

const mockUsers = [
  { id: "user-1", name: "John Doe", avatar: undefined },
  { id: "user-2", name: "Jane Smith", avatar: undefined },
  { id: "user-3", name: "Bob Johnson", avatar: undefined },
  { id: "user-4", name: "Alice Brown", avatar: undefined },
  { id: "user-5", name: "Charlie Wilson", avatar: undefined },
];

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
    handleExport,
    handleSelectAll,
    handleRowSelect,
    isEditModalOpen,
    setRowsPerPage,
    paginatedData,
    selectedRows,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setIsEditModalOpen,
    editedData,
    paymentCardsData,
    tableLoading,
    widgetLoading,
    searchTerm,
    setSearchTerm,
  } = usePaymentLogic();

  const handleAssign = (userId: string, selectedRowIds: string[]) => {
    console.log(`Assigned user ${userId} to tasks:`, selectedRowIds);
  };
  const handleChangeStatus = (selectedRowIds: string[]) => {
    console.log("Change status for tasks:", selectedRowIds);
  };
  const handleWatchOptions = (selectedRowIds: string[]) => {
    console.log("Watch options for tasks:", selectedRowIds);
  };
  const handleDelete = (selectedRowIds: string[]) => {
    console.log("Delete tasks:", selectedRowIds);
  };
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          Non-Reconciled Queue
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">Non-Reconciled Queue</span>
        </div>
      </div>
      {widgetLoading ? (
        <div className="flex align-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
          <span className="flex items-center gap-2 text-gray-500">
            Loading...
            <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {paymentCardsData.map((card) => (
            <PaymentCard
              key={card.id}
              headerText={card.headerText}
              amount={card.amount}
              bgColor={card.bgColor}
            />
          ))}
        </div>
      )}
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
          enableStatus
          statusOptions={statusOptions}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showAdvancedSearch
          onAdvancedSearch={() => console.log("adv search")}
        />
      </div>
      {tableLoading ? (
        <div className="flex align-center justify-center w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
          <span className="flex items-center gap-2 text-gray-500">
            Loading...
            <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
          </span>
        </div>
      ) : (
        <div className="border border-[#E6ECF0] p-4 rounded-[14px] w-[1230px]">
          <DataTable
            data={paginatedData}
            columns={columns}
            selectable={true}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            exportEnabled={true}
            searchEnabled
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onExport={handleExport}
            idKey="nonReconciledDataId"
            pageInfo={{
              currentPage,
              totalPages: Math.ceil(mockTasks.length / rowsPerPage),
              onPageChange: setCurrentPage,
              rowsPerPage,
              onRowsPerPageChange: setRowsPerPage,
            }}
            assignmentFeature={{
              enabled: true,
              onAssign: handleAssign,
              users: mockUsers,
              quickActions: true,
              currentUserId: "user-1",
              onChangeStatus: handleChangeStatus,
              onWatchOptions: handleWatchOptions,
              onDelete: handleDelete,
            }}
          />
        </div>
      )}
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
