// components/Footer.tsx
"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export const Footer = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <footer
      ref={ref}
      className="bg-black text-white py-12 md:py-24 relative overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-tech font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              LENS
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Capturing life's precious moments through the art of photography.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-xl font-tech font-semibold text-white/80">
              Contact
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-2 hover:text-white transition-colors">
                <span>📧</span>
                <span>info@lens.com</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-colors">
                <span>📱</span>
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-white transition-colors">
                <span>📍</span>
                <span>New York, NY</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <h4 className="text-xl font-tech font-semibold text-white/80">
              Follow Us
            </h4>
            <div className="flex flex-col space-y-4">
              {["Instagram", "Facebook", "Twitter"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ x: 10 }}
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <span>→</span>
                  <span>{social}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 md:mt-16 pt-4 md:pt-8 text-center text-gray-400"
        >
          <p className="font-tech">
            &copy; {new Date().getFullYear()} LENS. All rights reserved.
          </p>
        </motion.div>
      </motion.div>

      {/* Parallax Background Effect */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.15]) }}
        className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-black pointer-events-none"
      />
    </footer>
  )
}
