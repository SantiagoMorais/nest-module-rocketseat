import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import {
  pageQueryParamSchema,
  TPageQueryParamSchema,
} from "@/core/types/page-query-param";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(
    @Query("page", queryValidationPipe)
    page: TPageQueryParamSchema
  ) {
    const perPage = 20;
    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { questions };
  }
}
