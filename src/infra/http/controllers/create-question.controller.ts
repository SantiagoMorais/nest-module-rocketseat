import { QuestionAlreadyExistsError } from "@/core/errors/question-already-exists-error";
import {
  createQuestionBodySchema,
  TCreateQuestionBody,
} from "@/core/types/create-question-controller";
import { TUserPayload } from "@/core/types/token-payload-schema";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/questions/create-question";
import { CurrentUser } from "@/infra/auth/current-user.decorator";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from "@nestjs/common";

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller("/questions")
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: TUserPayload,
    @Body(bodyValidationPipe) body: TCreateQuestionBody
  ) {
    const { content, title } = body;
    const userId = user.sub;

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case QuestionAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
