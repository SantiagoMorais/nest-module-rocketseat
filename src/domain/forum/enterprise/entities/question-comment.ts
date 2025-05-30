import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { IQuestionCommentProps } from "@/core/interfaces/question-comment-props";
import { Optional } from "@/core/types/optional";
import { Comment } from "./comment";

export class QuestionComment extends Comment<IQuestionCommentProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<IQuestionCommentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return questionComment;
  }
}
