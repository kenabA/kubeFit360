import z from "zod";

export const equipmentSchema = z.object({
  equipmentName: z
    .string()
    .nonempty("Please specify the name of the equipment"),
  description: z.string().nonempty("Describe the equipment"),
  serialNumber: z.string().nonempty("Please write the serial number"),
  brandName: z.string().nonempty("Please mention the brand name"),
  category: z.string().nonempty("Please specify the category"),
  equipmentImage: z.string().optional(),
});
