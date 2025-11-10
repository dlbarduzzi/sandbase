import type { ErrorMetadata } from "./error"

import { SafeErrorLogger } from "./error"
import { describe, expect, it } from "vitest"

describe("safe error logger", () => {
  const metadata: ErrorMetadata = {
    status: "TEST_STATUS",
    withStack: true,
  }

  const testCases: {
    error: unknown
    message: string
    metadata: ErrorMetadata
    expectedCause: unknown
    expectedStack: unknown
    expectedMessage: string
  }[] = [
    {
      error: "",
      message: "",
      metadata,
      expectedCause: undefined,
      expectedStack: undefined,
      expectedMessage: "uncaught exception",
    },
    {
      error: "   ",
      message: "   ",
      metadata,
      expectedCause: undefined,
      expectedStack: undefined,
      expectedMessage: "uncaught exception",
    },
    {
      error: "",
      message: "hello world",
      metadata,
      expectedCause: undefined,
      expectedStack: undefined,
      expectedMessage: "hello world",
    },
    {
      error: "",
      message: "   hello world   ",
      metadata,
      expectedCause: undefined,
      expectedStack: undefined,
      expectedMessage: "hello world",
    },
    {
      error: "foo",
      message: "hello world",
      metadata,
      expectedCause: undefined,
      expectedStack: undefined,
      expectedMessage: "hello world - foo",
    },
    {
      error: { foo: "bar" },
      message: "hello world",
      metadata,
      expectedCause: undefined,
      expectedStack: undefined,
      expectedMessage: "hello world",
    },
    {
      error: { message: 12 },
      message: "hello world",
      metadata,
      expectedCause: undefined,
      expectedStack: undefined,
      expectedMessage: "hello world",
    },
    {
      error: { message: "foo", cause: "bar" },
      message: "hello world",
      metadata,
      expectedCause: "bar",
      expectedStack: undefined,
      expectedMessage: "hello world - foo",
    },
    {
      error: { message: "foo", stack: "baz" },
      message: "hello world",
      metadata,
      expectedCause: undefined,
      expectedStack: "baz",
      expectedMessage: "hello world - foo",
    },
    {
      error: { message: "foo", cause: "bar", stack: "baz" },
      message: "hello world",
      metadata,
      expectedCause: "bar",
      expectedStack: "baz",
      expectedMessage: "hello world - foo",
    },
    {
      error: new Error("foo"),
      message: "hello world",
      metadata,
      expectedCause: undefined,
      expectedStack: "Error: foo",
      expectedMessage: "hello world - foo",
    },
    {
      error: new Error("foo", { cause: "bar" }),
      message: "hello world",
      metadata,
      expectedCause: "bar",
      expectedStack: "Error: foo",
      expectedMessage: "hello world - foo",
    },
    {
      error: undefined,
      message: "hello world",
      metadata,
      expectedCause: undefined,
      expectedStack: undefined,
      expectedMessage: "hello world",
    },
  ]

  it("test error with stack", () => {
    const l = new SafeErrorLogger(false)

    testCases.forEach(ts => {
      const t = l.sanitize(ts.error, ts.message, ts.metadata)

      expect(t.cause).toBe(ts.expectedCause)
      expect(t.message).toBe(ts.expectedMessage)

      if (ts.expectedStack === undefined) {
        expect(t.stack).toBe(ts.expectedStack)
      }
      else {
        expect(t.stack).toContain(ts.expectedStack)
      }
    })
  })

  it("test error without stack", () => {
    const l = new SafeErrorLogger(false)

    const newTestCases = testCases.map(ts => {
      return {
        ...ts,
        metadata: { ...ts.metadata, withStack: false },
      }
    })

    newTestCases.forEach(ts => {
      const t = l.sanitize(ts.error, ts.message, ts.metadata)
      expect(t.cause).toBe(undefined)
      expect(t.stack).toBe(undefined)
      expect(t.message).toBe(ts.expectedMessage)
    })
  })
})
