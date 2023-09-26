import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient({ log: ['query', 'info','warn','error'] });
}

db = global.__db;

export { db };