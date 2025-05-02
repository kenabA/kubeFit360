import { useQuery } from "@tanstack/react-query";

import { TUserDetails } from "@/system/stores/user/types";
import { Button } from "@/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import WeightPopover from "../weight-popover/weight-popover";
import { useState } from "react";

export default function Topbar() {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { data: user } = useQuery<TUserDetails>({
    queryKey: ["user"],
    enabled: false,
  });

  return (
    <div className="px-6 py-3 bg-white  shadow-general z-[10] flex justify-between items-center">
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
      {user?.role === "member" && (
        <WeightPopover
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        >
          <Button
            variant={"accentReverse"}
            className="font-medium border-accent border"
            onClick={() => {
              setOpenPopover((val) => !val);
            }}
          >
            <Icon icon={"tabler:weight"} className="size-[48px]" /> Record
            Weight
          </Button>
        </WeightPopover>
      )}
    </div>
  );
}
