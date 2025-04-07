import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";

import RequestWorkoutPlan from "@/system/features/workout-plan-requests/request-workout-plan/RequestWorkoutPlan";
import useGetWorkoutPlan from "@/system/features/workout-plan/useGetWorkoutPlan";
import { TUserDetails } from "@/system/stores/user/types";

import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function ClientWorkoutPlan() {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const auth = useAuthUser<TUserDetails>();
  const { isPending, data } = useGetWorkoutPlan({
    selectedId: auth?._id || "",
  });

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  const workoutPlanPresent = data?.workoutPlan;

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6 flex justify-between items-center">
        <Heading level={4} variant={"quaternary"} className="mb-4">
          Workout Plan
        </Heading>
        <div className="flex items-center justify-between ">
          <Button
            variant={"primary"}
            className="font-medium"
            onClick={handleOpenAdd}
          >
            {workoutPlanPresent ? "Request New Plan" : "Request Workout Plan"}
          </Button>
        </div>
      </div>
      {data?.workoutPlan ? (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Workout Plan</h2>
          <div
            className="client-workout-plan"
            dangerouslySetInnerHTML={{ __html: data.workoutPlan }}
          />
        </div>
      ) : (
        <div className="px-6 text-center text-gray-tertiary">
          No Workout Plan Found
        </div>
      )}
      <RequestWorkoutPlan isDialogOpen={openAdd} setIsDialogOpen={setOpenAdd} />
    </section>
  );
}
