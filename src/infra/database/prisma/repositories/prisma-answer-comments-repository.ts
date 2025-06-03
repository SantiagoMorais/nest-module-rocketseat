import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error(`Method not implemented. ${id}`);
  }

  create(answerComment: AnswerComment): Promise<void> {
    throw new Error(`Method not implemented. ${answerComment}`);
  }

  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error(`Method not implemented. ${answerComment}`);
  }

  findManyByAnswerId(
    answerId: string,
    params: PaginationParams
  ): Promise<Array<AnswerComment>> {
    throw new Error(`Method not implemented. ${answerId}, ${params.page}`);
  }
}
