import { Heading } from "@/components/heading/Heading";
import { Areachart, Block, Piechart } from "@/system/components";
import ColumnDefinition from "@/system/components/tables/recent-activities/ColumnDefinition";
import RecentActivities from "@/system/components/tables/recent-activities/RecentActivities";
import { equipmentChartConfig } from "@/system/features/equipments/equipmentChartData";
import useEquipmentsAnalytics from "@/system/features/equipments/useEquipmentsAnalytics";

import ViewEquipment from "@/system/features/equipments/view-equipment/ViewEquipment";

import useRecentActivities from "@/system/features/recent-activities/useRecentActivities";
import { memberChartConfig } from "@/system/features/users/members/membersChartData";
import useMembersAnalytics from "@/system/features/users/members/useMembersAnalytics";
import { useState } from "react";

export default function AdminDashboard() {
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [openView, setOpenView] = useState<boolean>(false);

  const { data: recentActivitiesData, error: activitiesError } =
    useRecentActivities();

  const {
    stats: equipmentStats,
    chartData: equipmentChartData,
    error: equipmentError,
  } = useEquipmentsAnalytics();

  const {
    stats: memberStats,
    chartData: memberChartData,
    error: memberError,
  } = useMembersAnalytics();

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
            title="Members Status"
            className="col-span-full md:col-[1/2] lg:col-[1/2]"
          >
            {memberError ? (
              <>An Error Occurred : Make an error page here</>
            ) : (
              <Piechart
                nameKey="status"
                entity="Members"
                stats={memberChartData}
                config={memberChartConfig}
                count={memberStats.total}
              />
            )}
          </Block>
          <Block
            type={"figure"}
            icon="lucide:package"
            title="membership ratio | after client module"
            className="col-span-full md:col-[2/-1] lg:col-[2/3] "
          >
            <Piechart
              entity="Members"
              config={equipmentChartConfig}
              nameKey="status"
              stats={[
                {
                  status: "active",
                  count: 25,
                  fill: "#1A5E63",
                },
                {
                  status: "inactive",
                  count: 10,
                  fill: "#7FD7DC",
                },
                {
                  status: "pending",
                  count: 15,
                  fill: "#CFF0F2",
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
            {equipmentError ? (
              <>An Error Occurred : Make an error page here</>
            ) : (
              <Piechart
                nameKey="status"
                entity="Equipments"
                stats={equipmentChartData}
                config={equipmentChartConfig}
                count={equipmentStats.total}
              />
            )}
          </Block>
          <div className="relative overflow-hidden shadow-general col-span-full md:col-[2/-1] lg:col-[1/2]">
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </div>

          <Block
            type={"figure"}
            icon="lucide:package"
            title="revenue collected | after client module"
            className="col-span-full lg:col-[2/-1] w-full "
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
                columns={ColumnDefinition(setOpenView, setSelectedIds)}
                resultCount={recentActivitiesData.count || 0}
                count={equipmentStats.total || 0}
                data={recentActivitiesData.data}
              />
            ) : (
              <p className="text-destructive">Error Fetching Activities Data</p>
            )}
          </Block>
        </div>
      </div>
      <ViewEquipment
        selectedId={selectedIds}
        isDialogOpen={openView}
        setIsDialogOpen={setOpenView}
        edit={false}
      />
    </section>
  );
}
