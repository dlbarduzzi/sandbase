import Link from "next/link"

import { Client } from "./_components/client"
import { Button } from "@/components/ui/button"
import { SafeErrorLogger } from "@/tools/logger/server"

export default function Page() {
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
          SafeErrorLogger.log(error, "server test error", {
            status: "SERVER_ERROR",
            withStack: false,
          })
        }
        else {
          SafeErrorLogger.log(error, "server test error", {
            status: "SERVER_ERROR",
            withStack: true,
          })
        }
      }
    }
  }
  // throwError("simple")
  // throwError("with_cause")
  throwError("no_stack")
  return (
    <div>
      <section aria-labelledby="homepage-header">
        <h1 id="homepage-header" className="sr-only">
          Homepage.
        </h1>
      </section>
      <div className="p-4">
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/sign-in" prefetch={false}>Sign in</Link>
          </Button>
          <Client />
        </div>
      </div>
    </div>
  )
}
