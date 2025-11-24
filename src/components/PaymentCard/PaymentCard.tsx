interface PaymentCardProps {
  headerText: string;
  amount: string;
  bgColor?: string; // optional background color
  border?: boolean; // optional: show border
  borderColor?: string; // optional border color
}

const PaymentCard = ({
  headerText,
  amount,
  bgColor = "#FFFFFF",
  border = false,
  borderColor = "#E5E7EB", // default light gray
}: PaymentCardProps) => {
  return (
    <div
      className="flex flex-col gap-1 rounded-xl p-6"
      style={{
        backgroundColor: bgColor,
        border: border ? `1px solid ${borderColor}` : "none",
      }}
    >
      <div className="text-sm text-[#737373]">{headerText}</div>
      <div className="text-2xl font-semibold text-[#0A0A0A]">{amount}</div>
    </div>
  );
};

export default PaymentCard;
