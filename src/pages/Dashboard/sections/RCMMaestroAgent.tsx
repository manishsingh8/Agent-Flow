import MapCard from "@/components/MapCard/MapCard";
import { RCM_MAESTRO_AGENT_DATA } from "@/constants/DashboardData";
import WorkflowPage from "./Workflow/WorkFlow";
import { type Node, type Edge } from "reactflow";

const initialNodes: Node[] = [
  // ---------------- Group 1 ----------------
  {
    id: "group-integration",
    type: "group",
    position: { x: 50, y: 0 },
    style: {
      display: "flex",
      width: 150,
      height: 300,
      zIndex: -1,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 32,
      padding: 10,
    },
    data: { label: "" },
  },
  {
    id: "scheduler",
    type: "integration",
    position: { x: 16, y: 30 },
    parentId: "group-integration",
    extent: "parent",
    data: { label: "Scheduler", icon: "scheduler" },
  },
  {
    id: "config",
    type: "integration",
    position: { x: 16, y: 160 },
    parentId: "group-integration",
    extent: "parent",
    data: { label: "Config", icon: "config" },
  },

  // ---------------- Group 2 ----------------
  {
    id: "group-intake",
    type: "group",
    position: { x: 50, y: 340 },
    style: {
      width: 150,
      height: 400,
      zIndex: -1,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 32,
      padding: 10,
    },
    data: { label: "" },
  },
  {
    id: "inbox",
    type: "integration",
    position: { x: 16, y: 25 },
    parentId: "group-intake",
    extent: "parent",
    data: { label: "Inbox", icon: "inbox" },
  },
  {
    id: "sftp",
    type: "integration",
    position: { x: 16, y: 150 },
    parentId: "group-intake",
    extent: "parent",
    data: { label: "SFTP", icon: "sftp" },
  },
  {
    id: "amazon-s3",
    type: "integration",
    position: { x: 16, y: 265 },
    parentId: "group-intake",
    extent: "parent",
    data: { label: "Amazon S3", icon: "amazon" },
  },

  // ---------------- Center Agents ----------------
  {
    id: "rcm-maestro",
    type: "agent",
    position: { x: 640, y: 50 },
    data: {
      label: "RCM Maestro Agent",
      showAddButton: true,
      showLogo: true,
      isSecondLeftHandle: "true",
      handles: [
        { position: "Left", type: "target", id: "left" },
        { position: "Left", type: "target", id: "left-2" },
        { position: "Bottom", type: "source", id: "bottom-1" },
        { position: "Bottom", type: "source", id: "bottom-2" },
        { position: "Bottom", type: "source", id: "bottom-3" },
      ],
    },
  },
  {
    id: "intake-orchestrator",
    type: "subAgent",
    position: { x: 400, y: 300 },
    data: {
      label: "Intake Orchestrator Agent",
      showLogo: false,
      showAddButton: true,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Left", type: "target", id: "left" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
      isTwoLeftHandle: true,
    },
  },
  {
    id: "reconciliation",
    type: "subAgent",
    position: { x: 800, y: 300 },
    data: {
      label: "Reconciliation Agent",
      showAddButton: true,
      showLogo: false,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },
  {
    id: "cash-posting",
    type: "subAgent",
    position: { x: 1200, y: 300 },
    data: {
      label: "Cash Posting Agent",
      showAddButton: true,
      showLogo: false,
      handles: [
        { position: "Top", type: "target", id: "top" },
        { position: "Right", type: "Source", id: "right" },
        { position: "Bottom", type: "source", id: "bottom" },
      ],
    },
  },

  // ---------------- Agent Tools Group ----------------
  {
    id: "group-agent-tools",
    type: "group",
    position: { x: 410, y: 500 },
    style: {
      // zIndex:-1,
      width: 1000,
      height: 170,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 32,
      padding: 10,
    },
    data: { label: "Agent Tools" },
  },
  {
    id: "tool-db",
    type: "agentTool",
    position: { x: 30, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "DB", icon: "db" },
  },
  {
    id: "tool-api",
    type: "agentTool",
    position: { x: 150, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "API", icon: "api" },
  },
  {
    id: "tool-audit",
    type: "agentTool",
    position: { x: 270, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Audit Log", icon: "audit" },
  },
  {
    id: "tool-logs",
    type: "agentTool",
    position: { x: 400, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Agent Logs", icon: "logs" },
  },
  {
    id: "tool-search",
    type: "agentTool",
    position: { x: 540, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Elastic Search", icon: "search" },
  },
  {
    id: "tool-services",
    type: "agentTool",
    position: { x: 700, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Services", icon: "services" },
  },
  {
    id: "tool-vault",
    type: "agentTool",
    position: { x: 830, y: 50 },
    parentId: "group-agent-tools",
    extent: "parent",
    data: { label: "Vault", icon: "vault" },
  },

  {
    id: "insight-agent",
    type: "subAgent",
    position: { x: 800, y: 770 },
    data: {
      label: "Insight Agent",
      showAddButton: true,
      handles: [{ position: "Top", type: "target", id: "top" }],
    },
  },

  // ---------------- EMR Group ----------------
  {
    id: "group-emr",
    type: "group",
    position: { x: 1600, y: 175 },
    style: {
      zIndex: -1,
      width: 150,
      height: 350,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 32,
      padding: 10,
    },
    data: { label: "" },
  },
  {
    id: "emr-1",
    type: "emr",
    position: { x: 16, y: 25 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR 1",
      isLeftHandle: true,
      handles: [{ position: "Left", type: "target", id: "left" }],
    },
  },
  {
    id: "emr-2",
    type: "emr",
    position: { x: 16, y: 130 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR 2",
      isLeftHandle: true,
      handles: [{ position: "Left", type: "target", id: "left" }],
    },
  },
  {
    id: "emr-n",
    type: "emr",
    position: { x: 16, y: 230 },
    parentId: "group-emr",
    extent: "parent",
    data: {
      label: "EMR n",
      isLeftHandle: true,
      handles: [{ position: "Left", type: "target", id: "left" }],
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "scheduler-rcm",
    source: "scheduler",
    target: "rcm-maestro",
    type: "beizier",
    // animated: true,
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#0D74CE", // 👈 arrow color
    },
    style: { stroke: "#0D74CE", strokeWidth: 2 },
  },
  {
    id: "config-rcm",
    source: "config",
    target: "rcm-maestro",
    type: "bezier",
    // animated: true,
    style: { stroke: "#0D74CE", strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#0D74CE", // 👈 arrow color
    },
    targetHandle: "left-2",
  },
  {
    id: "inbox-intake",
    source: "inbox",
    target: "intake-orchestrator",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
    targetHandle: "left-2",
  },
  {
    id: "sftp-intake",
    source: "sftp",
    target: "intake-orchestrator",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
    targetHandle: "left",
  },
  {
    id: "s3-intake",
    source: "amazon-s3",
    target: "intake-orchestrator",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
    targetHandle: "left-3",
  },
  {
    id: "rcm-intake",
    source: "rcm-maestro",
    target: "intake-orchestrator",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom-1",
    targetHandle: "top",
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },
  {
    id: "rcm-recon",
    source: "rcm-maestro",
    target: "reconciliation",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom-2",
    targetHandle: "top",
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },
  {
    id: "rcm-cash",
    source: "rcm-maestro",
    target: "cash-posting",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom-3",
    targetHandle: "top",
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },

  {
    id: "intake-api",
    source: "intake-orchestrator",
    target: "tool-api",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom",
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },
  {
    id: "recon-log",
    source: "reconciliation",
    target: "tool-logs",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom",
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },
  {
    id: "cash-vault",
    source: "cash-posting",
    target: "tool-vault",
    type: "smoothstep",
    // animated: true,
    style: { stroke: "#859598", strokeWidth: 2 },
    sourceHandle: "bottom",
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
  },

  // Agent Tools to Insight Agent connections

  {
    id: "tool-logs-insight",
    source: "tool-search",
    target: "insight-agent",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
    targetHandle: "top",
  },

  {
    id: "cash-emr1",
    source: "cash-posting",
    target: "emr-1",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-emr2",
    source: "cash-posting",
    target: "emr-2",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-emrn",
    source: "cash-posting",
    target: "emr-n",
    type: "smoothstep",
    // animated: true,
    markerEnd: {
      type: "arrowclosed", // 👈 adds arrow
      width: 20,
      height: 20,
      color: "#859598", // 👈 arrow color
    },
    style: { stroke: "#859598", strokeWidth: 2 },
  },
];

const RCMMaestroAgent = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mt-3">
        {RCM_MAESTRO_AGENT_DATA.map((item, index) => (
          <MapCard
            key={index}
            headerText={item.headerText}
            percentage={item.percentage}
            value={item.value}
            colorClass={item.colorClass}
            image={item.image} // ✅ added
            status={item.status}
          />
        ))}
      </div>
      <div className="flex justify-between gap-2 p-8 mt-4 bg-[#E6EEF4] rounded-3xl">
        <WorkflowPage initialNodes={initialNodes} initialEdges={initialEdges} />
      </div>
    </div>
  );
};

export default RCMMaestroAgent;
