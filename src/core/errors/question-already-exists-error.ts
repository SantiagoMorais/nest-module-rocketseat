import { IUseCaseError } from "@/core/errors/use-case-error";

export class QuestionAlreadyExistsError extends Error implements IUseCaseError {
  constructor(identifier: string) {
    super(`Question "${identifier}" already exists.`);
    this.name = "QuestionAlreadyExistsError";
  }
}
