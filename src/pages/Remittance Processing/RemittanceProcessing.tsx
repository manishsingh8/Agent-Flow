import FileUploadZone from "@/components/FileUploadZone/FileUploadZone";
import { useState } from "react";
// import FileUpload from "@/components/FileUpload/FileUpload";
import { Button } from "@/components/ui/Button";
import { BrainCircuit } from "lucide-react";

const RemittanceProcessing = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border-[1px] border-[#E6ECF0] p-[16px] pt-[10px] rounded-[14px] h-[80px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          Remittance Processing
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">Remittance Processing</span>
          {/* <img src={RightArrow} alt="right-arrow" className="mt-[6px]" />
          <span className="text-sm text-[#249563]">List</span> */}
        </div>
      </div>
      <div className="w-full border-[1px] border-[#E6ECF0] p-[16px] pt-[10px] rounded-[14px] ">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          Smart Remittance Assistant
        </div>
        <div className="text-sm text-[#737373]">
          Upload ERA or EOB files to streamline payment matching and detect any
          adjustments, including recoupments.
        </div>
      </div>
      <div className="flex  gap-4 border-[1px] border-[#E6ECF0] p-4 rounded-lg">
        <div className="flex flex-col justify-between w-[50%] gap-8">
          <div>
            <div className="font-[600]">ERA/EOB File</div>
            {/* <FileUpload /> */}
            Upload the remittance file (X12 835, EOB). The system will match it
            against open payments and identify adjustments. An ERA file is
            required.
          </div>
          <div>
            <Button
              variant="outline"
              className="size-3xl bg-[#249563] text-white border-[#249563] 
             hover:bg-[#249563] hover:text-white hover:border-[#249563] cursor-pointer"
            >
              <BrainCircuit /> Process Remittance File
            </Button>
          </div>
        </div>
        <div className="w-[50%]">
          <FileUploadZone
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
          />
        </div>
      </div>
    </div>
  );
};

export default RemittanceProcessing;
