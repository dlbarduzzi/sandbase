import Link from "next/link"
import { cn } from "@/core/css"

type AuthFooterProps = {
  href: string
  title: string
  question: string
  isPending: boolean
}

export function AuthFooter({ href, title, question, isPending }: AuthFooterProps) {
  return (
    <div className="w-full text-sm text-center text-gray-900">
      {question}
      {" "}
      <Link
        href={href}
        className={cn(
          "font-semibold outline-none hover:underline hover:underline-offset-4",
          "focus-visible:ring-2 focus-visible:ring-offset-2",
          "focus-visible:ring-gray-900",
          isPending && "pointer-events-none",
        )}
      >
        {title}
      </Link>
    </div>
  )
}
