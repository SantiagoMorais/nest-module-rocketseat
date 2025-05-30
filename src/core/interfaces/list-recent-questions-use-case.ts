import { Question } from "@/domain/forum/enterprise/entities/question";
import { Either } from "../either";

export interface IListRecentQuestionsUseCaseRequest {
  page: number;
}

export type IListRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Array<Question>;
  }
>;
