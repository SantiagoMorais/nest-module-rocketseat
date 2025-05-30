import { FakeHasher } from "@test/cryptography/fake-hasher";
import { InMemoryStudentsRepository } from "@test/repositories/in-memory-students-repository";
import { RegisterStudentUseCase } from "./register-student";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let sut: RegisterStudentUseCase;

describe("Register Student Use Case", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher);
  });

  it("should be able to register a new student", async () => {
    const result = await sut.execute({
      email: "johndoe@example.com",
      name: "John Doe",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.students[0],
    });
  });

  it("should hash student password upon registration", async () => {
    const result = await sut.execute({
      email: "johndoe@example.com",
      name: "John Doe",
      password: "123456",
    });

    const hashedPassword = await fakeHasher.hash("123456");

    expect(result.isRight()).toBe(true);
    expect(inMemoryStudentsRepository.students[0].password).toEqual(
      hashedPassword
    );
  });
});
