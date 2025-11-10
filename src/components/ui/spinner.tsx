import { Loader } from "lucide-react"

import { cn } from "@/core/css"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
