import z from "zod";

export const trainerSchema = z.object({
  _id: z.string().optional(),
  name: z.string().nonempty("Trainer's name is required."),
  email: z.string().email("A valid email address is required."),
  phoneNumber: z
    .string()
    .regex(
      /^(?:98[0-9]{8}|97[0-9]{8}|96[0-9]{8})$/,
      "Please provide a valid phone number."
    ),
  birthDate: z.string(),
  gender: z.string().nonempty("Trainer's gender is required."),
  status: z.string().nonempty("A valid status is required."),
  address: z.string().nonempty("Trainer's address is required."),
  userImage: z.string().optional(),
  removeImage: z.boolean().optional(),
  createdAt: z.string().optional(),
});
