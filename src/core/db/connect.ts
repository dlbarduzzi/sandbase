import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

import { env } from "@/core/env/server"
import { user, account, session, verification } from "./schemas"

export const schema = {
  user,
  account,
  session,
  verification,
}

const client = postgres(env.DATABASE_URL)
const connect = drizzle({ client, schema })

export const db = connect
export type DB = typeof db
