import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, type Column } from "@/components/DataTable/DataTable";

interface PatientLevelDataProps {
  data: any[];
}

export const PatientLevelData = ({ data }: PatientLevelDataProps) => {
  const columns: Column<any>[] = [
    { key: "patientName", label: "Patient Name" },
    { key: "claimNumber", label: "Claim Number" },
    { key: "serviceDate", label: "Service Date" },
    { key: "billedAmount", label: "Billed Amount" },
    { key: "paidAmount", label: "Paid Amount" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Level Data</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={columns} idKey="id" />
      </CardContent>
    </Card>
  );
};
