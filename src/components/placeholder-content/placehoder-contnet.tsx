

import { Card, CardContent } from "@/components/ui/card";
import { DasAreaChart } from "../dashboard/charts/DasAreaChart";
import { DasRadialChart } from "../dashboard/charts/DasRadialChart";
import CompleteTasks from "../dashboard/charts/CompleteProjects";
import TotalCategory from "../dashboard/charts/TotalCategory";
import TotalTasks from "../dashboard/charts/TotalTasks";

export default function PlaceholderContent() {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4  min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex-1 gap-4  flex flex-col lg:flex-row">
            <div className="flex-[60%]  ">
              <DasAreaChart />
            </div>
            <div className="flex-[40%] ">
              <DasRadialChart />
            </div>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4 ">
            <CompleteTasks />
            <TotalCategory />
            <TotalTasks />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}