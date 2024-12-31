import { z } from "zod";
import { signupSchema } from "./validator";

// Creates the type automatically based on the loginSchema. We use infer, so that we can utilize and reuse the loginSchema
export type TSignupFormProps = z.infer<typeof signupSchema>;
