import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";

const chartConfig = {
  workoutPlan: {
    label: "Workout Plan",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function Barchart({
  className,
  stats,
}: {
  className: string;
  stats: any;
}) {
  console.log(stats);
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
          data={stats}
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
            dataKey="workoutPlan"
            fill="var(--color-workoutPlan)"
            radius={6}
            maxBarSize={46}
            type="natural"
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
