import { UniqueEntityId } from "../entities/unique-entity-id";

export interface INotificationProps {
  recipientId: UniqueEntityId;
  title: string;
  content: string;
  readAt?: Date;
  createdAt: Date;
}
