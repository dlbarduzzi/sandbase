import { env } from "@/core/env/client"

type ErrorFields = {
  cause?: unknown
  stack?: unknown
  message: string
}

const _errorStatuses = ["BAD_REQUEST", "SERVER_ERROR"] as const

type ErrorStatus = typeof _errorStatuses[number]

type ErrorMetadata = {
  status: ErrorStatus
  withStack: boolean
}

class BaseSafeErrorLogger {
  private static isDev = env.NEXT_PUBLIC_NODE_ENV === "development"
  private static isStackAllowed = env.NEXT_PUBLIC_IS_LOG_STACK_ALLOWED

  static sanitize(error: unknown, message: string, metadata: ErrorMetadata) {
    message = message.trim()

    if (message === "") {
      message = "uncaught exception"
    }

    const fields: ErrorFields = { message }

    if (!(error instanceof Error)) {
      return fields
    }

    const errorMessage = error.message.trim()
    const finalMessage = errorMessage ? `${message} - ${errorMessage}` : message

    const includeStack = (() => {
      if (BaseSafeErrorLogger.isDev) {
        return true
      }
      if (BaseSafeErrorLogger.isStackAllowed) {
        return true
      }
      return metadata.withStack === true
    })()

    return { message: finalMessage, ...(includeStack && {
      stack: error.stack ?? undefined,
      cause: error.cause ?? undefined,
    }) }
  }

  static createLoggerObject(error: unknown, message: string, metadata: ErrorMetadata) {
    const sanitized = BaseSafeErrorLogger.sanitize(error, message, metadata)

    const obj = {
      level: "error",
      cause: sanitized.cause,
      stack: sanitized.stack,
      status: metadata.status,
      message: sanitized.message,
      timestamp: new Date().toISOString(),
    }

    if (obj.cause === undefined) {
      delete obj.cause
    }

    if (obj.stack === undefined) {
      delete obj.stack
    }

    return obj
  }
}

export { BaseSafeErrorLogger, type ErrorMetadata }
