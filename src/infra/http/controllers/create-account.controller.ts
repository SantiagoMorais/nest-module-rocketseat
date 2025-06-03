import {
  createAccountBodySchema,
  TCreateAccountControllerRequest,
} from "@/core/types/create-account-controller";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/student/register-student";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { Body, Controller, Post } from "@nestjs/common";

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema);

@Controller("/accounts")
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

    if (result.isLeft()) throw new Error();
  }
}
