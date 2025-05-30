import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async create(question: Question): Promise<void> {
    this.questions.push(question);

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.slug.value === slug
    );
    if (!question) return null;
    return question;
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex((q) => q.id === question.id);
    this.questions.splice(questionIndex, 1);
    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toValue()
    );
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find((q) => q.id.toString() === id);
    if (!question) return null;
    return question;
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex((q) => q.id === question.id);
    this.questions[questionIndex] = question;

    DomainEvents.dispatchEventsForAggregate(question.id);
  }

  async findManyRecent({ page }: PaginationParams): Promise<Array<Question>> {
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}
