import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: Array<AnswerAttachment> = [];

  async findManyByAnswerId(answerId: string): Promise<Array<AnswerAttachment>> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toValue() === answerId
    );

    return answerAttachments;
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachments = this.items.filter(
      (attachment) => attachment.answerId.toValue() !== answerId
    );
    this.items = answerAttachments;
  }
}
