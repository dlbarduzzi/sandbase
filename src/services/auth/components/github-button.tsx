"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function GitHubButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="button"
      size="md"
      variant="outline"
      disabled={isPending}
    >
      <Image
        src="/images/github.svg"
        alt="GitHub"
        width={20}
        height={20}
      />
      Continue with GitHub
    </Button>
  )
}
