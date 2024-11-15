"use client"
import { useAnimate } from "framer-motion"
import React, {
  useRef,
  ReactNode,
  MouseEvent,
  useEffect,
  useState,
} from "react"

type MouseImageTrailProps = {
  children: ReactNode
  images: string[]
  renderImageBuffer: number
  rotationRange: number
}

export const MouseImageTrail = () => {
  return (
    <MouseImageTrailComponent
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1582458/pexels-photo-1582458.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1567069/pexels-photo-1567069.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/2926525/pexels-photo-2926525.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/2162439/pexels-photo-2162439.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/39531/lotus-lotus-leaf-nature-flowers-39531.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/11542516/pexels-photo-11542516.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1449462/pexels-photo-1449462.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/53184/peacock-bird-plumage-color-53184.jpeg?auto=compress&cs=tinysrgb&w=600",
      ]}
    >
      <section className="grid h-screen w-full place-content-center bg-black"></section>
    </MouseImageTrailComponent>
  )
}

const MouseImageTrailComponent: React.FC<MouseImageTrailProps> = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate()
  const containerRef = useRef<HTMLDivElement>(null)
  const lastRenderPosition = useRef({ x: 0, y: 0 })
  const imageRenderCount = useRef(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isVisible || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const distance = calculateDistance(
        x,
        y,
        lastRenderPosition.current.x,
        lastRenderPosition.current.y
      )

      if (distance >= renderImageBuffer) {
        lastRenderPosition.current = { x, y }
        renderNextImage(x + rect.left, y + rect.top)
      }
    }
  }

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const deltaX = x2 - x1
    const deltaY = y2 - y1
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  const renderNextImage = (absoluteX: number, absoluteY: number) => {
    const imageIndex = imageRenderCount.current % images.length
    const selector = `[data-mouse-move-index="${imageIndex}"]`

    if (scope.current) {
      const el = scope.current.querySelector(selector) as HTMLElement
      if (el) {
        el.style.top = `${absoluteY}px`
        el.style.left = `${absoluteX}px`
        el.style.zIndex = imageRenderCount.current.toString()

        const rotation = Math.random() * rotationRange

        animate(
          selector,
          {
            opacity: [0, 1],
            transform: [
              `translate(-50%, -25%) scale(0.5) ${
                imageIndex % 2
                  ? `rotate(${rotation}deg)`
                  : `rotate(-${rotation}deg)`
              }`,
              `translate(-50%, -50%) scale(1) ${
                imageIndex % 2
                  ? `rotate(-${rotation}deg)`
                  : `rotate(${rotation}deg)`
              }`,
            ],
          },
          { type: "spring", damping: 15, stiffness: 200 }
        )

        animate(
          selector,
          { opacity: [1, 0] },
          { ease: "linear", duration: 0.5, delay: 5 }
        )

        imageRenderCount.current += 1
      }
    }
  }

  return (
    <div ref={scope}>
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {children}

        {images.map((img, index) => (
          <img
            className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
            src={img}
            alt={`Mouse move image ${index}`}
            key={index}
            data-mouse-move-index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default MouseImageTrailComponent
