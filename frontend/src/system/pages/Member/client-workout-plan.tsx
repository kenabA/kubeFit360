import "./styles.scss";
import { Button } from "@/components";
import { ThemedDialog } from "@/components/dialog/Dialog";
import { Heading } from "@/components/heading/Heading";
import NoData from "@/system/components/no-data/NoData";
import RequestWorkoutPlan from "@/system/features/workout-plan-requests/request-workout-plan/RequestWorkoutPlan";
import useDeleteWorkoutPlan from "@/system/features/workout-plan/useDeleteWorkoutPlan";
import useGetWorkoutPlanByMemberId from "@/system/features/workout-plan/useGetWorkoutPlanByMemberId";
import { TUserDetails } from "@/system/stores/user/types";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Oval } from "react-loader-spinner";

// SHOW MODAL WHEN DELETE
export default function ClientWorkoutPlan() {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const { deleteWorkoutPlanRequest, isPending: isDeleting } =
    useDeleteWorkoutPlan();
  const auth = useAuthUser<TUserDetails>();
  const { isPending, data } = useGetWorkoutPlanByMemberId({
    selectedId: auth?._id || "",
  });

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  const handlePrint = (content: string) => {
    // Open a new window
    const printWindow = window.open("", "", "height=600,width=800");

    printWindow?.document.write(content); // Content from the backend

    // Close the document to complete the writing process
    printWindow?.document.close();

    // Trigger the print dialog
    printWindow?.print();
  };

  function handleCancelWorkoutPlan() {
    if (data?._id) deleteWorkoutPlanRequest(data?._id);
  }

  const workoutPlanPresent = data?.workoutPlan;
  const trainer = data?.request?.trainer?.name || "Certified Trainer";

  return (
    <section className="rounded-tl-xl h-[calc(100dvh-60px)]">
      <div className="rounded-[18px] flex-1 flex flex-col py-7 px-6 gap-4 h-full">
        <header className="flex justify-between items-center">
          <Heading level={4} variant={"quaternary"}>
            Workout Plan
          </Heading>

          <div className="flex items-center gap-2">
            {workoutPlanPresent && (
              <Button
                onClick={() => setOpenDelete(true)}
                variant={"outline"}
                className="text-destructive bg-destructive-light font-medium hover:border-destructive-hover hover:text-destructive-hover border-destructive border w-52 md:h-10"
              >
                {isDeleting ? (
                  <Oval
                    height="280"
                    strokeWidth={8}
                    secondaryColor="hsl(var(--primary))"
                    width="280"
                    color="hsl(var(--primary))"
                    wrapperStyle={{}}
                  />
                ) : (
                  <>
                    <Icon
                      icon={"material-symbols:cancel-outline-rounded"}
                      className="!size-[20px]"
                    />
                    Cancel Current Plan
                  </>
                )}
              </Button>
            )}
            <Button
              variant={"primary"}
              className="font-medium"
              onClick={handleOpenAdd}
            >
              <Icon
                icon={"pepicons-pop:bulletin-notice"}
                className="!size-[18px]"
              />
              Request New Plan
            </Button>
          </div>
        </header>
        <div className="grid grid-rows-[1fr_auto] flex-1 h-0 min-h-0  gap-4">
          <div
            className="p-6 mb-4 bg-white rounded-xl shadow-general
           h-full  overflow-x-hidden overflow-y-auto custom-scrollbar "
          >
            {workoutPlanPresent ? (
              <div
                className="client-workout-plan break-words"
                dangerouslySetInnerHTML={{
                  __html: data.workoutPlan,
                }}
              />
            ) : isPending ? (
              <div className="size-full flex items-center justify-center">
                <Oval
                  height="32"
                  strokeWidth={8}
                  secondaryColor="hsl(var(--primary))"
                  width="32"
                  color="hsl(var(--primary))"
                  wrapperStyle={{}}
                />
              </div>
            ) : (
              <div className="flex justify-center size-full items-center text-gray-tertiary">
                <NoData
                  title="No Workout Plan!"
                  description="Request for a new workout plan to your desired trainer"
                />
              </div>
            )}
          </div>
          {workoutPlanPresent && (
            <div className="p-6 bg-white flex justify-between items-center shadow-elevation rounded-xl relative overflow-hidden">
              <div className="absolute bg-primary w-1/2 h-24 rounded-full  filter blur-xl right-0 opacity-[0.1]"></div>
              <Button
                onClick={() => handlePrint(data.workoutPlan)}
                variant={"ghost"}
                className="text-accent border-accent border bg-accent-light font-medium hover:border-accent-hover hover:text-accent-hover "
              >
                <Icon
                  icon={"material-symbols:print-outline-rounded"}
                  className="!size-[20px]"
                />
                Print Workout Plan
              </Button>
              <div className="flex items-center justify-normal gap-2">
                <figure className="bg-[#d9d9d9] size-[34px] rounded-full overflow-hidden shadow-userPanel border-primary border">
                  {auth?.userImage ? (
                    <img
                      src={auth?.userImage}
                      className="size-full object-center object-cover"
                      alt="User's Photo"
                    />
                  ) : (
                    <div className="bg-tertiary text-primary-hover font-bold text-md size-full flex items-center justify-center">
                      {trainer?.slice(0, 1).toLocaleUpperCase()}
                    </div>
                  )}
                </figure>
                <div className="flex flex-col gap-0 items-start">
                  <span className="text-xs text-gray-tertiary">
                    Generated By
                  </span>
                  <span className="text-[18px] text-primary font-semibold">
                    {trainer}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <RequestWorkoutPlan
          isDialogOpen={openAdd}
          setIsDialogOpen={setOpenAdd}
        />
        <ThemedDialog
          isPending={isDeleting}
          dialogOpen={openDelete}
          setDialogOpen={setOpenDelete}
          mutationFn={() => handleCancelWorkoutPlan()}
          theme="destructive"
          ctaText="Delete"
          title="Cancel Workout Plan"
          message="Do you really want to cancel current plan?"
        />
      </div>
    </section>
  );
}
