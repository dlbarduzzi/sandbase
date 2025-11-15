import type { LinkProps } from "next/link"
import type { AnchorHTMLAttributes } from "react"

import Link from "next/link"

type CustomLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

export function CustomLink({ href, ...props }: CustomLinkProps) {
  if (href && href.startsWith("/")) {
    return <Link href={href} {...props} />
  }

  if (href && href.startsWith("#")) {
    return <a href={href} {...props} />
  }

  return <a href={href} rel="noopener noreferrer" target="_blank" {...props} />
}
