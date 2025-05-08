import { Heading } from "@/components/heading/Heading";
import { Block, Piechart } from "@/system/components/index";
import { motion } from "framer-motion";
import { useState } from "react";

import { equipmentChartConfig } from "@/system/features/equipments/equipmentChartData";
import useRecentActivities from "@/system/features/recent-activities/useRecentActivities";
import RecentActivities from "@/system/components/tables/recent-activities/RecentActivities";
import ViewEquipment from "@/system/features/equipments/view-equipment/ViewEquipment";
import ColumnDefinition from "@/system/components/tables/recent-activities/ColumnDefinition";
import { TRecentActivities } from "@/system/features/recent-activities/type";
import useEquipmentsAnalytics from "@/system/features/equipments/useEquipmentsAnalytics";
import { Barchart } from "@/system/components/barchart/Barchart";
import useWorkoutPlanAnalytics from "@/system/features/workout-plan/useWorkoutPlanAnalytics";
import { dynamicContainerVariants } from "@/lib/utils";

export default function TrainerDashboard() {
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [openView, setOpenView] = useState<boolean>(false);

  const { data: recentActivitiesData, error: activitiesError } =
    useRecentActivities();

  const { chartData: workoutPlanChartData } = useWorkoutPlanAnalytics();

  const { stats, chartData, error } = useEquipmentsAnalytics();

  console.log(chartData);

  if (error) {
    return <>An Error Occurred</>;
  }

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"}>
          Dashboard
        </Heading>

        <div className="h-full grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto,1fr] gap-6 mt-6">
          <motion.div
            variants={dynamicContainerVariants(1)}
            initial="hidden"
            animate="visible"
            className="col-span-full md:col-[1/2] lg:col-[1/2]"
          >
            <Block type={"figure"} icon="lucide:package" title="plan creation">
              <Barchart stats={workoutPlanChartData} className="mt-8" />
            </Block>
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(2)}
            initial="hidden"
            animate="visible"
            className="col-span-full md:col-[2/-1] lg:col-[2/3]"
          >
            <Block
              type={"figure"}
              icon="lucide:package"
              title="equipments visualization"
            >
              <Piechart
                nameKey="status"
                entity="Equipments"
                config={equipmentChartConfig}
                stats={chartData}
                count={stats.total}
              />
            </Block>
          </motion.div>

          <motion.div
            variants={dynamicContainerVariants(3)}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden shadow-general col-span-full md:col-[1/2] lg:col-[3/4]"
          >
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(3)}
            initial="hidden"
            animate="visible"
            className="col-span-full"
          >
            <Block
              type={"table"}
              title="recent activities"
              icon="lucide:package"
              className="bg-white shadow-general border  rounded-xl"
            >
              {!activitiesError ? (
                <RecentActivities<TRecentActivities>
                  columns={ColumnDefinition(setOpenView, setSelectedIds)}
                  resultCount={recentActivitiesData.count || 0}
                  count={stats.total || 0}
                  data={recentActivitiesData.data}
                />
              ) : (
                <p className="text-destructive">
                  Error Fetching Activities Data
                </p>
              )}
            </Block>
          </motion.div>
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
