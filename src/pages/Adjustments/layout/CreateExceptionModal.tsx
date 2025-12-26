import { ModalWrapper } from "./ModalWrapper";

export const CreateExceptionModal = ({ onClose }: { onClose: () => void }) => (
  <ModalWrapper title="Create New Exception" onClose={onClose}>
    <div className="space-y-3">
      <input className="w-full border p-2 rounded" placeholder="Type" />
      <input className="w-full border p-2 rounded" placeholder="Severity" />
      <input className="w-full border p-2 rounded" placeholder="Amount" />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Describe the issue..."
      />
    </div>

    <div className="mt-4 flex justify-end gap-2">
      <button onClick={onClose} className="px-4 py-2 border rounded">
        Cancel
      </button>
      <button className="px-4 py-2 bg-primary text-white rounded">
        Create Exception
      </button>
    </div>
  </ModalWrapper>
);
