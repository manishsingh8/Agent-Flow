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
}

const MapCard = ({
  headerText,
  value,
  percentage,
  // chartData = [30, 50, 40, 60, 45, 70, 55],
  // color = "teal",
  colorClass = {
    text: "text-teal-600",
    border: "border-teal-600",
    chart: "stroke-teal-600",
  },
  image, // ✅ destructured
}: MapCardProps) => {
  const isPositive = Number(percentage) >= 0;
  const arrow = isPositive ? "↗" : "→";
  const percentageText = `${isPositive ? "+" : ""}${percentage}%`;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full">
      {/* Header with percentage badge */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-s font-medium text-gray-700">{headerText}</h3>
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${colorClass.border} ${colorClass.text}`}
        >
          <span className="text-s font-semibold">{percentageText}</span>
          <span className="text-s">{arrow}</span>
        </div>
      </div>

      {/* Large value */}
      <div className="mb-4">
        <p className="text-4xl font-bold text-gray-900">{value}</p>
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
