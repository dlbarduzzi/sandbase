import { env } from "@/core/env"

type SiteConfig = {
  url: string
  name: string
  description: string
}

export const siteConfig: SiteConfig = {
  url: env.NEXT_PUBLIC_APP_URL,
  name: "SandBase",
  description: "Smarter automation for growing businesses.",
}
