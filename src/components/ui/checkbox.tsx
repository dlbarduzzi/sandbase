"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/core/css"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-5 shrink-0 rounded border border-gray-300",
        // Focus
        "focus-visible:ring-2",
        "focus-visible:outline-none",
        "focus-visible:ring-offset-2",
        "focus-visible:border-gray-300",
        "focus-visible:ring-gray-200",
        // Disabled
        "disabled:bg-gray-50",
        "disabled:border-gray-300",
        "disabled:cursor-not-allowed",
        // Checked
        "data-[state=checked]:bg-gray-900",
        "data-[state=checked]:border-gray-900",
        "data-[state=checked]:disabled:bg-gray-600",
        "data-[state=checked]:disabled:border-gray-600",
        "data-[state=checked]:focus-visible:border-gray-900",
        "data-[state=checked]:focus-visible:ring-gray-900",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex size-full items-center justify-center"
      >
        <div className="size-full bg-[url(/images/check.svg)]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
