import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";

export interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<Array<AnswerAttachment>>;
  deleteManyByAnswerId(answerId: string): Promise<void>;
}
