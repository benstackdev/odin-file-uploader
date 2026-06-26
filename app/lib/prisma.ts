import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: "http://localhost:5432" });
export const prisma = new PrismaClient({ adapter });