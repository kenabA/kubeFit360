import { Heading } from "@/components/heading/Heading";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";

import { useEffect, useState } from "react";

import Filter from "@/system/components/filter/Filter";
import { filterFields } from "@/system/lib/data";

import TableSearch from "@/system/components/table-search/TableSearch";

import useWorkoutPlanRequests from "@/system/features/workout-plan-requests/useWorkoutPlanRequests";
import { TWorkoutPlanRequest } from "@/system/features/workout-plan-requests/types";
import ColumnDefinition from "@/system/features/workout-plan-requests/ColumnDefinition";

import ViewRequest from "@/system/features/workout-plan-requests/view-request/ViewRequest";
import ViewPlan from "@/system/features/workout-plan/ViewPlan";
import { ThemedDialog } from "@/components/dialog/Dialog";
import { TUserDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useDeleteWorkoutPlanRequest from "@/system/features/workout-plan-requests/delete-plan-requests/useDeleteWorkoutPlanRequest";

export default function WorkoutPlanRequests() {
  const [openView, setOpenView] = useState<boolean>(false);
  const [openViewPlan, setOpenViewPlan] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [selectedWorkoutPlanId, setSelectedWorkoutPlanId] =
    useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const user = useAuthUser<TUserDetails>();
  const { deleteWorkoutPlanRequest, isPending: isDeletePending } =
    useDeleteWorkoutPlanRequest();

  const {
    data: { data: workoutPlanRequests, count },
  } = useWorkoutPlanRequests();

  useEffect(() => {
    if (!selectedIds) return;
  }, [selectedIds]);

  return (
    <>
      <section className="rounded-tl-xl h-[calc(100dvh-60px)] overflow-hidden">
        <div className="py-7 px-6 flex-1 flex flex-col gap-4 h-full">
          <Heading level={4} variant={"quaternary"}>
            Workout Plan Requests
          </Heading>
          <div className="bg-white rounded-xl shadow-general overflow-hidden h-full">
            <div className="flex shadow-elevation items-center justify-between sticky  top-0 bg-white p-[18px] z-[1]">
              <TableSearch
                isPending={false}
                placeholder="Search by Client or Trainer Name"
              />
              <div className="flex items-center gap-4">
                <Filter entity={filterFields.workoutPlanRequests} />
              </div>
            </div>
            <GeneralTable<TWorkoutPlanRequest>
              noDataTitle="Nothing yet to show"
              noDataDescription="Come back later to see the requests."
              paginationClassName="bg-slate-50 px-6 sticky bottom-0"
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
      {user?.role === "trainer" && (
        <ThemedDialog
          isPending={isDeletePending}
          dialogOpen={openDelete}
          setDialogOpen={setOpenDelete}
          mutationFn={async () => {
            await deleteWorkoutPlanRequest(selectedIds);
            setOpenDelete(false);
          }}
          theme="destructive"
          ctaText="Delete"
          title="Delete Plan Request"
          message="Do you really want to delete it?"
        />
      )}
    </>
  );
}
