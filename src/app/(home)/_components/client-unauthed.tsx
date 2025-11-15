"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { authClient } from "@/core/auth/client"

const TEST_USER = {
  name: "NEW_USER_UNSET",
  email: "test@email.com",
  password: "testP@ssword1",
}

export function ClientUnauthed() {
  const router = useRouter()

  async function signIn() {
    await authClient.signIn.email({
      email: TEST_USER.email,
      password: TEST_USER.password,
    }, {
      onError: ({ error }) => {
        console.error(error)
      },
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log("Successfully signed in...")
        router.refresh()
      },
    })
  }
  async function signUp() {
    await authClient.signUp.email({
      name: TEST_USER.name,
      email: TEST_USER.email,
      password: TEST_USER.password,
    }, {
      onError: ({ error }) => {
        console.error(error)
      },
      onSuccess: () => {
        // eslint-disable-next-line no-console
        console.log("Successfully signed up. Please verify your email!")
      },
    })
  }
  return (
    <div className="flex flex-col gap-3 flex-wrap">
      <Button type="button" onClick={signIn}>Sign in</Button>
      <Button type="button" onClick={signUp}>Sign up</Button>
    </div>
  )
}
