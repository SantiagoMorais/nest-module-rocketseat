import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  findById(id: string): Promise<Answer | null> {
    throw new Error(`Method not implemented. ${id}`);
  }

  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Array<Answer>> {
    throw new Error(`Method not implemented. ${questionId}, ${params.page}`);
  }

  save(answer: Answer): Promise<void> {
    throw new Error(`Method not implemented. ${answer}`);
  }

  create(answer: Answer): Promise<void> {
    throw new Error(`Method not implemented. ${answer}`);
  }

  delete(answer: Answer): Promise<void> {
    throw new Error(`Method not implemented. ${answer}`);
  }
}
