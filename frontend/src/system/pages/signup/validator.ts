import z from "zod";

export const signupSchema = z.object({
  name: z.string().nonempty("Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().nonempty("Please enter your password"),
  phoneNumber: z
    .string()
    .regex(/^(?:98[0-9]{8}|97[0-9]{8}|96[0-9]{8})$/, "Invalid phone number."),
  membershipType: z.string().optional(),
});
