import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
  ResponsiveContainer,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardFooter } from "@/components";
import { Calendar } from "lucide-react";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

type RadialChartProps = {
  totalDays: number;
  daysLeft: number;
  daysCompleted: number;
};

const chartConfig = {
  progress: {
    label: "Days Left",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export const RadialChart = React.memo(function RadialChart({
  totalDays,
  daysLeft,
  daysCompleted,
}: RadialChartProps) {
  const progress = useMemo(() => {
    return Math.round(((totalDays - daysLeft) / totalDays) * 100);
  }, [totalDays, daysLeft]);

  const chartData = useMemo(
    () => [
      {
        name: "Background",
        progress: 100,
        fill:
          daysLeft > 3
            ? "hsl(var(--accent-light))"
            : "hsl(var(--destructive-light))",
      },
      {
        name: "Progress",
        progress: 100 - progress,
        fill:
          daysLeft > 3 ? "var(--color-progress)" : "hsl(var(--destructive))",
      },
    ],
    [progress]
  );

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto relative w-full max-h-[200px] aspect-[1/1]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={chartData}
              startAngle={90}
              endAngle={-270}
              innerRadius="69%"
              outerRadius="103%"
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke={
                  daysLeft > 3 ? "fill-accent-light" : "fill-destructive-light"
                }
                className="fill-white"
                polarRadius={[86, 74]}
              />
              <RadialBar
                background={false}
                dataKey="progress"
                strokeWidth={2}
                cornerRadius={10}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className={cn(
                              "text-4xl font-bold",
                              daysLeft > 3
                                ? "fill-foreground"
                                : "fill-destructive"
                            )}
                          >
                            {daysLeft}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            Days Left
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <CardFooter className="flex-col gap-3 text-sm p-0">
          <div className="flex items-center gap-2 font-medium leading-none text-gray-secondary justify-center w-full">
            <Calendar className="h-4 w-4" />
            {daysCompleted} days completed
          </div>
          <p className="leading-none text-gray-tertiary text-center w-full">
            {Math.round(progress)}% of your program completed
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
});
