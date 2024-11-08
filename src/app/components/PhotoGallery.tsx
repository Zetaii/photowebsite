// components/PhotoGallery.tsx
"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const images = [
  {
    id: 1,
    url: "https://static1.squarespace.com/static/538a3874e4b0ab1541d204ad/t/58d2cda01b10e3219f0b4751/1490210232360/?format=1500w",
    category: "nature",
  },
  {
    id: 2,
    url: "https://shotkit.com/wp-content/uploads/2021/02/black_and_white_portraits_peter_sjo.jpg",
    category: "portrait",
  },
  {
    id: 3,
    url: "https://cdn.artphotolimited.com/images/58e09c5d1473aa661507d0d2/300x300/pavet.jpg",
    category: "urban",
  },
  // Add more images as needed
]

export const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const categories = ["all", "nature", "portrait", "urban"]

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory)

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          Portfolio
        </motion.h2>

        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md capitalize ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.03 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <img
                src={image.url}
                alt={`Gallery image ${image.id}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
