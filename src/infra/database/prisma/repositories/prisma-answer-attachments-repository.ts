import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAnswerAttachmentMapper } from "../mappers/prisma-answer-attachment-mapper";

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<Array<AnswerAttachment>> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: { answerId },
    });

    const prismaAnswerAttachments = answerAttachments.map((attachment) =>
      PrismaAnswerAttachmentMapper.toDomain(attachment)
    );

    return prismaAnswerAttachments;
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { answerId },
    });
  }
}
