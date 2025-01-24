import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipmentSchema } from "./validator";
import { useForm } from "react-hook-form";
import { TAddEquipmentFormProps, TAddEquipmentProps } from "./type";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import useAddEquipment from "./useAddEquipment";

export default function AddEquipments({
  isDialogOpen,
  setIsDialogOpen,
}: TAddEquipmentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddEquipmentFormProps>({
    resolver: zodResolver(equipmentSchema),
  });

  const { addEquipment, isPending } = useAddEquipment();

  function onSubmit(data: TAddEquipmentFormProps) {
    addEquipment(data);
  }

  return (
    <FormModal
      title="Add Equipment"
      subtitle="Fill in the form to add a equipment"
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            disabled={isPending}
            className="shadow-none hover:shadow-none"
            variant={"primaryReverse"}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            form="equipment-form"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="px-6 shadow-none hover:shadow-none"
            variant={"primary"}
            disabled={isPending}
          >
            Add
          </Button>
        </>
      }
    >
      <form
        id="equipment-form"
        className="w-full flex flex-col items-center gap-4"
      >
        <BaseInput
          error={errors.equipmentName}
          label="Equipment Name"
          name="equipmentName"
          type="text"
          placeholder="Enter the equipment name"
          register={register}
        />
        <BaseInput
          error={errors.description}
          label="Description"
          name="description"
          type="text"
          placeholder="Enter the description"
          register={register}
        />
        <div className="flex gap-4 items-start w-full">
          <BaseInput
            error={errors.serialNumber}
            label="Serial Number"
            name="serialNumber"
            type="text"
            placeholder="EN-C-123"
            register={register}
          />
          <BaseInput
            error={errors.brandName}
            label="Brand Name"
            name="brandName"
            type="text"
            placeholder="Enter the brand name"
            register={register}
          />
        </div>
        <BaseInput
          error={errors.category}
          label="Category"
          name="category"
          type="text"
          placeholder="Enter the category"
          register={register}
        />
      </form>
    </FormModal>
  );
}
