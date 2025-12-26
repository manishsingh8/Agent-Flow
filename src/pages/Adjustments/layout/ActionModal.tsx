import { useState } from "react";
import {
  MoreHorizontal,
  Bot,
  FileText,
  AlertTriangle,
  Eye,
} from "lucide-react";
type ActionModalType = "ican" | "note" | "exception" | "source" | null;

interface RowActionsProps {
  rowId: string;
  onOpenModal: (type: ActionModalType) => void;
}

export const RowActions = ({ onOpenModal }: RowActionsProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = (type: ActionModalType) => {
    setOpen(false); // ✅ close menu
    onOpenModal(type); // ✅ open modal
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-2 hover:bg-muted rounded-md"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute left-2 right-0 top-8 z-50 w-60 rounded-md border bg-white shadow-lg">
          <ul className="py-1 text-sm">
            <li
              onClick={() => handleClick("ican")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-muted cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              Ask iCAN Help
            </li>

            <li
              onClick={() => handleClick("note")}
              className="px-4 py-2 hover:bg-muted cursor-pointer"
            >
              Add Note
            </li>

            <li
              onClick={() => handleClick("exception")}
              className="px-4 py-2 hover:bg-muted cursor-pointer"
            >
              Create Exception
            </li>

            <li className="border-t my-1" />

            <li
              onClick={() => handleClick("source")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-muted cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              View Source Document
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
