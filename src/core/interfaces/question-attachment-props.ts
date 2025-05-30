import { UniqueEntityId } from "../entities/unique-entity-id";

export interface IQuestionAttachmentProps {
  questionId: UniqueEntityId;
  attachmentId: UniqueEntityId;
}
