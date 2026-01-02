import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PatientLevelDataProps {
  data: any[];
}

export const PatientLevelData = ({ data }: PatientLevelDataProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Level Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Claim Number</TableHead>
              <TableHead>Service Date</TableHead>
              <TableHead>Billed Amount</TableHead>
              <TableHead>Paid Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.patientName}</TableCell>
                <TableCell>{patient.claimNumber}</TableCell>
                <TableCell>{patient.serviceDate}</TableCell>
                <TableCell>{patient.billedAmount}</TableCell>
                <TableCell>{patient.paidAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
