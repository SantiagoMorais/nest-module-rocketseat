import { z } from "zod";

export const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type TCreateQuestionBody = z.infer<typeof createQuestionBodySchema>;
