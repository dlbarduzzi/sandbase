import type { Metadata } from "next"

import { SignUp } from "@/services/auth/components/sign-up"
import { requireUnauthenticated } from "@/core/auth/server-events"

export const metadata: Metadata = {
  title: "Sign up",
}

export default async function Page() {
  await requireUnauthenticated()

  return (
    <div>
      <section aria-labelledby="sign-up-header">
        <h1 id="sign-up-header" className="sr-only">
          Sign up.
        </h1>
      </section>
      <SignUp />
    </div>
  )
}
