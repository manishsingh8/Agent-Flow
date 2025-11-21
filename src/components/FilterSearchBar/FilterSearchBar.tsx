import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface ToggleOption {
  label: string;
  value: string;
}

interface FilterSearchBarProps {
  toggleOptions: ToggleOption[];
  selectedToggle: string;
  onToggleChange: (value: string) => void;

  enableDateRange?: boolean;
  fromDate?: string;
  toDate?: string;
  onFromDateChange?: (value: string) => void;
  onToDateChange?: (value: string) => void;

  enablePayer?: boolean;
  payerOptions?: Option[];
  selectedPayer?: string;
  onPayerChange?: (value: string) => void;

  enableStatus?: boolean;
  statusOptions?: Option[];
  selectedStatus?: string;
  onStatusChange?: (value: string) => void;

  showAdvancedSearch?: boolean;
  onAdvancedSearch?: () => void;
}

export function FilterSearchBar({
  // toggleOptions,
  // selectedToggle,
  // onToggleChange,

  enableDateRange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,

  enablePayer,
  payerOptions = [],
  selectedPayer,
  onPayerChange,

  enableStatus,
  statusOptions = [],
  selectedStatus,
  onStatusChange,

  showAdvancedSearch,
  onAdvancedSearch,
}: FilterSearchBarProps) {
  const [payerOpen, setPayerOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  return (
    <div className="flex items-center justify-end gap-4 px-3 py-3 bg-white rounded-md">
      {/* ------- Toggle Buttons -------- */}
      {/* <div className="flex border rounded-[4px] overflow-hidden">
        {toggleOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onToggleChange(opt.value)}
            className={`flex-1 px-3 py-1 text-xs border-r last:border-r-0 transition ${
              selectedToggle === opt.value
                ? "bg-gray-200 text-gray-900"
                : "bg-white text-gray-700"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div> */}

      <div className="flex items-center gap-4">
        {/* ------- Date Range -------- */}
        {enableDateRange && (
          <div className="flex items-center gap-2">
            <div className="text-xs font-medium">From</div>
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => onFromDateChange?.(e.target.value)}
              className="h-7 text-xs"
            />

            <div className="text-xs font-medium">To</div>
            <Input
              type="date"
              value={toDate}
              onChange={(e) => onToDateChange?.(e.target.value)}
              className="h-7 text-xs"
            />
          </div>
        )}

        {/* ------- Payer Filter -------- */}
        {enablePayer && (
          <div className="flex items-center gap-1">
            <div className="text-xs font-medium">Select Payer</div>

            <DropdownMenu onOpenChange={setPayerOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs w-40 flex justify-between shadow-none focus-visible:ring-0"
                >
                  <span>{selectedPayer}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      payerOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40 shadow-none">
                {payerOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => onPayerChange?.(opt.label)}
                    className="!bg-transparent !shadow-none hover:!bg-gray-100 !focus:bg-transparent"
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* ------- Status Filter -------- */}
        {enableStatus && (
          <div className="flex items-center gap-1">
            <div className="text-xs font-medium">Select Status</div>

            <DropdownMenu onOpenChange={setStatusOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs w-40 flex justify-between shadow-none focus-visible:ring-0"
                >
                  <span>{selectedStatus}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      statusOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40 shadow-none">
                {statusOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => onStatusChange?.(opt.label)}
                    className="!bg-transparent !shadow-none hover:!bg-gray-100 !focus:bg-transparent"
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* ------- Advanced Search -------- */}
        {showAdvancedSearch && (
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={onAdvancedSearch}
          >
            Prompt Search
          </Button>
        )}
      </div>
    </div>
  );
}
