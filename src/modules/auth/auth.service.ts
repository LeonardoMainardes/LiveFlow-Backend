import bcrypt from "bcryptjs"
import AppError from "../../errors/AppError"
import { signToken } from "../../lib/jwt"
import { prisma } from "../../lib/prisma"
import type { LoginSchema, RegisterSchema } from "./auth.schema"

export class AuthService {
  async register(data: RegisterSchema) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (existingUser) throw new AppError("USER_ALREADY_EXISTS")

    const passwordHash = await bcrypt.hash(data.password, 12)

    const createUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
      },
    })

    const token = signToken({ id: createUser.id, email: createUser.email })

    return {
      success: true,
      message: "Usuário registrado com sucesso.",
      data: {
        id: createUser.id,
        token,
      },
    }
  }

  async login(data: LoginSchema) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (!existingUser) throw new AppError("INVALID_CREDENTIALS")

    const passwordHash = existingUser.password

    const decodePassword = await bcrypt.compare(data.password, passwordHash)

    if (!decodePassword) throw new AppError("INVALID_CREDENTIALS")

    const token = signToken({
      id: existingUser.id,
      email: existingUser.email,
    })

    return {
      message: "Usuário logado com sucesso.",
      data: {
        token,
      },
    }
  }
}
