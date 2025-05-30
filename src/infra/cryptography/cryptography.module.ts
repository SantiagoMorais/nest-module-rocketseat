import { Module } from "@nestjs/common";
import { BcryptHasher } from "./bcrypt-hasher";
import { Encryptor } from "@/domain/forum/cryptography/encryptor";
import { HashGenerator } from "@/domain/forum/cryptography/hash-generator";
import { JwtEncryptor } from "./jwt-encryptor";
import { HashComparer } from "@/domain/forum/cryptography/hash-comparer";

@Module({
  providers: [
    {
      provide: Encryptor,
      useClass: JwtEncryptor,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encryptor, HashComparer, HashGenerator],
})
export class CryptographyModule {}
