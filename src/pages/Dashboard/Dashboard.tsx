import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import CashPostingAgent from "./sections/CashPostingAgent";
import IntakeOrchestratorAgent from "./sections/IntakeOrchestratorAgent";
import RCMMaestroAgent from "./sections/RCMMaestroAgent";
import ReconciliationAgent from "./sections/ReconciliationAgent";
import { ChevronDown } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem("activetab") || "rcm"
  );
  useEffect(() => {
    sessionStorage.setItem("activetab", activeTab);
  }, [activeTab]);
  return (
    <div
      className="bg-[#cfdde8] p-4 flex justify-center h-[calc(100vh-64px)] overflow-auto"
      style={{
        background:
          "linear-gradient(0deg, #E6EEF4, #CFDDE8), linear-gradient(90deg, rgba(230, 238, 244, 0.8) 0%, rgba(207, 221, 232, 0.8) 49.49%, rgba(195, 202, 230, 0.8) 100%)",
      }}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[100%]">
        <div className="flex justify-between w-[100%]">
          <TabsList className="bg-transparent gap-2 flex justify-center items-center w-[90%] ">
            <TabsTrigger
              value="rcm"
              className="cursor-pointer rounded-full px-5 py-5 data-[state=active]:bg-[#249563] data-[state=active]:text-white data-[state=inactive]:bg-[#E6EEF4] data-[state=inactive]:text-gray-700"
            >
              RCM Maestro Agent
            </TabsTrigger>
            <TabsTrigger
              value="intake"
              className="cursor-pointer rounded-full px-5 py-5 data-[state=active]:bg-[#249563] data-[state=active]:text-white data-[state=inactive]:bg-[#E6EEF4] data-[state=inactive]:text-gray-700 "
            >
              Intake Orchestrator Agent
            </TabsTrigger>
            <TabsTrigger
              value="reconciliation"
              className="cursor-pointer rounded-full px-5 py-5 data-[state=active]:bg-[#249563] data-[state=active]:text-white data-[state=inactive]:bg-[#E6EEF4] data-[state=inactive]:text-gray-700 "
            >
              Reconciliation Agent
            </TabsTrigger>
            <TabsTrigger
              value="cashPosting"
              className="cursor-pointer rounded-full px-5 py-5 data-[state=active]:bg-[#249563] data-[state=active]:text-white data-[state=inactive]:bg-[#E6EEF4] data-[state=inactive]:text-gray-700 "
            >
              Cash Posting Agent
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1 underline decoration-[1.5px] underline-offset-2 decoration-gray-800 cursor-pointer w-[10%] justify-end">
            <span>1Week</span>
            <ChevronDown className="w-4 h-4 text-gray-800" />
          </div>
        </div>
        <TabsContent value="rcm">
          <RCMMaestroAgent setActiveTab={setActiveTab} />
        </TabsContent>
        <TabsContent value="intake">
          <IntakeOrchestratorAgent />
        </TabsContent>
        <TabsContent value="reconciliation">
          <ReconciliationAgent />
        </TabsContent>
        <TabsContent value="cashPosting">
          <CashPostingAgent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
