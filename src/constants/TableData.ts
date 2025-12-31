// Define transaction type
export interface Transaction {
  id: string;
  transactionNo: string;
  transactionType: string;
  region: string;
  payer: string;
  account: string;
  depositDate: string;
  bankDeposit: number;
  remittance: number;
  emrAmount: number;
  glAmount: number;
  payVariance: number;
  statusName: string;
  nonReconciledDataId?: string;
  statusId?: string;
}
export interface ReconciledTransaction {
  id: string;
  transactionNo: string;
  transactionType: string;
  region: string;
  payerName?: string;
  account: string;
  depositDate: string;
  bankDeposit: number;
  remittance: number;
  emrAmount: number;
  glAmount: number;
  payer?: string;
  reconciledDataId?: string;
}

export const EDITABLE_FIELDS: (keyof Transaction)[] = [
  "payer",
  "account",
  "bankDeposit",
  "remittance",
  "emrAmount",
  "glAmount",
  "statusName",
];
export const EDITABLE_RECONCILED_FIELDS: (keyof ReconciledTransaction)[] = [
  "payer",
  "account",
  "bankDeposit",
  "remittance",
  "emrAmount",
  "glAmount",
];

export const BRANDS = [
  "CH",
  "ALT",
  "BRK MA",
  "BRK HA",
  "CITC CA",
  "CITC MA",
  "CITC RI",
  "CBT",
  "DRK",
  "FIT",
  "HM II",
];

export interface Cash_Posting_Transaction {
  id: string;
  cashPostingId: number;
  cheque: string;
  payerName: string;
  region: string;
  postingType: string;
  totalAmount: number;
  postedAmount: number;
  remittance: number;
  attemptedOn: string | null; // updated to string or null
  status: string;
  reason: string;
}
