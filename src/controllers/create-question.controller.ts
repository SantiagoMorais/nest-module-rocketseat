import { CurrentUser } from "@/auth/current-user.decorator";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { TUserPayload } from "@/core/types/token-payload-schema";
import { Controller, Post, Req, Request, UseGuards } from "@nestjs/common";

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  @Post()
  async handle(@CurrentUser() user: TUserPayload) {
    return "ok";
  }
}
