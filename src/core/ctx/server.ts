import type { ErrorMetadata } from "@/tools/logger/error"

import { db } from "@/core/db/connect"
import { env } from "@/core/env/server"

import { newLogger } from "@/tools/logger/logger"
import { SafeErrorLogger } from "@/tools/logger/error"

const logger = newLogger(env.LOG_LEVEL)
const safeErrorLogger = new SafeErrorLogger(env.SERVER_IS_LOG_ERROR_STACK_ALLOWED)

const serverLogger = {
  error: (error: unknown, message: string, metadata: ErrorMetadata) => {
    const record = safeErrorLogger.createRecord(error, message, metadata)
    logger.error(record)
  },
}

export const ctx = {
  db,
  logger: serverLogger,
}
