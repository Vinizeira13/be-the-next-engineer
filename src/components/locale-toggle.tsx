"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { LOCALE_LABELS } from "@/lib/i18n"

export function LocaleToggle() {
  const { locale, setLocale } = useLocale()
  const next = locale === "en" ? "pt" : "en"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(next)}
      className="text-xs font-mono uppercase tracking-wider"
      aria-label={`Switch to ${LOCALE_LABELS[next]}`}
    >
      {locale === "en" ? "EN · pt" : "en · PT"}
    </Button>
  )
}
