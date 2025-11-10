import { useState, useEffect } from "react"

export function useIsMobile(mobileBreakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false
    }
    return window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`)

    function onChange() {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }

    mql.addEventListener("change", onChange)

    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [mobileBreakpoint])

  return !!isMobile
}
