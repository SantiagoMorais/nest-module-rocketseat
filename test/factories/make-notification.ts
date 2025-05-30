import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { INotificationProps } from "@/core/interfaces/notification-props";
import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { faker } from "@faker-js/faker";

export function makeNotification(
  override: Partial<INotificationProps> = {},
  id?: UniqueEntityId
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id
  );

  return notification;
}
