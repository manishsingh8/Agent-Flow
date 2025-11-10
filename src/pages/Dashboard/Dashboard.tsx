import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import CashPostingAgent from "./sections/CashPostingAgent";
import IntakeOrchestratorAgent from "./sections/IntakeOrchestratorAgent";
import RCMMaestroAgent from "./sections/RCMMaestroAgent";
import ReconciliationAgent from "./sections/ReconciliationAgent";
import { ChevronDown } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="bg-[#cfdde8] p-4 flex justify-center">
      <Tabs defaultValue="rcm" className="w-[100%]">
        <div className="flex">
          <TabsList className="bg-transparent gap-2 flex justify-center items-center w-[100%]">
            <TabsTrigger
              value="rcm"
              className="cursor-pointer rounded-full p-5 data-[state=active]:bg-[#249563] data-[state=active]:text-white data-[state=inactive]:bg-[#E6EEF4] data-[state=inactive]:text-gray-700 max-w-[15%]"
            >
              RCM Maestro Agent
            </TabsTrigger>
            <TabsTrigger
              value="intake"
              className="cursor-pointer rounded-full p-5 data-[state=active]:bg-[#249563] data-[state=active]:text-white data-[state=inactive]:bg-[#E6EEF4] data-[state=inactive]:text-gray-700 max-w-[15%]"
            >
              Intake Orchestrator Agent
            </TabsTrigger>
            <TabsTrigger
              value="reconciliation"
              className="cursor-pointer rounded-full p-5 data-[state=active]:bg-[#249563] data-[state=active]:text-white data-[state=inactive]:bg-[#E6EEF4] data-[state=inactive]:text-gray-700 max-w-[15%]"
            >
              Reconciliation Agent
            </TabsTrigger>
            <TabsTrigger
              value="cashPosting"
              className="cursor-pointer rounded-full p-5 data-[state=active]:bg-[#249563] data-[state=active]:text-white data-[state=inactive]:bg-[#E6EEF4] data-[state=inactive]:text-gray-700 max-w-[15%]"
            >
              Cash Posting Agent
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1 underline decoration-[1.5px] underline-offset-2 decoration-gray-800 cursor-pointer">
            <span>1Week</span>
            <ChevronDown className="w-4 h-4 text-gray-800" />
          </div>
        </div>
        <TabsContent value="rcm">
          <RCMMaestroAgent />
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
