import { CurrentUser } from "@/infra/auth/current-user.decorator";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import {
  createQuestionBodySchema,
  TCreateQuestionBody,
} from "@/core/types/create-question-controller";
import { TUserPayload } from "@/core/types/token-payload-schema";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { PrismaService } from "@/infra/prisma/prisma.service";
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from "@nestjs/common";

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @CurrentUser() user: TUserPayload,
    @Body(bodyValidationPipe) body: TCreateQuestionBody
  ) {
    const { content, title } = body;
    const userId = user.sub;

    const slug = this.convertToSlug(title);

    const questionWithSameSlug = await this.prisma.question.findUnique({
      where: { slug },
    });

    if (questionWithSameSlug)
      throw new ConflictException(
        "There already is a question with this slug. Please choose another title."
      );

    await this.prisma.question.create({
      data: {
        content,
        title,
        authorId: userId,
        slug,
      },
    });
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
}
