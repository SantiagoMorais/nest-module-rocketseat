import { z } from "zod";

export const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "The password must has at minimum of 6 characters" }),
});

export type TCreateAccountControllerRequest = z.infer<
  typeof createAccountBodySchema
>;
