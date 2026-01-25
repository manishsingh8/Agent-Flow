import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DataModal = ({ open, setOpen, modalData, columns, loading }: any) => {
  const rawDetails = modalData?.details;

  // extract actual data safely
  const extractedData = Array.isArray(rawDetails?.data)
    ? rawDetails.data
    : Array.isArray(rawDetails)
      ? rawDetails
      : rawDetails
        ? [rawDetails]
        : [];

  // take first record if exists
  const data = extractedData[0] ?? null;

  const isEmptyData = extractedData.length === 0;

  const descriptionColumn = columns.find((c: any) => c.key === "description");
  const otherColumns = columns.filter((c: any) => c.key !== "description");

  console.log(modalData?.type, "modalData?.type");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            {modalData?.type
              ? `${modalData.type
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str: string) => str.toUpperCase())} Details`
              : "Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* 🔹 Loading */}
          {loading && (
            <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
              Loading details...
            </div>
          )}

          {/* 🔹 No record */}
          {!loading && isEmptyData && (
            <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
              No record found
            </div>
          )}

          {/* 🔹 Data */}
          {!loading && !isEmptyData && (
            <>
              {/* Main fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherColumns.map((column: any) => (
                  <div key={column.key} className="space-y-2">
                    <label className="text-xs font-medium text-foreground">
                      {column.label}
                    </label>

                    <div className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground">
                      {data[column.key] ?? "-"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Description – full width */}
              {descriptionColumn && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">
                    {descriptionColumn.label}
                  </label>

                  <div className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm text-foreground whitespace-pre-wrap">
                    {data.description || "-"}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataModal;
