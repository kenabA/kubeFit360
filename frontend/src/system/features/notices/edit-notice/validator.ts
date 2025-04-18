import z from "zod";

export const noticeSchema = z.object({
  title: z.string().nonempty("Please specify the title of the notice"),
  description: z
    .string()
    .nonempty("Please brief about the notice")
    .max(500, "Too long! Keep it less than 500 words."),
  representativeImg: z.string().optional(),
  expiresAt: z.string().nonempty("Please specify the expiry date"),
  removeImage: z.boolean().optional(),
});
