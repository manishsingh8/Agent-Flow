
import { Handle, Position } from "reactflow";
import { getIcon } from "@/utils/getIcon";

interface AgentToolNodeProps {
  data: {
    label: string;
    icon?: string;
  };
}

export default function AgentToolNode({ data }: AgentToolNodeProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md border-2 border-gray-200 px-4 py-3 min-w-[100px] text-center hover:shadow-lg transition-shadow cursor-none"
      style={{ cursor: "none" }}
    >
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: "transparent" }}
      />
      <div className="flex flex-col items-center gap-1">
        <div className="text-3xl">{getIcon(data.icon)}</div>
        <div className="text-md font-medium text-gray-700">{data.label}</div>
      </div>
    </div>
  );
}
