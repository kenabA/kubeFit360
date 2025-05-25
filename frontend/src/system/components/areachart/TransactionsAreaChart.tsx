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
  totalRevenue: {
    label: "Total Revenue (Rs.)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function TransactionsAreaChart({
  data,
}: {
  data: { date: string; totalRevenue: number }[];
}) {
  return (
    <Card className={"border-none shadow-none"}>
      {data.length > 0 ? (
        <>
          <CardHeader
            className={cn(
              "flex items-center gap-2 space-y-0 p-0 py-3 sm:flex-row"
            )}
          ></CardHeader>

          <ChartContainer
            config={chartConfig}
            className={cn(
              "mx-auto aspect-square max-h-[220px] md:max-h-[280px] w-full border-none"
            )}
          >
            <AreaChart
              data={data}
              accessibilityLayer
              margin={{ top: 10, left: 5, right: 10 }}
            >
              <defs>
                <linearGradient
                  id="fillTotalRevenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                tickCount={5}
                tickMargin={10} // Adds space between tick labels and chart
                label={{
                  value: "Revenue (Rs.)",
                  angle: -90,
                  position: "insideLeft", // Center vertically along Y axis
                  offset: 0, // You can tweak this to move left/right a bit
                  style: { fill: "#94a3b8", fontSize: 11 },
                }}
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
                fill="url(#fillTotalRevenue)"
                dataKey="totalRevenue"
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
          title="No Transactions Data"
          description="No transaction data available at the moment."
        />
      )}
    </Card>
  );
}

const formatNepaliCurrency = (value: number) => {
  if (value < 1000) return `${value}`;
  if (value >= 1000 && value < 100000) return `${(value / 1000).toFixed(1)}k`;
  if (value >= 100000 && value < 10000000)
    return `${(value / 100000).toFixed(1)}L`;
  return `${(value / 10000000).toFixed(1)}Cr`;
};

const CustomYAxisTick = ({ x, y, payload }: any) => {
  return (
    <text x={x + 5} y={y + 4} textAnchor="end" fontSize={12} fill="#94a3b8">
      {formatNepaliCurrency(payload.value)}
    </text>
  );
};

export default TransactionsAreaChart;
