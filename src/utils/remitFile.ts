import { showToast } from "@/lib/toast";

export const openRemitPdfByTransactionNo = async (
  transactionNo: string | undefined | null,
) => {
  if (!transactionNo) {
    showToast({
      message: "No file exists",
      severity: "warning",
    });
    return;
  }

  try {
    const url = `https://api.revpulseapp.com/claim-service/api/varianceQueue/downloadRemitFile?transactionNo=${transactionNo}`;
    const res = await fetch(url, { method: "GET" });

    if (!res.ok) {
      showToast({
        message: "No file exists",
        severity: "warning",
      });
      return;
    }

    const blob = await res.blob();

    if (!blob || blob.size === 0) {
      showToast({
        message: "No file exists",
        severity: "warning",
      });
      return;
    }

    const objectUrl = URL.createObjectURL(blob);
    window.open(objectUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  } catch (error) {
    console.error(error);
    showToast({
      message: "Unable to download file",
      severity: "error",
    });
  }
};
