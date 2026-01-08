import { useState } from "react";
import { showToast } from "@/lib/toast";
import { API_ENDPOINTS } from "@/config/api";

export const useBAIParserLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleProcess = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_ENDPOINTS.REVENUE_WIDGETS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      console.log(res, "result");
      setIsSuccess(true);
      showToast({
        message: "File uploaded successfully",
        severity: "success",
        id: "pipeline-success",
      });
    } catch (error) {
      console.error("Pipeline error", error);

      showToast({
        message: "Failed to upload file. Please try again.",
        severity: "error",
        id: "pipeline-error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleProcess,
    isSuccess,
    isLoading,
  };
};
