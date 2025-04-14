import z from "zod";

export const adminSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty("Please specify admin's name"),
  email: z.string().nonempty("Please provide admin's email"),
  phoneNumber: z
    .string()
    .regex(/^(?:98[0-9]{8}|97[0-9]{8}|96[0-9]{8})$/, "Invalid phone number."),
  userImage: z.string().optional(),
  removeImage: z.boolean().optional(),
});
