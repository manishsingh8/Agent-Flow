import MapImage from "@/assets/icons/trading-positive.svg";
import MapMediumImg from "@/assets/icons/trading-med.svg";
import MapNegative from "@/assets/icons/trading-negative.svg";
export const RCM_CENTRAL_ENGINE_DATA = [
  {
    headerText: "Total Files Ingested",
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
    headerText: "Docs Analyzed",
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
    headerText: "Bank File Count",
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
    headerText: "835 File Count",
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
    headerText: "EOB File Count",
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
  {
    headerText: "837 File Count",
    percentage: -7,
    value: "9",
    colorClass: {
      text: "text-rose-500",
      border: "border-rose-500",
      chart: "stroke-rose-500",
    },
    status: "negative",
    image: MapNegative,
  },
];

export const INTAKE_ORCHESTRATOR_DATA = [
  {
    headerText: "BAI Files",
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
    headerText: "Remits",
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
    headerText: "Correspondence Documents",
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
    headerText: "Cash Posting Documents",
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
  // {
  //   headerText: "Reprocessed Claims",
  //   percentage: "6",
  //   value: "14",
  //   colorClass: {
  //     text: "text-teal-600",
  //     border: "border-teal-600",
  //     chart: "stroke-teal-600",
  //   },
  //   image: MapImage,
  //   status: "positive",
  // },
  // {
  //   headerText: "Claims Approved",
  //   percentage: "-15",
  //   value: "820",
  //   colorClass: {
  //     text: "text-rose-500",
  //     border: "border-rose-500",
  //     chart: "stroke-rose-500",
  //   },
  //   image: MapNegative,
  //   status: "negative",
  // },
];

export const RECONCILIATION_DATA = [
  {
    headerText: "Total Transactions",
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
    headerText: "Reconciled Transaction Count",
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
    headerText: "Matched Amount",
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
    headerText: "Unmatched Amount",
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
    headerText: "Partial Match",
    percentage: "-6",
    value: "9012.1",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
    status: "positive",
  },
  {
    headerText: "Variance ABS",
    percentage: "-7",
    value: "1211.1",
    colorClass: {
      text: "text-rose-500",
      border: "border-rose-500",
      chart: "stroke-rose-500",
    },
    image: MapNegative,
    status: "negative",
  },
];

export const CASH_POSTING_DATA = [
  {
    headerText: "Post Ready Amount",
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
    headerText: "Post Ready Count",
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
    headerText: "Posted Amount",
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
    headerText: "Posted Count ",
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
    headerText: "Failures",
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
  { value: "cashPosting", label: "Cash Posting Agent" },
];
