export const ErrorDefinitions = {
  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: "E-mail ou senha inválidos.",
  },

  USER_ALREADY_EXISTS: {
    statusCode: 409,
    message: "Já existe um usuário com este e-mail.",
  },

  USER_NOT_FOUND: {
    statusCode: 404,
    message: "Usuário não encontrado.",
  },

  TOKEN_EXPIRED: {
    statusCode: 401,
    message: "Sua sessão expirou.",
  },

  INVALID_TOKEN: {
    statusCode: 401,
    message: "Token inválido.",
  },
} as const

export type ErrorCode = keyof typeof ErrorDefinitions
