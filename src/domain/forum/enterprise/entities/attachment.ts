import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IAttachmentProps } from "@/core/interfaces/attachment-props";

export class Attachment extends Entity<IAttachmentProps> {
  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  static create(props: IAttachmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id);
    return attachment;
  }
}
