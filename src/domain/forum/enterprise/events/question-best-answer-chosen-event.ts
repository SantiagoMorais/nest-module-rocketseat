import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Question } from "../entities/question";

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  public occurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityId;

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.question = question;
    this.occurredAt = new Date();
    this.bestAnswerId = bestAnswerId;
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id;
  }
}
