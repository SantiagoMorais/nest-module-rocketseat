import { ICreateAccountControllerRequest } from "@/core/interfaces/create-account-controller";
import { ConflictException } from "@nestjs/common";
import { Body, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() body: ICreateAccountControllerRequest) {
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

    await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}
