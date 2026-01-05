export const RCM_CENTRAL_ENGINE_DATA = [
  {
    headerText: "RCM Engine uptime",
    percentage: 5,
    value: 126,
    status: "positive",
  },
  {
    headerText: "Jobs scheduled vs completed",
    percentage: 8,
    value: 118,
    status: "positive",
  },
  {
    headerText: "Active workflows running",
    percentage: -1,
    value: "12",
    status: "moderate",
  },
  {
    headerText: "Errors in last 24 hours",
    percentage: 3,
    value: "34",
    status: "positive",
  },
  {
    headerText: "Average processing time per workflow",
    percentage: 6,
    value: "52",
    status: "positive",
  },
];

export const INTAKE_ORCHESTRATOR_DATA = [
  {
    headerText: "Total Files Ingested",
    percentage: "12",
    value: "982",
    status: "positive",
  },
  {
    headerText: "BAI Files and Success rate",
    percentage: "9",
    value: "870",
    status: "positive",
  },
  {
    headerText: "EDI Files and Success Rate",
    percentage: "-4",
    value: "112",
    status: "moderate",
  },
  {
    headerText: "Correspondence Files and Success Rate",
    percentage: "-2",
    value: "25",
    status: "moderate",
  },
  {
    headerText: "Payment Posting files and Success Rate",
    percentage: "6",
    value: "14",
    status: "positive",
  },
  {
    headerText: "Average File Processing time",
    percentage: "-15",
    value: "16 Min",
    status: "negative",
  },
];

export const RECONCILIATION_DATA = [
  {
    headerText: "Total Transactions Processed",
    percentage: "5",
    value: "684",
    status: "positive",
  },
  {
    headerText: "Transactions Auto-Matched",
    percentage: "8",
    value: "512",
    status: "positive",
  },
  {
    headerText: "Matching Accuracy",
    percentage: "-1",
    value: "$14,50,236",
    status: "moderate",
  },
  {
    headerText: "Exceptions Detected",
    percentage: "3",
    value: "$2,819.11",
    status: "positive",
  },
  {
    headerText: "Validations Performed",
    percentage: "3",
    value: "$2,819.11",
    status: "positive",
  },
  {
    headerText: "Transactions Generated for Posting",
    percentage: "3",
    value: "$2,819.11",
    status: "positive",
  },
];

export const CASH_POSTING_DATA = [
  {
    headerText: "Auto Posting Rate",
    percentage: "5",
    value: "$8,20,345",
    status: "positive",
  },
  {
    headerText: "Total Payments Posted Today",
    percentage: "8",
    value: "311",
    status: "positive",
  },
  {
    headerText: "Total Payment Amount Posted",
    percentage: "-1",
    value: "$6,12,441.22",
    status: "moderate",
  },
  {
    headerText: "Payments Pending Posting",
    percentage: "3",
    value: "221",
    status: "positive",
  },
  {
    headerText: "Payments Partially Posted",
    percentage: "-6",
    value: "8",
    status: "positive",
  },
  {
    headerText: "Average Posting Time per Payment",
    percentage: "-6",
    value: "8",
    status: "positive",
  },
];

export const TABS = [
  { value: "rcm", label: "RCM Central Engine" },
  { value: "intake", label: "Intake Workflow Agent" },
  { value: "reconciliation", label: "Reconciliation Agent" },
  { value: "cashPosting", label: "Payment Posting Agent" },
];

export const DROPDOWN_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "1week", label: "1 Week" },
  { value: "lastMonth", label: "Last Month" },
];
