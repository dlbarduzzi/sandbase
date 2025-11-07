"use client"

import { Button } from "@/components/ui/button"
import { SafeErrorLogger } from "@/tools/logger/client"

export function Client() {
  function throwError(t: "simple" | "with_cause" | "no_stack") {
    try {
      if (t === "simple") {
        throw new Error("a simple error called")
      }
      if (t === "with_cause") {
        throw new Error("an error with cause called", { cause: "a forced cause here" })
      }
      if (t === "no_stack") {
        throw new Error("an error without stack")
      }
    }
    catch (error) {
      if (error instanceof Error) {
        if (error.message === "an error without stack") {
          SafeErrorLogger.log(error, "client test error", {
            status: "BAD_REQUEST",
            withStack: false,
          })
        }
        else {
          SafeErrorLogger.log(error, "client test error", {
            status: "BAD_REQUEST",
            withStack: true,
          })
        }
      }
    }
  }
  return (
    <>
      <Button onClick={() => throwError("simple")}>
        Simple Error
      </Button>
      <Button onClick={() => throwError("with_cause")}>
        Error With Cause
      </Button>
      <Button onClick={() => throwError("no_stack")}>
        Error Without Stack
      </Button>
    </>
  )
}
