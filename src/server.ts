import "dotenv/config"
import { app } from "./app"

const start = async () => {
  try {
    await app.listen({ port: 8080, host: "0.0.0.0" })
    console.log("🚀 Server running on http://localhost:8080/docs")
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
