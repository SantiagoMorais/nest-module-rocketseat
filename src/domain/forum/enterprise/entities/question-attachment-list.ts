import { WatchedList } from "@/core/entities/watched-list";
import { IQuestionAttachmentProps } from "@/core/interfaces/question-attachment-props";

export class QuestionAttachmentList extends WatchedList<IQuestionAttachmentProps> {
  compareItems(
    a: IQuestionAttachmentProps,
    b: IQuestionAttachmentProps
  ): boolean {
    return a.attachmentId.equals(b.attachmentId);
  }
}
