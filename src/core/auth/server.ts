import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { env } from "@/core/env/server"
import { ctx } from "@/core/ctx/server"
import { siteConfig } from "@/core/site"

export const auth = betterAuth({
  appName: siteConfig.name,
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_BASE_URL,
  database: drizzleAdapter(ctx.db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
})
