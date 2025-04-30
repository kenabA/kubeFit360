import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Card, CardContent, CardFooter } from "@/components";
import { TrendingUp } from "lucide-react";

// Example values
const totalDays = 90;
const daysLeft = 11;

// Progress: How much time has passed (in %)
const progress = 100 - ((totalDays - daysLeft) / totalDays) * 100;

// Data with two layers: background (full ring) and foreground (progress)
const chartData = [
  { name: "Background", progress: 100, fill: "hsl(var(--accent-light))" }, // light background
  { name: "Progress", progress, fill: "var(--color-progress)" },
];

const chartConfig = {
  progress: {
    label: "Days Left",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function RadialChart() {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="fill-accent-light"
              className="fill-white"
              polarRadius={[86, 74]}
            />
            <RadialBar
              background={false}
              dataKey="progress"
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
                          className="fill-foreground text-4xl font-bold"
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
        </ChartContainer>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
