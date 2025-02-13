import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemedDialog } from "@/components/dialog/Dialog";
import Filter from "@/system/components/filter/Filter";
import { filterFields } from "@/system/lib/data";

import TableSearch from "@/system/components/table-search/TableSearch";

import useMaintainers from "@/system/features/users/maintainers/useMaintainers";
import ColumnDefinition from "@/system/features/users/maintainers/ColumnDefinition";
import { TUserDetails } from "@/system/stores/user/types";
import AddMaintainer from "@/system/features/users/maintainers/add-maintainers/AddMaintainers";
import EditMaintainer from "@/system/features/users/maintainers/edit-maintainers/EditMaintainer";
import useDeleteUser from "@/system/features/users/useDeleteUser";
import ViewMaintainer from "@/system/features/users/maintainers/view-maintainer/ViewMaintainer";

export default function Maintainer() {
  const [openView, setOpenView] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const {
    data: { data: maintainers, count },
    isPending,
  } = useMaintainers();

  const {
    deleteUser,
    isSuccess: isDeleteSuccess,
    isPending: isDeletePending,
  } = useDeleteUser({ role: "maintainers" });

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  useEffect(() => {
    if (isDeleteSuccess) {
      setSelectedIds("");
      setOpenDelete(false);
    }
  }, [isDeleteSuccess]);

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"} className="mb-4">
          Maintainers
        </Heading>
        <div className="bg-white rounded-xl shadow-general h-full">
          <div className="p-[18px] flex items-center justify-between ">
            <TableSearch
              isPending={isPending}
              placeholder="Search by name, etc . . . "
            />
            <div className="flex items-center gap-4">
              <Filter entity={filterFields.maintainers} />
              <Button
                variant={"primary"}
                className="font-medium"
                onClick={handleOpenAdd}
              >
                <Plus className="stroke-[3px]" /> Add Maintainer
              </Button>
            </div>
          </div>
          <GeneralTable<TUserDetails>
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
      <ViewMaintainer
        edit
        selectedId={selectedIds}
        isDialogOpen={openView}
        setIsDialogOpen={setOpenView}
        setOpenEdit={setOpenEdit}
      />
      <AddMaintainer isDialogOpen={openAdd} setIsDialogOpen={setOpenAdd} />

      <EditMaintainer
        selectedId={selectedIds}
        isDialogOpen={openEdit}
        setIsDialogOpen={setOpenEdit}
      />
      <ThemedDialog
        isPending={isDeletePending}
        dialogOpen={openDelete}
        setDialogOpen={setOpenDelete}
        mutationFn={() => deleteUser(selectedIds)}
        theme="destructive"
        ctaText="Delete"
        title="Delete Maintainer"
        message="Do you really want to delete this maintainer?"
      />
    </section>
  );
}
