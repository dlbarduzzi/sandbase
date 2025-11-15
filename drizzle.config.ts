import { env } from "@/core/env/server"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./src/core/db/migrations",
  schema: "./src/core/db/schemas.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: { url: env.DATABASE_URL },
})
