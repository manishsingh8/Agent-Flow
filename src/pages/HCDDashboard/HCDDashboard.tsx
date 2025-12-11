import { HCD_CARDS } from "@/constants/ChartsData";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import CustomDoughnutChart from "@/components/CustomDoughnutChart/CustomDoughnutChart";
import CustomBarChart from "@/components/CustomBarChart/CustomBarChart";
import { AlertTriangle } from "lucide-react";
import CustomAreaChart from "@/components/CustomAreaChart/CustomAreaChart";
import {
  AVG_TIME_CHART_DATA,
  TOP_EXCEPTION_CHART_DATA,
  DAILY_DOCS_CHART_DATA,
  DOCUMENT_STATUS_CHART_DATA,
  DAILY_DOCS_SEGMENTS_DATA,
  agentData,
  processingTimeData,
  slaComplianceData,
  slaSegments,
} from "@/constants/ChartsData";

const Dashboard2 = () => {
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          HCD Dashboard
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">HCD Dashboard</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {HCD_CARDS.map((card) => (
          <PaymentCard
            key={card.id}
            headerText={card.headerText}
            amount={card.amount}
            border={card.border}
            borderColor="#E5E5E5"
          />
        ))}
      </div>
      <div className="flex gap-4">
        <CustomBarChart
          title="Average Processing Time (min)"
          description="Average time (in minutes) to process documents by workflow."
          data={AVG_TIME_CHART_DATA}
          xKey="workflow"
          dataKey="time"
          color="#249563"
          barSize={40}
          tooltipLabel="Processing Time"
        />
        <CustomDoughnutChart
          title="Top Exception Reasons"
          description="Breakdown of documents that failed automated processing."
          icon={AlertTriangle}
          data={TOP_EXCEPTION_CHART_DATA}
          legendPosition="right"
        />
      </div>
      <div className="flex gap-4">
        <CustomBarChart
          title="Daily Document Volume by Type (Oct 2025)"
          description="Breakdown of document types processed daily"
          data={DAILY_DOCS_CHART_DATA}
          xKey="date"
          segments={DAILY_DOCS_SEGMENTS_DATA}
          barSize={20}
        />
        <CustomDoughnutChart
          title="Documents by Status"
          description=""
          data={DOCUMENT_STATUS_CHART_DATA}
          legendPosition="right"
        />
      </div>
      <div className="flex gap-4">
        <div className="w-[50%]">
          <CustomBarChart
            title="Total Documents Processed per Agent (30 Days)"
            data={agentData}
            xKey="agentId"
            dataKey="completed"
            color="#249563"
            tooltipLabel="Completed Documents"
            xAxisLabel="Agent ID"
            yAxisLabel="Total Completed Documents"
          />
        </div>
        <div className="w-[50%]">
          <CustomBarChart
            title="Average Processing Time by Document Type"
            data={processingTimeData}
            xKey="documentType"
            dataKey="avgTime"
            color="#1D4ED8"
            tooltipLabel="Hours"
            xAxisLabel="Document Type"
            yAxisLabel="AVG Processing Time (Hours)"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-[50%]">
          <CustomAreaChart
            title="SLA Compliance Over Time (Documents Processed)"
            data={slaComplianceData}
            xKey="date"
            segments={slaSegments}
            xAxisLabel="Date"
            yAxisLabel="Document Count"
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard2;
