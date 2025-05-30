import { Student } from "@/domain/forum/enterprise/entities/student";
import { Either } from "../either";
import { StudentAlreadyExistsError } from "../errors/student-already-exists-error";

export interface IRegisterStudentUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export type TRegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student;
  }
>;
