import { WatchedList } from "@/core/entities/watched-list";
import { IAnswerAttachmentProps } from "@/core/interfaces/answer-attachment-props";

export class AnswerAttachmentList extends WatchedList<IAnswerAttachmentProps> {
  compareItems(a: IAnswerAttachmentProps, b: IAnswerAttachmentProps): boolean {
    return a.attachmentId.equals(b.attachmentId);
  }
}
