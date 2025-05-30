import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IAnswerAttachmentProps } from "@/core/interfaces/answer-attachment-props";

export class AnswerAttachment extends Entity<IAnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: IAnswerAttachmentProps, id?: UniqueEntityId) {
    const attachment = new AnswerAttachment(props, id);

    return attachment;
  }
}
