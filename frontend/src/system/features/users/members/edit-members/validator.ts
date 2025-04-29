import z from "zod";

export const memberSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty("Please specify member's name"),
  email: z.string().nonempty("Please provide member's email"),
  phoneNumber: z
    .string()
    .regex(/^(?:98[0-9]{8}|97[0-9]{8}|96[0-9]{8})$/, "Invalid phone number."),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  status: z.string().optional(),
  address: z.string().optional(),
  userImage: z.string().optional(),
  removeImage: z.boolean().optional(),
  createdAt: z.string(),
});
