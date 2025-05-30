import {
  createQuestionBodySchema,
  TCreateQuestionBody,
} from "@/core/types/create-question-controller";
import { TUserPayload } from "@/core/types/token-payload-schema";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/questions/create-question";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: TUserPayload,
    @Body(bodyValidationPipe) body: TCreateQuestionBody
  ) {
    const { content, title } = body;
    const userId = user.sub;

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    });
  }
}
