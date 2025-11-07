import type { ErrorMetadata } from "./base"

import { BaseSafeErrorLogger } from "./base"

class SafeErrorLogger {
  static log(error: unknown, message: string, metadata: ErrorMetadata) {
    const obj = BaseSafeErrorLogger.createLoggerObject(error, message, metadata)
    console.error(obj)
    return obj
  }
}

export { SafeErrorLogger }
