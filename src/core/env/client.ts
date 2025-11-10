import z from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_CLIENT_IS_LOG_ERROR_STACK_ALLOWED: z
      .enum(["true", "false"])
      .transform(value => value === "true")
      .default(false),
  },
  onValidationError: issues => {
    console.error(
      "❌ Invalid client environment variables ❌",
      JSON.stringify(issues, null, 2),
    )
    // eslint-disable-next-line node/no-process-exit
    process.exit(1)
  },
  runtimeEnv: {
    /* eslint-disable node/no-process-env */
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLIENT_IS_LOG_ERROR_STACK_ALLOWED: process.env.NEXT_PUBLIC_CLIENT_IS_LOG_ERROR_STACK_ALLOWED,
    /* eslint-enable node/no-process-env */
  },
  emptyStringAsUndefined: true,
  /* eslint-disable-next-line node/no-process-env */
  skipValidation: process.env.SKIP_ENV_VALIDATIONS === "true",
})
