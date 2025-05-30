import { UniqueEntityId } from "../entities/unique-entity-id";
import { ICommentProps } from "./comment-props";

export interface IAnswerCommentProps extends ICommentProps {
  answerId: UniqueEntityId;
}
