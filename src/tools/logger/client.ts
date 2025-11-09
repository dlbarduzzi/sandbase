import type { ErrorMetadata } from "./base"

import { env } from "@/core/env/client"
import { BaseSafeErrorLogger } from "./base"

const newSafeErrorLogger = new BaseSafeErrorLogger(
  env.NEXT_PUBLIC_NODE_ENV !== "production" || env.NEXT_PUBLIC_IS_LOG_STACK_ALLOWED,
)

const safeErrorLogger = {
  log: (error: unknown, message: string, metadata: ErrorMetadata) => {
    const record = newSafeErrorLogger.createRecord(error, message, metadata)
    console.error(record)
    return record
  },
}

export { safeErrorLogger }
