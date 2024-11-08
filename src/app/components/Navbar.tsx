// components/Navbar.tsx
"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed w-full z-50 py-4 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            LENS
          </Link>
          <div className="hidden md:flex space-x-8">
            {["Portfolio", "About", "Services", "Contact"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                className="relative group"
              >
                <Link href={`#${item.toLowerCase()}`} className="text-white">
                  {item}
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
