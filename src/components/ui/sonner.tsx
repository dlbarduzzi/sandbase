"use client"

import type { ToasterProps } from "sonner"

import {
  toast as sonnerToast,
  Toaster as SonnerToaster,
} from "sonner"

import { useTheme } from "next-themes"
import { AlertCircle, CheckCircle, Loader, Info, X } from "lucide-react"

import { cn } from "@/core/css"
import { useIsMobile } from "@/hooks/is-mobile"

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()
  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      {...props}
    />
  )
}

type ToastType = "info" | "error" | "loader" | "success"

type ToastOptions = {
  duration?: number
  dismissible?: boolean
}

type ToastProps = {
  id: string | number
  type: ToastType
  message: string
  options?: ToastOptions
}

function getBackgroundColor(tt: ToastType) {
  switch (tt) {
    case "info":
      return "bg-blue-50 border-blue-200"
    case "error":
      return "bg-red-50 border-red-200"
    case "loader":
      return "bg-white border-gray-200"
    case "success":
      return "bg-green-50 border-green-200"
    default:
      return "bg-white border-gray-200"
  }
}

function getTextColor(tt: ToastType) {
  switch (tt) {
    case "info":
      return "text-blue-900"
    case "error":
      return "text-red-900"
    case "loader":
      return "text-gray-900"
    case "success":
      return "text-green-900"
    default:
      return "text-gray-900"
  }
}

function getIcon(tt: ToastType) {
  const iconProps = { size: 20, className: "flex-shrink-0" }
  switch (tt) {
    case "info":
      return (
        <Info
          {...iconProps}
          className={cn(iconProps.className, "text-blue-600")}
        />
      )
    case "error":
      return (
        <AlertCircle
          {...iconProps}
          className={cn(iconProps.className, "text-red-600")}
        />
      )
    case "loader":
      return (
        <Loader
          {...iconProps}
          className={cn(iconProps.className, "text-gray-600 animate-spin")}
        />
      )
    case "success":
      return (
        <CheckCircle
          {...iconProps}
          className={cn(iconProps.className, "text-green-600")}
        />
      )
    default:
      return (
        <Info
          {...iconProps}
          className={cn(iconProps.className, "text-gray-900")}
        />
      )
  }
}

function getDismissColor(tt: ToastType) {
  switch (tt) {
    case "info":
      return "text-blue-400"
    case "error":
      return "text-red-400"
    case "loader":
      return "text-gray-400"
    case "success":
      return "text-green-500"
    default:
      return "text-gray-400"
  }
}

function Toast(props: ToastProps) {
  const isMobile = useIsMobile(601)

  let message = props.message.trim()

  if (message === "") {
    message = "No details provided"
  }

  const isDismissible = props.options?.dismissible ?? true

  return (
    <div className={cn(
      "bg-white border border-gray-200 p-4 shadow-lg text-sm rounded-md relative group",
      isMobile ? "w-full" : "w-[360px]",
      getBackgroundColor(props.type),
    )}
    >
      <div className="flex items-start">
        <div>
          {getIcon(props.type)}
        </div>
        <div className={cn("text-sm font-medium px-3", getTextColor(props.type))}>
          {message}
        </div>
      </div>
      {isDismissible ? (
        <div
          role="button"
          className="absolute top-1.5 right-1.5 invisible group-hover:visible"
          onClick={() => sonnerToast.dismiss(props.id)}
        >
          <X className={cn("size-4", getDismissColor(props.type))} />
        </div>
      ) : null}
    </div>
  )
}

function toaster(props: Omit<ToastProps, "id">) {
  return sonnerToast.custom(id => {
    return (
      <Toast
        id={id}
        {...props}
      />
    )
  }, {
    duration: props.options?.duration ?? 5000,
  })
}

const toast = {
  info: (message: string, options?: ToastOptions) => {
    return toaster({ type: "info", message, options })
  },
  error: (message: string, options?: ToastOptions) => {
    return toaster({ type: "error", message, options })
  },
  loader: (message: string, options?: ToastOptions) => {
    return toaster({ type: "loader", message, options })
  },
  success: (message: string, options?: ToastOptions) => {
    return toaster({ type: "success", message, options })
  },
  dismiss: sonnerToast.dismiss,
}

export { toast, Toaster }
