import { useState, useRef } from "react";
import { Upload, FileText, Zap, Search, Bot } from "lucide-react";

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

// -------------------------------
// Extract Executive Summary
// -------------------------------
function extractExecutiveSummary(text: string): string {
  try {
    const match = text.match(/\*\*Executive Summary:\*\*([\s\S]*?)\*\*/);
    if (match && match[1]) {
      return match[1].trim();
    }
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
          "Only ERA/EOB (X12 835) files are supported. Please upload a valid .835 or .eob file.",
        variant: "destructive",
      });

      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setIsProcessed(false);
  };

  // -------------------------------
  // Process File (API Integration)
  // -------------------------------
  const handleProcess = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please choose a remittance file to process.",
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

      if (!response.ok) throw new Error("Failed to process remittance file");

      const data = await response.json();

      // ----------------------
      // Map API response → UI
      // ----------------------
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
        description:
          "Something went wrong while processing your file. Try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      {/* HEADER */}
      <div className="w-full border-[1px] border-[#E6ECF0] p-[16px] pt-[10px] rounded-[14px] h-[80px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          Smart Remittance Assistant
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">
            Upload ERA or EOB files to streamline payment matching and detect
            adjustments.
          </span>
        </div>
      </div>

      <div>
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT SIDE - UPLOAD */}
              <div className="p-4 space-y-8 border-r border-slate-100 bg-white">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    ERA/EOB File
                  </label>
                  <div>Upload the remittance file (X12 835, EOB).</div>

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

                {/* PROCESS BUTTON */}
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
                      <Zap className="w-4 h-4 mr-2" fill="currentColor" />
                      Process Remittance File
                    </>
                  )}
                </Button>

                {/* VIEW RESULTS BUTTON */}
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

              {/* RIGHT SIDE - SUGGESTION */}
              <div className="p-8 bg-slate-50/50 flex flex-col justify-center min-h-[300px]">
                {!isProcessed ? (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center">
                    {isProcessing ? (
                      <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
                        {/* Loading spinner */}
                        <div className="w-10 h-10 border-4 border-slate-300 border-t-[#249563] rounded-full animate-spin"></div>

                        {/* Skeleton title */}
                        <div className="h-4 w-40 bg-slate-300 rounded"></div>

                        {/* Skeleton subtitle */}
                        <div className="h-3 w-60 bg-slate-200 rounded"></div>
                        <div className="h-3 w-48 bg-slate-200 rounded"></div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium">
                          Upload a remittance file
                        </h3>
                        <p className="text-sm text-slate-500">
                          The system will attempt to match and analyze the file.
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Bot className="w-24 h-24 text-blue-600" />
                    </div>

                    <div className="relative space-y-4">
                      <div className="flex items-center gap-2 text-blue-700 font-semibold">
                        <Zap className="w-5 h-5" />
                        Workflow Suggestion
                      </div>

                      <p className="text-blue-600/80 text-sm">
                        The AI has analyzed this remittance.
                      </p>

                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase text-slate-500">
                          Suggested Action
                        </span>
                        <div className="font-medium text-slate-900 text-lg">
                          {analysis?.action || "N/A"}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold uppercase text-slate-500">
                          Review Priority
                        </span>

                        <div className="w-full bg-slate-200 rounded-full h-8 flex items-center justify-center text-sm mt-1">
                          {analysis?.priority || "Low"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ----------------------- */}
        {/* ANALYSIS MODAL */}
        {/* ----------------------- */}
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
                  {/* EXEC SUM */}
                  <section>
                    <h3 className="text-base font-bold">Executive Summary:</h3>
                    <p className="text-sm text-slate-600 whitespace-pre-line">
                      {analysis?.executiveSummary}
                    </p>
                  </section>

                  {/* PAYMENT DETAILS */}
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

                  {/* ADJUSTMENTS */}
                  <section>
                    <h3 className="text-base font-bold">Adjustments:</h3>
                    <pre className="text-xs bg-slate-100 p-3 rounded">
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
    </div>
  );
}
