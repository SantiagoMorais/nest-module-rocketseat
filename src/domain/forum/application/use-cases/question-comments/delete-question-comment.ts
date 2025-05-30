import {
  IDeleteQuestionCommentUseCaseRequest,
  IDeleteQuestionCommentUseCaseResponse,
} from "@/core/interfaces/delete-question-comment-use-case";
import { QuestionCommentsRepository } from "../../repositories/question-comments-repository";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";
import { left, right } from "@/core/either";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error";

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: IDeleteQuestionCommentUseCaseRequest): Promise<IDeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment)
      return left(new ResourceNotFoundError("Question comment not found."));

    if (questionComment.authorId.toValue() !== authorId)
      return left(new NotAllowedError("Not allowed"));

    await this.questionCommentsRepository.delete(questionComment);

    return right(null);
  }
}
