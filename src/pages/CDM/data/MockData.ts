
export const MOCK_FILTER_DATA = {
  classification: [
    { id: 1, classificationType: "EOB" },
    { id: 2, classificationType: "ERA" },
    { id: 3, classificationType: "Correspondence" },
    { id: 4, classificationType: "Medical Records" },
    { id: 5, classificationType: "Appeal" },
    { id: 6, classificationType: "Other" },
  ],
  payerPortals: [
    { id: 1, payerName: "UHC" },
    { id: 2, payerName: "Aetna" },
    { id: 3, payerName: "Blue Cross Blue Shield" },
    { id: 4, payerName: "Cigna" },
    { id: 5, payerName: "Medicare" },
    { id: 6, payerName: "Medicaid" },
    { id: 7, payerName: "Humana" },
    { id: 8, payerName: "Kaiser Permanente" },
  ],
  tags: [
    "Urgent",
    "Review Required",
    "Follow-up",
    "Completed",
    "Pending Info",
    "Escalated",
    "Duplicate",
  ],
  status: [
    { id: 1, statusName: "Processed" },
    { id: 2, statusName: "Ready to Process" },
    { id: 3, statusName: "Waiting for User Validation" },
    { id: 4, statusName: "Found-Not Posted" },
    { id: 5, statusName: "Not Found-Not Posted" },
    { id: 6, statusName: "Found-Partially Posted" },
  ],
  users: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Robert Wilson" },
    { id: 4, name: "Sarah Johnson" },
    { id: 5, name: "Michael Brown" },
    { id: 6, name: "Emily Davis" },
    { id: 7, name: "Chris Miller" },
    { id: 8, name: "Amanda Lee" },
  ],
  searchField: [
    "File Name",
    "Payer Name",
    "Claim ID",
    "Patient Name",
    "Provider Name",
  ]
};

export const COOKED_CDM_DATA = [
  {
    id: "CDM-1001",
    splitFileName: "UHC_EOB_20231220_001.pdf",
    classification: "EOB",
    payer: "UHC",
    assignee: "John Doe",
    batchDate: "12-20-2023",
    processedDate: "12-21-2023",
    tags: ["Urgent", "Review Required"],
    status: "Processed"
  },
  {
    id: "CDM-1002",
    splitFileName: "AETNA_ERA_20231220_042.pdf",
    classification: "ERA",
    payer: "Aetna",
    assignee: "Jane Smith",
    batchDate: "12-20-2023",
    processedDate: "12-20-2023",
    tags: ["Follow-up"],
    status: "Ready to Process"
  },
  {
    id: "CDM-1003",
    splitFileName: "CIGNA_CORR_20231219_089.pdf",
    classification: "Correspondence",
    payer: "Cigna",
    assignee: "Robert Wilson",
    batchDate: "12-19-2023",
    processedDate: "12-20-2023",
    tags: ["Pending Info"],
    status: "Waiting for User Validation"
  },
  {
    id: "CDM-1004",
    splitFileName: "MEDICARE_MR_20231218_112.pdf",
    classification: "Medical Records",
    payer: "Medicare",
    assignee: "Sarah Johnson",
    batchDate: "12-18-2023",
    processedDate: "12-19-2023",
    tags: ["Completed"],
    status: "Found-Not Posted"
  },
  {
    id: "CDM-1005",
    splitFileName: "HUMANA_APPEAL_20231217_056.pdf",
    classification: "Appeal",
    payer: "Humana",
    assignee: "Michael Brown",
    batchDate: "12-17-2023",
    processedDate: "12-18-2023",
    tags: ["Escalated"],
    status: "Not Found-Not Posted"
  },
  {
    id: "CDM-1006",
    splitFileName: "BCBS_EOB_20231221_005.pdf",
    classification: "EOB",
    payer: "Blue Cross Blue Shield",
    assignee: "Emily Davis",
    batchDate: "12-21-2023",
    processedDate: "--",
    tags: ["Urgent"],
    status: "Ready to Process"
  }
];
