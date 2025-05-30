import {
  ISendNotificationUseCaseRequest,
  ISendNotificationUseCaseResponse,
} from "@/core/interfaces/send-notification-use-case";
import { Notification } from "../../enterprise/entities/notification";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { right } from "@/core/either";
import { NotificationsRepository } from "../repositories/notifications-repository";

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: ISendNotificationUseCaseRequest): Promise<ISendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    });

    await this.notificationsRepository.create(notification);

    return right({
      notification,
    });
  }
}
