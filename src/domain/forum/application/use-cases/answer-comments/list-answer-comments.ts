import {
  IListAnswerCommentsUseCaseRequest,
  IListAnswerCommentsUseCaseResponse,
} from "@/core/interfaces/list-answer-comments-use-case";
import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { right } from "@/core/either";

export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: IListAnswerCommentsUseCaseRequest): Promise<IListAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return right({ answerComments });
  }
}
