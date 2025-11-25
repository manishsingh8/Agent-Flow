
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Users } from "lucide-react";
import type { UserProductivity, AggregatedWorklistItem, WorklistType } from "@/constants/RCMDashboardData";
import { format, parseISO } from "date-fns";
import React from "react";

interface UserAssignmentsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: UserProductivity | null;
  assignments: AggregatedWorklistItem[];
  allUsers: UserProductivity[];
  onReassign: (
    task: AggregatedWorklistItem,
    fromUser: UserProductivity,
    toUser: UserProductivity
  ) => void;
  isReassigning?: boolean;
}

function TypePill({ type }: { type: WorklistType }) {
  const base = "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md";
  switch (type) {
    case "Denial":
      return <span className={`${base} bg-red-50 text-red-700 border border-red-100`}>{type}</span>;
    case "Prior Auth":
      return <span className={`${base} bg-gray-100 text-gray-800`}>{type}</span>;
    case "Unreconciled":
      return <span className={`${base} bg-orange-50 text-orange-700 border border-orange-100`}>{type}</span>;
    case "Credit Balance":
      return <span className={`${base} bg-blue-50 text-blue-700`}>{type}</span>;
    default:
      return <span className={`${base} bg-muted text-muted-foreground`}>{type}</span>;
  }
}

export default function UserAssignmentsDialog({
  isOpen,
  onOpenChange,
  user,
  assignments,
  allUsers,
  onReassign,
}: UserAssignmentsDialogProps) {
  const [removedTaskIds, setRemovedTaskIds] = useState<Set<string>>(
    () => new Set()
  );


  const currentAssignments = useMemo(() => {
    return assignments.filter((task) => !removedTaskIds.has(task.id));
  }, [assignments, removedTaskIds]);

  React.useEffect(() => {
    if (!isOpen && removedTaskIds.size > 0) {
      setRemovedTaskIds(new Set());
    }
  }, [isOpen, removedTaskIds.size]);

  if (!user) {
    return null;
  }

  const handleReassignClick = (task: AggregatedWorklistItem, toUser: UserProductivity) => {
    setRemovedTaskIds((prev) => new Set(prev).add(task.id));
    onReassign(task, user, toUser);
  };

  const potentialAssignees = allUsers.filter(
    (u) => u.id !== user.id && u.role === "Operational"
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <p className="text-base font-semibold">Current Assignments for {user.userName}</p>
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm text-muted-foreground">
              A view of all tasks currently claimed by this user.
            </p>
          </DialogDescription>
        </DialogHeader>

        {/* Content: use a scrollable container when overflow */}
        <div
          className="mt-4 border rounded-md"
          style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentAssignments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    This user has no assigned tasks.
                  </TableCell>
                </TableRow>
              ) : (
                currentAssignments.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <TypePill type={task.type} />
                    </TableCell>
                    <TableCell className="text-xs font-medium">{task.patientName}</TableCell>
                    <TableCell
                      className="text-xs max-w-[220px] truncate"
                      title={task.description}
                    >
                      {task.description}
                    </TableCell>
                    <TableCell className="text-xs">
                      {/* parseISO + format; guard if invalid */}
                      {(() => {
                        try {
                          return format(parseISO(task.dueDate), "MM/dd/yyyy");
                        } catch {
                          return task.dueDate;
                        }
                      })()}
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center gap-2">
                              <Users className="mr-1 h-4 w-4" />
                              <span>Re-assign</span>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuSubContent>
                              {potentialAssignees.length > 0 ? (
                                potentialAssignees.map((assignee) => (
                                  <DropdownMenuItem
                                    key={assignee.id}
                                    onSelect={() => handleReassignClick(task, assignee)}
                                  >
                                    {assignee.userName}
                                  </DropdownMenuItem>
                                ))
                              ) : (
                                <DropdownMenuItem disabled>No other users available</DropdownMenuItem>
                              )}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer with close */}
        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
