
export const mockFileLevelData = {
  id: "1",
  fileName: "EOB_835_123456789.pdf",
  uploadDate: "2023-10-27",
  status: "Processed",
  payerName: "-",
  depositDate: "12-12-2024",
  checkNumber: "451_2",
  checkAmount: "$1,250.00",
  numberOfPages: "3 Pages",
  patientCount: "Only N/A Patient",
  documentAge: "291 days ago",
  confidenceScore: "100.00",
  letterName: "N/A"
};

export const mockPatientLevelData = [
  {
    id: "p1",
    patientName: "John Doe",
    claimNumber: "CLM001",
    serviceDate: "2023-10-01",
    billedAmount: "$500.00",
    paidAmount: "$350.00",
  },
  {
    id: "p2",
    patientName: "Jane Smith",
    claimNumber: "CLM002",
    serviceDate: "2023-10-05",
    billedAmount: "$750.00",
    paidAmount: "$900.00",
  },
];

export const documentSteps = [
  { label: 'Classification', isCompleted: true },
  { label: 'Data Extraction', isCompleted: true },
  { label: 'iCAN Data Verification', isCompleted: true },
  { label: 'User Validation', isCompleted: false }, // Current step
  { label: 'Process', isCompleted: false },
];
