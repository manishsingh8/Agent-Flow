import { type ReactNode } from "react";

type ColumnRule = {
  bodyClassName?: string;
  conditionalClassName?: (value: unknown, row?: unknown) => string;
};

type BuildColumnsOptions<T> = {
  tableData: T[];
  labelMap?: Partial<Record<keyof T, string>>;
  excludeKeys?: Array<keyof T>;
  amountFields?: Array<keyof T>;
  columnRules?: Record<string, ColumnRule>;
  amountFormatter?: (value: number) => ReactNode;
  defaultRenderer?: (value: unknown) => ReactNode;
};

export function buildColumns<T extends Record<string, any>>({
  tableData,
  labelMap = {},
  excludeKeys = [],
  amountFields = [],
  columnRules = {},
  amountFormatter = (val) => `$${val.toFixed(2)}`,
  defaultRenderer = (val) =>
    val === null || val === undefined || val === "" ? "-" : String(val),
}: BuildColumnsOptions<T>) {
  if (!tableData.length) return [];

  return (Object.keys(tableData[0]) as Array<keyof T>)
    .filter((key) => !excludeKeys.includes(key))
    .map((key) => {
      const rule = columnRules[String(key)] || {};
      const isAmount = amountFields.includes(key);

      return {
        key,
        label:
          labelMap[key] ??
          String(key)
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()),

        isAmount,

        render: isAmount
          ? (val: unknown) =>
              typeof val === "number" ? amountFormatter(val) : "-"
          : (val: unknown) => defaultRenderer(val),

        bodyClassName: rule.bodyClassName ?? "",
        conditionalClassName: rule.conditionalClassName,
      };
    });
}
