import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionCommentMapper } from "../mappers/prisma-question-comment-mapper";

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!questionComment) return null;

    return PrismaQuestionCommentMapper.toDomain(questionComment);
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment);
    await this.prisma.comment.create({
      data,
    });
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: questionComment.id.toValue() },
    });
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<Array<QuestionComment>> {
    const questionsCount = 20;
    const questionComments = await this.prisma.comment.findMany({
      where: { questionId },
      take: questionsCount,
      skip: questionsCount * (page - 1),
      orderBy: { createdAt: "desc" },
    });

    const prismaQuestionComments = questionComments.map((question) =>
      PrismaQuestionCommentMapper.toDomain(question)
    );

    return prismaQuestionComments;
  }
}
