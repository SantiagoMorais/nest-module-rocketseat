import {
  IDeleteAnswerUseCaseRequest,
  IDeleteAnswerUseCaseResponse,
} from "@/core/interfaces/delete-answer-use-case";
import { AnswersRepository } from "../../repositories/answers-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error";

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: IDeleteAnswerUseCaseRequest): Promise<IDeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError("Answer not found."));
    if (answer.authorId.toValue() !== authorId)
      return left(new NotAllowedError());

    await this.answersRepository.delete(answer);
    return right(null);
  }
}
