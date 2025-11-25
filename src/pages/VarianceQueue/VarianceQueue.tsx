// import RightArrow from "../../assets/icons/right-arrow.svg";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import { paymentCardsData } from "@/constants/PaymentsCardData";
import { FilterSearchBar } from "@/components/FilterSearchBar/FilterSearchBar";
import { usePaymentLogic } from "./VarianceQueue.hook";
import { DataTable } from "@/components/DataTable/DataTable";
import { EditModal } from "@/components/EditModal/EditModal";
import { EDITABLE_FIELDS } from "@/constants/TableData";
// import { BRANDS } from "@/constants/TableData";

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

// const columns: Column<Task>[] = [
//   { key: "title", label: "Task" },
//   {
//     key: "status",
//     label: "Status",
//     bodyClassName: "font-medium",
//     conditionalClassName: (value) => {
//       if (value === "Done") return "text-green-600";
//       if (value === "In Progress") return "text-blue-600";
//       return "text-muted-foreground";
//     },
//   },
//   { key: "priority", label: "Priority" },
//   { key: "assignee", label: "Assignee" },
// ];

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
    // handleEditClick,
    handleExport,
    // handleBrandToggle,
    handleSelectAll,
    handleRowSelect,
    // totalPages,
    isEditModalOpen,
    // setSearchTerm,
    setRowsPerPage,
    paginatedData,
    selectedRows,
    // searchTerm,
    // selectedBrands,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setIsEditModalOpen,
    editedData,
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
          selectable={true}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          exportEnabled={true}
          onExport={handleExport}
          idKey="id"
          pageInfo={{
            currentPage,
            totalPages: Math.ceil(mockTasks.length / rowsPerPage),
            onPageChange: setCurrentPage,
            rowsPerPage,
            onRowsPerPageChange: setRowsPerPage,
            rowsPerPageOptions: [5, 10, 15],
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
