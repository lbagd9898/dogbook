import "dotenv/config";
console.log("TEST DB URL:", process.env.DATABASE_URL_TEST);
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/index.js";

const connectionString = `${process.env.DATABASE_URL_TEST}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
