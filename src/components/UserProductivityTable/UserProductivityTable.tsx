// src/components/ProductivityTable.tsx
import {
  useCallback,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Link } from "lucide-react";
import { DataTable } from "@/components/DataTable/DataTable";
import type { Column } from "@/components/DataTable/DataTable";
import { type UserProductivity } from "@/constants/RCMDashboardData";
import UserAssignmentsDialog from "../UserAssignment/UserAssignment";
import { useNavigate } from "react-router-dom";

interface UserProductivityTableProps {
  data: UserProductivity[];
  isAssignmentsModalOpen: boolean;
  onAssignmentsModalChange: Dispatch<SetStateAction<boolean>>;
  selectedUser: UserProductivity | null;
  onSelectUser: Dispatch<SetStateAction<UserProductivity | null>>;
  userAssignments: any[];
  onUserAssignmentsChange: Dispatch<SetStateAction<any[]>>;
  allUsers: any[];
  onAllUsersChange: Dispatch<SetStateAction<any[]>>;
  isReassigning: boolean;
  onReassigningChange: Dispatch<SetStateAction<boolean>>;
}

export default function ProductivityTable({
  data,
  isAssignmentsModalOpen,
  onAssignmentsModalChange,
  selectedUser,
  onSelectUser,
  userAssignments,
  onUserAssignmentsChange,
  allUsers,
  onAllUsersChange,
  isReassigning,
  onReassigningChange,
}: UserProductivityTableProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const rowsPerPageOptions = [5, 10, 15];

  // derived
  const totalPages = Math.max(
    1,
    Math.ceil(data.length / rowsPerPage)
  );

  const handleUserClick = useCallback(
    (user: UserProductivity) => {
      onSelectUser(user);
      onUserAssignmentsChange([]);
      onAllUsersChange([]);
      onAssignmentsModalChange(true);
    },
    [
      onSelectUser,
      onUserAssignmentsChange,
      onAllUsersChange,
      onAssignmentsModalChange,
    ]
  );

  const handleModalOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        onSelectUser(null);
        onUserAssignmentsChange([]);
      }
      onAssignmentsModalChange(open);
    },
    [onAssignmentsModalChange, onSelectUser, onUserAssignmentsChange]
  );

  const handleReassignTask = useCallback(
    async (task: any) => {
      try {
        onReassigningChange(true);
        onUserAssignmentsChange((prev: any[]) =>
          prev.filter((t) => t.id !== task.id)
        );
      } catch (err) {
        console.error("Reassign failed", err);
      } finally {
        onReassigningChange(false);
      }
    },
    [onReassigningChange, onUserAssignmentsChange]
  );

  const handleViewAIPerformance = useCallback(
    (userId: string) => {
      navigate(`/ai-performance/${userId}`);
      console.log("View AI performance for", userId);
    },
    [navigate]
  );

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = data.slice(start, end);

  const columns: Column<UserProductivity>[] = useMemo(
    () => [
      {
        key: "userName",
        label: "User",
        render: (_value, row) => {
          // avatar + name (no external avatar present, using fallback initials)
          const initials = row.userName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return (
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                {/* If you have avatars in data, use AvatarImage */}
                <AvatarImage src={undefined} alt={row.userName} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-sm font-medium">{row.userName}</div>
                <div className="text-xs text-muted-foreground">
                  {row.role} • {row.team}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: "tasksCompleted",
        label: "Tasks Completed",
        render: (value) => (
          <div className="text-sm font-medium">{String(value)}</div>
        ),
      },
      {
        key: "avgTimeToResolution",
        label: "Avg. Time to Resolution (hrs)",
        render: (value) => Number(value).toFixed(1),
      },
      {
        key: "userId",
        label: "Actions",
        className: "text-center",
        render: (_value, row) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUserClick(row)}
              aria-label={`View assignments for ${row.userName}`}
              className="cursor-pointer"
            >
              View Assignments
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewAIPerformance(row.userId)}
              aria-label={`View AI Performance for ${row.userName}`}
              className="cursor-pointer"
            >
              <Link className="h-4 w-4 mr-1" aria-hidden="true" />
              AI Performance
            </Button>
          </div>
        ),
      },
    ],
    [handleUserClick, handleViewAIPerformance]
  );

  return (
    <div>
      <DataTable<UserProductivity>
        data={paginatedData}
        columns={columns}
        searchEnabled={true}
        // exportEnabled={true}
        // onExport={() => {
        //   // simple CSV export (demo)
        //   const csv = [
        //     ["userId", "userName", "tasksCompleted", "avgTimeToResolution", "team", "role"],
        //     ...userProductivityData.map((r) => [
        //       r.userId,
        //       r.userName,
        //       String(r.tasksCompleted),
        //       String(r.avgTimeToResolution),
        //       r.team,
        //       r.role,
        //     ]),
        //   ]
        //     .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
        //     .join("\n");
        //   const blob = new Blob([csv], { type: "text/csv" });
        //   const url = URL.createObjectURL(blob);
        //   const a = document.createElement("a");
        //   a.href = url;
        //   a.download = "user_productivity.csv";
        //   a.click();
        //   URL.revokeObjectURL(url);
        // }}
        idKey="userId"
        pageInfo={{
          currentPage,
          totalPages,
          onPageChange: (page: number) => {
            const next = Math.max(1, Math.min(totalPages, page));
            setCurrentPage(next);
          },
          rowsPerPage,
          onRowsPerPageChange: (value: number) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          },
          rowsPerPageOptions,
        }}
        assignmentFeature={{
          enabled: true,
          onAssign: (userId, selectedRowIds) => {
            console.log("Assign", userId, selectedRowIds);
            // setAssignmentOpen(false);
          },
          users: [
            { id: "user-5", name: "Pamela Cruz" },
            { id: "user-6", name: "Pamela Turner" },
            // add more assignment users if needed
          ],
          quickActions: true,
          currentUserId: "user-11",
          onChangeStatus: (selectedRowIds) => {
            console.log("Change status for", selectedRowIds);
          },
          onWatchOptions: (selectedRowIds) => {
            console.log("Watch options for", selectedRowIds);
          },
          onDelete: (selectedRowIds) => {
            console.log("Delete", selectedRowIds);
          },
        }}
      />
      <UserAssignmentsDialog
        isOpen={isAssignmentsModalOpen}
        onOpenChange={handleModalOpenChange}
        user={selectedUser}
        assignments={userAssignments}
        allUsers={allUsers}
        onReassign={handleReassignTask}
        isReassigning={isReassigning}
      />
    </div>
  );
}
