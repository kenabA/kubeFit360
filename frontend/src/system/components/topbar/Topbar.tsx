import { useQuery } from "@tanstack/react-query";

import { TUserDetails } from "@/system/stores/user/types";

export default function Topbar() {
  const { data: user } = useQuery<TUserDetails>({
    queryKey: ["user"],
    enabled: false,
  });

  return (
    <div className="px-6 py-3 bg-white  shadow-general">
      <div className="flex gap-3 items-center">
        <figure className="bg-[#d9d9d9] size-[34px] rounded-full overflow-hidden shadow-userPanel border-2 border-secondary">
          {user?.userImage ? (
            <img
              src={user.userImage}
              className="size-full object-center object-cover"
              alt="User's Photo"
            />
          ) : (
            <div className="bg-tertiary text-primary-hover font-bold text-md size-full flex items-center justify-center">
              {user?.name[0].toLocaleUpperCase()}
            </div>
          )}
        </figure>
        <div className="flex flex-col">
          <p className="text-gray-tertiary text-sm">
            Welcome,{" "}
            <span className="text-primary font-bold">{user?.name}</span>
          </p>
          <span className="text-gray-tertiary text-xs capitalize">
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
}
