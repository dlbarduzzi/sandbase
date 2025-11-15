import type { Metadata } from "next"

import { SignIn } from "@/services/auth/components/sign-in"
import { requireUnauthenticated } from "@/core/auth/server-events"

export const metadata: Metadata = {
  title: "Sign in",
}

export default async function Page() {
  await requireUnauthenticated()

  return (
    <div>
      <section aria-labelledby="sign-in-header">
        <h1 id="sign-in-header" className="sr-only">
          Sign in.
        </h1>
      </section>
      <SignIn />
    </div>
  )
}
