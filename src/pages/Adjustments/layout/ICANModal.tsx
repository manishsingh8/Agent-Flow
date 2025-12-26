import { ModalWrapper } from "./ModalWrapper";
import { Button } from "@/components/ui/Button";
export const ICANModal = ({ onClose }: { onClose: () => void }) => (
  <ModalWrapper title="iCAN AI Analysis" onClose={onClose}>
    <div className="text-center py-10">
      <p className="text-red-500 font-medium">
        Failed to analyze data. Please try again.
      </p>
      <Button
        variant="default"
        className="bg-[#249563] hover:bg-green-700 cursor-pointer mt-2"
        data-testid="button-export"
      >
        Retry
      </Button>
    </div>
  </ModalWrapper>
);
