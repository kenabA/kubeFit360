import { Heading } from "@/components/heading/Heading";
import { dynamicContainerVariants } from "@/lib/utils";
import { Block, Piechart } from "@/system/components";
import ColumnDefinition from "@/system/components/tables/recent-activities/ColumnDefinition";
import RecentActivities from "@/system/components/tables/recent-activities/RecentActivities";
import { equipmentChartConfig } from "@/system/features/equipments/equipmentChartData";
import useEquipmentsAnalytics from "@/system/features/equipments/useEquipmentsAnalytics";

import ViewEquipment from "@/system/features/equipments/view-equipment/ViewEquipment";
import { motion } from "framer-motion";
import useRecentActivities from "@/system/features/recent-activities/useRecentActivities";
import { memberChartConfig } from "@/system/features/users/members/membersChartData";
import useMembersAnalytics from "@/system/features/users/members/useMembersAnalytics";
import { useState } from "react";
import { membershipChartConfig } from "@/system/features/users/members/membershipChartData";
import useFormattedTransactionData from "@/system/features/transaction/useFormattedTransactionData";
import TransactionsAreaChart from "@/system/components/areachart/TransactionsAreaChart";

export default function AdminDashboard() {
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [openView, setOpenView] = useState<boolean>(false);

  const { data: recentActivitiesData, error: activitiesError } =
    useRecentActivities();

  const { formattedTransactionData } = useFormattedTransactionData();

  const {
    stats: equipmentStats,
    chartData: equipmentChartData,
    error: equipmentError,
  } = useEquipmentsAnalytics();

  const {
    stats: memberStats,
    chartData: memberChartData,
    error: memberError,
    membershipChartData,
    membershipRatio,
  } = useMembersAnalytics();

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <motion.div
          variants={dynamicContainerVariants(0)}
          initial="hidden"
          animate="visible"
        >
          <Heading level={4} variant={"quaternary"}>
            Dashboard
          </Heading>
        </motion.div>

        <div className="h-full grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] gap-6 mt-6 ">
          <motion.div
            variants={dynamicContainerVariants(1)}
            initial="hidden"
            animate="visible"
            className="col-span-full md:col-[1/2] lg:col-[1/2]"
          >
            <Block type={"figure"} icon="lucide:package" title="Members Status">
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
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(2)}
            initial="hidden"
            animate="visible"
            className="col-span-full md:col-[2/-1] lg:col-[2/3] "
          >
            <Block
              type={"figure"}
              icon="lucide:package"
              title="membership ratio"
            >
              <Piechart
                entity="Members"
                config={membershipChartConfig}
                nameKey="status"
                stats={membershipChartData}
                count={membershipRatio.total}
              />
            </Block>
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(3)}
            initial="hidden"
            animate="visible"
            className="col-span-full md:col-[1/2] lg:col-[3/4]"
          >
            <Block
              type={"figure"}
              icon="lucide:package"
              title="equipments visualization"
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
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(3)}
            initial="hidden"
            animate="visible"
            className="relative overflow-hidden shadow-general col-span-full md:col-[2/-1] lg:col-[1/2]"
          >
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(4)}
            initial="hidden"
            animate="visible"
            className="col-span-full lg:col-[2/-1] w-full "
          >
            <Block
              type={"figure"}
              icon="lucide:package"
              title="revenue collected"
              className="w-full"
            >
              <TransactionsAreaChart data={formattedTransactionData || []} />
            </Block>
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(5)}
            initial="hidden"
            animate="visible"
            className="col-span-full"
          >
            <Block
              type={"table"}
              title="recent activities"
              icon="lucide:package"
              className="bg-white shadow-general border rounded-xl"
            >
              {!activitiesError ? (
                <RecentActivities
                  columns={ColumnDefinition(setOpenView, setSelectedIds)}
                  resultCount={recentActivitiesData.count || 0}
                  count={equipmentStats.total || 0}
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
