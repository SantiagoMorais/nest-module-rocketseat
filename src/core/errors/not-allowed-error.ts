import { IUseCaseError } from "@/core/errors/use-case-error";

export class NotAllowedError extends Error implements IUseCaseError {
  constructor(message?: string) {
    super(message ?? "Not allowed");
    this.name = "NotAllowedError";
  }
}
