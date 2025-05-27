import { z } from "zod";

export const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

export type TPageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
