"use client"
import Image from "next/image"
import { useScroll, useTransform, motion } from "framer-motion"
import { useMotionValueEvent } from "framer-motion"
import { useRef } from "react"

export default function ZoomParallax() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const pictures = [
    {
      src: "https://t3.ftcdn.net/jpg/05/35/47/38/360_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg",
      scale: scale4,
    },
    {
      src: "flappy.png",
      scale: scale5,
    },
    {
      src: "Zoom3.jpeg",
      scale: scale6,
    },
    {
      src: "Zoom4.jpeg",
      scale: scale5,
    },
    {
      src: "Zoom5.jpeg",
      scale: scale6,
    },
    {
      src: "Zoom6.jpeg",
      scale: scale8,
    },
    {
      src: "Zoom7.jpeg",
      scale: scale9,
    },
  ]

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.4) {
      console.log("Zoom", latest)
    } else {
      console.log("Zoom", latest)
    }
  })

  return (
    <div ref={container} className="h-[220vh]  relative ">
      <div className=" sticky top-0 h-[100vh] overflow-hidden ">
        <motion.div
          style={{ scale: scale4 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className=" relative w-[25vw] h-[25vh]">
            <img
              src="https://t3.ftcdn.net/jpg/05/35/47/38/360_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg"
              alt="image"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale5 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className=" relative -top-[30vh] left-[5vw] w-[35vw] h-[30vh]">
            <img
              src="https://thumbs.dreamstime.com/b/hd-wallpapers-peacock-forest-ai-hd-wallpapers-peacock-forest-307012823.jpg"
              alt="image"
              width={400}
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale6 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className=" relative -top-[10vh] -left-[25vw] w-[20vw] h-[45vh]">
            <img
              src="https://img.freepik.com/free-photo/wet-sphere-reflective-water-abstract-beauty-generated-by-ai_188544-19616.jpg"
              alt="image"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale5 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className=" relative  left-[27.5vw] w-[25vw] h-[25vh]">
            <img
              src="https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg"
              alt="image"
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale6 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className=" relative top-[35vh] left-[5vw] w-[20vw] h-[25vh]">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/036/135/738/small_2x/ai-generated-colored-water-drops-on-abstract-background-water-drops-on-colorful-background-colored-wallpaper-ultra-hd-colorful-wallpaper-background-with-colored-bubbles-photo.jpg"
              alt="image"
              width={300}
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale8 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className=" relative top-[27.5vh] -left-[22.5vw] w-[30vw] h-[25vh]">
            <img
              src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?cs=srgb&dl=pexels-pixabay-326055.jpg&fm=jpg"
              alt="image"
              width={400}
            />
          </div>
        </motion.div>

        <motion.div
          style={{ scale: scale9 }}
          className="w-full h-full top-0 absolute flex items-center justify-center"
        >
          <div className=" relative top-[27.5vh] left-[25vw] w-[15vw] h-[15vh]">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd3nzFlxC9GVG08A1Dv1xCo0XwXX_3qXOP2A&s"
              alt="image"
            />
          </div>
        </motion.div>

        {/* {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="w-full h-full top-0 absolute flex align-items-center justify-content-center"
            >
              <div className="relative w-[25vw] h-[25vh]">
                <Image src={`/images/${src}`} fill alt="image" />
              </div>
            </motion.div>
          )
        })} */}
      </div>
    </div>
  )
}
