import { newLogger } from "./logger"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("logger", () => {
  // Create a backup of the original vars.
  // eslint-disable-next-line node/no-process-env
  const OLD_ENV = process.env

  beforeAll(() => {
    // Clone vars so we don't overwrite others.
    // eslint-disable-next-line node/no-process-env
    process.env = { ...OLD_ENV, LOG_LEVEL: "silent" }
  })

  afterAll(() => {
    // Restore original vars.
    // eslint-disable-next-line node/no-process-env
    process.env = OLD_ENV
  })

  it("should have silent level when testing", () => {
    // eslint-disable-next-line node/no-process-env
    const logger = newLogger(process.env.LOG_LEVEL!)
    logger.info("hello world")
    expect(logger.silent).toBeTruthy()
  })
})
