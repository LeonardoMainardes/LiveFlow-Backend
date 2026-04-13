import type { FastifyInstance } from "fastify"
import { authRoutes } from "../modules/auth/auth.routes"

export async function appRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" })
}
