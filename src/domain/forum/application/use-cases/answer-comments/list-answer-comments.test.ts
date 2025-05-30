import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { ListAnswerCommentsUseCase } from "./list-answer-comments";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: ListAnswerCommentsUseCase;

describe("List Answer Comments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should be able to list answer comments", async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId("answer-1"),
      })
    );

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId("answer-1"),
      })
    );

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId("answer-1"),
      })
    );

    const { value } = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(value?.answerComments).toHaveLength(3);
  });

  it("should be able to list paginated answer comments", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId("answer-1"),
        })
      );
    }

    const { value } = await sut.execute({
      answerId: "answer-1",
      page: 2,
    });

    expect(value?.answerComments).toHaveLength(2);
  });
});
