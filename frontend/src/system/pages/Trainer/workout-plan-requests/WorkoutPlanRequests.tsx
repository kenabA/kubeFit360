import { Heading } from "@/components/heading/Heading";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";

import { useState } from "react";

import Filter from "@/system/components/filter/Filter";
import { filterFields } from "@/system/lib/data";

import TableSearch from "@/system/components/table-search/TableSearch";

import useWorkoutPlanRequests from "@/system/features/workout-plan-requests/useWorkoutPlanRequests";
import { TWorkoutPlanRequest } from "@/system/features/workout-plan-requests/types";
import ColumnDefinition from "@/system/features/workout-plan-requests/ColumnDefinition";

import ViewRequest from "@/system/features/workout-plan-requests/view-request/ViewRequest";
import ViewPlan from "@/system/features/workout-plan/ViewPlan";

export default function WorkoutPlanRequests() {
  const [openView, setOpenView] = useState<boolean>(false);
  const [openViewPlan, setOpenViewPlan] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [selectedWorkoutPlanId, setSelectedWorkoutPlanId] =
    useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const {
    data: { data: workoutPlanRequests, count },
    isPending,
  } = useWorkoutPlanRequests();

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"} className="mb-4">
          Workout Plan Requests
        </Heading>
        <div className="bg-white rounded-xl shadow-general h-full">
          <div className="p-[18px] flex items-center justify-between ">
            <TableSearch
              isPending={isPending}
              placeholder="Search by id, name, etc . . . "
            />
            <div className="flex items-center gap-4">
              <Filter entity={filterFields.workoutPlanRequests} />
            </div>
          </div>
          <GeneralTable<TWorkoutPlanRequest>
            resultCount={count || 0}
            data={workoutPlanRequests}
            columns={ColumnDefinition(
              setSelectedIds,
              setOpenDelete,
              setOpenView
            )}
          />
        </div>
      </div>
      <ViewRequest
        setOpenPlan={setOpenViewPlan}
        setSelectedId={setSelectedIds}
        setSelectedWorkoutPlanId={setSelectedWorkoutPlanId}
        selectedId={selectedIds}
        isDialogOpen={openView}
        setIsDialogOpen={setOpenView}
      />
      <ViewPlan
        selectedId={selectedWorkoutPlanId}
        isDialogOpen={openViewPlan}
        setIsDialogOpen={setOpenViewPlan}
      />
    </section>
  );
}
