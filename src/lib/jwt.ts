import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET
if (!secret) throw new Error("JWT_SECRET não definido")

export const jwtSecret: string = secret

export function signToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, jwtSecret, { expiresIn: "1d" })
}
