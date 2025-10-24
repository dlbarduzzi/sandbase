import type { Metadata, Viewport } from "next"

import { cn } from "@/core/css"
import { siteConfig } from "@/core/site"
import { fontGeistSans, fontGeistMono } from "@/core/fonts"

import { Toaster } from "@/components/ui/sonner"

import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-white font-sans text-base text-gray-900 antialiased",
          "selection:bg-yellow-200 selection:text-gray-900",
          fontGeistSans.variable,
          fontGeistMono.variable,
        )}
      >
        <Toaster />
        {children}
      </body>
    </html>
  )
}
