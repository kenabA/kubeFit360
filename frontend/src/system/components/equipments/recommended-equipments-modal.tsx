import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { cardVariants } from "@/system/components";
import useRecommendedEquipments from "@/system/features/equipments/recommend-equipments/useRecommendedEquipments";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { Oval } from "react-loader-spinner";
import NoData from "../no-data/NoData";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "@/components/ui/badge";

import { cn, formatTime } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { ThemedDialog } from "@/components/dialog/Dialog";
import useDeleteEquipments from "@/system/features/equipments/delete-equipments/useDeleteEquipment";
import useAddRecommendedEquipment from "@/system/features/equipments/add-equipments/useAddRecommendedEqp";

export type TRecommendEquipmentTable = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RecommendEquipmentTable({
  isDialogOpen,
  setIsDialogOpen,
}: TRecommendEquipmentTable) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const { deleteEquipment, isPending: isDeletePending } = useDeleteEquipments();
  const { addRecommendedEquipment, isPending: isAdding } =
    useAddRecommendedEquipment();

  function handleCancel() {
    setIsDialogOpen(false);
  }

  const {
    data: { data: recommendedEquipments },
    isPending,
  } = useRecommendedEquipments();

  return (
    <>
      <FormModal
        icon="material-symbols:card-membership-outline"
        title="Recommended Equipments"
        className="max-w-[70%]  2xl:max-w-[60%]"
        subtitle="Here are the equipments recommended by the trainer."
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        footer={
          <>
            <Button
              disabled={isDeletePending || isAdding}
              className="shadow-none hover:shadow-none bg-slate-100 text-gray-tertiary"
              variant={"ghost"}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        }
      >
        {isPending ? (
          <div className="flex items-center justify-center w-full h-full">
            <Oval
              height={40}
              width={40}
              color="#4fa94d"
              secondaryColor="#4fa94d"
              strokeWidth={5}
              strokeWidthSecondary={5}
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : recommendedEquipments.length > 0 ? (
          <AnimatePresence>
            {
              <motion.div
                className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                {recommendedEquipments.map((equipment) => (
                  <div className="flex flex-col justify-between p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 rounded-lg min-h-[260px]">
                    <main className="flex flex-col gap-3">
                      <header className="flex items-start gap-3">
                        <figure className="size-[30px] flex-shrink-0 rounded-full border-[1px] border-primary bg-secondary overflow-hidden shadow-button ">
                          {equipment.equipmentImage ? (
                            <img
                              className="object-cover object-center size-full"
                              src={equipment.equipmentImage}
                              alt="An icon of the maintainer"
                            />
                          ) : (
                            <div className="bg-tertiary size-full text-primary font-bold text-sm text-center items-center justify-center flex">
                              <Icon icon="lucide:package" className="size-4" />
                            </div>
                          )}
                        </figure>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 leading-tight line-clamp-2 mb-1">
                            {equipment.equipmentName}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {equipment.brandName}
                          </p>
                        </div>
                      </header>
                      {/* Status and Category */}
                      <div className="flex items-center gap-2">
                        <Badge variant="gold" className={`text-xs px-2 py-0.5`}>
                          Pending
                        </Badge>
                        <span className="text-xs text-gray-500 truncate capitalize">
                          {equipment.category}
                        </span>
                      </div>
                      {/* Equipment Details */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Serial</span>
                          <span className="text-xs font-mono text-gray-900 truncate ml-2">
                            {equipment.serialNumber}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Installed
                          </span>
                          <span className="text-xs text-gray-900">
                            {formatTime(
                              equipment.installationDate,
                              "MMM dd, yyyy"
                            )}
                          </span>
                        </div>
                      </div>
                    </main>
                    <footer>
                      <div className="mb-3">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200 px-2 py-1"
                        >
                          {/* 👤 {equipment.recommendedBy.name} */}
                          👤 asd
                        </Badge>
                      </div>

                      <div className="flex gap-1 mt-auto justify-end w-full flex-wrap md:flex-nowrap">
                        <button
                          role="button"
                          disabled={isDeletePending || isAdding}
                          onClick={() => {
                            setSelectedIds(equipment._id);
                            setOpenAdd(true);
                          }}
                          className={cn(
                            "flex items-center justify-center  w-full gap-[4px] group  cursor-pointer bg-success-light border-success border rounded-[8px] px-[6px] hover:text-success-hover h-fit p-[4px] text-center",
                            equipment.status === "recommended"
                              ? "transition-transform hover:-translate-y-[2px]"
                              : "pointer-events-none bg-[#F7FEF9] border-[#B1D5AA]"
                          )}
                        >
                          <Check
                            className={cn(
                              "group-hover:text-success-hover",
                              equipment.status === "recommended"
                                ? "text-success"
                                : "text-[#B1D5AA]"
                            )}
                            size={16}
                          />{" "}
                          <span
                            className={cn(
                              "group-hover:text-success-hover text-sm",
                              equipment.status === "recommended"
                                ? "text-success"
                                : "text-[#B1D5AA]"
                            )}
                          >
                            Accept
                          </span>{" "}
                        </button>
                        <button
                          disabled={isDeletePending || isAdding}
                          onClick={() => {
                            setSelectedIds(equipment._id);
                            setOpenDelete(true);
                          }}
                          className={cn(
                            "flex items-center justify-center  w-full gap-[4px] group  cursor-pointer bg-destructive-light border-destructive border rounded-[8px] px-[6px] hover:text-destructive-hover h-fit p-[4px] text-center",
                            equipment.status === "recommended"
                              ? "transition-transform hover:-translate-y-[2px]"
                              : "pointer-events-none bg-[#FDF5F5] border-[#EAA69F]"
                          )}
                        >
                          <X
                            className={cn(
                              "text-destructive group-hover:text-destructive-hover",
                              equipment.status === "recommended"
                                ? "text-destructive"
                                : "text-[#EAA69F]"
                            )}
                            size={16}
                          />
                          <span
                            className={cn(
                              "text-destructive group-hover:text-destructive-hover text-sm",
                              equipment.status === "recommended"
                                ? "text-destructive"
                                : "text-[#EAA69F]"
                            )}
                          >
                            Decline
                          </span>{" "}
                        </button>
                      </div>
                    </footer>
                  </div>
                ))}
              </motion.div>
            }
          </AnimatePresence>
        ) : (
          <motion.div
            className="w-full h-full overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <NoData
              className="size-full"
              title="No Data"
              description="Trainer has not recommended any equipments yet."
            />
          </motion.div>
        )}
      </FormModal>
      <ThemedDialog
        isPending={isDeletePending || isAdding}
        dialogOpen={openDelete}
        setDialogOpen={setOpenDelete}
        mutationFn={async () => {
          await deleteEquipment(selectedIds);
          setOpenDelete(false);
        }}
        theme="destructive"
        ctaText="Reject"
        title="Reject Equipment"
        message="Do you really want to reject this equipment recommendation?"
      />

      <ThemedDialog
        isPending={false}
        dialogOpen={openAdd}
        setDialogOpen={setOpenAdd}
        mutationFn={async () => {
          await addRecommendedEquipment(selectedIds);
          setOpenAdd(false);
        }}
        theme="success"
        ctaText="Add"
        title="Add Equipment"
        message="Do you really want to add this equipment recommendation?"
      />
    </>
  );
}
