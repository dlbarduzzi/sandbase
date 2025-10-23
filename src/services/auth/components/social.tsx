import { GitHubButton } from "./github-button"
import { GoogleButton } from "./google-button"

export function SocialButtons({ isPending }: { isPending: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <GitHubButton isPending={isPending} />
      <GoogleButton isPending={isPending} />
    </div>
  )
}
