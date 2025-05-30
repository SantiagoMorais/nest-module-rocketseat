import {
  authenticateBodySchema,
  TAuthenticateControllerRequest,
} from "@/core/types/authenticate-controller";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/prisma/prisma.service";
import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";

const bodyValidationPipe = new ZodValidationPipe(authenticateBodySchema);

@Controller("/sessions")
export class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService
  ) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: TAuthenticateControllerRequest) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      throw new UnauthorizedException("User credentials do not match.");

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException("User credentials do not match.");

    const accessToken = this.jwt.sign({ sub: user.id });

    return {
      access_token: accessToken,
    };
  }
}
