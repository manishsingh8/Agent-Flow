import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FileUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import Logo from "@/assets/icons/rp-logo-icon.svg";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import { useEOBLogic } from "./EOBParser.hook";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PdfPipelineViewer() {
  const {
    file,
    pdfUrl,
    numPages,
    isLoading,
    pipelineResult,
    handleStartPipeline,
    handleFileSelect,
    onDocumentLoadError,
    onDocumentLoadSuccess,
    clearFile,
  } = useEOBLogic();
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          RCM Insight Extraction
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#0A0A0A]">
            A multi-stage pipeline to analyze your Revenue Cycle Management
            documents.
          </span>
        </div>
      </div>

      <div className="w-full h-screen flex gap-6 bg-gray-50 overflow-hidden font-sans">
        {/* LEFT PANEL */}
        <div className="w-[40%] max-w-[500px]  overflow-auto">
          <Card
            className={`w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between ${
              pipelineResult ? "" : "h-full"
            }`}
          >
            <div>
              <div className="mb-4">
                <div className="text-[20px] font-semibold text-[#0A0A0A]">
                  RCM Insight Extraction
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#0A0A0A]">
                    Upload a document to begin the multi-stage analysis.
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 hover:bg-gray-50/50 transition-colors relative">
                {!file ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-full mb-4">
                      <FileUp className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-gray-900 font-medium mb-1">
                      Upload PDF file
                    </p>
                    <p className="text-gray-500 text-xs text-center mb-4">
                      Drag and drop or click to browse
                    </p>

                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button variant="outline" className="pointer-events-none">
                      Browse Files
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col items-center w-full">
                    <div className="bg-green-50 p-3 rounded-full mb-3">
                      <FileUp className="w-6 h-6 text-green-600" />
                    </div>

                    <p className="text-gray-900 font-medium text-sm truncate max-w-[200px] mb-6">
                      {file.name}
                    </p>
                    <Button
                      onClick={handleStartPipeline}
                      disabled={isLoading}
                      className="w-full mb-3 bg-[#249563] hover:bg-[#249563]"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <img
                            src={Logo}
                            className="w-5 h-6 animate-spin"
                            alt="logo"
                          />
                          Processing...
                        </span>
                      ) : (
                        "Start Pipeline"
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={clearFile}
                      className="w-full text-gray-500 hover:text-gray-700"
                    >
                      Choose a different file
                    </Button>

                    {/* ⭐ ACCORDION SHOWS WHEN PIPELINE RESULT IS AVAILABLE */}
                  </div>
                )}
              </div>
              {pipelineResult && (
                <div className="w-full mt-4 p-4">
                  <Accordion type="single" collapsible>
                    {/* ---------- STAGE 1 → Split Analysis ---------- */}
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        Stage 1: Quality Assessment & Page Analysis
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                          {pipelineResult?.split?.analysis
                            ? JSON.stringify(
                                pipelineResult?.split?.analysis,
                                null,
                                2
                              )
                            : "No analysis found"}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>

                    {/* ---------- STAGE 2 → Letters from Split API ---------- */}
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Stage 2: Document Boundary Detection & Grouping
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                          {pipelineResult?.split?.letters
                            ? JSON.stringify(
                                pipelineResult?.split?.letters,
                                null,
                                2
                              )
                            : "No letters detected"}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>

                    {/* ---------- STAGE 3 → Classification Analysis ---------- */}
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        Stage 3: Document Classification & Template Tagging
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                          {pipelineResult?.classify?.analysis
                            ? JSON.stringify(
                                pipelineResult.classify.analysis,
                                null,
                                2
                              )
                            : "Classification analysis unavailable"}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>

                    {/* ---------- STAGE 4 → Extracted Service Lines ---------- */}
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        Stage 4: Comprehensive Data Extraction
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                          {pipelineResult?.extract?.analysis
                            ? JSON.stringify(
                                pipelineResult.extract.analysis,
                                null,
                                2
                              )
                            : "No service lines extracted"}
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    {/* may needed later  */}
                    {/* ---------- STAGE 5 → Category ---------- */}
                    {/* <AccordionItem value="item-5">
                      <AccordionTrigger>
                        Stage 5: Summary Generation & Validation
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                          {pipelineResult?.classify?.category
                            ? pipelineResult.classify.category
                            : "No category detected"}
                        </pre>
                      </AccordionContent>
                    </AccordionItem> */}

                    {/* ---------- STAGE 6 → Extract Analysis ---------- */}
                    {/* <AccordionItem value="item-6">
                      <AccordionTrigger>
                        Stage 6: Final Compilation & Telemetry
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                          {pipelineResult?.extract?.analysis
                            ? JSON.stringify(
                                pipelineResult.extract.analysis,
                                null,
                                2
                              )
                            : "Extract analysis unavailable"}
                        </pre>
                      </AccordionContent>
                    </AccordionItem> */}

                    {/* ---------- STAGE 7 (Optional) ---------- */}
                    {/* <AccordionItem value="item-7">
                      <AccordionTrigger>
                        Stage 7: Document Splitting & Export
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>No additional data assigned.</p>
                      </AccordionContent>
                    </AccordionItem> */}

                    {/* ---------- STAGE 8 (Optional) ---------- */}
                    {/* <AccordionItem value="item-8">
                      <AccordionTrigger>
                        Stage 8: Professional Summary Generation
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>No additional data assigned.</p>
                      </AccordionContent>
                    </AccordionItem> */}
                  </Accordion>
                </div>
              )}
            </div>
            {/* <div className="text-xs text-gray-400 text-center">
              Supported formats: PDF only
            </div> */}
          </Card>
        </div>
        {/* RIGHT PANEL – DOCUMENT VIEWER */}
        <Card className="w-[60%] flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Document Preview
              </h2>
              <p className="text-xs text-gray-500">
                {numPages ? `${numPages} pages` : "No document loaded"}
              </p>
            </div>

            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            )}
          </div>

          <div className="flex-1 overflow-auto bg-gray-100/50 p-8 flex justify-center">
            {!pdfUrl ? (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <FileUp className="w-12 h-12 mb-4 opacity-20" />
                <p>No PDF Selected</p>
              </div>
            ) : (
              <div>
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading
                      PDF...
                    </div>
                  }
                  error={
                    <div className="text-red-500 text-sm bg-red-50 p-4 rounded-lg">
                      Failed to load PDF. Please try another file.
                    </div>
                  }
                  className="shadow-lg"
                >
                  {Array.from(new Array(numPages || 0), (_, index) => (
                    <Page
                      key={index}
                      pageNumber={index + 1}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      className="mb-4 shadow-sm bg-white"
                      width={600}
                    />
                  ))}
                </Document>
              </div>
            )}
          </div>
        </Card>
        <div></div>
      </div>
    </div>
  );
}
