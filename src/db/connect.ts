import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

import { env } from "@/core/env"
import { user, session, account, verification } from "./schemas"

export const schema = { user, session, account, verification }

const client = postgres(env.DATABASE_URL)
const connect = drizzle({ client, schema })

export const db = connect
export type DB = typeof db
