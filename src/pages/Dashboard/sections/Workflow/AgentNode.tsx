import { Handle, Position } from "reactflow";
import { Button } from "@/components/ui/Button";
import PlusIcon from "@/assets/icons/plus-icon.svg";
import Logo from "@/assets/images/logo-icon.jpeg";

interface AgentNodeProps {
  data: {
    label: string;
    showAddButton?: boolean;
    showLogo: boolean;
  };
}

export default function AgentNode({ data }: AgentNodeProps) {
  console.log("data", data);
  const sizeClasses = data.showLogo ? "w-150 h-30" : "w-70 h-25";

  return (
    <div
      className={`pointer-events-none flex items-center justify-center bg-card border border-card-border rounded-3xl shadow-md hover-elevate min-w-[200px] relative ${sizeClasses}`}
    >
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-semibold text-card-foreground font-medium"
            data-testid={`text-${data.label}`}
          >
            {data.label}
          </span>
          {data.showLogo ? (
            <span>
              <img src={Logo} className="w-7 h-8  animate-spin" />
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      {data.showAddButton && (
        <Button
          size="icon"
          className="absolute -top-[1px] -right-[1px] h-8 w-8 rounded-full shadow-md"
          data-testid="button-add-connection"
          onClick={() => console.log("Add connection clicked")}
        >
          <img src={PlusIcon} alt="Add Connection" className="w-12 h-12" />
        </Button>
      )}

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
      {/* <Handle
        type="target"
        position={Position.Bottom}
        className="w-2 h-2 !bg-primary"
        id="bottom"
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-primary"
      /> */}
    </div>
  );
}
