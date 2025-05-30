import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either } from "../either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

export interface IDeleteQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
}

export type IDeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;
