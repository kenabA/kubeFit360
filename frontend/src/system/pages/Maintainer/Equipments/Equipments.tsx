import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";

import useEquipments from "@/system/features/equipments/useEquipments";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import useDeleteEquipments from "@/system/features/equipments/delete-equipments/useDeleteEquipment";
import ColumnDefinition from "@/system/features/equipments/ColumnDefinition";
import EditEquipments from "@/system/features/equipments/edit-equipments/EditEquipments";
import { ThemedDialog } from "@/components/dialog/Dialog";
import Filter from "@/system/components/filter/Filter";
import { filterFields } from "@/system/lib/data";
import { TEquipmentsData } from "@/system/features/equipments/type";

import TableSearch from "@/system/components/table-search/TableSearch";
import ViewEquipment from "@/system/features/equipments/view-equipment/ViewEquipment";
import AddEquipments from "@/system/features/equipments/add-equipments/AddEquipments";
import { TUserDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Equipments() {
  const [openView, setOpenView] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const user = useAuthUser<TUserDetails>();

  const {
    data: { data: equipments, count },
    isPending,
  } = useEquipments();

  const {
    deleteEquipment,
    isSuccess: isDeleteSuccess,
    isPending: isDeletePending,
  } = useDeleteEquipments();

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
          Equipments
        </Heading>
        <div className="bg-white rounded-xl shadow-general h-full">
          <div className="p-[18px] flex items-center justify-between ">
            <TableSearch
              isPending={isPending}
              placeholder="Search by name, serial number, etc"
            />

            <div className="flex items-center gap-4">
              <Filter entity={filterFields.equipments} />
              {user?.role === "admin" ||
                (user?.role === "maintainer" && (
                  <Button
                    variant={"primary"}
                    className="font-medium"
                    onClick={handleOpenAdd}
                  >
                    <Plus className="stroke-[3px]" /> Add Equipment
                  </Button>
                ))}
            </div>
          </div>
          <GeneralTable<TEquipmentsData>
            resultCount={count || 0}
            data={equipments}
            columns={ColumnDefinition(
              setSelectedIds,
              setOpenEdit,
              setOpenDelete,
              setOpenView
            )}
          />
        </div>
      </div>

      <ViewEquipment
        edit
        selectedId={selectedIds}
        isDialogOpen={openView}
        setIsDialogOpen={setOpenView}
        setOpenEdit={setOpenEdit}
      />
      {user?.role === "admin" ||
        (user?.role === "maintainer" && (
          <>
            <AddEquipments
              isDialogOpen={openAdd}
              setIsDialogOpen={setOpenAdd}
            />
            <EditEquipments
              selectedId={selectedIds}
              isDialogOpen={openEdit}
              setIsDialogOpen={setOpenEdit}
            />
            <ThemedDialog
              isPending={isDeletePending}
              dialogOpen={openDelete}
              setDialogOpen={setOpenDelete}
              mutationFn={() => deleteEquipment(selectedIds)}
              theme="destructive"
              ctaText="Delete"
              title="Delete Equipment"
              message="Do you really want to delete this equipment?"
            />
          </>
        ))}
    </section>
  );
}
