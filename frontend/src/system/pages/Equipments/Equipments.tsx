import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";

import useEquipments from "@/system/features/equipments/useEquipments";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddEquipments from "../../features/equipments/add-equipments/AddEquipments";

import useDeleteEquipments from "@/system/features/equipments/delete-equipments/useDeleteEquipment";
import ColumnDefinition from "@/system/features/equipments/ColumnDefinition";
import EditEquipments from "@/system/features/equipments/edit-equipments/EditEquipments";
import { ThemedDialog } from "@/components/dialog/Dialog";
import Filter from "@/system/components/filter/Filter";
import { filterFields } from "@/system/global/utils";
import { TEquipmentsData } from "@/system/features/equipments/type";

import TableSearch from "@/system/components/table-search/TableSearch";

export default function Equipments() {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const {
    data: { data: equipments, count },
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
            <TableSearch />
            <div className="flex items-center gap-4">
              <Filter entity={filterFields.maintainer} />
              <Button
                variant={"primary"}
                className="font-medium"
                onClick={handleOpenAdd}
              >
                <Plus className="stroke-[3px]" /> Add Equipment
              </Button>
            </div>
          </div>
          <GeneralTable<TEquipmentsData>
            resultCount={count || 0}
            data={equipments}
            columns={ColumnDefinition(
              setSelectedIds,
              setOpenEdit,
              setOpenDelete
            )}
          />
        </div>
      </div>
      <AddEquipments isDialogOpen={openAdd} setIsDialogOpen={setOpenAdd} />
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
    </section>
  );
}
