import { WrongCredentialsError } from "@/core/errors/wrong-credentials-error";
import {
  authenticateBodySchema,
  TAuthenticateControllerRequest,
} from "@/core/types/authenticate-controller";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/student/authenticate-student";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from "@nestjs/common";

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema);

@Controller("/sessions")
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: TAuthenticateControllerRequest) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
