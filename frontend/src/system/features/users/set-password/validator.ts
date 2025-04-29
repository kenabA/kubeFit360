import z from "zod";

export const setPasswordSchema = z
  .object({
    password: z.string().nonempty("Please enter your password"),
    passwordConfirm: z.string().nonempty("Please re-type your new password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
