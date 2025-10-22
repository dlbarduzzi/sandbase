import type { Metadata } from "next"

import { SignIn } from "@/services/auth/components/sign-in"

export const metadata: Metadata = {
  title: "Sign in",
}

export default function Page() {
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
