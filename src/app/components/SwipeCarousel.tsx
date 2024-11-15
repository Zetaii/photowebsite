"use client"
import React, { useEffect, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

// Constants
const ONE_SECOND = 1000
const AUTO_DELAY = ONE_SECOND * 10
const DRAG_BUFFER = 50

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
}

// Updated type to include text content
type ImageContent = {
  url: string
  title: string
  description: string
}

// Updated images array with content
const imgs: ImageContent[] = [
  {
    url: "https://images.unsplash.com/photo-1682686581498-5e85c7228119?auto=format&w=3840&q=100",
    title: "Mountain Vista",
    description:
      "Discover breathtaking peaks and valleys in the heart of nature",
  },
  {
    url: "https://images.unsplash.com/photo-1682686580024-580519d4b2d2?auto=format&w=3840&q=100",
    title: "Ocean Dreams",
    description: "Dive into the serene beauty of endless horizons",
  },
  {
    url: "https://images.unsplash.com/photo-1682686579976-879b74d6d7ea?auto=format&w=3840&q=100",
    title: "Forest Mystery",
    description: "Explore ancient woodlands filled with wonder",
  },
  {
    url: "https://images.unsplash.com/photo-1682686580950-960d1d513532?auto=format&w=3840&q=100",
    title: "Desert Whispers",
    description: "Experience the quiet majesty of golden dunes",
  },
  {
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&w=3840&q=100",
    title: "Arctic Silence",
    description: "Witness the pristine beauty of frozen landscapes",
  },
  {
    url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&w=3840&q=100",
    title: "Tropical Paradise",
    description: "Immerse yourself in vibrant coastal scenery",
  },
  {
    url: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?auto=format&w=3840&q=100",
    title: "Sunset Serenity",
    description: "Bask in the warm glow of golden hour",
  },
]

type ImagesProps = {
  imgIndex: number
}

type DotsProps = {
  imgIndex: number
  setImgIndex: React.Dispatch<React.SetStateAction<number>>
}

export const SwipeCarousel = () => {
  const [imgIndex, setImgIndex] = useState<number>(0)
  const dragX = useMotionValue(0)

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get()
      if (x === 0) {
        setImgIndex((prevIndex) =>
          prevIndex === imgs.length - 1 ? 0 : prevIndex + 1
        )
      }
    }, AUTO_DELAY)

    return () => clearInterval(intervalRef)
  }, [dragX])

  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1)
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1)
    }
  }

  return (
    <div className="relative overflow-hidden bg-neutral-950 py-8">
      <div className="w-[95vw] max-w-[1800px] mx-auto overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          animate={{ translateX: `-${imgIndex * 100}%` }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className="flex cursor-grab items-center active:cursor-grabbing"
        >
          <Images imgIndex={imgIndex} />
        </motion.div>
      </div>
      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
    </div>
  )
}

const Images: React.FC<ImagesProps> = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((img, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${img.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
          animate={{
            scale: imgIndex === idx ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="relative aspect-[16/9] w-[95vw] max-w-[1800px] shrink-0 rounded-xl bg-neutral-800 object-cover will-change-transform shadow-xl transform-gpu"
        >
          <motion.div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/60 to-transparent rounded-b-xl">
            <motion.h2
              className="text-2xl md:text-4xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: imgIndex === idx ? 1 : 0,
                y: imgIndex === idx ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {img.title}
            </motion.h2>
            <motion.p
              className="text-base md:text-xl text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: imgIndex === idx ? 1 : 0,
                y: imgIndex === idx ? 0 : 20,
              }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {img.description}
            </motion.p>
          </motion.div>
        </motion.div>
      ))}
    </>
  )
}

const Dots: React.FC<DotsProps> = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setImgIndex(idx)}
          className={`h-3 w-3 rounded-full transition-colors ${
            idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
          }`}
        />
      ))}
    </div>
  )
}

const GradientEdges: React.FC = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  )
}
