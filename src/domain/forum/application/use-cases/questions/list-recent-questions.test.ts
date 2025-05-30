import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
import { ListRecentQuestionsUseCase } from "./list-recent-questions";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: ListRecentQuestionsUseCase;

describe("List Recent Questions Use Case", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new ListRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to list the recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2025, 0, 22),
      })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2025, 0, 20),
      })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2025, 0, 21),
      })
    );

    const { value } = await sut.execute({ page: 1 });

    expect(value?.questions).toHaveLength(3);
    expect(value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 22) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 21) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
    ]);
  });

  it("should be able to list paginated recent questions", async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const { value } = await sut.execute({ page: 2 });

    expect(value?.questions).toHaveLength(2);
  });
});
