import { Notification } from "@/domain/notification/enterprise/entities/notification";
import { Either } from "../either";

export interface ISendNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

export type ISendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>;
