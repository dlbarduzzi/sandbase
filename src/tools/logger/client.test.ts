import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { safeErrorLogger } from "./client"

describe("client safeErrorLogger", () => {
  function setSpyError() {
    return vi.spyOn(console, "error").mockImplementation(() => { /* empty */ })
  }

  let spyError: ReturnType<typeof setSpyError>

  beforeEach(() => {
    spyError = setSpyError()
  })

  afterEach(() => {
    spyError.mockRestore()
  })

  it("expected record to have all fields", () => {
    const error = new Error("foo", { cause: "bar" })

    const record = safeErrorLogger.log(error, "hello world", {
      status: "INTERNAL_SERVER_ERROR",
      withStack: true,
    })

    expect(spyError).toHaveBeenCalledTimes(1)

    const arg = (spyError.mock.calls[0] ?? [])[0]
    expect(arg).toEqual(record)

    expect(record.cause).toBe("bar")
    expect(record.stack).toContain("Error: foo")
    expect(record.level).toBe("error")
    expect(record.status).toBe("INTERNAL_SERVER_ERROR")
    expect(record.message).toBe("hello world - foo")
    expect(typeof record.timestamp).toBe("string")
  })

  it("expected record to not have cause field", () => {
    const error = new Error("foo")

    const record = safeErrorLogger.log(error, "hello world", {
      status: "INTERNAL_SERVER_ERROR",
      withStack: true,
    })

    expect(spyError).toHaveBeenCalledTimes(1)

    const arg = (spyError.mock.calls[0] ?? [])[0]
    expect(arg).toEqual(record)

    expect(record.cause).toBe(undefined)
    expect(record.stack).toContain("Error: foo")
    expect(record.level).toBe("error")
    expect(record.status).toBe("INTERNAL_SERVER_ERROR")
    expect(record.message).toBe("hello world - foo")
    expect(typeof record.timestamp).toBe("string")
  })

  it("expected record to not have stack field", () => {
    const error = { message: "foo", cause: "bar" }

    const record = safeErrorLogger.log(error, "hello world", {
      status: "INTERNAL_SERVER_ERROR",
      withStack: true,
    })

    expect(spyError).toHaveBeenCalledTimes(1)

    const arg = (spyError.mock.calls[0] ?? [])[0]
    expect(arg).toEqual(record)

    expect(record.cause).toBe("bar")
    expect(record.stack).toBe(undefined)
    expect(record.level).toBe("error")
    expect(record.status).toBe("INTERNAL_SERVER_ERROR")
    expect(record.message).toBe("hello world - foo")
    expect(typeof record.timestamp).toBe("string")
  })

  it("expected record to have default message", () => {
    const error = { foo: "bar" }

    const record = safeErrorLogger.log(error, "", {
      status: "INTERNAL_SERVER_ERROR",
      withStack: true,
    })

    expect(spyError).toHaveBeenCalledTimes(1)

    const arg = (spyError.mock.calls[0] ?? [])[0]
    expect(arg).toEqual(record)

    expect(record.cause).toBe(undefined)
    expect(record.stack).toBe(undefined)
    expect(record.level).toBe("error")
    expect(record.status).toBe("INTERNAL_SERVER_ERROR")
    expect(record.message).toBe("uncaught exception")
    expect(typeof record.timestamp).toBe("string")
  })
})
