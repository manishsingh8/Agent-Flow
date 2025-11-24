import KpiCard from "@/components/KpiCard/KpiCard";
import { AreaChart } from "lucide-react";
import useRCMDashboard from "./RCMDashboard.hook";

const Dashboard1 = () => {
  const { kpiCards, loading } = useRCMDashboard();
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      {/* Header */}
      <div className="w-full border-[1px] border-[#E6ECF0] p-[16px] pt-[10px] rounded-[14px] h-[80px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          <AreaChart className="mr-3 h-6 w-6 mb-2 text-primary inline-block"/> RCM Dashboard 
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">Monitor team productivity, work queue health, and overall RCM performance.</span>
          {/* <img src={RightArrow} alt="right-arrow" className="mt-[6px]" />
              <span className="text-sm text-[#249563]">List</span> */}
        </div>
      </div>

      {/* KPI Cards */}
      
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          // simple placeholder while loading
          <div className="col-span-3 text-sm text-gray-500">Loading KPIs...</div>
        ) : (
          kpiCards.map((c) => (
            <KpiCard
              key={c.title}
              title={c.title}
              value={c.value}
              description={c.description}
              iconName={c.iconName}
              trend={c.trend}
            />
          ))
        )}
      </div>
      
    </div>
  );
};

export default Dashboard1;
