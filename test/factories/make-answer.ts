import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IAnswerProps } from "@/core/interfaces/answer-props";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { faker } from "@faker-js/faker";

export const makeAnswer = (
  override: Partial<IAnswerProps> = {},
  id?: UniqueEntityId
) => {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return answer;
};
