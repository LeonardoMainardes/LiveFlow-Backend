import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"
import Fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { appRoutes } from "./routes"

export const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((error, request, reply) => {
  app.log.error(error)
  const statusCode = error.statusCode ?? 500
  reply.status(statusCode).send({
    message: error.message || "Internal Server Error",
  })
})

app.decorateRequest("user")

await app.register(swagger, {
  openapi: {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    info: {
      title: "SyncFlow API",
      description: "Documentação da API",
      version: "1.0.0",
    },
  },
})

await app.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
})

await app.register(appRoutes)
