import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { NotAllowedError } from "../errors/not-allowed-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Either } from "../either";

export interface IReadNotificationUseCaseRequest {
  recipientId: string;
  notificationId: string;
}

export type IReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>;
