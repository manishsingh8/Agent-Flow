import { Handle, Position } from "reactflow";
import { Calendar, FileText, Inbox, Database, Package } from "lucide-react";
import { getIcon } from "@/utils/getIcon";

const iconMap = {
  scheduler: Calendar,
  config: FileText,
  inbox: Inbox,
  sftp: Database,
  amazon_s3: Package,
};

interface IntegrationNodeProps {
  data: {
    label: string;
    icon: keyof typeof iconMap;
  };
}

export default function IntegrationNode({ data }: IntegrationNodeProps) {
  return (
    <div className="bg-card border border-card-border rounded-lg p-3 shadow-sm hover-elevate min-w-[120px]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
          <div className="text-3xl">{getIcon(data.icon)}</div>
        </div>
        <span
          className="text-md font-medium text-foreground text-center break-words"
          data-testid={`text-${data.label}`}
        >
          {data.label}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-primary"
      />
    </div>
  );
}
