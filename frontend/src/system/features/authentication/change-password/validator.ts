import z from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().nonempty("Please enter your old password"),
    newPassword: z.string().nonempty("Please enter your password"),
    confirmPassword: z.string().nonempty("Please re-type your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
