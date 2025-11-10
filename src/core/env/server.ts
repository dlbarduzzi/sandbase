import z from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["test", "development", "production"]),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "silent"]),
    SERVER_IS_LOG_ERROR_STACK_ALLOWED: z
      .enum(["true", "false"])
      .transform(value => value === "true")
      .default(false),
  },
  onValidationError: issues => {
    console.error(
      "❌ Invalid server environment variables ❌",
      JSON.stringify(issues, null, 2),
    )
    // eslint-disable-next-line node/no-process-exit
    process.exit(1)
  },
  runtimeEnv: {
    /* eslint-disable node/no-process-env */
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    SERVER_IS_LOG_ERROR_STACK_ALLOWED: process.env.SERVER_IS_LOG_ERROR_STACK_ALLOWED,
    /* eslint-enable node/no-process-env */
  },
  emptyStringAsUndefined: true,
  /* eslint-disable-next-line node/no-process-env */
  skipValidation: process.env.SKIP_ENV_VALIDATIONS === "true",
})
