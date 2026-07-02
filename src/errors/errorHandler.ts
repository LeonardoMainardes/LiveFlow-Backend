import type { FastifyReply, FastifyRequest } from "fastify"
import AppError from "./AppError"

export function errorHandler(
  error: unknown,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
      code: error.code,
      success: false,
    })
  } else {
    request.log.error(error)

    return reply.status(500).send({
      message: "Erro interno do servidor",
    })
  }
}
