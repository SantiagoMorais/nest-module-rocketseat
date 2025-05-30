import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { Either } from "../either";

export interface IListAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

export type IListAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: Array<AnswerComment>;
  }
>;
