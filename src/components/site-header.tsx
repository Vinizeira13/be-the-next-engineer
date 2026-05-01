"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "@/components/locale-provider"
import { LocaleToggle } from "@/components/locale-toggle"

const NAV = [
  { href: "/livro", en: "Book", pt: "Livro" },
  { href: "/lab", en: "Lab", pt: "Lab" },
  { href: "/mentor", en: "Mentor", pt: "Mentor" },
] as const

/**
 * Persistent top nav. Used by every page so users can move around without
 * needing to type URLs. Highlights the current section.
 */
export function SiteHeader() {
  const { locale } = useLocale()
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-mono text-xs font-semibold tracking-tight"
        >
          <span className="text-phosphor">▎</span>
          <span>BTNE</span>
          <span className="hidden font-mono text-[10px] tracking-widest text-muted-foreground sm:inline">
            <span className="status-dot status-dot-live mr-1.5 inline-block align-middle" />
            v0.1
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors " +
                  (active
                    ? "text-phosphor"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {item[locale]}
              </Link>
            )
          })}
          <span className="ml-2 h-4 w-px bg-border" />
          <LocaleToggle />
        </nav>
      </div>
    </header>
  )
}
