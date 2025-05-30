import {
  IListRecentQuestionsUseCaseRequest,
  IListRecentQuestionsUseCaseResponse,
} from "@/core/interfaces/list-recent-questions-use-case";
import { QuestionsRepository } from "../../repositories/questions-repository";
import { right } from "@/core/either";

export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: IListRecentQuestionsUseCaseRequest): Promise<IListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page });
    return right({ questions });
  }
}
