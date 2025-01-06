import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Please enter your password")
      .min(8, { message: "Password is too short" })
      .max(40, { message: "Password is too long" }),

    passwordConfirm: z.string().nonempty("Please re-enter your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    // Specifies where the error message will show
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
