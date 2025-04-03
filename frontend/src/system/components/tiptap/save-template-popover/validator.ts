import z from "zod";

export const saveTemplateSchema = z.object({
  templateName: z.string().nonempty("Please specify the name of the template"),
  template: z.string().nonempty("Please specify the name of the template"),
});
