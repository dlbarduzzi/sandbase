"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { authClient } from "@/core/auth/client"

export function ClientAuthed() {
  const router = useRouter()

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onError: ({ error }) => {
          console.error(error)
        },
        onSuccess: () => {
          router.refresh()
        },
      },
    })
  }
  return (
    <div className="flex gap-3">
      <Button type="button" onClick={signOut}>Sign out</Button>
    </div>
  )
}
