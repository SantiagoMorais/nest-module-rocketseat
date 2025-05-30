import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IQuestionProps } from "@/core/interfaces/question-props";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { faker } from "@faker-js/faker";

export const makeQuestion = (
  override: Partial<IQuestionProps> = {},
  id?: UniqueEntityId
) => {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      slug: Slug.create("example-question"),
      ...override,
    },
    id
  );

  return question;
};
