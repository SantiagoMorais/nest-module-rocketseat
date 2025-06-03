import { StudentAlreadyExistsError } from "@/core/errors/student-already-exists-error";
import {
  createAccountBodySchema,
  TCreateAccountControllerRequest,
} from "@/core/types/create-account-controller";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/student/register-student";
import { Public } from "@/infra/auth/public";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from "@nestjs/common";

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema);

@Controller("/accounts")
@Public()
export class CreateAccountController {
  constructor(private registerStudentUseCase: RegisterStudentUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: TCreateAccountControllerRequest
  ) {
    const { email, name, password } = body;

    const result = await this.registerStudentUseCase.execute({
      email,
      name,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
