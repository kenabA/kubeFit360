import { z } from "zod";
import { saveTemplateSchema } from "./validator";

export type TSaveTemplateFormProps = z.infer<typeof saveTemplateSchema>;
