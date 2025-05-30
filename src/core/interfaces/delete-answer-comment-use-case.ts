import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either } from "../either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

export interface IDeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

export type IDeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;
