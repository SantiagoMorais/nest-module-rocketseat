import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { Either } from "../either";

export interface IListQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

export type IListQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: Array<QuestionComment>;
  }
>;
