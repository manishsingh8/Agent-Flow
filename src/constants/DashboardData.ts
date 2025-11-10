import MapImage from "@/assets/icons/map-positive.svg";
import MapMediumImg from "@/assets/icons/map-medium.svg";
import MapNegative from "@/assets/icons/map-negative.svg";
export const RCM_MAESTRO_AGENT_DATA = [
  {
    headerText: "Files Ingested",
    percentage: 5,
    value: 126,
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage, // ✅ example image path
  },
  {
    headerText: "Docs Parsed",
    percentage: 8,
    value: 118,
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage, // ✅ example image path
  },
  {
    headerText: "BAI",
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
    headerText: "EDI 835",
    percentage: 3,
    value: "34",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "EOB",
    percentage: 6,
    value: "52",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "EDI 837",
    percentage: -7,
    value: "9",
    colorClass: {
      text: "text-rose-500",
      border: "border-rose-500",
      chart: "stroke-rose-500",
    },
    image: MapNegative,
  },
];

export const INTAKE_ORCHESTRATOR_DATA = [
  {
    headerText: "Claims Received",
    percentage: "12",
    value: "982",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "Claims Processed",
    percentage: "9",
    value: "870",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "Pending Claims",
    percentage: "-4",
    value: "112",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
  },
  {
    headerText: "Rejected Claims",
    percentage: "-2",
    value: "25",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
  },
  {
    headerText: "Reprocessed Claims",
    percentage: "6",
    value: "14",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "Claims Approved",
    percentage: "-15",
    value: "820",
    colorClass: {
      text: "text-rose-500",
      border: "border-rose-500",
      chart: "stroke-rose-500",
    },
    image: MapNegative,
  },
];

export const RECONCILIATION_DATA = [
  {
    headerText: "Total Candidates",
    percentage: "5",
    value: "684",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "Reconciled Count",
    percentage: "8",
    value: "512",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
  },
  {
    headerText: "Matched Amount",
    percentage: "-1",
    value: "1450236",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
  },
  {
    headerText: "Unmatched Amount",
    percentage: "3",
    value: "2819.11",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
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
  },
];

export const CASH_POSTING_DATA = [
  {
    headerText: "Post Ready Amount",
    percentage: "5",
    value: "820345",
    colorClass: {
      text: "text-teal-600",
      border: "border-teal-600",
      chart: "stroke-teal-600",
    },
    image: MapImage,
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
  },
  {
    headerText: "Posted Amount",
    percentage: "-1",
    value: "612441.22",
    colorClass: {
      text: "text-amber-500",
      border: "border-amber-500",
      chart: "stroke-amber-500",
    },
    image: MapMediumImg,
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
  },
];
