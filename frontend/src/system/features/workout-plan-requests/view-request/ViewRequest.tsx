import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetWorkoutRequest from "../useGetWorkoutRequest";
import UserProfileCard from "@/system/components/user-profile-card/UserProfileCard";
import UserInfoBar from "./user-info-bar/UserInfoBar";
import { Button, Separator } from "@/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import useEditPlanRequest from "../useEditPlanRequest";
import { TWorkoutPlanStatus } from "../types";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function ViewRequest({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
}: {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: workoutRequest } = useGetWorkoutRequest({
    selectedId: selectedId,
    enabled: isDialogOpen,
  });
  const navigate = useNavigate();
  const [pendingAction, setPendingAction] = useState<TWorkoutPlanStatus | null>(
    null
  );
  const { editPlanRequest, isPending, isSuccess, error } = useEditPlanRequest();

  function handleChangeStatus(status: TWorkoutPlanStatus) {
    setPendingAction(status);
    editPlanRequest({ data: { status: status }, selectedId: selectedId });
  }

  useEffect(() => {
    if (isSuccess || error) {
      setPendingAction(null);
    }
  }, [isSuccess, error]);

  const isRejected = workoutRequest?.status === "rejected";
  const isApproved = workoutRequest?.status === "approved";

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => {
        setIsDialogOpen(value);
      }}
    >
      <DialogTitle className="hidden"></DialogTitle>
      <DialogDescription className="hidden"></DialogDescription>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "!rounded-2xl max-w-[740px] overflow-hidden border-none p-0 outline-none"
        )}
      >
        <div className="absolute bg-primary w-full h-48 rounded-full filter blur-2xl -top-36 opacity-[0.2]"></div>
        {workoutRequest && (
          <div className="p-6 flex flex-col gap-4 w-full">
            <h4 className="text-[24px] font-bold">Workout Request Details</h4>
            <UserProfileCard
              workoutRequestStatus={workoutRequest.status}
              data={workoutRequest.member}
            />
            <Separator className="bg-slate-200" />
            <UserInfoBar data={workoutRequest} />
            <div className="text-end space-x-2">
              {!isApproved && (
                <Button
                  disabled={isPending || workoutRequest.status === "rejected"}
                  onClick={() => handleChangeStatus("rejected")}
                  form="equipment-form"
                  type="submit"
                  className={cn(
                    "shadow-none hover:shadow-none h-10 border-[1px] border-destructive bg-destructive-light text-destructive font-semibold text-sm hover:text-destructive-hover hover:border-destructive-hover",
                    isRejected ? "w-28" : "w-24"
                  )}
                  variant={"outline"}
                >
                  {pendingAction === "rejected" && isPending ? (
                    <Oval
                      height="280"
                      strokeWidth={8}
                      secondaryColor="white"
                      width="280"
                      color="hsl(var(--destructive))"
                      wrapperStyle={{}}
                    />
                  ) : (
                    <>
                      <Icon icon={"octicon:x-circle-16"} />
                      {isRejected ? "Rejected" : "Reject"}
                    </>
                  )}
                </Button>
              )}
              {!isApproved && !isRejected && (
                <Button
                  disabled={isPending}
                  onClick={() => handleChangeStatus("approved")}
                  form="equipment-form"
                  type="submit"
                  className="shadow-none hover:shadow-none h-10 w-28 border-[1px] border-success hover:text-success-hover hover:border-success-hover bg-success-light text-success font-semibold text-sm"
                  variant={"outline"}
                >
                  {pendingAction === "approved" && isPending ? (
                    <Oval
                      height="280"
                      strokeWidth={8}
                      secondaryColor="white"
                      width="280"
                      color="hsl(var(--success))"
                      wrapperStyle={{}}
                    />
                  ) : (
                    <>
                      <Icon icon={"rivet-icons:check-circle-breakout"} />
                      Approve
                    </>
                  )}
                </Button>
              )}
              <div className="flex justify-end w-full">
                <AnimatePresence>
                  {isApproved && (
                    <motion.button
                      key="button"
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      exit={{ x: 20 }}
                      disabled={isPending}
                      onClick={() =>
                        navigate(`/workoutPlan/${selectedId}/create`)
                      }
                      form="equipment-form"
                      type="submit"
                      className="shadow-none h-10 w-fit font-semibold text-sm flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-button px-4 py-2 rounded-lg"
                    >
                      <Icon
                        icon={"icon-park-solid:message"}
                        className="scale-x-[-1]"
                      />
                      Generate Workout Plan
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
