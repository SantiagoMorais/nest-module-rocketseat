import { UniqueEntityId } from "../entities/unique-entity-id";

export interface ICommentProps {
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
}
