"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ExpandingVideoSectionProps {
  videoSrc: string
  title?: string
  subtitle?: string
}

export default function ExpandingVideoSection({
  videoSrc = "",
  title = "EXPERIENCE THE FUTURE OF PAYMENTS",
  subtitle = "See how StarPay is revolutionizing the way businesses accept payments across Ethiopia",
}: ExpandingVideoSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  // Get scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Transform scroll progress to video container width
  const videoWidth = useTransform(scrollYProgress, [0, 0.2, 0.8], ["80%", "100%", "100%"])

  // Transform scroll progress to video scale
  const videoScale = useTransform(scrollYProgress, [0, 0.2, 0.4], [0.9, 1, 1])

  // Transform scroll progress to video opacity
  const contentOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0])

  // Play video when scrolled into view
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current || hasPlayed) return

      const rect = sectionRef.current.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0

      if (isInView) {
        // Start playing when 30% of the section is visible
        if (rect.top < window.innerHeight * 0.7) {
          videoRef.current.play()
          setHasPlayed(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasPlayed])

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] bg-white overflow-hidden">
      {/* Sticky container to keep video in view while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Initial content overlay */}
        <motion.div className="absolute z-10 text-center px-4 max-w-3xl" style={{ opacity: contentOpacity }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white/80 text-lg">{subtitle}</p>
        </motion.div>

        {/* Video container that expands with scroll */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            width: videoWidth,
            scale: videoScale,
          }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-lg shadow-2xl"
            src={videoSrc}
            muted
            playsInline
            loop
            preload="auto"
          />

          {/* Play button overlay (shows before video plays) */}
          {!hasPlayed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="white" />
                </svg>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

