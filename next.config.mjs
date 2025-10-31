import { createJiti } from "jiti"
import { fileURLToPath } from "node:url"

const jiti = createJiti(fileURLToPath(import.meta.url))

await jiti.import("./src/core/env/client.ts")
await jiti.import("./src/core/env/server.ts")

/** @type {import("next").NextConfig} */
const nextConfig = {}

export default nextConfig
