/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the dashboard images for the carousel
const dashboardImages = [
  {
    id: 1,
    src: "/explore-more-dash.png",
    alt: "StarPay Dashboard - Overview",
    width: 900,
    height: 600,
  },
  {
    id: 2,
    src: "/phone.png",
    alt: "StarPay Dashboard - Features",
    width: 364,
    height: 756,
  },
  {
    id: 3,
    src: "/iphone15.png",
    alt: "StarPay Dashboard - Analytics",
    width: 364,
    height: 756,
  },
  {
    id: 4,
    src: "/device1.png",
    alt: "StarPay Dashboard - Merchant View",
    width: 364,
    height: 756,
  },
  {
    id: 5,
    src: "/features-second-page-below.png",
    alt: "StarPay Dashboard - Full Interface",
    width: 364,
    height: 756,
  },
]

export default function HeroSection() {
  const [showFullDashboard, setShowFullDashboard] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Function to handle the "Explore More" button click
  const handleExploreClick = () => {
    setShowFullDashboard(true)

    // Scroll to the dashboard section
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: "smooth" })
    }

    // Start auto-playing the carousel
    setIsAutoPlaying(true)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % dashboardImages.length)
      }, 3000) // Change image every 3 seconds
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
        autoPlayIntervalRef.current = null
      }
    }
  }, [isAutoPlaying])

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    setActiveImageIndex(index)

    // Reset auto-play timer when manually navigating
    if (isAutoPlaying) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }

      autoPlayIntervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % dashboardImages.length)
      }, 3000)
    }
  }

  return (
    <section className="relative min-h-screen bg-[#0a1a1a] text-white overflow-hidden pt-12"
    style={{
      backgroundImage: `url('/landing-page-time-lapse-bg2.png')`,
      backgroundSize: "cover",
      backgroundPosition: "top",
    }}
    >
      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-20 pb-10 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            STARPAY - THE SMARTER WAY
            <br />
            TO ACCEPT PAYMENTS
          </h1>

          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-12">
            With StarPay, you can effortlessly send or receive money from any bank or digital wallet across Ethiopia,
            making transactions not only convenient but also secure. Whether you're paying for...
          </p>

          <Button
            onClick={handleExploreClick}
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-6 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Explore More <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </span>
            <span className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
          </Button>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div
        ref={dashboardRef}
        className={`relative z-10 transition-all duration-700 ease-in-out ${
          showFullDashboard ? "mt-0 min-h-screen flex items-center" : "mt-16"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Dashboard Image Carousel */}
          <div
            className="relative mx-auto rounded-xl overflow-hidden transition-all duration-700"
            style={{
              height: showFullDashboard ? "80vh" : "330px",
              maxWidth: showFullDashboard ? "none" : "4xl",
            }}
          >
            {/* Gradient overlay for partial view */}
            {!showFullDashboard && (
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1a1a] to-transparent z-20"></div>
            )}

            {/* Image Container with Fixed Height */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={dashboardImages[activeImageIndex].src || "/placeholder.svg"}
                  alt={dashboardImages[activeImageIndex].alt}
                  width={dashboardImages[activeImageIndex].width}
                  height={dashboardImages[activeImageIndex].height}
                  className={showFullDashboard ? "object-contain" : "object-cover w-full h-full rounded-xl"}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Carousel Controls - Only visible when full dashboard is shown */}
          {showFullDashboard && (
            <div className="mt-6 flex justify-center items-center gap-2 z-30">
              <button
                onClick={() => goToSlide((activeImageIndex - 1 + dashboardImages.length) % dashboardImages.length)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md p-2 transition-colors"
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {dashboardImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeImageIndex ? "w-8 bg-emerald-500" : "w-4 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goToSlide((activeImageIndex + 1) % dashboardImages.length)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md p-2 transition-colors"
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

