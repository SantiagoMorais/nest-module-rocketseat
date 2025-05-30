import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository.js";
import { AnswerQuestionUseCase } from "./answer-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create an answer", async () => {
    const { value } = await sut.execute({
      content: "New Content",
      instructorId: "1",
      questionId: "2",
      attachmentsIds: ["1", "2"],
    });

    expect(value?.answer.id).toBeTruthy();
    expect(inMemoryAnswersRepository.answers[0].id).toEqual(value?.answer.id);
    expect(
      inMemoryAnswersRepository.answers[0].attachments.currentItems
    ).toHaveLength(2);
    expect(
      inMemoryAnswersRepository.answers[0].attachments.currentItems
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityId("2") }),
    ]);
  });
});
