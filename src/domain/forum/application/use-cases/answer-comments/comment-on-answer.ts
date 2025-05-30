import {
  ICommentOnAnswerUseCaseRequest,
  ICommentOnAnswerUseCaseResponse,
} from "@/core/interfaces/comment-on-answer-use-case";
import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../../repositories/answers-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: ICommentOnAnswerUseCaseRequest): Promise<ICommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError("Answer not found."));

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return right({ answerComment });
  }
}
