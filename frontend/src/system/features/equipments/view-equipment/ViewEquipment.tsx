import { Button } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Status from "@/system/components/status/Status";
import treadmill from "@/assets/website/images/hero-bg.jpg";
import { TEquipmentCategory } from "../type";
import { formatTime } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import useGetEquipment from "../get-equipment/useGetEquipment";

export default function ViewEquipment({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
  setOpenEdit,
  edit = true,
}: {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
}) {
  const { data: equipment } = useGetEquipment({
    selectedId: selectedId,
    enabled: isDialogOpen,
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => {
        setIsDialogOpen(value);
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="!rounded-2xl p-0 flex max-w-5xl overflow-hidden border-none"
      >
        {equipment && (
          <div className="flex items-start w-full">
            <figure className="size-full h-[400px] overflow-hidden relative">
              <div className="absolute inset-0 bg-primary opacity-50"></div>
              <img
                loading="lazy"
                src={equipment.equipmentImage || treadmill}
                className="size-full object-cover object-center"
                alt="Image of the equipment"
              />
            </figure>
            <article className="flex flex-col gap-5 p-6 size-full">
              <DialogHeader className="flex flex-col space-y-0 gap-2">
                <DialogTitle className="font-bold text-gray text-[24px]">
                  {equipment.equipmentName}
                </DialogTitle>
                <div className="flex gap-2">
                  <Category
                    category={equipment.category as TEquipmentCategory}
                  />
                  <Status
                    className="text-[14px] py-1 px-2 rounded-[8px]"
                    status={equipment.status}
                  />
                </div>
              </DialogHeader>
              <Brand brandName={equipment.brandName} />
              <div className="flex flex-col gap-5 h-auto mb-auto">
                <p
                  className="text-gray-tertiary
               text-sm font-normal leading-[1.6]"
                >
                  {equipment.description}
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="text-gray-secondary font-normal">
                    <span className="mr-2 font-bold">Serial Number:</span>
                    {equipment.serialNumber}
                  </li>
                  <li className="text-gray-secondary font-normal">
                    <span className="mr-2 font-bold">Installation Date:</span>
                    {formatTime(equipment?.installationDate)}
                  </li>
                </ul>
              </div>
              {edit && (
                <DialogFooter>
                  <Button
                    variant={"primary"}
                    onClick={() => setOpenEdit?.(true)}
                    className="py-1.5 font-medium px-6"
                  >
                    Edit
                  </Button>
                </DialogFooter>
              )}
            </article>
          </div>
        )}
        {/* Just to remove the accessibility bug */}

        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function Brand({ brandName }: { brandName: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Icon
        icon={"flowbite:badge-check-solid"}
        className="text-primary text-2xl"
      />
      <span className="text-gray-secondary text-sm">{brandName}</span>
    </div>
  );
}

function Category({ category }: { category: TEquipmentCategory }) {
  let icon;
  switch (category) {
    case "cardio":
      icon = "material-symbols:cardio-load";
      break;
    case "flexibility":
      icon = "solar:stretching-round-outline";
      break;
    case "strength":
      icon = "lucide:biceps-flexed";
      break;
  }
  return (
    <div className="flex gap-1 items-center bg-accent-light py-1 px-2 border-accent border-[.5px] rounded-[8px]">
      <Icon icon={icon} className="text-accent" />
      <span className="text-accent capitalize text-sm font-medium">
        {category}
      </span>
    </div>
  );
}
