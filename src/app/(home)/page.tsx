import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="homepage-header">
        <h1 id="homepage-header" className="sr-only">
          Homepage.
        </h1>
      </section>
      <div className="p-4">
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/sign-in" prefetch={false}>Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
