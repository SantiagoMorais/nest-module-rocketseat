import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either } from "../either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

export interface IDeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

export type IDeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;
