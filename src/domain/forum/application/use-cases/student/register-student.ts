import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "../../repositories/students-repository";
import {
  IRegisterStudentUseCaseRequest,
  TRegisterStudentUseCaseResponse,
} from "@/core/interfaces/register-student-use-case";
import { HashGenerator } from "@/domain/forum/cryptography/hash-generator";
import { left, right } from "@/core/either";
import { StudentAlreadyExistsError } from "@/core/errors/student-already-exists-error";
import { Student } from "@/domain/forum/enterprise/entities/student";

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    email,
    name,
    password,
  }: IRegisterStudentUseCaseRequest): Promise<TRegisterStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email);

    if (studentWithSameEmail)
      return left(new StudentAlreadyExistsError("Email already registered"));

    const hashPassword = await this.hashGenerator.hash(password);

    const student = Student.create({
      email,
      name,
      password: hashPassword,
    });

    await this.studentsRepository.create(student);
    return right({ student });
  }
}
