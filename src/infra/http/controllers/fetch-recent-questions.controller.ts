import {
  pageQueryParamSchema,
  TPageQueryParamSchema,
} from "@/core/types/page-query-param";
import { ListRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/list-recent-questions";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from "@nestjs/common";
import { QuestionPresenter } from "../presenters/question-presenter";

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: ListRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query("page", queryValidationPipe)
    page: TPageQueryParamSchema
  ) {
    const result = await this.fetchRecentQuestions.execute({ page });
    if (result.isLeft()) throw new BadRequestException();

    const questions = result.value.questions;

    return { questions: questions.map(QuestionPresenter.toHTTP) };
  }
}
