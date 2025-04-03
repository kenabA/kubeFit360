import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import RequestWorkoutPlan from "@/system/features/workout-plan-requests/request-workout-plan/RequestWorkoutPlan";

import { useState } from "react";

export default function ClientWorkoutPlan() {
  const [openAdd, setOpenAdd] = useState<boolean>(false);

  function handleOpenAdd() {
    setOpenAdd(true);
  }

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
            Request Workout Plan
          </Button>
        </div>
      </div>
      <div className="px-6 text-center text-gray-tertiary">
        No Workout Plan Found
      </div>
      <RequestWorkoutPlan isDialogOpen={openAdd} setIsDialogOpen={setOpenAdd} />
    </section>
  );
}
