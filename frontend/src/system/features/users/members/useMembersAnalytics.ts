import { useEffect, useMemo, useState } from "react";
import useMembersStats from "./useMembersStats";
import { getMemberChartData } from "./membersChartData";
import { getMembershipChartData } from "./membershipChartData";

export type TMembersStats = {
  active: number;
  inactive: number;
  total: number;
};

export type TMembershipStats = {
  basic: number;
  enterprise: number;
  total: number;
};

export type TStats = TMembersStats & TMembershipStats;

export default function useMembersAnalytics() {
  const [stats, setStats] = useState<TMembersStats>({
    active: 0,
    inactive: 0,
    total: 0,
  });

  const [membershipRatio, setMembershipRatio] = useState<TMembershipStats>({
    basic: 0,
    enterprise: 0,
    total: 0,
  });

  const {
    data: { data: memberStats },
    error,
  } = useMembersStats();

  useEffect(() => {
    if (memberStats) {
      const stats = memberStats[0];
      const membershipStats = memberStats[0];
      setStats({
        active: stats.active,
        inactive: stats.inactive,
        total: stats.total,
      });

      setMembershipRatio({
        basic: membershipStats.basic,
        enterprise: membershipStats.enterprise,
        total: membershipStats.total,
      });
    }
  }, [memberStats]);

  const chartData = useMemo(() => getMemberChartData(stats), [stats]);

  const membershipChartData = useMemo(
    () => getMembershipChartData(membershipRatio),
    [membershipRatio]
  );

  return { membershipRatio, membershipChartData, stats, chartData, error };
}
