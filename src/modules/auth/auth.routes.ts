import * as z from "zod"
import type { FastifyTypedInstance } from "../../lib/types"
import { authMiddleware } from "../../middlewares/auth.middleware"
import { AuthController } from "./auth.controller"
import {
  type LoginSchema,
  loginSchema,
  type RegisterSchema,
  registerSchema,
} from "./auth.schema"

export async function authRoutes(app: FastifyTypedInstance) {
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
        description: "Register a new user",
        tags: ["users"],
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
        description: "Login a user",
        tags: ["users"],
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
        headers: z.object({
          authorization: z.string().min(1),
        }),
        description: "Get user information",
        tags: ["users"],
      },
    },
    (request, reply) => controller.me(request, reply),
  )
}
