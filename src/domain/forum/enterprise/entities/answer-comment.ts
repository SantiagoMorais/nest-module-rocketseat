import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IAnswerCommentProps } from "@/core/interfaces/answer-comment-props";
import { Optional } from "@/core/types/optional";
import { Comment } from "./comment";

export class AnswerComment extends Comment<IAnswerCommentProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<IAnswerCommentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return answerComment;
  }
}
