import { Heading } from "@/components/heading/Heading";
import { Block, Piechart } from "@/system/components/index";
import RecentActivities from "../../components/tables/recent-activities/RecentActivities";

import ErrorPage from "@/components/errorPage/ErrorPage";
import { useEffect, useMemo, useState } from "react";
import { TEquipmentsStats } from "@/system/features/equipments/type";
import {
  equipmentChartConfig,
  getEquipmentChartData,
} from "@/system/features/equipments/equipmentChartData";
import useRecentActivities from "@/system/features/recent-activities/useRecentActivities";
import useEquipmentsStats from "@/system/features/equipments/useEquipmentsStats";

export default function Dashboard() {
  const [stats, setStats] = useState<TEquipmentsStats>({
    active: 0,
    inactive: 0,
    underMaintenance: 0,
    total: 0,
  });

  const {
    error,
    data: { data: equipmentsStats },
  } = useEquipmentsStats();

  const { data: recentActivitiesData, error: activitiesError } =
    useRecentActivities();

  useEffect(() => {
    if (equipmentsStats) {
      const stats = equipmentsStats[0];
      setStats({
        active: stats.active,
        inactive: stats.inactive,
        total: stats.total,
        underMaintenance: stats.underMaintenance,
      });
    }
  }, [equipmentsStats]);

  const chartData = useMemo(() => getEquipmentChartData(stats), [stats]);

  if (error) {
    return <ErrorPage errMsg={error.message} />;
  }

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"}>
          Dashboard
        </Heading>
        <div className="h-full grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] gap-6 mt-6 ">
          <Block
            className="col-span-full md:col-[1/2] lg:col-[1/2]"
            type={"numeric"}
            theme={"success"}
            data={stats.active}
            icon="lucide:package"
            title="available equipments"
            total={stats.total}
          />
          <Block
            className="col-span-full md:col-[2/-1] lg:col-[2/3]"
            type={"numeric"}
            theme={"error"}
            data={stats.inactive}
            icon="lucide:package"
            title="unavailable equipments"
            total={stats.total}
          />
          <Block
            className="col-span-full md:col-[1/-1] lg:col-[3/4]"
            type={"numeric"}
            theme={"warn"}
            data={stats.underMaintenance}
            icon="lucide:package"
            title="under maintenance"
            total={stats.total}
          />
          <div className="relative overflow-hidden shadow-general col-span-full md:col-[1/2]">
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </div>
          <Block
            type={"table"}
            title="recent activities"
            icon="lucide:package"
            className="bg-white shadow-general border col-span-2  row-span-2 rounded-xl"
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
          <div className="col-span-full md:col-[2/-1] row-[4] md:row-[3] lg:col-[1/2]">
            <Block
              type={"figure"}
              icon="lucide:package"
              title="equipments visualization"
              className="lg:h-fit h-full"
            >
              <Piechart
                config={equipmentChartConfig}
                stats={chartData}
                count={stats.total}
              />
            </Block>
          </div>
        </div>
      </div>
    </section>
  );
}
