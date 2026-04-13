import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl || databaseUrl.trim() === "") {
  throw new Error("Missing required environment variable: DATABASE_URL")
}

const connectionString = databaseUrl

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
