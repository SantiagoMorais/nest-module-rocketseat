import { IUseCaseError } from "@/core/errors/use-case-error";

export class ResourceNotFoundError extends Error implements IUseCaseError {
  constructor(message?: string) {
    super(message ?? "Resource not found");
    this.name = "ResourceNotFoundError";
  }
}
