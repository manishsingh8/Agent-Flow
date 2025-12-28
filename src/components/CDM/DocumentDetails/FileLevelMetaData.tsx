
import { Card, CardContent } from "@/components/ui/card";

interface FileLevelMetaDataProps {
  data: any;
}

export const FileLevelMetaData = ({ data }: FileLevelMetaDataProps) => {
  const fields = [
    { label: "Payer Name", value: data.payerName },
    { label: "Deposit Date", value: data.depositDate },
    { label: "Check Number", value: data.checkNumber },
    { label: "Number of Pages", value: data.numberOfPages || "N/A" },
    { label: "Patient Count", value: data.patientCount || "N/A" },
    { label: "Document Age", value: data.documentAge || "N/A" },
    { label: "Confidence Score", value: data.confidenceScore || "N/A" },
    { label: "Letter Name", value: data.letterName || "N/A" },
  ];

  return (
    <Card className="shadow-none border-0">
      <CardContent className="p-0">
        <div className="space-y-4 max-w-2xl">
            {fields.map((field, index) => (
                <div key={index} className="grid grid-cols-[200px_20px_1fr] items-start">
                    <span className="font-medium text-slate-700">{field.label}</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-slate-900">{field.value}</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

