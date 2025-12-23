const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export const API_ENDPOINTS = {
  /* =========================
     AUTH
  ========================== */
  LOGIN: `${BASE_URL}/auth/login`,

  /* =========================
     MASTER DATA
  ========================== */
  PAYERS: `${BASE_URL}/master/getPayers`,
  TRANSACTION_STATUSES: `${BASE_URL}/master/getTransactionStatuses`,

  /* =========================
     RECONCILED REPORT
  ========================== */
  RECONCILED_WIDGET: `${BASE_URL}/reconciledReport/reconciledReportWidget`,
  RECONCILED_TABLE: `${BASE_URL}/reconciledReport/getReconciledReportData`,

  /* =========================
     VARIANCE QUEUE
  ========================== */
  VARIANCE_WIDGET: `${BASE_URL}/varianceQueue/varianceWidget`,
  VARIANCE_TABLE: `${BASE_URL}/varianceQueue/getVarianceQueueData`,

  /* =========================
     CASH POSTING
  ========================== */
  CASH_POSTING_QUEUE: `${BASE_URL}/cashPosting/getCashPostingQueue`,
  CASH_POSTING_REPORT: `${BASE_URL}/cashPosting/getCashPostingReport`,
};
