type ErrorFields = {
  stack?: unknown
  cause?: unknown
  message: string
}

type ErrorMetadata = {
  status: "INTERNAL_SERVER_ERROR"
  withStack: boolean
}

class BaseSafeErrorLogger {
  private readonly isStackAllowed: boolean

  constructor(isStackAllowed: boolean) {
    this.isStackAllowed = isStackAllowed
  }

  public sanitize(error: unknown, message: string, metadata: ErrorMetadata) {
    message = message.trim()

    if (message === "") {
      message = "uncaught exception"
    }

    let cause: unknown
    let stack: unknown
    let errorMessage: string | undefined

    if (typeof error === "string") {
      errorMessage = error.trim() ?? undefined
    }
    else {
      if (error && typeof error === "object") {
        if ("cause" in error) {
          cause = error.cause
        }
        if ("stack" in error) {
          stack = error.stack
        }
        if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message.trim() ?? undefined
        }
      }
    }

    const includeStack = this.isStackAllowed || metadata.withStack
    const finalMessage = errorMessage ? `${message} - ${errorMessage}` : message

    const errorFields: ErrorFields = { message: finalMessage }

    if (includeStack && stack !== undefined) {
      errorFields.stack = stack
    }

    if (includeStack && cause !== undefined) {
      errorFields.cause = cause
    }

    return errorFields
  }

  public createRecord(error: unknown, message: string, metadata: ErrorMetadata) {
    const sanitized = this.sanitize(error, message, metadata)

    const record = {
      level: "error",
      status: metadata.status,
      timestamp: new Date().toISOString(),
      ...sanitized,
    }

    if (record.cause === undefined) {
      delete record.cause
    }

    if (record.stack === undefined) {
      delete record.stack
    }

    return record
  }
}

export { BaseSafeErrorLogger, type ErrorMetadata }
