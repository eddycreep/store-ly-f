"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Trophy } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const description = "An interactive pie chart showing top-rated staff members with customer ratings and rating counts.";

const staffData = [
  { staff: "John Doe", rating: 4.8, customerCount: 250, fill: "#ff2257" },
  { staff: "Jane Smith", rating: 4.6, customerCount: 190, fill: "#00d384" },
  { staff: "Mike Johnson", rating: 4.9, customerCount: 170, fill: "#ffa726" },
  { staff: "Emily Davis", rating: 4.5, customerCount: 160, fill: "#1ec3ff" },
  { staff: "Sarah Brown", rating: 4.7, customerCount: 150, fill: "#D4D4D4" },
];

const chartConfig = {
  Percentage: {
    label: "Percentage",
    color: "#ff2257",
  },
  Amount: {
    label: "Amount",
    color: "#00d384",
  },
} satisfies ChartConfig;

export function TopRatedStaffChart() {
  const id = "pie-staff-chart";
  const [activeStaff, setActiveStaff] = React.useState(staffData[0].staff);

  const activeIndex = React.useMemo(
    () => staffData.findIndex((item) => item.staff === activeStaff),
    [activeStaff]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <h5>Top Rated Staff Members</h5>
          <CardDescription>Customer Ratings and Rating Counts</CardDescription>
        </div>
        <Select value={activeStaff} onValueChange={setActiveStaff}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a staff member"
          >
            <SelectValue placeholder="Select staff member" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {staffData.map(({ staff }) => (
              <SelectItem key={staff} value={staff} className="rounded-lg [&_span]:flex">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: staffData.find(s => s.staff === staff)?.fill }}
                  />
                  {staff}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-[300px] h-[275px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={staffData}
              dataKey="customerCount"
              nameKey="staff"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {staffData[activeIndex].rating.toFixed(1)} / 5
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Rated by {staffData[activeIndex].customerCount.toLocaleString()} customers
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex items-center justify-center gap-2 font-medium">
          Staff Ratings <Trophy className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing average rating and number of customer ratings for top staff members
        </div>
      </CardFooter>
    </Card>
  );
}