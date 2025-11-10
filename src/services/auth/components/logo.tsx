import Link from "next/link"
import Image from "next/image"

import { cn } from "@/core/css"
import { siteConfig } from "@/core/site"

export function Logo({ isDisabled }: { isDisabled: boolean }) {
  return (
    <div className="flex shrink-0 items-center justify-start">
      <Link
        href="/"
        className={cn(
          "rounded-full outline-none focus-visible:ring-2",
          "focus-visible:ring-gray-900 focus-visible:ring-offset-2",
          isDisabled && "pointer-events-none focus-visible:ring-transparent",
        )}
      >
        <Image
          src="/images/logo.png"
          alt={siteConfig.name}
          width={500}
          height={500}
          priority={true}
          className="w-10"
        />
      </Link>
      <span className="sr-only">Link to home page.</span>
    </div>
  )
}
