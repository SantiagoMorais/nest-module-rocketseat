import { left, right } from "@/core/either";
import { WrongCredentialsError } from "@/core/errors/wrong-credentials-error";
import {
  IAuthenticateStudentUseCaseRequest,
  TAuthenticateStudentUseCaseResponse,
} from "@/core/interfaces/authenticate-student-use-case";
import { Encryptor } from "@/domain/forum/cryptography/encryptor";
import { HashComparer } from "@/domain/forum/cryptography/hash-comparer";
import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "../../repositories/students-repository";

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encryptor: Encryptor
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateStudentUseCaseRequest): Promise<TAuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email);

    if (!student) return left(new WrongCredentialsError());

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password
    );

    if (!isPasswordValid) throw new WrongCredentialsError();

    const accessToken = await this.encryptor.encrypt({
      sub: student.id.toValue(),
    });

    return right({ accessToken });
  }
}
