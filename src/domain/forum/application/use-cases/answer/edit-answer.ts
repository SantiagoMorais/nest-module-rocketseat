import {
  IEditAnswerUseCaseRequest,
  IEditAnswerUseCaseResponse,
} from "@/core/interfaces/edit-answer-use-case";
import { AnswersRepository } from "../../repositories/answers-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error";
import { AnswerAttachmentsRepository } from "../../repositories/answer-attachments-repository";
import { AnswerAttachmentList } from "@/domain/forum/enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: IEditAnswerUseCaseRequest): Promise<IEditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError("Answer not found."));
    if (authorId !== answer.authorId.toValue())
      return left(new NotAllowedError());

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments
    );

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      });
    });

    answerAttachmentList.update(answerAttachments);

    answer.attachments = answerAttachmentList;
    answer.content = content;

    await this.answersRepository.save(answer);
    return right({ answer });
  }
}
