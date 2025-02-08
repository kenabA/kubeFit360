import { useEffect, useMemo, useState } from "react";
import useMembersStats from "./useMembersStats";
import { getMemberChartData } from "./membersChartData";

export type TMembersStats = {
  active: number;
  inactive: number;
  total: number;
};

export default function useMembersAnalytics() {
  const [stats, setStats] = useState<TMembersStats>({
    active: 0,
    inactive: 0,
    total: 0,
  });

  const {
    data: { data: memberStats },
    error,
  } = useMembersStats();

  useEffect(() => {
    if (memberStats) {
      const stats = memberStats[0];
      setStats({
        active: stats.active,
        inactive: stats.inactive,
        total: stats.total,
      });
    }
  }, [memberStats]);

  const chartData = useMemo(() => getMemberChartData(stats), [stats]);

  return { stats, chartData, error };
}
