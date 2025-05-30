import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Either } from "../either";

export interface IListQuestionAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

export type IListQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Array<Answer>;
  }
>;
