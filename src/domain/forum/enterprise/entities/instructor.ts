import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IInstructorProps } from "@/core/interfaces/instructor-props";

export class Instructor extends Entity<IInstructorProps> {
  static create(props: IInstructorProps, id?: UniqueEntityId) {
    const instructor = new Instructor(props, id);

    return instructor;
  }
}
