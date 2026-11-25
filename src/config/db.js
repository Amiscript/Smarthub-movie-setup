import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error(`Database error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async (code = 0) => {
  await prisma.$disconnect();
  console.log("Database disconnected");
  process.exit(code);
};

export { prisma, connectDB, disconnectDB };