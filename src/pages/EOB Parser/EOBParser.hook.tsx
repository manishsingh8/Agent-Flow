import { useState } from "react";

export const useEOBLogic = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ⭐ Now pipelineResult is structured & accordion-ready
  const [pipelineResult, setPipelineResult] = useState(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files?.[0];
    if (pdfFile) {
      setIsLoading(true);
      setFile(pdfFile);
      setPdfUrl(URL.createObjectURL(pdfFile));
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setIsLoading(false);
  };

  const clearFile = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setFile(null);
    setPdfUrl(null);
    setNumPages(null);
    setPipelineResult(null);
  };

  // ⭐ CALL ALL THREE APIS TOGETHER AND MERGE CLEANLY
  const handleStartPipeline = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      setPipelineResult(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("start_page", "1");
      formData.append("end_page", "1");

      // 🔥 RUN ALL THREE APIS IN PARALLEL
      const [splitRes, classifyRes, extractRes] = await Promise.all([
        fetch(
          "https://d3gjsnfpy4.execute-api.us-east-1.amazonaws.com/dev/split",
          {
            method: "POST",
            body: formData,
          }
        ),
        fetch(
          "https://d3gjsnfpy4.execute-api.us-east-1.amazonaws.com/dev/classify",
          {
            method: "POST",
            body: formData,
          }
        ),
        fetch(
          "https://d3gjsnfpy4.execute-api.us-east-1.amazonaws.com/dev/extract",
          {
            method: "POST",
            body: formData,
          }
        ),
      ]);

      if (!splitRes.ok || !classifyRes.ok || !extractRes.ok) {
        throw new Error("One or more pipeline steps failed");
      }

      const [splitData, classifyData, extractData] = await Promise.all([
        splitRes.json(),
        classifyRes.json(),
        extractRes.json(),
      ]);
      console.log(splitData, classifyData, extractData, "data");
      // ⭐ CLEAN MERGED RESULT FOR ACCORDIONS
      const finalOutput = {
        split: {
          letters: splitData?.data?.letters || [],
          analysis: splitData?.data?.analysis || {},
        },
        classify: {
          category: classifyData?.data?.category || "",
          analysis: classifyData?.data?.analysis || {},
        },
        extract: {
          service_lines: extractData?.data?.service_lines || [],
          analysis: extractData?.data?.analysis || {},
        },
      };

      console.log("Final Merged Pipeline Output:", finalOutput);

      setPipelineResult(finalOutput);
    } catch (error) {
      console.error(error);
      alert("Error running pipeline");
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};
