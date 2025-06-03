import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/questions/create-question";
import { ListRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/questions/list-recent-questions";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/student/authenticate-student";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/student/register-student";
import { Module } from "@nestjs/common";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { DatabaseModule } from "../database/database.module";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
