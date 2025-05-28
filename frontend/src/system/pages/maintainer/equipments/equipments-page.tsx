import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";
import { motion } from "framer-motion";
import useEquipments from "@/system/features/equipments/useEquipments";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import useDeleteEquipments from "@/system/features/equipments/delete-equipments/useDeleteEquipment";
import ColumnDefinition from "@/system/features/equipments/ColumnDefinition";
import EditEquipments from "@/system/features/equipments/edit-equipments/edit-equipments";
import { ThemedDialog } from "@/components/dialog/Dialog";
import Filter from "@/system/components/filter/Filter";
import { filterFields } from "@/system/lib/data";
import { TEquipmentsData } from "@/system/features/equipments/type";

import TableSearch from "@/system/components/table-search/TableSearch";
import ViewEquipment from "@/system/features/equipments/view-equipment/ViewEquipment";
import AddEquipments from "@/system/features/equipments/add-equipments/AddEquipments";
import { TUserDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { dynamicContainerVariants } from "@/lib/utils";
import RecommendEquipments from "@/system/features/equipments/recommend-equipments/RecommendEquipments";
import { Icon } from "@iconify/react/dist/iconify.js";
import RecommendEquipmentTable from "@/system/components/equipments/recommended-equipments-modal";

export default function Equipments() {
  const [openView, setOpenView] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openRecommend, setOpenRecommend] = useState<boolean>(false);
  const [openRecommendTable, setOpenRecommendTable] = useState<boolean>(false);
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

  function handleOpenRecommend() {
    setOpenRecommend(true);
  }
  function handleOpenRecommendTable() {
    setOpenRecommendTable(true);
  }

  useEffect(() => {
    if (isDeleteSuccess) {
      setSelectedIds("");
      setOpenDelete(false);
    }
  }, [isDeleteSuccess]);

  return (
    <>
      <section className="rounded-tl-xl h-[calc(100dvh-60px)] overflow-hidden">
        <div className="py-7 px-6 flex-1 flex flex-col gap-4 h-full">
          <motion.div
            variants={dynamicContainerVariants(0)}
            initial="hidden"
            animate="visible"
          >
            <Heading level={4} variant={"quaternary"}>
              Equipments
            </Heading>
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(1)}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-general overflow-hidden h-full"
          >
            {/* Header Section with Search and Actions */}
            <motion.div className="flex shadow-elevation items-center justify-between sticky top-0 bg-white p-[18px] z-[1]">
              {/* Search Input */}
              <TableSearch
                isPending={isPending}
                placeholder="Search by Serial Number, Name, or Brand"
              />
              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                {/* Filter Component */}

                <Filter entity={filterFields.equipments} />
                {(user?.role === "admin" || user?.role === "maintainer") && (
                  <Button
                    variant={"accentReverse"}
                    className="font-medium h-full p-3"
                    onClick={handleOpenRecommendTable}
                  >
                    <Icon icon={"charm:git-request"} className="size-[24px]" />
                  </Button>
                )}
                {/* Add Equipment Button (Visible for Admins and Maintainers) */}
                {(user?.role === "maintainer" || user?.role === "admin") && (
                  <Button
                    variant={"primary"}
                    className="font-medium"
                    onClick={handleOpenAdd}
                  >
                    <Plus className="stroke-[3px]" /> Add Equipment
                  </Button>
                )}

                {user?.role === "trainer" && (
                  <Button
                    variant={"primaryReverse"}
                    className="font-medium"
                    onClick={handleOpenRecommend}
                  >
                    <Plus className="stroke-[3px]" /> Recommend Equipment
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Main Table Section */}
            <GeneralTable<TEquipmentsData>
              noDataDescription="Come back later to see the equipments or add new ones."
              noDataTitle="No Equipments"
              paginationClassName="bg-slate-50 px-6 sticky bottom-0"
              resultCount={count || 0}
              data={equipments}
              columns={ColumnDefinition(
                setSelectedIds,
                setOpenEdit,
                setOpenDelete,
                setOpenView
              )}
            />
          </motion.div>
          <ViewEquipment
            edit={user?.role === "maintainer" || user?.role === "admin"}
            selectedId={selectedIds}
            isDialogOpen={openView}
            setIsDialogOpen={setOpenView}
            setOpenEdit={setOpenEdit}
          />
        </div>
      </section>
      {(user?.role === "admin" || user?.role === "maintainer") && (
        <>
          <RecommendEquipmentTable
            isDialogOpen={openRecommendTable}
            setIsDialogOpen={setOpenRecommendTable}
          />
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
        </>
      )}
      {user?.role === "trainer" && (
        <>
          <RecommendEquipments
            isDialogOpen={openRecommend}
            setIsDialogOpen={setOpenRecommend}
            recommendedBy={user._id}
          />
        </>
      )}
    </>
  );
}
