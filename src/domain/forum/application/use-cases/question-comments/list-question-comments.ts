import {
  IListQuestionCommentsUseCaseRequest,
  IListQuestionCommentsUseCaseResponse,
} from "@/core/interfaces/list-question-comments-use-case";
import { QuestionCommentsRepository } from "../../repositories/question-comments-repository";
import { right } from "@/core/either";

export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: IListQuestionCommentsUseCaseRequest): Promise<IListQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return right({ questionComments });
  }
}
