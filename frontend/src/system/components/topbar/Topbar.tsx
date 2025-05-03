import { useQuery } from "@tanstack/react-query";

import { TUserDetails } from "@/system/stores/user/types";
import { Button } from "@/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import WeightPopover from "../weight-popover/weight-popover";
import { useEffect, useState } from "react";
import { ThemedDialog } from "@/components/dialog/Dialog";
import useRecordWeight from "@/system/features/weights/useRecordWeight";
import { TWeightFormProps } from "../weight-popover/types";

export default function Topbar() {
  const [lastWeightData, setLastWeightData] = useState<TWeightFormProps | null>(
    null
  );
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { addNotice, isPending: isAddingWeight, error } = useRecordWeight();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { data: user } = useQuery<TUserDetails>({
    queryKey: ["user"],
    enabled: false,
  });

  // When submitting:
  const handleRecordWeight = async (data: TWeightFormProps) => {
    setLastWeightData(data); // store for potential overwrite
    await addNotice(data);
  };

  useEffect(() => {
    if (error?.message === "Weight already recorded for this date.") {
      setDialogOpen(true);
    }
  }, [error]);

  return (
    <>
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
            setLastWeightData={setLastWeightData}
            recordWeightFn={handleRecordWeight}
            isAddingWeight={isAddingWeight}
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
      <ThemedDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        isPending={isAddingWeight}
        disabled={isAddingWeight}
        mutationFn={async () => {
          if (lastWeightData) {
            await addNotice({ ...lastWeightData, overwrite: true });
            setDialogOpen(false);
          }
        }}
        theme="info"
        ctaText="Yes, overwrite"
        title="Weight Already Recorded"
        message="You've already logged your weight today. Overwrite it?"
      />
    </>
  );
}
