// app/page.tsx
import { Hero } from "./components/Hero"
import { MouseImageTrail } from "./components/MouseImageTrail"
import { PhotoGallery } from "./components/PhotoGallery"
import SideScroll from "./components/SideScroll"
import { SwipeCarousel } from "./components/SwipeCarousel"
import { Testimonials } from "./components/Testimonials"
import ZoomParallax from "./components/Zoom"
import Zoom2 from "./components/Zoom2"

export default function Home() {
  return (
    <>
      <Hero />
      <SideScroll />
      <PhotoGallery />
      <ZoomParallax />
      <Zoom2 />
      <SwipeCarousel />
      <MouseImageTrail />
      <Testimonials />
    </>
  )
}
