import type { FastifyInstance } from "fastify"
import * as z from "zod"
import { authMiddleware } from "../../middlewares/auth.middleware"
import { AuthController } from "./auth.controller"
import {
  type LoginSchema,
  loginSchema,
  type RegisterSchema,
  registerSchema,
} from "./auth.schema"

export async function authRoutes(app: FastifyInstance) {
  const controller = new AuthController()

  app.post<{ Body: RegisterSchema }>(
    "/register",
    {
      schema: {
        body: registerSchema,
        response: {
          201: z.object({
            message: z.string(),
            data: z.object({
              id: z.string(),
              success: z.boolean(),
              token: z.string(),
            }),
          }),
        },
      },
    },
    (request, reply) => controller.register(request, reply),
  )

  app.post<{ Body: LoginSchema }>(
    "/login",
    {
      schema: {
        body: loginSchema,
        response: {
          200: z.object({
            message: z.string(),
            data: z.object({
              token: z.string(),
            }),
          }),
        },
      },
    },
    (request, reply) => controller.login(request, reply),
  )

  app.get(
    "/me",
    {
      preHandler: authMiddleware,
      schema: {
        security: [{ bearerAuth: [] }],
      },
    },
    (request, reply) => controller.me(request, reply),
  )
}
