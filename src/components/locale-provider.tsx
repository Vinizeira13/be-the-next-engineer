"use client"

import { createContext, useContext, useState } from "react"
import type { Locale } from "@/lib/i18n"

type LocaleContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const COOKIE_NAME = "btne-locale"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

/**
 * Cookie-backed locale state. Server reads the cookie in layout.tsx and
 * passes `initialLocale` so SSR matches the user's preference — no hydration
 * flash. Client toggle writes the cookie and updates `<html lang>`.
 *
 * Why not localStorage: localStorage is unavailable during SSR, which forced
 * the previous version to render EN first and flip on mount. That violated
 * react-hooks/set-state-in-effect AND caused a visible flicker on PT users.
 */
export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode
  initialLocale: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`
    document.documentElement.lang = l === "pt" ? "pt-BR" : "en"
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider")
  return ctx
}

export { COOKIE_NAME as LOCALE_COOKIE_NAME }
