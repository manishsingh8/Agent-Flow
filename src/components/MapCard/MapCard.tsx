import TrandingUp from "@/assets/icons/trending-up.svg";
import TradingDown from "@/assets/icons/trending-down.svg";
import RightArrow from "@/assets/icons/arrow-right.svg";
interface MapCardProps {
  headerText: string;
  value: number | string;
  percentage: number | string;
  chartData?: number[];
  color?: string;
  colorClass?: {
    text: string;
    border: string;
    chart: string;
  };
  image?: any; // ✅ optional image prop
  status: string;
}

const MapCard = ({
  headerText,
  value,
  percentage,
  colorClass = {
    text: "text-teal-600",
    border: "border-teal-600",
    chart: "stroke-teal-600",
  },
  image, // ✅ destructured
  status,
}: MapCardProps) => {
  const isPositive = Number(percentage) >= 0;
  const getArrowIcon = () => {
    switch (status) {
      case "positive":
        return <img src={TrandingUp} alt="Up" className="w-4 h-4" />;
      case "negative":
        return <img src={TradingDown} alt="Down" className="w-4 h-4" />;
      default:
        return <img src={RightArrow} alt="Right" className="w-4 h-4" />;
    }
  };
  const percentageText = `${isPositive ? "+" : ""}${percentage}%`;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full">
      {/* Header with percentage badge */}
      <div className="flex items-center justify-between mb-4 h-4">
        <h3 className="text-xs font-medium text-gray-500">{headerText}</h3>
        <div
          className={`flex items-center gap-1 px-1 py-0 rounded-full border ${colorClass.border} ${colorClass.text}`}
        >
          <span className="text-xs font-semibold">{percentageText}</span>
          <span className="text-xs">{getArrowIcon()}</span>
        </div>
      </div>

      {/* Large value */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>

      {/* ✅ Conditional rendering: show image or chart */}
      {image ? (
        <div className="flex justify-center">
          <img
            src={image}
            alt={`${headerText} chart`}
            className="h-16 w-auto object-contain"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MapCard;
