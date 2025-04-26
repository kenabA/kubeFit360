import { z } from "zod";
import { adminSchema } from "./validator";

export type TEditAdminFormProps = z.infer<typeof adminSchema>;
