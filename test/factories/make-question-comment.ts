import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IQuestionCommentProps } from "@/core/interfaces/question-comment-props";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from "@faker-js/faker";

export const makeQuestionComment = (
  override: Partial<IQuestionCommentProps> = {},
  id?: UniqueEntityId
) => {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return questionComment;
};
