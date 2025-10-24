import * as React from "react"

import { cn } from "@/core/css"
import { Eye, EyeOff } from "lucide-react"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border border-gray-300 bg-white w-full min-w-0 rounded-md px-3 py-2.5 text-sm",
        "text-gray-900 placeholder:text-gray-400 transition-[color] outline-none",
        // Focus
        "focus-visible:ring-2",
        "focus-visible:ring-gray-200",
        "focus-visible:border-gray-300",
        // Disable
        "disabled:bg-gray-50",
        "disabled:text-gray-400",
        "disabled:border-gray-200",
        "disabled:cursor-not-allowed",
        "disabled:pointer-events-none",
        // Invalid
        "aria-invalid:border-red-500",
        "aria-invalid:disabled:border-gray-200",
        "aria-invalid:focus-visible:ring-red-200",
        "aria-invalid:focus-visible:border-red-400",
        className,
      )}
      {...props}
    />
  )
}

type InputPasswordProps = {
  showPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

function InputPassword({
  showPassword,
  setShowPassword,
  ...props
}: InputPasswordProps & React.ComponentProps<"input">) {
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className="pr-12"
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <div
          role="button"
          onClick={() => setShowPassword(() => !showPassword)}
          className={cn("text-gray-300", props.disabled && "pointer-events-none")}
        >
          {showPassword
            ? <Eye className="size-6" />
            : <EyeOff className="size-6" />
          }
        </div>
      </div>
    </div>
  )
}

export { Input, InputPassword }
