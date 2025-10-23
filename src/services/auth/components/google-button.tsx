"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function GoogleButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      type="button"
      size="md"
      variant="outline"
      disabled={isPending}
    >
      <Image
        src="/images/google.svg"
        alt="Google"
        width={20}
        height={20}
      />
      Continue with Google
    </Button>
  )
}
