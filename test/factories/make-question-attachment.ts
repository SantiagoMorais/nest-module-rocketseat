import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IQuestionAttachmentProps } from "@/core/interfaces/question-attachment-props";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export const makeQuestionAttachment = (
  override: Partial<IQuestionAttachmentProps> = {},
  id?: UniqueEntityId
) => {
  const questionAttachment = QuestionAttachment.create(
    {
      attachmentId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      ...override,
    },
    id
  );

  return questionAttachment;
};
