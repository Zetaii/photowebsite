"use client"
import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

export default function Zoom2() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  // Define transforms for scaling, rotation, blur, and opacity
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const rotate4 = useTransform(scrollYProgress, [0, 1], ["0deg", "10deg"])
  const rotate5 = useTransform(scrollYProgress, [0, 1], ["0deg", "-15deg"])
  const rotate6 = useTransform(scrollYProgress, [0, 1], ["0deg", "20deg"])
  const rotate8 = useTransform(scrollYProgress, [0, 1], ["0deg", "-25deg"])
  const rotate9 = useTransform(scrollYProgress, [0, 1], ["0deg", "30deg"])

  const blur = useTransform(scrollYProgress, [0, 0.7, 1], ["0px", "2px", "5px"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.8, 0.5])

  const images = [
    {
      src: "https://t3.ftcdn.net/jpg/05/35/47/38/360_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg",
      scale: scale4,
      rotate: rotate4,
    },
    {
      src: "https://thumbs.dreamstime.com/b/hd-wallpapers-peacock-forest-ai-hd-wallpapers-peacock-forest-307012823.jpg",
      scale: scale5,
      rotate: rotate5,
    },
    {
      src: "https://img.freepik.com/free-photo/wet-sphere-reflective-water-abstract-beauty-generated-by-ai_188544-19616.jpg",
      scale: scale6,
      rotate: rotate6,
    },
    {
      src: "https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg",
      scale: scale5,
      rotate: rotate5,
    },
    {
      src: "https://static.vecteezy.com/system/resources/thumbnails/036/135/738/small_2x/ai-generated-colored-water-drops-on-abstract-background-water-drops-on-colorful-background-colored-wallpaper-ultra-hd-colorful-wallpaper-background-with-colored-bubbles-photo.jpg",
      scale: scale6,
      rotate: rotate6,
    },
    {
      src: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?cs=srgb&dl=pexels-pixabay-326055.jpg&fm=jpg",
      scale: scale8,
      rotate: rotate8,
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd3nzFlxC9GVG08A1Dv1xCo0XwXX_3qXOP2A&s",
      scale: scale9,
      rotate: rotate9,
    },
  ]

  return (
    <div ref={container} className="h-[220vh] relative">
      <div className="sticky top-0 h-[100vh] overflow-hidden bg-gradient-to-b from-gray-800 to-black">
        {images.map(({ src, scale, rotate }, index) => (
          <motion.div
            key={index}
            style={{ scale, rotate, opacity, filter: `blur(${blur})` }}
            className="w-full h-full top-0 absolute flex items-center justify-center"
          >
            <div className="relative w-[25vw] h-[25vh] shadow-lg">
              <img
                src={src}
                alt={`image-${index}`}
                className="rounded-lg shadow-xl border border-gray-300"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
