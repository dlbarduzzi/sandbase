import type { Metadata } from "next"

import { SignUp } from "@/services/auth/components/sign-up"

export const metadata: Metadata = {
  title: "Sign up",
}

export default function Page() {
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
