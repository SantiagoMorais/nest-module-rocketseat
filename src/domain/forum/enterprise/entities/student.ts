import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IStudentProps } from "@/core/interfaces/student-props";

export class Student extends Entity<IStudentProps> {
  static create(props: IStudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id);

    return student;
  }
}
