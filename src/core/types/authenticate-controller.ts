import { z } from "zod";

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "The password must has at minimum of 6 characters" }),
});

export type TAuthenticateControllerRequest = z.infer<
  typeof authenticateBodySchema
>;
