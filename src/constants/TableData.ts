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
  EMR: number;
  GL: number;
  variance: number;
  status: string;
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
  EMR: number;
  GL: number;
  payer?: string;
}

export const EDITABLE_FIELDS: (keyof Transaction)[] = [
  "payer",
  "account",
  "bankDeposit",
  "remittance",
  "EMR",
  "GL",
  "status",
];
export const EDITABLE_RECONCILED_FIELDS: (keyof ReconciledTransaction)[] = [
  "payer",
  "account",
  "bankDeposit",
  "remittance",
  "EMR",
  "GL",
];

export const DUMMY_TABLE_DATA: Transaction[] = [
  {
    id: "1",
    transactionNo: "e875vne00",
    transactionType: "ACH Credits",
    region: "CH",
    payer: "AGC CORP",
    account: "0045",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    variance: -4816.74,
    status: "Exception",
  },
  {
    id: "2",
    transactionNo: "gmmflfy63462",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "BOMBAY DUCK D...",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    variance: -4816.74,
    status: "Pending Approval",
  },
  {
    id: "3",
    transactionNo: "rjvu213788rjjm",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "BOMBAY DUCK D...",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    variance: -4816.74,
    status: "Exception",
  },
  {
    id: "4",
    transactionNo: "12er88ut03fngk",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "BOMBAY DUCK D...",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    variance: -4816.74,
    status: "Done",
  },
  {
    id: "5",
    transactionNo: "e875vne00",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "BOMBAY DUCK D...",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 0,
    remittance: 0,
    EMR: 0,
    GL: 0,
    variance: -4816.74,
    status: "Pending Approval",
  },
  {
    id: "6",
    transactionNo: "gmmflfy63462",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "ACME INC",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    variance: -4816.74,
    status: "Pending Approval",
  },
  {
    id: "7",
    transactionNo: "alt123456",
    transactionType: "ACH Credits",
    region: "ALT",
    payer: "TECH CORP",
    account: "0123",
    depositDate: "09/11/2025",
    bankDeposit: 5000.0,
    remittance: 5000.0,
    EMR: 0,
    GL: 0,
    variance: 0,
    status: "Done",
  },
  {
    id: "8",
    transactionNo: "brk789012",
    transactionType: "Wire Transfer",
    region: "BRK MA",
    payer: "GLOBAL FINANCE",
    account: "0456",
    depositDate: "09/11/2025",
    bankDeposit: 7500.5,
    remittance: 7500.5,
    EMR: 100,
    GL: 50,
    variance: 0,
    status: "Done",
  },
];
export const DUMMY_RECONCILED_TABLE_DATA: ReconciledTransaction[] = [
  {
    id: "1",
    transactionNo: "e875vne00",
    transactionType: "ACH Credits",
    region: "CH",
    payer: "AGC CORP",
    account: "0045",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    // variance: -4816.74,
    // status: "Exception",
  },
  {
    id: "2",
    transactionNo: "gmmflfy63462",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "BOMBAY DUCK D...",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    // variance: -4816.74,
    // status: "Pending Approval",
  },
  {
    id: "3",
    transactionNo: "rjvu213788rjjm",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "BOMBAY DUCK D...",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    // variance: -4816.74,
    // status: "Exception",
  },
  {
    id: "4",
    transactionNo: "12er88ut03fngk",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "BOMBAY DUCK D...",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    // variance: -4816.74,
    // status: "Done",
  },
  {
    id: "5",
    transactionNo: "e875vne00",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "BOMBAY DUCK D...",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 0,
    remittance: 0,
    EMR: 0,
    GL: 0,
    // variance: -4816.74,
    // status: "Pending Approval",
  },
  {
    id: "6",
    transactionNo: "gmmflfy63462",
    transactionType: "ACH Credit Trans...",
    region: "CH",
    payer: "ACME INC",
    account: "2426",
    depositDate: "09/10/2025",
    bankDeposit: 4816.74,
    remittance: 4816.74,
    EMR: 0,
    GL: 0,
    // variance: -4816.74,
    // status: "Pending Approval",
  },
  {
    id: "7",
    transactionNo: "alt123456",
    transactionType: "ACH Credits",
    region: "ALT",
    payer: "TECH CORP",
    account: "0123",
    depositDate: "09/11/2025",
    bankDeposit: 5000.0,
    remittance: 5000.0,
    EMR: 0,
    GL: 0,
    // variance: 0,
    // status: "Done",
  },
  {
    id: "8",
    transactionNo: "brk789012",
    transactionType: "Wire Transfer",
    region: "BRK MA",
    payer: "GLOBAL FINANCE",
    account: "0456",
    depositDate: "09/11/2025",
    bankDeposit: 7500.5,
    remittance: 7500.5,
    EMR: 100,
    GL: 50,
    // variance: 0,
    // status: "Done",
  },
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
