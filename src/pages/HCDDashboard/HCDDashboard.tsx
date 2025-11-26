import { cdaCardsData } from "@/constants/CDADashboard";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import CustomDoughnutChart from "@/components/CustomDoughnutChart/CustomDoughnutChart";
import CustomBarChart from "@/components/CustomBarChart/CustomBarChart";
import { AlertTriangle } from "lucide-react";
import CustomAreaChart from "@/components/CustomAreaChart/CustomAreaChart";
import {
  parentData,
  data,
  data1,
  stackedData,
  stackSegments,
  agentData,
  processingTimeData,
  slaComplianceData,
  slaSegments,
} from "@/constants/ChartsData";

const Dashboard2 = () => {
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border-[1px] border-[#E6ECF0] p-[16px] pt-[10px] rounded-[14px] h-[80px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          HCD Dashboard
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">HCD Dashboard</span>
          {/* <img src={RightArrow} alt="right-arrow" className="mt-[6px]" />
          <span className="text-sm text-[#249563]">List</span> */}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cdaCardsData.map((card) => (
          <PaymentCard
            key={card.id}
            headerText={card.headerText}
            amount={card.amount}
            border={card.border}
            borderColor="#E5E5E5"
            // icon={card.icon}
            // textColor="#0A0A0A"
          />
        ))}
      </div>
      <div className="flex gap-4">
        <CustomBarChart
          title="Average Processing Time (min)"
          description="Average time (in minutes) to process documents by workflow."
          data={parentData}
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
          data={data1}
          legendPosition="right" // or "bottom"
        />
      </div>
      <div className="flex gap-4">
        <CustomBarChart
          title="Daily Document Volume by Type (Oct 2025)"
          description="Breakdown of document types processed daily"
          data={stackedData}
          xKey="date"
          segments={stackSegments}
          barSize={20}
        />
        <CustomDoughnutChart
          title="Documents by Status"
          description=""
          data={data}
          legendPosition="right" // or "bottom"
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
