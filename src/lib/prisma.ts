import { PrismaClient } from "@/generated/prisma";

declare global {
  var __projectPulsePrisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as typeof globalThis & {
  __projectPulsePrisma?: PrismaClient;
};

const getClient = () => {
  const client = globalForPrisma.__projectPulsePrisma ?? new PrismaClient();

  // If HMR reused an old client shape, recreate it from the current generated client.
  if (!("project" in client)) {
    return new PrismaClient();
  }

  return client;
};

const prisma = getClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__projectPulsePrisma = prisma;
}

export default prisma;
