import { type ErrorCode, ErrorDefinitions } from "./errorDefinitions"

export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly statusCode: number

  constructor(code: ErrorCode) {
    const error = ErrorDefinitions[code]

    super(error.message)
    this.name = "AppError"
    this.code = code
    this.statusCode = error.statusCode

    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default AppError
