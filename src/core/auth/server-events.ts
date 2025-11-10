import { headers as nextHeaders } from "next/headers"
import { auth } from "./server"
import { redirect } from "next/navigation"

async function getUserSession() {
  const headers = await nextHeaders()
  const session = await auth.api.getSession({ headers })
  return session
}

async function isAuthenticated() {
  const session = await getUserSession()
  return session !== null
}

async function requireAuthenticated() {
  const isAuthed = await isAuthenticated()

  if (!isAuthed) {
    return redirect("/sign-in")
  }
}

async function requireUnauthenticated() {
  const isAuthed = await isAuthenticated()

  if (isAuthed) {
    return redirect("/")
  }
}

export {
  getUserSession,
  isAuthenticated,
  requireAuthenticated,
  requireUnauthenticated,
}
