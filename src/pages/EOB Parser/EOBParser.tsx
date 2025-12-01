import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfPipelineViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files?.[0];
    if (pdfFile) setFile(pdfFile);
  };

  return (
    <div className="w-full h-screen flex gap-6 p-6 bg-gray-100 overflow-hidden">
      {/* LEFT PANEL */}
      <div className="w-[50%] bg-white rounded-xl shadow p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            RCM Insight Extraction Pipeline
          </h2>
          <p className="text-gray-500 text-sm">
            Upload a document to begin the multi-stage analysis.
          </p>

          <div className="mt-6 flex flex-col items-center border border-dashed border-gray-400 rounded-lg p-6">
            {!file ? (
              <>
                <div className="text-blue-500 text-4xl mb-2">📄</div>
                <p className="text-gray-600 mb-3">Upload a PDF file</p>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="text-sm text-gray-600"
                />
              </>
            ) : (
              <div className="flex flex-col text-center">
                <p className="text-blue-600 font-medium">{file.name}</p>
                <button className="mt-4 bg-blue-900 text-white px-5 py-2 rounded-md hover:bg-blue-800 transition">
                  Start Pipeline
                </button>

                <button
                  onClick={() => setFile(null)}
                  className="mt-3 px-4 py-2 text-gray-700 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Choose a different file
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL – DOCUMENT VIEWER */}
      <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-auto w-[50%]">
        <h2 className="text-xl font-semibold mb-2">Document Viewer</h2>
        <p className="text-gray-500 text-sm mb-4">
          The selected PDF document is displayed here.
        </p>

        <div className="border rounded-lg h-[90%] overflow-auto p-4 bg-gray-50 flex justify-center">
          {!file ? (
            <p className="text-gray-400 text-lg mt-20">No PDF Selected</p>
          ) : (
            <Document
              file={file}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="mb-4 shadow"
                  width={600}
                />
              ))}
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
