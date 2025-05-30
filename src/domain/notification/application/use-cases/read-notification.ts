import { left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import {
  IReadNotificationUseCaseRequest,
  IReadNotificationUseCaseResponse,
} from "@/core/interfaces/read-notification-use-case";
import { NotificationsRepository } from "../repositories/notifications-repository";

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: IReadNotificationUseCaseRequest): Promise<IReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) return left(new ResourceNotFoundError());
    if (recipientId !== notification.recipientId.toValue())
      return left(new NotAllowedError());

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({ notification });
  }
}
