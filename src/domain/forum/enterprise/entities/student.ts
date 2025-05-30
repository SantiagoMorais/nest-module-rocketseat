import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IStudentProps } from "@/core/interfaces/student-props";

export class Student extends Entity<IStudentProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: IStudentProps, id?: UniqueEntityId) {
    const student = new Student(props, id);

    return student;
  }
}
