import Link from "next/link"
import { cn } from "@/core/css"

type AuthTermsProps = {
  action: "sign-up" | "sign-in"
  isPending: boolean
}

export function AuthTerms({ action, isPending }: AuthTermsProps) {
  const title = action === "sign-in" ? "in" : "up"
  return (
    <div className="text-center text-[13px] text-gray-600">
      By signing
      {" "}
      {title}
      , you agree to our
      <br />
      <Link
        href="/terms-of-service"
        className={cn(
          "outline-none font-semibold text-gray-600 hover:underline hover:underline-offset-4",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900",
          isPending && "pointer-events-none focus-visible:ring-0",
        )}
      >
        Terms of Service
      </Link>
      {" "}
      and
      {" "}
      <Link
        href="/privacy-policy"
        className={cn(
          "outline-none font-semibold text-gray-600 hover:underline hover:underline-offset-4",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900",
          isPending && "pointer-events-none focus-visible:ring-0",
        )}
      >
        Privacy Policy
      </Link>
      .
    </div>
  )
}
