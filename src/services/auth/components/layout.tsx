import type { ComponentProps } from "react"

import { cn } from "@/core/css"

export function Layout({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("min-h-svh p-4 flex sm:items-center justify-center", className)}
      {...props}
    />
  )
}
