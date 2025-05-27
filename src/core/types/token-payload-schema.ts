import { z } from "zod";

export const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
});

export type TUserPayload = z.infer<typeof tokenPayloadSchema>;
