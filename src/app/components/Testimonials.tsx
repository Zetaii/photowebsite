// components/Testimonials.tsx
"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Wedding Client",
    text: "The attention to detail and ability to capture genuine emotions is truly remarkable.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDz2S2f_sEKJ7cxRZC3JLurEgfFY58K4_dBQ&s",
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Corporate Client",
    text: "Professional and captivating photography that tells a story.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrhyA5H8POhs-MJ3L5Gp6XSn8kSpulrNoplg&s",
  },
  {
    id: 3,
    name: "Emily White",
    role: "Family Client",
    text: "Wonderful experience! Photos exceeded our expectations.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMfD2zt_7pU8QWoaKL6p1pjdX3NUN6h4Cdvg&s",
  },
]

export const Testimonials = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Define a parallax effect for each testimonial card, translating up as we scroll
  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]) // Reduced for smoother effect

  return (
    <section ref={containerRef} className="py-20 bg-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Client Testimonials
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              style={{ y: translateY }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="bg-black p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-white font-semibold">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
