import {
  createAccountBodySchema,
  TCreateAccountControllerRequest,
} from "@/core/types/create-account-controller";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { hash } from "bcryptjs";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema);

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: TCreateAccountControllerRequest
  ) {
    const { email, name, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail)
      throw new ConflictException(
        "User with same email address already exists."
      );

    const passwordHash = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });
  }
}
