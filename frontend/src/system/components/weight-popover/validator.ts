import z from "zod";

export const weightSchema = z.object({
  weight: z.number().min(0),
  loggedAt: z.string(),
  overwrite: z.boolean().optional(),
});
