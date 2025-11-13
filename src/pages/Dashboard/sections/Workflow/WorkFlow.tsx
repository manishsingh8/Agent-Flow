import { useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  ConnectionMode,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

import IntegrationNode from "./IntegrationNode";
import AgentNode from "./AgentNode";
import EMRNode from "./EMRNode";
import AgentToolNode from "./AgentToolsPanel";
import { type Node, type Edge } from "reactflow";
import GroupNode from "./GroupNode";
import SubAgentNode from "./SubAgentNode";
import bgImage from "../../../../assets/images/bg-img.png";

interface WorkFlowProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

const nodeTypes = {
  integration: IntegrationNode,
  agent: AgentNode,
  emr: EMRNode,
  agentTool: AgentToolNode,
  group: GroupNode,
  subAgent: SubAgentNode,
};

export default function WorkflowPage({
  initialNodes,
  initialEdges,
}: WorkFlowProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = reactFlowWrapper.current;

    if (wrapper) {
      const handleWheel = (e: WheelEvent) => {
        if (!e.ctrlKey) {
          e.stopPropagation();
        }
      };
      wrapper.addEventListener("wheel", handleWheel, { passive: true });
      return () => wrapper.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-1 relative pointer-events-none">
        <ReactFlow
          className="cursor-default"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={false}
          panOnDrag={false}
          proOptions={{ hideAttribution: true }}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover", // or 'contain' depending on your needs
            backgroundPosition: "center",
          }}
        >
          <Background color="#e5e7eb" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
