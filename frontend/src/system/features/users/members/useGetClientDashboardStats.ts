import apiGetClientDashboardStats from "@/system/services/users/members/apiGetClientDashboardStats";
import { useSuspenseQuery } from "@tanstack/react-query";

export type TClientDashboardStats = {
  totalDays: number;
  daysLeft: number;
  daysCompleted: number;
  planType: string;
  paidAt: string;
  expiresOn: string;
  transactionId: string;
  amount: number;
};

function useGetClientDashboardStats() {
  const { data, error } = useSuspenseQuery<{
    status: "string";
    data: TClientDashboardStats;
  }>({
    queryFn: () => apiGetClientDashboardStats(),
    queryKey: ["clientStats"],
  });

  return { data, error };
}

export default useGetClientDashboardStats;
