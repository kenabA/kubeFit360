import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import NoData from "../no-data/NoData";
import { cn } from "@/lib/utils";

const chartConfig = {
  weight: {
    label: "Weight (kg)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function WeightProgressChart({
  data,
  selectedRange,
}: {
  data: { date: string; weight: number }[];
  selectedRange: string;
  setSelectedRange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (selectedRange === "30d") {
      daysToSubtract = 30;
    } else if (selectedRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className={"border-none shadow-none"}>
      {filteredData.length > 0 ? (
        <>
          <CardHeader
            className={cn(
              "flex items-center gap-2 space-y-0 p-0 py-4 lg:py-6 xl:py-8 2xl:py-8 sm:flex-row"
            )}
          ></CardHeader>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[220px] md:max-h-[250px] w-full border-none"
          >
            <AreaChart
              data={filteredData}
              accessibilityLayer
              margin={{ top: 10, left: -10, right: 10 }}
            >
              <defs>
                <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#E2E7EB" vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                fontSize={11}
                textAnchor="middle"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={<CustomYAxisTick />}
                tickCount={4}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />

              <Area
                fill="url(#fillWeight)"
                dataKey="weight"
                type="natural"
                fillOpacity={0.5}
                stroke="hsl(var(--primary))"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </>
      ) : (
        <NoData
          className="py-12"
          title="No Weight Data"
          description="No weight data available for the selected range."
        />
      )}
    </Card>
  );
}

const CustomYAxisTick = ({ x, y, payload }: any) => {
  return (
    <text x={x - 10} y={y + 4} textAnchor="end" fontSize={12} fill="#94a3b8">
      {payload.value}kg
    </text>
  );
};
