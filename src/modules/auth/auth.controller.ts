import type { FastifyReply, FastifyRequest } from "fastify"
import type { LoginSchema, RegisterSchema } from "./auth.schema"
import { AuthService } from "./auth.service"

export class AuthController {
  private service = new AuthService()

  async register(
    request: FastifyRequest<{ Body: RegisterSchema }>,
    reply: FastifyReply,
  ) {
    const data = request.body

    const result = await this.service.register(data)

    return reply.status(201).send(result)
  }

  async login(
    request: FastifyRequest<{ Body: LoginSchema }>,
    reply: FastifyReply,
  ) {
    const data = request.body

    const result = await this.service.login(data)

    return reply.send(result)
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    return reply.send({ user: request.user })
  }
}
