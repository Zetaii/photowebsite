"use client"
import { useScroll, useTransform, motion } from "framer-motion"
import { useMotionValueEvent } from "framer-motion"
import { useRef } from "react"

export default function ZoomParallax() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 3])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 3.5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 6])

  return (
    <div ref={container} className="h-[220vh] relative">
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        <motion.div
          style={{ scale: scale4 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className="relative w-[35vw] md:w-[25vw] h-[25vh]">
            <img
              src="https://t3.ftcdn.net/jpg/05/35/47/38/360_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg"
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale5 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className="relative -top-[20vh] md:-top-[30vh] left-[5vw] w-[45vw] md:w-[35vw] h-[30vh]">
            <img
              src="https://thumbs.dreamstime.com/b/hd-wallpapers-peacock-forest-ai-hd-wallpapers-peacock-forest-307012823.jpg"
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale6 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className="relative -top-[10vh] -left-[15vw] md:-left-[25vw] w-[30vw] md:w-[20vw] h-[45vh]">
            <img
              src="https://img.freepik.com/free-photo/wet-sphere-reflective-water-abstract-beauty-generated-by-ai_188544-19616.jpg"
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale5 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className="relative left-[20vw] md:left-[27.5vw] w-[35vw] md:w-[25vw] h-[25vh]">
            <img
              src="https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg"
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale6 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className="relative top-[25vh] md:top-[35vh] left-[5vw] w-[30vw] md:w-[20vw] h-[25vh]">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/036/135/738/small_2x/ai-generated-colored-water-drops-on-abstract-background-water-drops-on-colorful-background-colored-wallpaper-ultra-hd-colorful-wallpaper-background-with-colored-bubbles-photo.jpg"
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale8 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className="relative top-[20vh] md:top-[27.5vh] -left-[15vw] md:-left-[22.5vw] w-[40vw] md:w-[30vw] h-[25vh]">
            <img
              src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?cs=srgb&dl=pexels-pixabay-326055.jpg&fm=jpg"
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale9 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className="relative top-[20vh] md:top-[27.5vh] left-[20vw] md:left-[25vw] w-[25vw] md:w-[15vw] h-[15vh]">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd3nzFlxC9GVG08A1Dv1xCo0XwXX_3qXOP2A&s"
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
