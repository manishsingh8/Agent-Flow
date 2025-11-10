
import { CASH_POSTING_DATA } from "@/constants/DashboardData";
import { MapCard } from "@/components";
import WorkflowPage from "./Workflow/WorkFlow";
import { type Node, type Edge } from "reactflow";

const initialNodes: Node[] = [
  // ---------------- Group 1 ----------------
  {
    id: "config",
    type: "integration",
    position: { x: 16, y: 100 },
    data: { label: "Config", icon: "config" },
  },
  // ---------------- Group 2 ----------------

  // ---------------- Center Agents ----------------
  {
    id: "rcm-maestro",
    type: "agent",
    position: { x: 600, y: 50 },
    data: {
      label: "Cash Posting Agent",
      showLogo: true,
      showAddButton: true,
      handles: ["bottom"],
    },
  },
  {
    id: "intake-orchestrator",
    type: "agent",
    position: { x: 200, y: 300 },
    data: {
      label: "CP for EMR1",
      showLogo: false,
      showAddButton: true,
      handles: ["left", "bottom"],
    },
  },
  {
    id: "reconciliation",
    type: "agent",
    position: { x: 530, y: 300 },
    data: {
      label: "CP for EMR2",
      showAddButton: true,
      showLogo: false,
    },
  },
  {
    id: "cash-posting",
    type: "agent",
    position: { x: 870, y: 300 },
    data: { label: "CP for EMR3", showAddButton: true, showLogo: false },
  },
  {
    id: "cpn",
    type: "agent",
    position: { x: 1200, y: 300 },
    data: { label: "CP for EMRn", showAddButton: true, showLogo: false },
  },

  // ---------------- Agent Tools Group ----------------
  {
    id: "group-agent-tools",
    type: "group",
    position: { x: 350, y: 500 },
    style: {
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
    type: "agent",
    position: { x: 800, y: 700 },
    data: {
      label: "Insight Agent",
      showAddButton: true,
      handles: ["top", "bottom"],
    },
  },

  // ---------------- EMR Group ----------------
  {
    id: "group-emr",
    type: "group",
    position: { x: 16, y: 300 },
    style: {
      width: 150,
      height: 350,
      zIndex: -1,
      background: "#f9fafb",
      border: "1px solid #d1d5db",
      borderRadius: 32,
      padding: 10,
    },
    data: { label: "" },
  },
  {
    id: "emr1",
    type: "emr",
    position: { x: 16, y: 25 },
    parentId: "group-emr",
    extent: "parent",
    data: { label: "EMR 1" },
  },
  {
    id: "emr2",
    type: "emr",
    position: { x: 16, y: 130 },
    parentId: "group-emr",
    extent: "parent",
    data: { label: "EMR 2" },
  },
  {
    id: "emr3",
    type: "emr",
    position: { x: 16, y: 230 },
    parentId: "group-emr",
    extent: "parent",
    data: { label: "EMR n" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "scheduler-rcm",
    source: "scheduler",
    target: "rcm-maestro",
    type: "bezier",
    style: { stroke: "#0D74CE", strokeWidth: 2 },
  },
  {
    id: "config-rcm",
    source: "config",
    target: "rcm-maestro",
    type: "bezier",
    style: { stroke: "#0D74CE", strokeWidth: 2 },
  },
  {
    id: "rcm-recon",
    source: "rcm-maestro",
    target: "reconciliation",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "rcm-intake",
    source: "rcm-maestro",
    target: "intake-orchestrator",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "rcm-cash",
    source: "rcm-maestro",
    target: "cash-posting",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "rcm-cpn",
    source: "rcm-maestro",
    target: "cpn",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },

  {
    id: "intake-api",
    source: "intake-orchestrator",
    target: "tool-api",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "recon-log",
    source: "reconciliation",
    target: "tool-logs",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-vault",
    source: "cash-posting",
    target: "tool-services",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-vault",
    source: "cpn",
    target: "tool-vault",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },

  // emr connection
  {
    id: "emr1-cp1",
    source: "emr1",
    target: "intake-orchestrator",
    type: "bezier",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "emr2-cp2",
    source: "emr2",
    target: "reconciliation",
    type: "customCurve",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "emr3-cp3",
    source: "emr3",
    target: "cpn",
    type: "customCurve",
    style: { stroke: "#859598", strokeWidth: 2 },
  },

  // Agent Tools to Insight Agent connections

  {
    id: "tool-logs-insight",
    source: "tool-search",
    target: "insight-agent",
    type: "smoothstep",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "inbox-intake",
    source: "inbox",
    target: "intake-orchestrator",
    type: "customCurve",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "sftp-intake",
    source: "sftp",
    target: "intake-orchestrator",
    type: "customCurve",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "s3-intake",
    source: "amazon-s3",
    target: "intake-orchestrator",
    type: "customCurve",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-emr1",
    source: "cash-posting",
    target: "emr-1",
    type: "bezier",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-emr2",
    source: "cash-posting",
    target: "emr-2",
    type: "bezier",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
  {
    id: "cash-emrn",
    source: "cash-posting",
    target: "emr-n",
    type: "bezier",
    style: { stroke: "#859598", strokeWidth: 2 },
  },
];

const CashPostingAgent = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mt-3">
        {CASH_POSTING_DATA.map((item, index) => (
          <MapCard
            key={index}
            headerText={item.headerText}
            percentage={item.percentage}
            value={item.value}
            colorClass={item.colorClass}
            image={item.image} // ✅ added
          />
        ))}
      </div>
      <div className="flex justify-between gap-2 p-8 mt-4 bg-[#E6EEF4] rounded-3xl">
        <WorkflowPage initialNodes={initialNodes} initialEdges={initialEdges} />
      </div>
    </div>
  );
};

export default CashPostingAgent;
