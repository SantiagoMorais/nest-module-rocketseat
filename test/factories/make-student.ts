import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IStudentProps } from "@/core/interfaces/student-props";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { faker } from "@faker-js/faker";

export const makeStudent = (
  override: Partial<IStudentProps> = {},
  id?: UniqueEntityId
) => {
  const student = Student.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return student;
};
