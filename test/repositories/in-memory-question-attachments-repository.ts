import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: Array<QuestionAttachment> = [];

  async findManyByQuestionId(
    questionId: string
  ): Promise<Array<QuestionAttachment>> {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toValue() === questionId
    );

    return questionAttachments;
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachments = this.items.filter(
      (attachment) => attachment.questionId.toValue() !== questionId
    );
    this.items = questionAttachments;
  }
}
