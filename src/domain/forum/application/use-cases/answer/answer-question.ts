import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  IAnswerQuestionUseCaseRequest,
  IAnswerQuestionUseCaseResponse,
} from "@/core/interfaces/answer-question-use-case";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswersRepository } from "../../repositories/answers-repository";
import { right } from "@/core/either";
import { AnswerAttachmentList } from "@/domain/forum/enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    content,
    instructorId,
    questionId,
    attachmentsIds,
  }: IAnswerQuestionUseCaseRequest): Promise<IAnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      });
    });

    answer.attachments = new AnswerAttachmentList(answerAttachments);

    await this.answersRepository.create(answer);

    return right({ answer });
  }
}
