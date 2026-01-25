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
  data: Partial<T>[];
  columns: Column<T>[];
  editableFields: (keyof T)[];
  onFieldChange: (rowIndex: number, field: keyof T, value: unknown) => void;
  onSubmit: () => void;
  onCancel: () => void;
  idKey: keyof T;
  title?: string;
}

type WithMeta = {
  history?: unknown;
  comments?: string | null;
};

export function EditModal<
  T extends WithMeta = Record<string, unknown> & WithMeta,
>({
  open,
  data,
  columns,
  editableFields,
  onFieldChange,
  onSubmit,
  onCancel,
  idKey,
  title,
}: EditModalProps<T>) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent
        className="
          w-full
          max-w-[95vw]
          sm:max-w-[90vw]
          md:max-w-[80vw]
          lg:max-w-[70vw]
          xl:max-w-[60vw]
          2xl:max-w-[50vw]
          max-h-[90vh]
          flex
          flex-col
        "
      >
        <DialogHeader>
          <DialogTitle className="text-md">
            {title || `Edit Row${data.length > 1 ? "s" : ""}`}
          </DialogTitle>
        </DialogHeader>

        {/* 🔽 Scrollable Area */}
        <div className="flex-1 overflow-y-auto pr-1">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {columns.map((column) => {
                    const field = column.key;
                    const label = column.label;
                    const value = row[field];
                    const isEditable = editableFields.includes(field);
                    const isCommentField = field === "comments";
                    const fieldType =
                      typeof value === "number" ? "number" : "text";

                    return (
                      <div
                        key={String(field)}
                        className={`space-y-2 ${
                          isCommentField ? "md:col-span-3" : ""
                        }`}
                      >
                        <label className="text-xs font-medium text-foreground">
                          {label}
                        </label>

                        {isCommentField ? (
                          <>
                            <textarea
                              rows={2}
                              value={(value as string) ?? ""}
                              disabled={!isEditable}
                              placeholder={
                                value ? "" : "Write your comment here..."
                              }
                              onChange={(e) =>
                                onFieldChange(rowIndex, field, e.target.value)
                              }
                              className="w-full border border-gray-300 rounded-md p-3
                                resize-y text-sm focus:outline-none
                                focus:ring-2 focus:ring-green-500"
                            />
                            <div className="mt-3">
                              <div className="text-xs font-semibold text-[#0A0A0A]">
                                History
                              </div>

                              {row.history ? (
                                <div className="rounded-md border border-border mt-1 p-2 text-xs text-[#737373]  overflow-y-auto">
                                  {typeof row.history === "string" && (
                                    <div>{row.history}</div>
                                  )}
                                  {Array.isArray(row.history) &&
                                    row.history.map((item: any, i: number) => (
                                      <div key={i} className="mb-1">
                                        {JSON.stringify(item)}
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <div className="text-xs text-[#737373]">
                                  No History Available
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <Input
                            type={fieldType}
                            value={
                              fieldType === "number"
                                ? String(value ?? "")
                                : ((value as string) ?? "")
                            }
                            disabled={!isEditable}
                            onChange={(e) =>
                              onFieldChange(
                                rowIndex,
                                field,
                                fieldType === "number"
                                  ? parseFloat(e.target.value) || 0
                                  : e.target.value,
                              )
                            }
                            className="w-full text-sm"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onSubmit}
            className="bg-[#249563] hover:bg-green-700 min-w-[100px]"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
