import type { ErrorMetadata } from "./base"

import { logger } from "./logger"
import { BaseSafeErrorLogger } from "./base"

class SafeErrorLogger {
  static log(error: unknown, message: string, metadata: ErrorMetadata) {
    const obj = BaseSafeErrorLogger.createLoggerObject(error, message, metadata)
    logger.log(obj)
    return obj
  }
}

export { SafeErrorLogger }
