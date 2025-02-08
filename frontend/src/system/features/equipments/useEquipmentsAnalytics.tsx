import { useEffect, useMemo, useState } from "react";
import { TEquipmentsStats } from "./type";
import useEquipmentsStats from "./useEquipmentsStats";
import { getEquipmentChartData } from "./equipmentChartData";

export default function useEquipmentsAnalytics() {
  const [stats, setStats] = useState<TEquipmentsStats>({
    active: 0,
    inactive: 0,
    underMaintenance: 0,
    total: 0,
  });

  const {
    data: { data: equipmentsStats },
    error,
  } = useEquipmentsStats();
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

  return { stats, chartData, error };
}
