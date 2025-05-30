import { UniqueEntityId } from "../entities/unique-entity-id";
import { ICommentProps } from "./comment-props";

export interface IQuestionCommentProps extends ICommentProps {
  questionId: UniqueEntityId;
}
