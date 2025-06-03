import { Question } from "@/domain/forum/enterprise/entities/question";
import { Either } from "../either";
import { QuestionAlreadyExistsError } from "../errors/question-already-exists-error";

export interface ICreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: Array<string>;
}

export type ICreateQuestionUseCaseResponse = Either<
  QuestionAlreadyExistsError,
  {
    question: Question;
  }
>;
