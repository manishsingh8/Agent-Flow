import { cdaCardsData } from "@/constants/CDADashboard";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import ExceptionReasonsChart from "@/components/TimeChart/TimeChart";
import ProcessingTimeChart from "@/components/ProcessingChart/ProcessingChart";

const Dashboard2 = () => {
  return (
    <div className="p-4 flex flex-col h-[calc(100vh-64px)] overflow-auto gap-4">
      <div className="w-full border-[1px] border-[#E6ECF0] p-[16px] pt-[10px] rounded-[14px] h-[80px]">
        <div className="text-[20px] font-[600] text-[#0A0A0A]">
          CDA Evaluation Dashboard
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#737373]">
            CDA Evaluation Dashboard
          </span>
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
        <ProcessingTimeChart />
        <ExceptionReasonsChart />
      </div>
    </div>
  );
};

export default Dashboard2;
