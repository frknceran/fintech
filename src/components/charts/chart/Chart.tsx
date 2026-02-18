import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type WorkingCapitalPoint = {
  date: string;
  income: number;
  expenses: number;
};

type ChartProps = {
  data?: WorkingCapitalPoint[];
};

const formatYAxis = (v: number) => `${v / 1000}K`;

const formatTooltipValue = (value: number) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const Chart = ({ data: dataProp }: ChartProps) => {
  const [range, setRange] = useState("7");
  const data = dataProp?.length ? dataProp : [];

  return (
    <div className="w-full rounded-lg border border-[#F5F5F5] bg-white p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0 flex flex-1 flex-wrap items-center justify-between gap-2 pl-0 sm:gap-4 sm:pl-8">
          <h2 className="text-base font-semibold text-[#1B212D] sm:text-lg">
            Working Capital
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#1B212D] sm:gap-4 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#CAE34C]" />
              Expenses
            </span>
          </div>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-lg bg-[#F8F8F8] px-3 py-2 text-sm text-[#1B212D] outline-none"
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 16, fill: "#929EAE" }}
            axisLine={{ stroke: "#929EAE" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 16, fill: "#929EAE" }}
            axisLine={false}
            tickLine={false}
            domain={[0, "auto"]}
          />
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#929EAE"
            horizontal={false}
            vertical={true}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            formatter={(
              value: number | undefined,
              name: string | undefined
            ) => [value != null ? formatTooltipValue(value) : "", name ?? ""]}
            labelFormatter={(label) => label}
          />
          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#22C55E"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#22C55E" }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#CAE34C"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#A3E635" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
