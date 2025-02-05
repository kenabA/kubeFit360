import { Heading } from "@/components/heading/Heading";
import { Areachart, Block, Piechart } from "@/system/components";
import RecentActivities from "@/system/components/tables/recent-activities/RecentActivities";
import { equipmentChartConfig } from "@/system/features/equipments/equipmentChartData";
import { TEquipmentsStats } from "@/system/features/equipments/type";

import useRecentActivities from "@/system/features/recent-activities/useRecentActivities";
import { useState } from "react";

export default function AdminDashboard() {
  const [stats] = useState<TEquipmentsStats>({
    active: 0,
    inactive: 0,
    underMaintenance: 0,
    total: 0,
  });

  const { data: recentActivitiesData, error: activitiesError } =
    useRecentActivities();
  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"}>
          Dashboard
        </Heading>
        <div className="h-full grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] gap-6 mt-6 ">
          <Block
            type={"figure"}
            icon="lucide:package"
            title="equipments visualization"
            className="col-span-full md:col-[1/2] lg:col-[1/2]"
          >
            <Piechart
              config={equipmentChartConfig}
              stats={[
                {
                  status: "active",
                  count: 25,
                  fill: "#FF5733",
                },
                {
                  status: "inactive",
                  count: 10,
                  fill: "#3498DB",
                },
                {
                  status: "pending",
                  count: 15,
                  fill: "#F1C40F",
                },
              ]}
              count={23}
            />
          </Block>
          <Block
            type={"figure"}
            icon="lucide:package"
            title="equipments visualization"
            className="col-span-full md:col-[2/-1] lg:col-[2/3]"
          >
            <Piechart
              config={equipmentChartConfig}
              stats={[
                {
                  status: "active",
                  count: 25,
                  fill: "#FF5733",
                },
                {
                  status: "inactive",
                  count: 10,
                  fill: "#3498DB",
                },
                {
                  status: "pending",
                  count: 15,
                  fill: "#F1C40F",
                },
              ]}
              count={23}
            />
          </Block>
          <Block
            type={"figure"}
            icon="lucide:package"
            title="equipments visualization"
            className="col-span-full md:col-[1/2] lg:col-[3/4]"
          >
            <Piechart
              config={equipmentChartConfig}
              stats={[
                {
                  status: "active",
                  count: 25,
                  fill: "#FF5733",
                },
                {
                  status: "inactive",
                  count: 10,
                  fill: "#3498DB",
                },
                {
                  status: "pending",
                  count: 15,
                  fill: "#F1C40F",
                },
              ]}
              count={23}
            />
          </Block>
          <div className="relative overflow-hidden shadow-general col-span-full md:col-[2/-1] lg:col-[1/2]">
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </div>

          <Block
            type={"figure"}
            icon="lucide:package"
            title="revenue collected"
            className="col-span-full lg:col-[2/-1] w-full"
          >
            <Areachart className="mt-8" />
          </Block>

          <Block
            type={"table"}
            title="recent activities"
            icon="lucide:package"
            className="bg-white shadow-general border col-span-full rounded-xl"
          >
            {!activitiesError ? (
              <RecentActivities
                resultCount={recentActivitiesData.count || 0}
                count={stats.total || 0}
                data={recentActivitiesData.data}
              />
            ) : (
              <p className="text-destructive">Error Fetching Activities Data</p>
            )}
          </Block>
        </div>
      </div>
    </section>
  );
}
