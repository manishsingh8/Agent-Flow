import KpiCard from "@/components/KpiCard/KpiCard";
import { AreaChart } from "lucide-react";
import useRCMDashboard from "./RCMDashboard.hook";
// import { Card, CardContent, CardHeader } from "@/components/KpiCard/UI/Card";
// import UserProductivityTable from "@/components/UserProductivityTable/UserProductivityTable";
import OperationalView from "@/components/OperationalView/OperationalView";
import CustomBarChart from "@/components/CustomBarChart/CustomBarChart";
import { workQueueData } from "@/constants/RCMDashboardData";
import { workQueueSegments } from "@/constants/RCMDashboardData";

const RCMDashboard = () => {
  const { kpiCards, loading } = useRCMDashboard();
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border border-[#E6ECF0] p-4 pt-2.5 rounded-[14px] h-20">
        <div className="text-[20px] font-semibold text-[#0A0A0A]">
          <AreaChart className="mr-3 h-6 w-6 mb-2 text-primary inline-block" />{" "}
          Revenue Cycle Intelligence Dashboard
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">
            Monitor team productivity, work queue health, and overall RCM
            performance.
          </span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-3 text-sm text-gray-500">
            Loading KPIs...
          </div>
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
      <div className="grid grid-cols-1 gap-4">
        {/* <Card>
          <CardHeader>
            <p className="text-md font-medium">
              Workforce Performance Overview
            </p>
          </CardHeader>
          <CardContent>
            <UserProductivityTable />
          </CardContent>
        </Card> */}
        <CustomBarChart
          title="Work Queue Activity Analysis"
          description="Daily Activity summary showing in the queue."
          data={workQueueData}
          xKey="date"
          segments={workQueueSegments}
          barSize={30}
        />
        {/* <WorkQueueVolumeChart /> */}
      </div>
      <OperationalView />
    </div>
  );
};

export default RCMDashboard;
