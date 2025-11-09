import type { ErrorMetadata } from "./base"

import { env as envClient } from "@/core/env/client"
import { env as envServer } from "@/core/env/server"

import { logger } from "./logger"
import { BaseSafeErrorLogger } from "./base"

const newSafeErrorLogger = new BaseSafeErrorLogger(
  envServer.NODE_ENV !== "production" || envClient.NEXT_PUBLIC_IS_LOG_STACK_ALLOWED,
)

const safeErrorLogger = {
  log: (error: unknown, message: string, metadata: ErrorMetadata) => {
    const record = newSafeErrorLogger.createRecord(error, message, metadata)
    logger.log(record)
    return record
  },
}

export { safeErrorLogger }
