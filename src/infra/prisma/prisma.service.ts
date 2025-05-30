import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable() // Every provider must has this Decorator
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["warn", "error"],
    });
  }

  async onModuleInit() {
    return this.$connect;
  }

  async onModuleDestroy() {
    return this.$disconnect;
  }
}
