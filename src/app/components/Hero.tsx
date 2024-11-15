"use client"
import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { useRef, useState, useEffect, MouseEvent } from "react"

type MousePosition = {
  x: number
  y: number
}

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll({ target: ref })

  // Dynamic position for background, foreground, and headshot layers
  const backgroundY = useTransform(
    scrollY,
    [0, 800, 1600],
    ["0%", "15%", "35%"]
  )
  const backgroundScale = useTransform(scrollY, [0, 800, 1600], [1, 1.1, 1.2])

  const headshotY = useTransform(
    scrollY,
    [200, 800, 1600],
    ["0%", "70%", "150%"]
  )
  const headshotScale = useTransform(scrollY, [0, 800, 1600], [1, 1.25, 1.5])
  const headshotRotation = useTransform(
    scrollY,
    [0, 800, 1600],
    ["0deg", "5deg", "12deg"]
  )
  const headshotOpacity = useTransform(scrollY, [0, 1000, 1600], [1, 0.8, 0.5])

  const foregroundY = useTransform(
    scrollY,
    [0, 800, 1600],
    ["0%", "-10%", "-25%"]
  )
  const foregroundScale = useTransform(scrollY, [0, 800, 1600], [1.1, 1.3, 1.5])

  // Track mouse position for tilt and dynamic lighting
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    setMousePosition({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    })
  }

  // Vibrational effect using state toggle
  const [hoverEffect, setHoverEffect] = useState<boolean>(false)
  useEffect(() => {
    const interval = setInterval(() => setHoverEffect((prev) => !prev), 3000)
    return () => clearInterval(interval)
  }, [])

  // Define 3D perspective and subtle lighting based on mouse position
  const perspective = 1000
  const tiltIntensity = 35
  const moveIntensity = 25
  const lightIntensity = 0.2
  const headshotTransform = `perspective(${perspective}px) 
    rotateX(${mousePosition.y * tiltIntensity}deg) 
    rotateY(${mousePosition.x * tiltIntensity}deg)
    translateX(${mousePosition.x * moveIntensity}px)
    translateY(${mousePosition.y * moveIntensity}px)
    scale(1.05)`

  // Update letter animation variants
  const letterVariants: Variants = {
    hidden: (position: "top" | "bottom") => ({
      y: position === "top" ? -100 : 200,
      opacity: 0,
      rotateX: position === "top" ? 45 : -45,
    }),
    fadeIn: {
      y: 200,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: 1.2,
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.3,
      },
    },
  }

  // Add hover animation variants
  const hoverVariants: Variants = {
    hover: {
      scale: 1.1,
      textShadow: "0 0 8px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  }

  return (
    <div
      ref={ref}
      className="relative h-[150vh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Updated text container with better mobile positioning */}
      <div className="absolute top-[15%] md:top-[20%] w-full h-48 z-10">
        <div className="relative flex justify-center items-center">
          {/* Top row letters - D, N, Y with mobile adjustments */}
          <motion.span
            custom="top"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="font-tech text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[13rem] font-black text-black absolute left-[15%] sm:left-[15%] tracking-tight"
            style={{
              textShadow: `
                0 0 20px rgba(255,255,255,0.5),
                0 0 40px rgba(255,255,255,0.3),
                0 0 60px rgba(255,255,255,0.1)
              `,
              WebkitTextStroke: "2px rgba(255,255,255,1)",
              filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))",
              transform: "skew(-5deg)",
            }}
          >
            D
          </motion.span>
          {/* Update other top row letters similarly */}
          <motion.span
            custom="top"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.2 }}
            className="font-tech text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[13rem] font-black text-black absolute left-[45%] sm:left-[45%] tracking-tight"
            style={{
              textShadow: `
                0 0 20px rgba(255,255,255,0.5),
                0 0 40px rgba(255,255,255,0.3),
                0 0 60px rgba(255,255,255,0.1)
              `,
              WebkitTextStroke: "2px rgba(255,255,255,1)",
              filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))",
              transform: "skew(5deg)",
            }}
          >
            N
          </motion.span>
          <motion.span
            custom="top"
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.4 }}
            className="font-tech text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[13rem] font-black text-black absolute left-[75%] sm:left-[75%] tracking-tight"
            style={{
              textShadow: `
                0 0 20px rgba(255,255,255,0.5),
                0 0 40px rgba(255,255,255,0.3),
                0 0 60px rgba(255,255,255,0.1)
              `,
              WebkitTextStroke: "2px rgba(255,255,255,1)",
              filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))",
              transform: "skew(-3deg)",
            }}
          >
            Y
          </motion.span>

          {/* Bottom row letters with mobile adjustments */}
          <motion.span
            custom="bottom"
            variants={letterVariants}
            initial="hidden"
            animate={["fadeIn", "visible"]}
            whileHover="hover"
            className="font-tech text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[13rem] font-black text-black absolute left-[30%] sm:left-[30%] tracking-tight"
            style={{
              textShadow: `
                0 0 20px rgba(255,255,255,0.5),
                0 0 40px rgba(255,255,255,0.3),
                0 0 60px rgba(255,255,255,0.1)
              `,
              WebkitTextStroke: "2px rgba(255,255,255,1)",
              filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))",
              transform: "skew(3deg)",
            }}
          >
            O
          </motion.span>
          <motion.span
            custom="bottom"
            variants={letterVariants}
            initial="hidden"
            animate={["fadeIn", "visible"]}
            whileHover="hover"
            className="font-tech text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[13rem] font-black text-black absolute left-[60%] sm:left-[60%] tracking-tight"
            style={{
              textShadow: `
                0 0 20px rgba(255,255,255,0.5),
                0 0 40px rgba(255,255,255,0.3),
                0 0 60px rgba(255,255,255,0.1)
              `,
              WebkitTextStroke: "2px rgba(255,255,255,1)",
              filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))",
              transform: "skew(-2deg)",
            }}
          >
            N
          </motion.span>
        </div>
      </div>

      {/* Background Layer */}
      <motion.div
        style={{
          y: backgroundY,
          scale: backgroundScale,
          filter: `brightness(${1 + mousePosition.x * lightIntensity})`,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0 -z-20 h-[150%] w-full"
      >
        <img
          src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=cover"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Foreground Layer */}
      <motion.div
        style={{ y: foregroundY, scale: foregroundScale }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 h-[130%] w-full"
      >
        <img
          src="https://images.unsplash.com/photo-1470790376778-a9f5cf8d1805?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=cover"
          alt="Foreground"
          className="h-full w-full object-cover opacity-80"
        />
      </motion.div>

      {/* Headshot Layer with mobile adjustments */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.41,
          ease: [0.25, 0.8, 0.5, 1],
        }}
        style={{
          y: headshotY,
          scale: headshotScale,
          rotate: headshotRotation,
          opacity: headshotOpacity,
          transform: hoverEffect ? headshotTransform : "",
        }}
        className="absolute top-[45%] sm:top-[40%] md:top-[35%] left-[50%] h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] -translate-x-[50%] -translate-y-[50%] shadow-xl rounded-full transform-gpu"
      >
        <motion.img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlpyuDdXvekEv9RkFaGa29l8xOuJGbtkCTsNdEXKrk_FgNRumg"
          alt="Headshot"
          className="h-full w-full object-cover rounded-full shadow-lg"
          style={{
            transformOrigin: "center",
            filter: `brightness(${1 + mousePosition.y * lightIntensity})
                    contrast(${1 + Math.abs(mousePosition.x) * 0.1})`,
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Ambient Effect Layer for added depth */}
      <div className="absolute inset-0 -z-30 h-[150vh] w-full bg-gradient-to-b from-transparent to-gray-900 opacity-50" />
    </div>
  )
}
