import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Question as PrismaQuestion, Prisma } from "@prisma/client";

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        createdAt: raw.createdAt,
        bestAnswerId: raw.bestAnswerId
          ? new UniqueEntityId(raw.bestAnswerId)
          : null,
        attachments: undefined,
        slug: Slug.create(raw.slug),
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    );
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toValue(),
      authorId: question.authorId.toValue(),
      bestAnswerId: question.bestAnswerId?.toValue(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
