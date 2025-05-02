import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";
import { Card } from "@/components";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "March", desktop: 237 },
  { month: "May", desktop: 209 },
  { month: "July", desktop: 214 },
  { month: "September", desktop: 73 },
  { month: "November", desktop: 305 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function Component({ className }: { className: string }) {
  return (
    <Card className="shadow-none border-none">
      <ChartContainer
        config={chartConfig}
        className={cn(
          "mx-auto aspect-square max-h-[200px] md:max-h-[250px] w-full",
          className
        )}
      >
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: -20,
            right: 12,
          }}
        >
          <CartesianGrid stroke="#E2E7EB" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={4}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            fill="url(#fillDesktop)"
            dataKey="desktop"
            type="natural"
            fillOpacity={0.5}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
