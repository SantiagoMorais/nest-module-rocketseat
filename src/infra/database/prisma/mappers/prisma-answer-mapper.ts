import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Prisma, Answer as PrismaAnswer } from "@prisma/client";

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        createdAt: raw.createdAt,
        attachments: undefined,
        updatedAt: raw.updatedAt,
        questionId: new UniqueEntityId(raw.questionId),
      },
      new UniqueEntityId(raw.id)
    );
  }

  static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toValue(),
      authorId: answer.authorId.toValue(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
      questionId: answer.questionId.toValue(),
    };
  }
}
