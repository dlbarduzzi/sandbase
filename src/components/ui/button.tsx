import type { VariantProps } from "class-variance-authority"

import * as React from "react"

import { cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/core/css"

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm
  font-medium transition-all shrink-0 outline-none cursor-pointer focus-visible:ring-2
  focus-visible:ring-offset-2 disabled:pointer-events-none`,
  {
    variants: {
      variant: {
        default: `bg-gray-900 text-white hover:bg-gray-700
          focus-visible:ring-gray-900 disabled:bg-gray-600`,
        outline: `border border-gray-200 bg-white text-gray-900 hover:bg-gray-100
          focus-visible:ring-gray-300 disabled:bg-gray-50 disabled:text-gray-400`,
      },
      size: {
        default: "h-10 px-4 py-2",
        md: "h-11 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  size,
  variant,
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
