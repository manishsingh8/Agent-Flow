// Define transaction type
export interface Transaction {
  id: string;
  transactionNo: string;
  transactionType: string;
  brand: string;
  payer: string;
  accountNo: string;
  depositDate: string;
  bankDeposit: number;
  remittance: number;
  EMR: number;
  GL: number;
  variance: number;
  status: string;
}

export const EDITABLE_FIELDS: (keyof Transaction)[] = [
  "payer",
  "accountNo",
  "bankDeposit",
  "remittance",
  "EMR",
  "GL",
  "status",
];

export const DUMMY_TABLE_DATA: Transaction[] = [
  {
    id: "1",
    transactionNo: "e875vne00",
    transactionType: "ACH Credits",
    brand: "CH",
    payer: "AGC CORP",
    accountNo: "0045",
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
    brand: "CH",
    payer: "BOMBAY DUCK D...",
    accountNo: "2426",
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
    brand: "CH",
    payer: "BOMBAY DUCK D...",
    accountNo: "2426",
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
    brand: "CH",
    payer: "BOMBAY DUCK D...",
    accountNo: "2426",
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
    brand: "CH",
    payer: "BOMBAY DUCK D...",
    accountNo: "2426",
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
    brand: "CH",
    payer: "ACME INC",
    accountNo: "2426",
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
    brand: "ALT",
    payer: "TECH CORP",
    accountNo: "0123",
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
    brand: "BRK MA",
    payer: "GLOBAL FINANCE",
    accountNo: "0456",
    depositDate: "09/11/2025",
    bankDeposit: 7500.5,
    remittance: 7500.5,
    EMR: 100,
    GL: 50,
    variance: 0,
    status: "Done",
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
  cheque: string;
  payer: string;
  brand: string;
  postingtype: string;
  totalamount: number;
  postedamount: number;
  remittance: number;
  // chequereceivedon: number;
  attemptedon: number;
  status: string;
  reason: string;
}

export const CASH_POSTING_TABLE_DATA: Cash_Posting_Transaction[] = [
  {
    id: "TXN001",
    cheque: "CHQ-875432",
    payer: "John Doe",
    brand: "CH",
    postingtype: "Manual",
    totalamount: 55000,
    postedamount: 35000,
    remittance: 20000,
    // chequereceivedon: 1731475200, // Unix timestamp
    attemptedon: 1731734400, // Unix timestamp
    status: "Partially Posted",
    reason: "Exception",
  },
  {
    id: "TXN002",
    cheque: "CHQ-129834",
    payer: "Airtel Payments",
    brand: "CH",
    postingtype: "Auto",
    totalamount: 78000,
    postedamount: 78000,
    remittance: 0,
    // chequereceivedon: 1731129600,
    attemptedon: 1731216000,
    status: "Fully Posted",
    reason: "Exception",
  },
  {
    id: "TXN003",
    cheque: "CHQ-998712",
    payer: "Reliance Retail",
    brand: "CH",
    postingtype: "Manual",
    totalamount: 64000,
    postedamount: 0,
    remittance: 64000,
    // chequereceivedon: 1730956800,
    attemptedon: 0, // not posted yet
    status: "Partially Posted",
    reason: "Exception",
  },
  {
    id: "TXN004",
    cheque: "CHQ-567890",
    payer: "Tata Consultancy",
    brand: "CH",
    postingtype: "Auto",
    totalamount: 92000,
    postedamount: 92000,
    remittance: 0,
    // chequereceivedon: 1730438400,
    attemptedon: 1730524800,
    status: "Fully Posted",
    reason: "Exception",
  },
  {
    id: "TXN005",
    cheque: "CHQ-443210",
    payer: "Flipkart India",
    brand: "CH",
    postingtype: "Manual",
    totalamount: 28000,
    postedamount: 10000,
    remittance: 18000,
    // chequereceivedon: 1731648000,
    attemptedon: 0,
    status: "Partially Posted",
    reason: "Exception",
  },
];
