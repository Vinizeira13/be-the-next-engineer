import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cookies } from "next/headers"
import { LocaleProvider, LOCALE_COOKIE_NAME } from "@/components/locale-provider"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/sonner"
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Be the Next Engineer",
  description:
    "5-day intensive to become an inference engineer. Bilingual EN/PT-BR. Real models in your browser, real GPUs on your Mac. Built for the agentic era.",
  metadataBase: new URL("https://github.com/Vinizeira13/be-the-next-engineer"),
  openGraph: {
    title: "Be the Next Engineer",
    description: "5-day intensive to become an inference engineer. Open source.",
    type: "website",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value
  const initialLocale: Locale =
    cookieValue === "en" || cookieValue === "pt" ? cookieValue : DEFAULT_LOCALE

  return (
    <html
      lang={initialLocale === "pt" ? "pt-BR" : "en"}
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        <LocaleProvider initialLocale={initialLocale}>
          <SiteHeader />
          {children}
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  )
}
