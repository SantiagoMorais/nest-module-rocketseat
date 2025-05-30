import {
  IDeleteAnswerCommentUseCaseRequest,
  IDeleteAnswerCommentUseCaseResponse,
} from "@/core/interfaces/delete-answer-comment-use-case";
import { AnswerCommentsRepository } from "../../repositories/answer-comments-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error";

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: IDeleteAnswerCommentUseCaseRequest): Promise<IDeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment)
      return left(new ResourceNotFoundError("Answer not found."));

    if (answerComment.authorId.toValue() !== authorId)
      return left(new NotAllowedError());

    await this.answerCommentsRepository.delete(answerComment);

    return right(null);
  }
}
