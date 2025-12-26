import { ModalWrapper } from "./ModalWrapper";

export const SourceDocumentModal = ({ onClose }: { onClose: () => void }) => (
  <ModalWrapper title="Source Document: tx-1" onClose={onClose}>
    <div className="h-80 overflow-auto border rounded p-3 text-sm">
      <p className="font-medium mb-2">EDI 837 Claim Data</p>
      <p>Payer: Unknown Payer</p>
      <p>Payee: General Hospital</p>
    </div>

    <div className="mt-4 text-right">
      <button onClick={onClose} className="px-4 py-2 border rounded">
        Close
      </button>
    </div>
  </ModalWrapper>
);
