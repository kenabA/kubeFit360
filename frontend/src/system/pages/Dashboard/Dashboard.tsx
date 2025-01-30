import { Heading } from "@/components/heading/Heading";
import { Block, Piechart } from "@/system/components/index";
import RecentActivities from "../../components/tables/recent-activities/RecentActivities";
import useEquipments from "@/system/features/equipments/useEquipments";
import ErrorPage from "@/components/errorPage/ErrorPage";
import { useEffect, useMemo, useState } from "react";
import { TEquipmentStats } from "@/system/features/equipments/type";
import {
  equipmentChartConfig,
  getEquipmentChartData,
} from "@/system/features/equipments/equipmentChartData";
import useRecentActivities from "@/system/features/recent-activities/useRecentActivities";

export default function Dashboard() {
  const [stats, setStats] = useState<TEquipmentStats>({
    active: 0,
    inactive: 0,
    underMaintenance: 0,
  });

  const {
    data: { count, data: equipments },
    error,
  } = useEquipments();

  const { data: recentActivitiesData, error: activitiesError } =
    useRecentActivities();

  useEffect(() => {
    const counts = equipments.reduce(
      (acc, eqp) => {
        acc[eqp.status as keyof typeof acc] =
          (acc[eqp.status as keyof typeof acc] || 0) + 1;
        return acc;
      },
      { active: 0, inactive: 0, underMaintenance: 0 }
    );
    setStats(counts);
  }, [equipments]);

  const chartData = useMemo(() => getEquipmentChartData(stats), [stats]);

  if (error) {
    return <ErrorPage errMsg={error.message} />;
  }

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"} className="text-xs">
          huge error in the dashbaord. look at the block data and filter while
          page active and clear the url if the next page is clicked
        </Heading>
        <div className="h-full grid grid-cols-3 grid-rows-[auto,1fr,1fr] gap-6 mt-6">
          <Block
            type={"numeric"}
            theme={"success"}
            data={stats.active}
            icon="lucide:package"
            title="available equipments"
            total={count}
          />
          <Block
            type={"numeric"}
            theme={"error"}
            data={stats.inactive}
            icon="lucide:package"
            title="unavailable equipments"
            total={count}
          />
          <Block
            type={"numeric"}
            theme={"warn"}
            data={stats.underMaintenance}
            icon="lucide:package"
            title="under maintenance"
            total={count}
          />
          <div className="relative overflow-hidden shadow-general">
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </div>
          <Block
            type={"table"}
            title="recent activities"
            icon="lucide:package"
            className="bg-white shadow-general border col-span-2 h-full row-span-2 rounded-xl"
          >
            {!activitiesError ? (
              <RecentActivities
                count={count || 0}
                data={recentActivitiesData.data}
              />
            ) : (
              <p className="text-destructive">Error Fetching Activities Data</p>
            )}
          </Block>
          <Block
            type={"figure"}
            icon="lucide:package"
            title="equipments visualization"
          >
            <Piechart
              config={equipmentChartConfig}
              stats={chartData}
              count={count}
            />
          </Block>
        </div>
      </div>
    </section>
  );
}
