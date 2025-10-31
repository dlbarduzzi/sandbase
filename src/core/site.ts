import { env } from "@/core/env/client"

type SiteConfig = {
  url: string
  name: string
  description: string
}

export const siteConfig: SiteConfig = {
  url: env.NEXT_PUBLIC_APP_URL,
  name: "SandBase",
  description: "App under construction...",
}
