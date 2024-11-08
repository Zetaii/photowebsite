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

// Define the images array type and index type
const imgs: string[] = [
  "https://images.pexels.com/photos/4527160/pexels-photo-4527160.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1048256/pexels-photo-1048256.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/147642/pexels-photo-147642.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/12766489/pexels-photo-12766489.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/13812425/pexels-photo-13812425.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&w=600",
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
      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />
    </div>
  )
}

const Images: React.FC<ImagesProps> = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: imgIndex === idx ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="aspect-video w-screen shrink-0 rounded-xl bg-neutral-800 object-cover"
        />
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
