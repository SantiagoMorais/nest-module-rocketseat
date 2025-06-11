import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAnswerCommentMapper } from "../mappers/prisma-answer-comment-mapper";

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!answerComment) return null;

    return PrismaAnswerCommentMapper.toDomain(answerComment);
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment);
    await this.prisma.comment.create({
      data,
    });
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: answerComment.id.toValue() },
    });
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<Array<AnswerComment>> {
    const answersCount = 20;
    const answerComments = await this.prisma.comment.findMany({
      where: { answerId },
      take: answersCount,
      skip: answersCount * (page - 1),
      orderBy: { createdAt: "desc" },
    });

    const prismaAnswerComments = answerComments.map((answer) =>
      PrismaAnswerCommentMapper.toDomain(answer)
    );

    return prismaAnswerComments;
  }
}
