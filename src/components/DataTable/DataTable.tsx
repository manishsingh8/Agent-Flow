import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { X, Search, User, Zap, UserCircle, Edit } from "lucide-react";
import { useState } from "react";

export interface Column<T> {
  key: keyof T;
  label: React.ReactNode;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
  bodyClassName?: string;
  conditionalClassName?: (value: unknown, row: T) => string;
  isAmount?: boolean;
}

export interface AssignmentUser {
  id: string;
  name: string;
  avatar?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  selectedRows?: Set<string>;
  onRowSelect?: (id: string) => void;
  onSelectAll?: () => void;
  searchEnabled?: boolean;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  filtersEnabled?: boolean;
  filterOptions?: string[];
  selectedFilters?: string[];
  onFilterChange?: (value: string) => void;
  exportEnabled?: boolean;
  onExport?: () => void;
  idKey?: keyof T;
  pageInfo?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    rowsPerPage: number;
    onRowsPerPageChange: (value: number) => void;
    rowsPerPageOptions?: number[];
  };
  editRow?: {
    enabled?: boolean;
    onEditClick?: () => void;
  };
  assignmentFeature?: {
    enabled: boolean;
    onAssign?: (userId: string, selectedRowIds: string[]) => void;
    users?: AssignmentUser[];
    quickActions?: boolean;
    currentUserId?: string;
    onChangeStatus?: (selectedRowIds: string[]) => void;
    onWatchOptions?: (selectedRowIds: string[]) => void;
    onDelete?: (selectedRowIds: string[]) => void;
  };
}

// ------------------------------
// ⭐ NEW FORMATTER FUNCTION ⭐
// ------------------------------
const formatAmount = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "$0.00";

  const num = Number(value);

  if (isNaN(num)) return String(value);

  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function DataTable<T extends object = Record<string, unknown>>({
  data,
  columns,
  selectable = false,
  selectedRows = new Set(),
  onRowSelect,
  onSelectAll,
  searchEnabled = false,
  filtersEnabled = false,
  exportEnabled = false,
  onExport,
  idKey = "id" as keyof T,
  pageInfo,
  editRow,
  assignmentFeature,
  searchTerm = "",
  onSearchChange,
}: DataTableProps<T>) {
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPromptSearchInput, setShowPromptSearchInput] = useState(false);
  const hasSelectedRows = selectedRows.size > 0;
  const showEditButton = editRow?.enabled && selectable && hasSelectedRows;
  const showActionBar =
    assignmentFeature?.enabled && selectable && hasSelectedRows;

  const handleEditClick = () => {
    if (selectedRows.size > 0) {
      if (editRow?.onEditClick) {
        editRow.onEditClick();
      }
      if (assignmentFeature?.enabled) {
        setIsAssignmentModalOpen(true);
      }
    }
  };

  const handleAssignUser = (userId: string) => {
    if (assignmentFeature?.onAssign) {
      assignmentFeature.onAssign(userId, Array.from(selectedRows));
    }
    setIsAssignmentModalOpen(false);
    setSearchQuery("");
  };

  const handleChangeStatus = () => {
    if (assignmentFeature?.onChangeStatus) {
      assignmentFeature.onChangeStatus(Array.from(selectedRows));
    }
  };

  const filteredUsers =
    assignmentFeature?.users?.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 relative">
      {/* TOP BAR */}
      {(searchEnabled || exportEnabled || filtersEnabled) && (
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              onClick={() => setShowPromptSearchInput((prev) => !prev)}
            >
              Prompt Search
            </Button>
          </div>

          {searchEnabled && onSearchChange && showPromptSearchInput && (
            <div className="relative flex-1 max-w-sm shadow-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10 shadow-none"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-2">
            {showEditButton && !showActionBar && (
              <Button
                variant="outline"
                onClick={handleEditClick}
                data-testid="button-edit"
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}

            {exportEnabled && onExport && (
              <Button
                variant="default"
                className="bg-[#249563] hover:bg-green-700 cursor-pointer"
                onClick={onExport}
                data-testid="button-export"
              >
                Export
              </Button>
            )}
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-border hover:bg-gray-50">
              {selectable && (
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.size === data.length && data.length > 0
                    }
                    onChange={onSelectAll}
                    className="w-4 h-4 cursor-pointer accent-green-600"
                  />
                </TableHead>
              )}

              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={`font-semibold text-foreground text-xs ${
                    col.className || ""
                  }`}
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((row) => {
                const rowId = String(row[idKey]);
                return (
                  <TableRow
                    key={rowId}
                    className={`border-b border-border hover:bg-gray-50 ${
                      selectable && selectedRows.has(rowId) ? "bg-green-50" : ""
                    }`}
                  >
                    {selectable && onRowSelect && (
                      <TableCell className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(rowId)}
                          onChange={() => onRowSelect(rowId)}
                          className="w-4 h-4 cursor-pointer accent-green-600"
                        />
                      </TableCell>
                    )}

                    {/* UPDATED RENDER HERE */}
                    {columns.map((col) => {
                      const cellValue = row[col.key];

                      return (
                        <TableCell
                          key={String(col.key)}
                          className={`text-xs ${col.bodyClassName || ""} ${
                            col.conditionalClassName
                              ? col.conditionalClassName(cellValue, row)
                              : ""
                          }`}
                        >
                          {col.render
                            ? col.render(cellValue, row)
                            : col.isAmount
                            ? formatAmount(cellValue)
                            : String(cellValue ?? "")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={(selectable ? 1 : 0) + columns.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ----- Pagination, Action Bar & Assignment Modal Code Remains Same ----- */}
      {/* (Keeping untouched to avoid breaking existing behavior) */}
      {pageInfo && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {selectedRows.size} of {data.length} row(s) selected.
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Rows per page
              </span>
              <select
                value={pageInfo.rowsPerPage}
                onChange={(e) =>
                  pageInfo.onRowsPerPageChange(Number(e.target.value))
                }
                className="border border-border rounded px-2 py-1 text-xs bg-background cursor-pointer"
                data-testid="select-rows-per-page"
              >
                {(pageInfo.rowsPerPageOptions || [5, 10, 15]).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs text-muted-foreground">
              Page {pageInfo.currentPage} of {pageInfo.totalPages || 1}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => pageInfo.onPageChange(1)}
                disabled={pageInfo.currentPage === 1}
                data-testid="button-first-page"
              >
                {"<<"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pageInfo.onPageChange(Math.max(1, pageInfo.currentPage - 1))
                }
                disabled={pageInfo.currentPage === 1}
                data-testid="button-prev-page"
              >
                {"<"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  pageInfo.onPageChange(
                    Math.min(pageInfo.totalPages, pageInfo.currentPage + 1)
                  )
                }
                disabled={pageInfo.currentPage === pageInfo.totalPages}
                data-testid="button-next-page"
              >
                {">"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pageInfo.onPageChange(pageInfo.totalPages)}
                disabled={pageInfo.currentPage === pageInfo.totalPages}
                data-testid="button-last-page"
              >
                {">>"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showActionBar && (
        <div
          className="absolute bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-40 animate-in slide-in-from-bottom duration-200"
          data-testid="action-bar"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-3">
              <div
                className="text-sm font-medium"
                data-testid="text-selected-count"
              >
                {selectedRows.size} selected
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleEditClick}
                  className="gap-2"
                  data-testid="button-edit-fields"
                >
                  <Edit className="w-4 h-4" />
                  Edit fields
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleChangeStatus}
                  className="gap-2"
                  data-testid="button-change-status"
                >
                  <Zap className="w-4 h-4" />
                  Change status
                </Button>
                {/* <Button
                  variant="outline"
                  size="default"
                  onClick={handleWatchOptions}
                  className="gap-2"
                  data-testid="button-watch-options"
                >
                  <Eye className="w-4 h-4" />
                  Watch options
                </Button> */}
                {/* <Button
                  variant="outline"
                  size="default"
                  onClick={handleDelete}
                  className="gap-2 text-destructive border-destructive hover:bg-destructive/10"
                  data-testid="button-delete"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button> */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    // if (onSelectAll) onSelectAll();
                  }}
                  data-testid="button-close-action-bar"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAssignmentModalOpen && assignmentFeature?.enabled && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
            onClick={() => {
              setIsAssignmentModalOpen(false);
              setSearchQuery("");
            }}
            data-testid="overlay-assignment-modal"
          />
          <div
            className="fixed top-0 right-0 bottom-0 w-96 bg-background shadow-xl z-50 animate-in slide-in-from-right duration-250 flex flex-col"
            data-testid="modal-assignment"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2
                className="text-base font-semibold"
                data-testid="text-modal-title"
              >
                Assignee
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsAssignmentModalOpen(false);
                  setSearchQuery("");
                }}
                data-testid="button-close-modal"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-users"
                  />
                </div>
              </div>

              {assignmentFeature.quickActions !== false && (
                <div className="space-y-2 mb-6 pb-6 border-b border-border">
                  <button
                    onClick={() => handleAssignUser("unassigned")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-left"
                    data-testid="button-assign-unassigned"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm">Unassigned</span>
                  </button>
                  {/* <button
                    onClick={() => handleAssignUser("automatic")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-left"
                    data-testid="button-assign-automatic"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm">Automatic</span>
                  </button> */}
                  <button
                    onClick={() => {
                      if (assignmentFeature.currentUserId) {
                        handleAssignUser(assignmentFeature.currentUserId);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-left"
                    data-testid="button-assign-to-me"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <UserCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium">Assign to me</span>
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleAssignUser(user.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover-elevate active-elevate-2 text-left"
                      data-testid={`button-assign-user-${user.id}`}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No users found
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
