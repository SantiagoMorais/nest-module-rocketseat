import {
  IListQuestionAnswersUseCaseRequest,
  IListQuestionAnswersUseCaseResponse,
} from "@/core/interfaces/list-question-answers-use-case";
import { AnswersRepository } from "../../repositories/answers-repository";
import { right } from "@/core/either";

export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: IListQuestionAnswersUseCaseRequest): Promise<IListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page }
    );
    return right({ answers });
  }
}
