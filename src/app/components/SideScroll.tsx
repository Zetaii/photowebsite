"use client"
import { motion, useTransform, useScroll } from "framer-motion"
import { useRef, useEffect, useState } from "react"

// Types
interface CardType {
  url: string
  title: string
  description: string
  id: number
}

interface CardProps {
  card: CardType
}

// Optimized Card component
const Card = ({ card }: CardProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = card.url
    img.onload = () => setIsLoaded(true)
  }, [card.url])

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="group relative h-[400px] md:h-[700px] w-[300px] md:w-[500px] overflow-hidden rounded-2xl bg-neutral-800"
    >
      <div
        style={{
          backgroundImage: isLoaded ? `url(${card.url})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "crisp-edges",
        }}
        className="absolute inset-0 z-0 transition-transform duration-500 will-change-transform group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-neutral-900/10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
      <div className="absolute bottom-0 z-10 p-4 md:p-8">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4"
        >
          {card.title}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm md:text-lg text-white/80 max-w-md"
        >
          {card.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

// Main carousel component
const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-8 px-8"
          initial={false}
          layout="position"
        >
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Main component export
export default function SideScroll() {
  return (
    <div className="bg-neutral-900">
      <HorizontalScrollCarousel />
    </div>
  )
}

// Data
const cards: CardType[] = [
  {
    url: "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=100&w=2070",
    title: "Natural Wonders",
    description: "Explore the breathtaking beauty of autumn landscapes",
    id: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1682686580024-580519d4b2d2?q=100&w=2070",
    title: "Mountain Peaks",
    description: "Discover majestic mountain ranges and scenic views",
    id: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?q=100&w=2070",
    title: "Ocean Depths",
    description: "Dive into the mysterious world beneath the waves",
    id: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1682686580950-960d1d513532?q=100&w=2070",
    title: "Wildlife",
    description: "Encounter magnificent creatures in their natural habitat",
    id: 4,
  },
  {
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=100&w=2070",
    title: "Desert Sands",
    description: "Experience the raw beauty of desert landscapes",
    id: 5,
  },
  {
    url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=100&w=2070",
    title: "Forest Tales",
    description: "Wander through ancient forests and hidden paths",
    id: 6,
  },
  {
    url: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=100&w=2070",
    title: "Arctic Dreams",
    description: "Witness the pristine beauty of polar regions",
    id: 7,
  },
]
