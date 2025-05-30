import { AnswerAttachmentList } from "@/domain/forum/enterprise/entities/answer-attachment-list";
import { UniqueEntityId } from "../entities/unique-entity-id";

export interface IAnswerProps {
  content: string;
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date | null;
}
