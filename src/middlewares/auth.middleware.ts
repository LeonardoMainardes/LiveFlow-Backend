import type { FastifyReply, FastifyRequest } from "fastify"
import jwt from "jsonwebtoken"
import { jwtSecret } from "../lib/jwt"
import { jwtSchema } from "../modules/auth/auth.schema"

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const token = request.headers.authorization?.split(" ")[1]

  if (!token) return reply.status(401).send({ message: "Access Denied" })

  try {
    const verified = jwt.verify(token, jwtSecret)

    const result = jwtSchema.safeParse(verified)

    if (!result.success)
      return reply.status(400).send({ message: "Bad Request" })

    request.user = result.data
  } catch (_error) {
    reply.status(401).send({ message: "Invalid Token" })
  }
}
