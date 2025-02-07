import { TApiResponse } from "@/system/lib/types";
import { TUserDetails } from "@/system/stores/user/types";
import { useQueryClient } from "@tanstack/react-query";

export default function Topbar() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<TApiResponse<TUserDetails>>([
    "user",
  ])?.data.data;

  return (
    <div className="px-6 py-3 bg-white z-20 shadow-general">
      <div className="flex gap-3 items-center">
        <figure className="bg-[#d9d9d9] size-[34px] rounded-full"></figure>
        <div className="flex flex-col">
          <p className="text-gray-tertiary text-sm">
            Welcome, <span className="text-primary font-bold">User</span>
          </p>
          <span className="text-gray-tertiary text-xs capitalize">Role</span>
        </div>
      </div>
    </div>
  );
}
