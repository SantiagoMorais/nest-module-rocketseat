import {
  IEditQuestionUseCaseRequest,
  IEditQuestionUseCaseResponse,
} from "@/core/interfaces/edit-question-use-case";
import { QuestionsRepository } from "../../repositories/questions-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error";
import { QuestionAttachmentsRepository } from "../../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
    title,
    attachmentsIds,
  }: IEditQuestionUseCaseRequest): Promise<IEditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question)
      return left(new ResourceNotFoundError("Question not found."));
    if (authorId !== question.authorId.toValue())
      return left(new NotAllowedError("Not allowed"));

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments
    );

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      });
    });

    questionAttachmentList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = questionAttachmentList;

    await this.questionsRepository.save(question);
    return right({ question });
  }
}
