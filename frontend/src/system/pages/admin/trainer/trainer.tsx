import { Button } from "@/components";
import { ThemedDialog } from "@/components/dialog/Dialog";
import { Heading } from "@/components/heading/Heading";
import Filter from "@/system/components/filter/Filter";
import TableSearch from "@/system/components/table-search/TableSearch";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";

import AddTrainer from "@/system/features/users/trainers/add-trainer/add-trainer";
import ColumnDefinition from "@/system/features/users/trainers/ColumnDefinition";
import EditTrainer from "@/system/features/users/trainers/edit-trainers/EditTrainer";

import useTrainers from "@/system/features/users/trainers/useTrainer";

import useDeleteUser from "@/system/features/users/useDeleteUser";
import ViewUser from "@/system/features/users/view-user/view-user";
import { filterFields } from "@/system/lib/data";
import { TUserDetails } from "@/system/stores/user/types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Trainer() {
  const [openView, setOpenView] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const {
    data: { data: maintainers, count },
    isPending,
  } = useTrainers();

  const {
    deleteUser,
    isSuccess: isDeleteSuccess,
    isPending: isDeletePending,
  } = useDeleteUser({ role: "trainers" });

  useEffect(() => {
    if (isDeleteSuccess) {
      setSelectedIds("");
      setOpenDelete(false);
    }
  }, [isDeleteSuccess]);

  return (
    <section className="rounded-tl-xl h-[calc(100dvh-60px)] overflow-hidden">
      <div className="py-7 px-6 flex-1 flex flex-col gap-4 h-full">
        <Heading level={4} variant={"quaternary"}>
          Trainers
        </Heading>
        <div className="bg-white rounded-xl shadow-general overflow-hidden h-full">
          <div className="flex shadow-elevation items-center justify-between sticky top-0 bg-white p-[18px] z-[1]">
            <TableSearch
              isPending={isPending}
              placeholder="Search by Name, or Email"
            />
            <div className="flex items-center gap-4">
              <Filter entity={filterFields.trainers} />
              <Button
                variant={"primary"}
                className="font-medium"
                onClick={() => setOpenAdd(true)}
              >
                <Plus className="stroke-[3px]" /> Add Trainer
              </Button>
            </div>
          </div>
          <GeneralTable<TUserDetails>
            paginationClassName="bg-slate-50 px-6 sticky bottom-0"
            noDataTitle="No Maintainers"
            noDataDescription="Get started by adding a maintainer."
            resultCount={count || 0}
            data={maintainers}
            columns={ColumnDefinition(
              setSelectedIds,
              setOpenEdit,
              setOpenDelete,
              setOpenView
            )}
          />
        </div>
      </div>
      <ViewUser
        edit
        selectedId={selectedIds}
        isDialogOpen={openView}
        setIsDialogOpen={setOpenView}
        setOpenEdit={setOpenEdit}
      />
      <EditTrainer
        selectedId={selectedIds}
        isDialogOpen={openEdit}
        setIsDialogOpen={setOpenEdit}
      />
      <AddTrainer isDialogOpen={openAdd} setIsDialogOpen={setOpenAdd} />
      <ThemedDialog
        isPending={isDeletePending}
        dialogOpen={openDelete}
        setDialogOpen={setOpenDelete}
        mutationFn={() => deleteUser(selectedIds)}
        theme="destructive"
        ctaText="Delete"
        title="Delete Trainer"
        message="Do you really want to delete this trainer?"
      />
    </section>
  );
}
