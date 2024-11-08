"use client"
import { motion, useScroll, useTransform } from "framer-motion"
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
  const tiltIntensity = 20
  const lightIntensity = 0.15
  const headshotTransform = `perspective(${perspective}px) rotateX(${
    mousePosition.y * tiltIntensity
  }deg) rotateY(${mousePosition.x * tiltIntensity}deg)`

  return (
    <div
      ref={ref}
      className="relative h-[150vh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
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

      {/* Headshot Layer with 3D tilt and vibrational hover effect */}
      <motion.div
        style={{
          y: headshotY,
          scale: headshotScale,
          rotate: headshotRotation,
          opacity: headshotOpacity,
          transform: hoverEffect ? headshotTransform : "",
          translateX: `${mousePosition.x * 10}px`,
          translateY: `${mousePosition.y * 10}px`,
        }}
        transition={{
          duration: 1.5,
          ease: [0.33, 1, 0.68, 1],
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute top-1/2 left-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 shadow-xl rounded-full"
      >
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=cover"
          alt="Headshot"
          className="h-full w-full object-cover rounded-full shadow-lg"
          style={{
            transformOrigin: "center",
            filter: `brightness(${1 + mousePosition.y * lightIntensity})`,
          }}
        />
      </motion.div>

      {/* Ambient Effect Layer for added depth */}
      <div className="absolute inset-0 -z-30 h-[150vh] w-full bg-gradient-to-b from-transparent to-gray-900 opacity-50" />
    </div>
  )
}
