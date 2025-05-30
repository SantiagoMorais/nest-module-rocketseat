import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository";
import { makeQuestion } from "@test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "@test/factories/make-answer";
import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { NotAllowedError } from "../../../../../core/errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/in-memory-question-attachments-repository";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/in-memory-answer-attachments-repository";
import { makeAnswerAttachment } from "@test/factories/make-answer-attachment";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );

    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );

    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete an answer", async () => {
    const question = makeQuestion({}, new UniqueEntityId("question-id"));
    await inMemoryQuestionsRepository.create(question);

    const answer = makeAnswer(
      { authorId: new UniqueEntityId("author-id"), questionId: question.id },
      new UniqueEntityId("answer-id")
    );
    await inMemoryAnswersRepository.create(answer);

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: new UniqueEntityId("answer-id"),
        attachmentId: new UniqueEntityId("1"),
      }),
      makeAnswerAttachment({
        answerId: new UniqueEntityId("answer-id"),
        attachmentId: new UniqueEntityId("2"),
      })
    );

    await sut.execute({
      answerId: "answer-id",
      authorId: "author-id",
    });

    expect(inMemoryAnswersRepository.answers).toHaveLength(0);
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
  });

  it("should not be able to delete an answer from another user", async () => {
    const question = makeQuestion({}, new UniqueEntityId("question-id"));
    await inMemoryQuestionsRepository.create(question);

    const answer = makeAnswer(
      { authorId: new UniqueEntityId("author-id"), questionId: question.id },
      new UniqueEntityId("answer-id")
    );
    await inMemoryAnswersRepository.create(answer);

    const result = await sut.execute({
      answerId: "answer-id",
      authorId: "different-author-id",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
