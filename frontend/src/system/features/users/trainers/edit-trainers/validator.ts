import z from "zod";

export const trainerSchema = z.object({
  _id: z.string(),
  name: z.string().nonempty("Please specify trainer's name"),
  email: z.string().nonempty("Please provide trainer's email"),
  phoneNumber: z
    .string()
    .regex(/^(?:98[0-9]{8}|97[0-9]{8}|96[0-9]{8})$/, "Invalid phone number."),
  birthDate: z.string().nonempty("Please mention trainer's DOB"),
  gender: z.string().nonempty("Please specify trainer's gender"),
  role: z.string().nonempty("Please provide a valid role"),
  status: z.string().nonempty("Please provide a valid status"),
  address: z.string().nonempty("Please specify trainer's address"),
  userImage: z.string().optional(),
  removeImage: z.boolean().optional(),
  createdAt: z.string(),
});
