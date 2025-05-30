import {
  tokenPayloadSchema,
  TUserPayload,
} from "@/core/types/token-payload-schema";
import { Env } from "@/infra/env";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable() // Every provider must has this Decorator
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],
    });
  }

  validate(payload: TUserPayload): unknown {
    return tokenPayloadSchema.parse(payload);
  }
}
