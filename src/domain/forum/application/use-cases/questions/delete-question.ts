import {
  IDeleteQuestionUseCaseRequest,
  IDeleteQuestionUseCaseResponse,
} from "@/core/interfaces/delete-question-use-case";
import { QuestionsRepository } from "../../repositories/questions-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error";

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: IDeleteQuestionUseCaseRequest): Promise<IDeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question)
      return left(new ResourceNotFoundError("Question not found."));
    if (authorId !== question.authorId.toValue())
      return left(new NotAllowedError("Not allowed"));

    await this.questionsRepository.delete(question);
    return right(null);
  }
}
