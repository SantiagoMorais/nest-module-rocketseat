import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "@test/factories/make-answer";
import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository";
import { ListQuestionAnswersUseCase } from "./list-question-answers";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: ListQuestionAnswersUseCase;

describe("List Question Answers Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new ListQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to list question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityId("question-1") })
    );

    const { value } = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(value?.answers).toHaveLength(3);
  });

  it("should be able to paginated question answers list", async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId("question-1") })
      );
    }

    const { value } = await sut.execute({
      page: 2,
      questionId: "question-1",
    });

    expect(value?.answers).toHaveLength(2);
  });
});
