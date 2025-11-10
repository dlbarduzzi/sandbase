import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ClientAuthed } from "./client-authed"
import { ClientUnauthed } from "./client-unauthed"

import { getUserSession } from "@/core/auth/server-events"

export async function Server() {
  const session = await getUserSession()
  const isAuthenticated = session !== null
  return (
    <div className="space-y-4">
      {isAuthenticated ? (
        <div className="border border-gray-200 rounded-md p-4">Hello</div>
      ) : (
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/sign-in" prefetch={false}>Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up" prefetch={false}>Sign up</Link>
          </Button>
        </div>
      )}
      <div className="flex gap-3">
        <div className="bg-gray-200 text-sm p-4 rounded-md sm:min-w-sm">
          <h2 className="mb-3 font-semibold">Session</h2>
          <pre>{JSON.stringify(session?.user ?? {}, null, 2)}</pre>
        </div>
      </div>
      <div className="flex gap-3">
        {isAuthenticated ? <ClientAuthed /> : <ClientUnauthed /> }
      </div>
    </div>
  )
}
