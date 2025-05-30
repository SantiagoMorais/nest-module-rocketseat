import { Encryptor } from "@/domain/forum/cryptography/encryptor";

export class FakeEncryptor implements Encryptor {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
