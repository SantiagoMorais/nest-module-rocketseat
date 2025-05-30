import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find((a) => a.id.toValue() === id);
    if (!answer) return null;
    return answer;
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex((a) => a.id === answer.id);
    this.answers.splice(answerIndex, 1);
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toValue());
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex((a) => a.id === answer.id);
    this.answers[answerIndex] = answer;
    DomainEvents.dispatchEventsForAggregate(answer.id);
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<Array<Answer>> {
    const answers = this.answers
      .filter((answer) => answer.questionId.toValue() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
}
