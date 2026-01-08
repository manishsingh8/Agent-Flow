import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Logo from "@/assets/icons/rp-logo-icon.svg";

import { useBAIParserLogic } from "./BAIParser.hook";

const BAIParser = () => {
  const { isSuccess, handleProcess, isLoading } = useBAIParserLogic();
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          BAI Insight Extraction
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#0A0A0A]">
            A multi-stage pipeline to analyze your BAI documents.
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 transition-colors relative">
        {!isSuccess ? (
          <>
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <FileUp className="w-8 h-8 text-blue-500" />
            </div>

            <p className="text-gray-900 font-medium mb-1">Upload PDF file</p>

            <p className="text-gray-500 text-xs text-center mb-4">
              Click below to start processing
            </p>

            <Button
              onClick={handleProcess}
              disabled={isLoading}
              className="w-full max-w-[200px]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <img src={Logo} className="w-5 h-6 animate-spin" alt="logo" />
                  Processing...
                </span>
              ) : (
                "Process File"
              )}
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-green-50 p-3 rounded-full mb-3">
              <FileUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-900 font-medium text-sm">
              File uploaded successfully
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BAIParser;
