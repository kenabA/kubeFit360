import { z } from "zod";
import { weightSchema } from "./validator";

export type TWeightFormProps = z.infer<typeof weightSchema>;
