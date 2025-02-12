import z from "zod";

export const maintainerSchema = z.object({
  name: z.string().nonempty("Please specify maintainer's name"),
  email: z.string().nonempty("Please provide maintainer's email"),
  phoneNumber: z
    .string()
    .regex(/^(?:98[0-9]{8}|97[0-9]{8}|96[0-9]{8})$/, "Invalid phone number."),
  birthDate: z.string().nonempty("Please mention maintainer's DOB"),
  gender: z.string().nonempty("Please specify maintainer's gender"),
  role: z.string().nonempty("Please provide a valid role"),
  address: z.string().nonempty("Please specify maintainer's address"),
  userImage: z.string().optional(),
});
