import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list";
import { Slug } from "../../domain/forum/enterprise/entities/value-objects/slug";
import { UniqueEntityId } from "../entities/unique-entity-id";

export interface IQuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId | null;
  content: string;
  slug: Slug; // A representation of the question title, without accents and special characters
  title: string;
  attachments: QuestionAttachmentList;
  createdAt: Date;
  updatedAt?: Date | null;
}
