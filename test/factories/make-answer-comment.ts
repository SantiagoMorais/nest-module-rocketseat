import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IAnswerCommentProps } from "@/core/interfaces/answer-comment-props";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { faker } from "@faker-js/faker";

export const makeAnswerComment = (
  override: Partial<IAnswerCommentProps> = {},
  id?: UniqueEntityId
) => {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      answerId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return answerComment;
};
