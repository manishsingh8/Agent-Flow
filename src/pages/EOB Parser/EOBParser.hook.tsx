import { useState } from "react";

export const useEOBLogic = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineResult, setPipelineResult] = useState(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files?.[0];
    if (pdfFile) {
      setIsLoading(true);
      setFile(pdfFile);
      const url = URL.createObjectURL(pdfFile);
      setPdfUrl(url);
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

  // ⭐ START PIPELINE - CALL ALL 3 APIS TOGETHER
  const handleStartPipeline = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      setPipelineResult(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("start_page", "1");
      formData.append("end_page", "1");

      // ⭐ Run all 3 API calls in parallel
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

      // ⭐ Validate all responses
      if (!splitRes.ok || !classifyRes.ok || !extractRes.ok) {
        throw new Error("One or more pipeline steps failed");
      }

      // ⭐ Parse all API responses
      const [splitData, classifyData, extractData] = await Promise.all([
        splitRes.json(),
        classifyRes.json(),
        extractRes.json(),
      ]);

      console.log("Pipeline results:", {
        splitData,
        classifyData,
        extractData,
      });

      // ⭐ Save final merged result
      setPipelineResult({
        split: splitData,
        classify: classifyData,
        extract: extractData,
      });
    } catch (error) {
      console.error(error);
      alert("Error running pipeline");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    file,
    setFile,
    pdfUrl,
    setPdfUrl,
    numPages,
    setNumPages,
    isLoading,
    setIsLoading,
    pipelineResult,
    handleStartPipeline,
    clearFile,
    onDocumentLoadError,
    onDocumentLoadSuccess,
    handleFileSelect,
  };
};
