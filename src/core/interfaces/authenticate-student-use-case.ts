import { Either } from "../either";
import { WrongCredentialsError } from "../errors/wrong-credentials-error";

export interface IAuthenticateStudentUseCaseRequest {
  email: string;
  password: string;
}

export type TAuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;
