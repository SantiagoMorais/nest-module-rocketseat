import { Question } from "@/domain/forum/enterprise/entities/question";
import { Either } from "../either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

export interface IChooseQuestionBestAnswerUseCaseRequest {
  questionAuthorId: string;
  answerId: string;
}

export type IChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;
