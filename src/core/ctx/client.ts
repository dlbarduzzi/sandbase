import type { ErrorMetadata } from "@/tools/logger/error"

import { env } from "@/core/env/client"
import { SafeErrorLogger } from "@/tools/logger/error"

const safeErrorLogger = new SafeErrorLogger(env.NEXT_PUBLIC_CLIENT_IS_LOG_ERROR_STACK_ALLOWED)

const clientLogger = {
  error: (error: unknown, message: string, metadata: ErrorMetadata) => {
    const record = safeErrorLogger.createRecord(error, message, metadata)
    console.error(record)
  },
}

export const ctx = {
  console: clientLogger,
}
