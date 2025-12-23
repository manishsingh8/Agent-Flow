import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export interface Column<T> {
  key: keyof T;
  label: React.ReactNode;
}

interface EditModalProps<T extends object> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Partial<T>[];
  columns: Column<T>[];
  editableFields: (keyof T)[];
  onFieldChange: (rowIndex: number, field: keyof T, value: unknown) => void;
  onSubmit: () => void;
  onCancel: () => void;
  idKey: keyof T;
  title?: string;
}

export function EditModal<T extends object = Record<string, unknown>>({
  open,
  onOpenChange,
  data,
  columns,
  editableFields,
  onFieldChange,
  onSubmit,
  onCancel,
  idKey,
  title,
}: EditModalProps<T>) {
  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  const handleSubmit = () => {
    onSubmit();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-auto max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-md">
            {title || `Edit Row${data.length > 1 ? "s" : ""}`}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {data.map((row, rowIndex) => {
            const rowId = String(row[idKey]);
            const rowLabel =
              data.length > 1
                ? `Row ${rowIndex + 1} (ID: ${rowId})`
                : `Edit Row (ID: ${rowId})`;

            return (
              <div
                key={rowId}
                className={`mb-6 ${
                  rowIndex < data.length - 1
                    ? "border-b border-border pb-6"
                    : ""
                }`}
              >
                {data.length > 1 && (
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    {rowLabel}
                  </h3>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editableFields.length > 0 ? (
                    editableFields.map((field) => {
                      const column = columns.find((col) => col.key === field);
                      const label = column?.label || String(field);
                      const value = row[field];
                      const fieldType =
                        typeof value === "number" ? "number" : "text";

                      return (
                        <div key={String(field)} className="space-y-2">
                          <label className="text-xs font-medium text-foreground">
                            {label}
                          </label>
                          <Input
                            type={fieldType}
                            value={
                              fieldType === "number"
                                ? String(value ?? "")
                                : (value as string) ?? ""
                            }
                            onChange={(e) =>
                              onFieldChange(
                                rowIndex,
                                field,
                                fieldType === "number"
                                  ? parseFloat(e.target.value) || 0
                                  : e.target.value
                              )
                            }
                            className="w-full text-sm"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xs text-muted-foreground">
                      No editable fields configured
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-[#0A0A0A] mb-1 font-semibold">
            Comments
          </label>
          <textarea
            rows={2} // adjust height
            className="w-full border border-gray-300 rounded-md p-2 resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your comment here..."
          />
        </div>

        <div className="mb-2">
          <div className="text-sm text-[#0A0A0A] font-semibold">History</div>
          <div className="text-xs text-[#737373]">No Data Available</div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            className="bg-[#249563] hover:bg-green-700 min-w-[100px]"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
