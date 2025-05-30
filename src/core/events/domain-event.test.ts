import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityId } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
  public occurredAt: Date;
  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.occurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe("domain events", () => {
  it("should be able to dispatch and listen to events", async () => {
    const callbackSpy = vi.fn();

    // Subscriber registered (listening the "answer created" event)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    // I'm creating an answer, but WITHOUT saving it in the db
    const aggregate = CustomAggregate.create();

    // I'm ensuring that the event was created, but NOT fired
    expect(aggregate.domainEvents).toHaveLength(1);

    // I'm saving the answer on db, then firing the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // The subscriber listen to the event and do what is need it with the data
    expect(callbackSpy).toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
