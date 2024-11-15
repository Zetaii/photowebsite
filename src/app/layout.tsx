// app/layout.tsx
import { LenisProvider } from "./components/LenisProvider"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Orbitron } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-tech",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable}`}>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
