import { FakeEncryptor } from "@test/cryptography/fake-encryptor";
import { FakeHasher } from "@test/cryptography/fake-hasher";
import { makeStudent } from "@test/factories/make-student";
import { InMemoryStudentsRepository } from "@test/repositories/in-memory-students-repository";
import { AuthenticateStudentUseCase } from "./authenticate-student";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let fakeEncryptor: FakeEncryptor;
let sut: AuthenticateStudentUseCase;

describe("Register Student Use Case", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    fakeEncryptor = new FakeEncryptor();
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncryptor
    );
  });

  it("should be able to authenticate a student", async () => {
    const student = makeStudent({
      email: "johndoe@example.com",
      password: await fakeHasher.hash("123456"),
    });

    inMemoryStudentsRepository.create(student);

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });
});
