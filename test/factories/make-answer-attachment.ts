import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IAnswerAttachmentProps } from "@/core/interfaces/answer-attachment-props";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export const makeAnswerAttachment = (
  override: Partial<IAnswerAttachmentProps> = {},
  id?: UniqueEntityId
) => {
  const answerAttachment = AnswerAttachment.create(
    {
      attachmentId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return answerAttachment;
};
