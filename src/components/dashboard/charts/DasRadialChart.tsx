"use client"
import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { fetchProjectForChart } from "@/actions/chart-data"
import { useQuery } from "@tanstack/react-query"




export function DasRadialChart() {


  const { data } = useQuery({
    queryKey: ["fetchProjectforChart"],
    queryFn: async () => await fetchProjectForChart()
  })


  const chartData = [{ month: "january", your: data?.totalOwnedProjects, team: data?.totalTeamProjects }]

  const chartConfig = {
    your: {
      label: "Your Projects",
      color: "hsl(var(--chart-1))",
    },
    team: {
      label: "Team Projects",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  const totalVisitors = (chartData[0]?.your ?? 0) + (chartData[0]?.team ?? 0);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Projects</CardTitle>
        <CardDescription>January - Dec 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="your"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-your)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="team"
              fill="var(--color-team)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month  <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Project for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
