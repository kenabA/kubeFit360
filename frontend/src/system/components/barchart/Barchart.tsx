import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 405 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function Barchart({ className }: { className: string }) {
  return (
    <Card className="shadow-none border-none">
      <ChartContainer
        config={chartConfig}
        className={cn(
          "mx-auto aspect-square max-h-[200px] md:max-h-[250px] w-full",
          className
        )}
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: -24,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={4}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar
            dataKey="desktop"
            fill="var(--color-desktop)"
            radius={6}
            maxBarSize={46}
            type="natural"
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
