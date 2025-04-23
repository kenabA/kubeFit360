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
import useDeleteWorkoutPlan from "../../workout-plan/useDeleteWorkoutPlan";
import useDeleteWorkoutPlanRequest from "../delete-plan-requests/useDeleteWorkoutPlanRequest";
import useGetWorkoutPlan from "../../workout-plan/useGetWorkoutPlan";
import { TUserDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useToast } from "@/hooks/use-toast";

export default function ViewRequest({
  setOpenPlan,
  selectedId,
  setSelectedId,
  setSelectedWorkoutPlanId,
  isDialogOpen,
  setIsDialogOpen,
}: {
  setOpenPlan: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedWorkoutPlanId: React.Dispatch<React.SetStateAction<string>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();

  const { data: workoutRequest } = useGetWorkoutRequest({
    selectedId: selectedId,
    enabled: isDialogOpen,
  });

  const auth = useAuthUser<TUserDetails>();

  const navigate = useNavigate();
  const [pendingAction, setPendingAction] = useState<TWorkoutPlanStatus | null>(
    null
  );
  const { editPlanRequest, isPending, isSuccess, error } = useEditPlanRequest();

  const { deleteWorkoutPlanRequest, isPending: isDeleteRequestPending } =
    useDeleteWorkoutPlanRequest();

  const { data } = useGetWorkoutPlan({
    selectedId: workoutRequest?.generatedPlan || "",
    enabled: isDialogOpen && workoutRequest?.generatedPlan !== "",
  });

  const {
    deleteWorkoutPlan,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
  } = useDeleteWorkoutPlan();

  function handleChangeStatus(status: TWorkoutPlanStatus) {
    setPendingAction(status);
    editPlanRequest({ data: { status: status }, selectedId: selectedId });
  }

  const isRejected = workoutRequest?.status === "rejected";
  const isApproved = workoutRequest?.status === "approved";
  const isGenerated = workoutRequest?.status === "generated";

  const isAssignee = workoutRequest?.trainer._id === auth?._id;

  useEffect(() => {
    if (isSuccess || error) {
      setPendingAction(null);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsDialogOpen(false);
      setSelectedId("");
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isGenerated && workoutRequest?.generatedPlan) {
      setSelectedWorkoutPlanId(workoutRequest.generatedPlan);
    }
  }, [isGenerated, workoutRequest?.generatedPlan]);

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
              {!isApproved && !isRejected && !isGenerated && (
                <Button
                  disabled={isPending || workoutRequest.status === "rejected"}
                  onClick={() => {
                    if (!isAssignee) {
                      toast({
                        variant: "warning",
                        title: "Unauthorized",
                        description: "Only the assigned trainer can reject.",
                      });
                      return;
                    }
                    handleChangeStatus("rejected");
                  }}
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
                      Reject
                    </>
                  )}
                </Button>
              )}
              {isRejected && (
                <Button
                  disabled={isDeleteRequestPending}
                  onClick={async () => {
                    if (!isAssignee) {
                      toast({
                        variant: "warning",
                        title: "Unauthorized",
                        description:
                          "Only the assigned trainer can delete the request.",
                      });
                      return;
                    }
                    await deleteWorkoutPlanRequest(selectedId);
                    setIsDialogOpen(false);
                  }}
                  className={cn(
                    "shadow-none w-40 hover:shadow-none h-10 border-[1px] border-destructive bg-destructive-light text-destructive font-semibold text-sm hover:text-destructive-hover hover:border-destructive-hover"
                  )}
                  variant={"outline"}
                >
                  {isDeleteRequestPending ? (
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
                      <Icon icon={"lucide:trash-2"} />
                      Delete Request
                    </>
                  )}
                </Button>
              )}

              {isGenerated && (
                <Button
                  disabled={isDeletePending || !data?._id}
                  onClick={() => {
                    if (!isAssignee) {
                      toast({
                        variant: "warning",
                        title: "Unauthorized",
                        description:
                          "Only the assigned trainer can delete the plan.",
                      });
                      return;
                    }
                    if (!data?._id) {
                      toast({
                        variant: "warning",
                        title: "No Workout Plan",
                        description: "Workout Plan not found",
                      });
                      return;
                    }
                    deleteWorkoutPlan(data._id);
                  }}
                  className={cn(
                    "shadow-none w-40 hover:shadow-none h-10 border-[1px] border-destructive bg-destructive-light text-destructive font-semibold text-sm hover:text-destructive-hover hover:border-destructive-hover"
                  )}
                  variant={"outline"}
                >
                  {isDeletePending ? (
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
                      <Icon icon={"lucide:trash-2"} />
                      Delete Plan
                    </>
                  )}
                </Button>
              )}
              {!isApproved && !isRejected && !isGenerated && (
                <Button
                  disabled={isPending || isDeletePending}
                  onClick={() => {
                    if (!isAssignee) {
                      toast({
                        variant: "warning",
                        title: "Unauthorized",
                        description: "Only the assigned trainer can approve.",
                      });
                      return;
                    }
                    handleChangeStatus("approved");
                  }}
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
              {isGenerated && (
                <Button
                  disabled={isPending || isDeletePending}
                  onClick={() => setOpenPlan(true)}
                  form="equipment-form"
                  type="submit"
                  className="shadow-none hover:shadow-none hover:bg-accent-hover h-10 w-28 bg-accent text-white font-semibold text-sm"
                  variant={"primary"}
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
                      View Plan
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
                      onClick={() => {
                        if (!isAssignee) {
                          toast({
                            variant: "warning",
                            title: "Unauthorized",
                            description:
                              "Only the assigned trainer can generate a workout plan.",
                          });
                          return;
                        }
                        navigate(`/workoutPlan/${selectedId}/create`);
                      }}
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
