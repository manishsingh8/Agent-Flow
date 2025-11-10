import { Handle, Position } from "reactflow";
import EMRIcon from "@/assets/icons/emr.svg";

interface EMRNodeProps {
  data: {
    label: string;
  };
}

export default function EMRNode({ data }: EMRNodeProps) {
  return (
    <div className="bg-card border border-card-border rounded-lg p-3 shadow-sm hover-elevate min-w-[120px]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
          <img src={EMRIcon} alt="icon" className="w-12 h-12" />
        </div>
        <span
          className="text-md font-medium text-foreground text-center"
          data-testid={`text-${data.label}`}
        >
          {data.label}
        </span>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-primary"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-primary"
      />
    </div>
  );
}
