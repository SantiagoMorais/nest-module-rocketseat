import {
  IChooseQuestionBestAnswerUseCaseRequest,
  IChooseQuestionBestAnswerUseCaseResponse,
} from "@/core/interfaces/choose-question-best-answer";
import { AnswersRepository } from "../../repositories/answers-repository";
import { QuestionsRepository } from "../../repositories/questions-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error";

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    questionAuthorId,
  }: IChooseQuestionBestAnswerUseCaseRequest): Promise<IChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);
    if (!answer) return left(new ResourceNotFoundError("Answer not found."));

    const question = await this.questionsRepository.findById(
      answer.questionId.toValue()
    );
    if (!question)
      return left(new ResourceNotFoundError("Question not found."));

    if (questionAuthorId !== question.authorId.toValue())
      return left(new NotAllowedError());

    question.bestAnswerId = answer.id;
    await this.questionsRepository.save(question);
    return right({ question });
  }
}
