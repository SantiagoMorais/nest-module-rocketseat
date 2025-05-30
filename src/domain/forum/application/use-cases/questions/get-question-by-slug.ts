import { left, right } from "@/core/either";
import {
  IGetQuestionBySlugUseCaseRequest,
  IGetQuestionBySlugUseCaseResponse,
} from "@/core/interfaces/get-question-by-slug-use-case";
import { QuestionsRepository } from "../../repositories/questions-repository";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: IGetQuestionBySlugUseCaseRequest): Promise<IGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);
    if (!question)
      return left(new ResourceNotFoundError("Question not found."));
    return right({ question });
  }
}
