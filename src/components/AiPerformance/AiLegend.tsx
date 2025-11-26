interface AiLegendItem {
  value?: string;
  color?: string;
}

interface AiLegendProps {
  payload?: AiLegendItem[];
}

export function AiLegend({ payload }: AiLegendProps) {
  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap gap-x-6 gap-y-2 px-6 pb-4 pt-2 text-sm">
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{
              backgroundColor: item.color,
              opacity: 0.85,
            }}
          />
          <span
            className="font-medium"
            style={{
              color: item.color,
            }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

