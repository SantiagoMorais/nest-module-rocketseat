import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Either } from "../either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

export interface IDeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

export type IDeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>;
