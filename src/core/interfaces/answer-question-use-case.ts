import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Either } from "../either";

export interface IAnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

export type IAnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;
