import { useState, useRef } from "react";
import { Upload, FileText, Zap, Search } from "lucide-react";
import { RemitAnalysisView } from "./RemittanceAnalysisView";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface AnalysisData {
  executiveSummary: string;
  payerName: string;
  totalPayment: string;
  paymentMethod: string;
  checkNumber: string;
  paymentDate: string;
  adjustments: string;
  priority?: string;
  action?: string;
}

function extractExecutiveSummary(text: string): string {
  try {
    const match = text.match(/\*\*Executive Summary:\*\*([\s\S]*?)\*\*/);
    if (match && match[1]) return match[1].trim();
    return "No executive summary found.";
  } catch {
    return "No executive summary found.";
  }
}

export default function RemittanceProcessing() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fullApiResponse, setFullApiResponse] = useState<any>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const selectedFile = e.target.files[0];
    const fileName = selectedFile.name.toLowerCase();
    const validExtensions = [".835", ".eob", ".edi", ".txt"];

    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));
    if (!isValid) {
      toast({
        title: "Invalid File Format",
        description:
          "Only ERA/EOB (X12 835) files are allowed. Upload a valid .835 or .eob file.",
        variant: "destructive",
      });

      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setIsProcessed(false);
  };

  const handleProcess = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Upload a remittance file before processing.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append("eraFile", file);

      const response = await fetch(
        "https://ibdk93jyg0.execute-api.us-east-1.amazonaws.com/Prod/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to process the file");

      const data = await response.json();
      setFullApiResponse(data); // Store FULL API response for RemitAnalysisView

      const parsed: AnalysisData = {
        executiveSummary: extractExecutiveSummary(
          data.result.expertReviewNarrative
        ),
        payerName: data.result.analysis.summary.payerName,
        totalPayment: `$${data.result.analysis.summary.paymentAmount}`,
        paymentMethod: data.result.analysis.summary.paymentMethod,
        checkNumber: data.result.analysis.summary.checkEftNumber,
        paymentDate: data.result.analysis.summary.paymentDate,
        adjustments: JSON.stringify(
          data.result.analysis.claimAdjustmentReasonCodes,
          null,
          2
        ),
        priority: data.result.workflow.reviewPriority,
        action: data.result.workflow.suggestedAction,
      };

      setAnalysis(parsed);
      setIsProcessing(false);
      setIsProcessed(true);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      toast({
        title: "Processing Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      {/* HEADER */}
      <div className="w-full border border-[#E6ECF0] p-4 rounded-[14px] h-[80px]">
        <div className="text-[20px] font-[600]">Smart Remittance Assistant</div>
        <span className="text-sm text-[#737373]">
          Upload ERA or EOB files to analyze payment and adjustments.
        </span>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT PANEL */}
            <div className="p-4 space-y-8 border-r border-slate-100 bg-white">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">
                  ERA/EOB File
                </label>
                <div>Upload the remittance file (X12 835 / EOB).</div>

                <div
                  className="flex items-center w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 cursor-pointer hover:bg-slate-100"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <button className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-xs mr-3">
                    Choose File
                  </button>
                  <span className="text-slate-600 truncate flex-1">
                    {file ? file.name : "No file chosen"}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".835,.eob,.txt,.edi"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <Button
                className="w-full md:w-auto bg-[#249563] hover:bg-[#249563] text-white font-medium"
                size="lg"
                onClick={handleProcess}
                disabled={isProcessing || !file}
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Process Remittance File
                  </>
                )}
              </Button>

              {isProcessed && (
                <Button
                  variant="outline"
                  className="w-full md:w-auto border-slate-200 text-slate-700 hover:bg-slate-50"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Search className="w-4 h-4 mr-2" />
                  View Remit Analysis
                </Button>
              )}
            </div>

            {/* RIGHT PANEL DISPLAY */}
            <div className="p-6 bg-slate-50/50 min-h-[300px]">
              {!isProcessed ? (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center">
                  {isProcessing ? (
                    <div className="flex flex-col items-center gap-4 animate-pulse">
                      <div className="w-10 h-10 border-4 border-slate-300 border-t-[#249563] rounded-full animate-spin"></div>
                      <div className="h-4 w-40 bg-slate-300 rounded"></div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mx-auto text-slate-400 mb-4" />
                      <h3 className="text-lg font-medium">
                        Upload a remittance file
                      </h3>
                      <p className="text-sm text-slate-500">
                        The system will analyze payments & adjustments.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-6 overflow-auto max-h-[500px]">
                  <h3 className="text-lg font-semibold mb-4">
                    Remittance Analysis Output
                  </h3>

                  {/* INSERT FULL UI VIEW */}
                  <RemitAnalysisView data={fullApiResponse} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0">
          <div className="p-6 bg-white space-y-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                AI Remittance Analysis
              </DialogTitle>
              <DialogDescription>
                Detailed breakdown of the remittance file.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-8 pb-6">
                <section>
                  <h3 className="text-base font-bold">Executive Summary:</h3>
                  <p className="text-sm text-slate-600 whitespace-pre-line">
                    {analysis?.executiveSummary}
                  </p>
                </section>

                <section>
                  <h3 className="text-base font-bold">Payment Details:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Payer Name: {analysis?.payerName}</li>
                    <li>Total Payment: {analysis?.totalPayment}</li>
                    <li>Payment Method: {analysis?.paymentMethod}</li>
                    <li>Check/EFT Number: {analysis?.checkNumber}</li>
                    <li>Payment Date: {analysis?.paymentDate}</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-base font-bold">Adjustments:</h3>
                  <pre className="text-xs bg-slate-100 p-3 rounded max-w-[90%] max-h-40 overflow-y-auto whitespace-pre-wrap">
                    {analysis?.adjustments || "None"}
                  </pre>
                </section>
              </div>
            </ScrollArea>
          </div>

          <div className="bg-slate-50 px-6 py-4 border-t flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
