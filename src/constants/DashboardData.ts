import MapImage from "@/assets/icons/trading-positive.svg";
import MapMediumImg from "@/assets/icons/trading-med.svg";
import MapNegative from "@/assets/icons/trading-negative.svg";
export const RCM_CENTRAL_ENGINE_DATA = [
  {
    headerText: "RCM Engine uptime",
    percentage: 5,
    value: 126,
    status: "positive",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "Jobs scheduled vs completed",
    percentage: 8,
    status: "positive",
    value: 118,
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "Active workflows running",
    status: "",
    percentage: -1,
    value: "12",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
  },
  {
    headerText: "Errors in last 24 hours",
    percentage: 3,
    value: "34",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Average processing time per workflow",
    percentage: 6,
    value: "52",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    status: "positive",
    image: MapImage,
  },
  // {
  //   headerText: "837 File Count",
  //   percentage: -7,
  //   value: "9",
  //   colorClass: {
  //     text: "text-rose-500",
  //     border: "border-rose-500",
  //     chart: "stroke-rose-500",
  //   },
  //   status: "negative",
  //   image: MapNegative,
  // },
];

export const INTAKE_ORCHESTRATOR_DATA = [
  {
    headerText: "Total Files Ingested",
    percentage: "12",
    value: "982",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "BAI Files and Success rate",
    percentage: "9",
    value: "870",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "EDI Files and Success Rate",
    percentage: "-4",
    value: "112",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
    status: "",
  },
  {
    headerText: "Correspondence Files and Success Rate",
    percentage: "-2",
    value: "25",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
    status: "",
  },
  // may needed later on
  {
    headerText: "Payment Posting files and Success Rate",
    percentage: "6",
    value: "14",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Average File Processing time",
    percentage: "-15",
    value: "16 Min",
    colorClass: {
      text: "text-rose-500",
      border: "border-rose-500",
      chart: "stroke-rose-500",
    },
    image: MapNegative,
    status: "negative",
  },
];

export const RECONCILIATION_DATA = [
  {
    headerText: "Total Transactions Processed",
    percentage: "5",
    value: "684",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Transactions Auto-Matched",
    percentage: "8",
    value: "512",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Matching Accuracy",
    percentage: "-1",
    value: "$14,50,236",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
    status: "",
  },
  {
    headerText: "Exceptions Detected",
    percentage: "3",
    value: "$2,819.11",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Validations Performed",
    percentage: "3",
    value: "$2,819.11",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Transactions Generated for Posting",
    percentage: "3",
    value: "$2,819.11",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
];

export const CASH_POSTING_DATA = [
  {
    headerText: "Auto Posting Rate",
    percentage: "5",
    value: "$8,20,345",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Total Payments Posted Today",
    percentage: "8",
    value: "311",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Total Payment Amount Posted",
    percentage: "-1",
    value: "$6,12,441.22",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
    status: "",
  },
  {
    headerText: "Payments Pending Posting",
    percentage: "3",
    value: "221",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Payments Partially Posted",
    percentage: "-6",
    value: "8",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Average Posting Time per Payment",
    percentage: "-6",
    value: "8",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
];

export const TABS = [
  { value: "rcm", label: "RCM Central Engine" },
  { value: "intake", label: "Intake Workflow Agent" },
  { value: "reconciliation", label: "Reconciliation Agent" },
  { value: "cashPosting", label: "Payment Posting Agent" },
];
