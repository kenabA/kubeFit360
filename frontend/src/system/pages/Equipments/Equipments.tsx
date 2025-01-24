import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import GeneralTable from "@/system/components/tables/generalTable/GeneralTable";
import ColumnDefinition from "@/system/features/equipments/ColumnDefinition";
import useEquipments from "@/system/features/equipments/useEquipments";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddEquipments from "../../features/equipments/add-equipments/AddEquipments";

export default function Equipments() {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    data: { equipments },
  } = useEquipments();

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"} className="mb-4">
          Equipments
        </Heading>
        <div className="bg-white rounded-xl shadow-general h-full">
          <div className="p-[18px] flex items-center justify-end">
            <Button
              variant={"primary"}
              className="font-medium"
              onClick={handleOpenAdd}
            >
              <Plus className="stroke-[3px]" /> Add Equipment
            </Button>
          </div>
          <GeneralTable
            data={equipments}
            columns={ColumnDefinition(selectedIds, setSelectedIds)}
          />
        </div>
      </div>
      <AddEquipments isDialogOpen={openAdd} setIsDialogOpen={setOpenAdd} />
    </section>
  );
}
