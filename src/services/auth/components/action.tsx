import Link from "next/link"
import { cn } from "@/core/css"

type ActionProps = {
  action: "sign-up" | "sign-in"
  isDisabled: boolean
}

export function Action({ action, isDisabled }: ActionProps) {
  const data = action === "sign-in" ? {
    href: "/sign-in",
    title: "Sign in",
    question: "Already have an account?",
  } : {
    href: "/sign-up",
    title: "Sign up",
    question: "Need to create an account?",
  }
  return (
    <div className="w-full text-sm text-center">
      {data.question}
      {" "}
      <Link
        href={data.href}
        className={cn(
          "text-gray-900 font-semibold outline-none",
          "hover:underline hover:underline-offset-4 focus-visible:ring-2",
          "focus-visible:ring-offset-2 focus-visible:ring-gray-900",
          isDisabled && " text-gray-500 pointer-events-none focus-visible:ring-0",
        )}
      >
        {data.title}
      </Link>
    </div>
  )
}
