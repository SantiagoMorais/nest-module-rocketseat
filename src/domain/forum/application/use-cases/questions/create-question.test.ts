import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
import { CreateQuestionUseCase } from "./create-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/in-memory-question-attachments-repository";
import { QuestionAlreadyExistsError } from "@/core/errors/question-already-exists-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      content: "What is the best programming language?",
      title: "Best programming language",
      attachmentsIds: ["1", "2"],
    });

    expect(result.isRight()).toBe(true);

    if (result.isRight()) {
      expect(result.value.question.authorId).toBeTruthy();
      expect(inMemoryQuestionsRepository.questions[0].id).toEqual(
        result.value?.question.id
      );
      expect(
        inMemoryQuestionsRepository.questions[0].attachments.currentItems
      ).toHaveLength(2);
      expect(
        inMemoryQuestionsRepository.questions[0].attachments.currentItems
      ).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityId("2") }),
      ]);
    } else {
      expect(result.value).toBeInstanceOf(QuestionAlreadyExistsError);
    }
  });
});
