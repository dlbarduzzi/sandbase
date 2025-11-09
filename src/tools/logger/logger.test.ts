import { newLogger } from "./logger"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("logger", () => {
  // Create a backup of the original vars.
  // eslint-disable-next-line node/no-process-env
  const ORIGINAL_ENV = process.env

  beforeAll(() => {
    // Clone vars so we don't overwrite others.
    // eslint-disable-next-line node/no-process-env
    process.env = { ...ORIGINAL_ENV, LOG_LEVEL: "silent" }
  })

  afterAll(() => {
    // Restore original vars.
    // eslint-disable-next-line node/no-process-env
    process.env = ORIGINAL_ENV
  })

  it("should have silent level from env var", () => {
    // eslint-disable-next-line node/no-process-env
    const logger = newLogger(process.env.LOG_LEVEL!)
    logger.info("hello world")
    expect(logger.silent).toBeTruthy()
  })

  it("should match log level passed as argument", () => {
    let logger = newLogger("silent")
    expect(logger.silent).toBeTruthy()

    logger = newLogger("debug")
    expect(logger.debug).toBeTruthy()

    logger = newLogger("info")
    expect(logger.info).toBeTruthy()

    logger = newLogger("warn")
    expect(logger.warn).toBeTruthy()

    logger = newLogger("error")
    expect(logger.error).toBeTruthy()
  })
})
