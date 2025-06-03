import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  findManyByAnswerId(answerId: string): Promise<Array<AnswerAttachment>> {
    throw new Error(`Method not implemented. ${answerId}`);
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error(`Method not implemented. ${answerId}`);
  }
}
