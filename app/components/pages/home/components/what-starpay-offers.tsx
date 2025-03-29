"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

// Define the feature card interface
interface FeatureCard {
  id: string
  title: string
  description: string
  icon: string
  bgGradient: string
  iconBg?: string
  iconColor?: string
}

interface WhatStarPayOffersSectionProps {
  title?: string
  subtitle?: string
  bottomTitle?: string
  bottomSubtitle?: string
  bgImage?: string
  bgColor?: string
  textColor?: string
  cards?: FeatureCard[]
}

export default function WhatStarPayOffersSection({
  title = "WHAT STARPAY OFFERS",
  subtitle = "A Comprehensive And Detailed Guide To Effortlessly Integrating With The Gateway API, Covering All The Essential Steps, Best Practices, And Tips To Ensure A Smooth And Successful Implementation.",
  bottomTitle = "THE FUTURE OF PAYMENT IS",
  bottomSubtitle = "OPEN & INTEROPERABLE",
  bgImage = "/bg-gradient.png",
  bgColor = "bg-emerald-950",
  textColor = "text-white",
  cards,
}: WhatStarPayOffersSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Default cards if none provided
  const defaultCards: FeatureCard[] = [
    {
      id: "multi-channel",
      title: "Multi-Channel Payment",
      description:
        "StarPay allows merchants to request payments through a variety of convenient methods, including QR codes, payment links, OTPs, USSD, and reference codes. This flexibility ensures that merchants can accommodate every customer's preferred payment method, whether online or offline, making the payment process quick and seamless.",
      icon: "mdi:credit-card-multiple-outline",
      bgGradient: "from-emerald-900 to-emerald-800",
      iconBg: "bg-emerald-700",
    },
    {
      id: "real-time",
      title: "Real-Time Payment Verification",
      description:
        "With StarPay, merchants can instantly verify successful payments through the customer's receipt or success screen. This unique feature ensures transparency, reduces errors, and gives both merchants and customers peace of mind by confirming that the transaction is complete in real-time.",
      icon: "mdi:check-circle-outline",
      bgGradient: "from-amber-900 to-amber-800",
      iconBg: "bg-amber-700",
    },
    {
      id: "easy-withdrawal",
      title: "Easy Withdrawal",
      description:
        "Imagine a world where withdrawing your earnings is just a few taps away. With our Easy Withdrawal feature, you can quickly transfer funds to your bank or preferred payment method without complicated processes or long waits. Whether on our mobile app or desktop, just select your preferred withdrawal method, and confirm. It's that simple!",
      icon: "mdi:bank-transfer-out",
      bgGradient: "from-blue-900 to-blue-800",
      iconBg: "bg-blue-700",
    },
  ]

  const featureCards = cards || defaultCards

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Track scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine which card should be active based on scroll progress
    if (latest < 0.33) {
      setActiveCardIndex(0)
    } else if (latest < 0.66) {
      setActiveCardIndex(1)
    } else {
      setActiveCardIndex(2)
    }

    // Check if we should lock scrolling
    if (latest > 0.05 && latest < 0.95 && !isMobile && hasEnteredViewport) {
      if (!isScrollLocked) {
        setLastScrollY(window.scrollY)
        setIsScrollLocked(true)
        document.body.style.overflow = "hidden"
      }
    } else if ((latest <= 0.05 || latest >= 0.95) && isScrollLocked) {
      setIsScrollLocked(false)
      document.body.style.overflow = ""
    }
  })

  // Check when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true)
        } else {
          setHasEnteredViewport(false)
          setIsScrollLocked(false)
          document.body.style.overflow = ""
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      document.body.style.overflow = ""
    }
  }, [])

  // Handle wheel events for custom scrolling
  useEffect(() => {
    if (isMobile || !isScrollLocked) return

    let wheelTimeout: NodeJS.Timeout | null = null
    let wheelCount = 0

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Accumulate wheel events for smoother scrolling
      wheelCount += e.deltaY > 0 ? 1 : -1

      if (wheelTimeout) {
        clearTimeout(wheelTimeout)
      }

      wheelTimeout = setTimeout(() => {
        if (wheelCount > 3) {
          // Scroll down - move to next card
          setActiveCardIndex((prev) => Math.min(prev + 1, featureCards.length - 1))
        } else if (wheelCount < -3) {
          // Scroll up - move to previous card
          setActiveCardIndex((prev) => Math.max(prev - 1, 0))
        }
        wheelCount = 0
      }, 50)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (wheelTimeout) clearTimeout(wheelTimeout)
    }
  }, [isScrollLocked, isMobile, featureCards.length])

  // Handle touch events for mobile
  useEffect(() => {
    if (isMobile || !isScrollLocked) return

    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      touchEndY = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
      const touchDiff = touchStartY - touchEndY

      if (touchDiff > 50) {
        // Swipe up - move to next card
        setActiveCardIndex((prev) => Math.min(prev + 1, featureCards.length - 1))
      } else if (touchDiff < -50) {
        // Swipe down - move to previous card
        setActiveCardIndex((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isScrollLocked, isMobile, featureCards.length])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isScrollLocked) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setActiveCardIndex((prev) => Math.min(prev + 1, featureCards.length - 1))
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setActiveCardIndex((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isScrollLocked, featureCards.length])

  // Calculate bottom text opacity
  const bottomTextOpacity = activeCardIndex === 2 ? 1 : 0
  const bottomTextY = activeCardIndex === 2 ? 0 : 50

  return (
    <section
      ref={sectionRef}
      className={cn("relative min-h-[150vh] py-20 overflow-hidden", bgColor)}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="container mx-auto px-4 text-center">
        <h2 className={cn("text-4xl md:text-5xl font-bold mb-4", textColor)}>{title}</h2>
        <p
          className={cn(
            "text-lg max-w-3xl mx-auto mb-12",
            textColor === "text-white" ? "text-gray-300" : "text-gray-600",
          )}
        >
          {subtitle}
        </p>
      </div>

      {/* Cards Container */}
      <div
        ref={cardsContainerRef}
        className="container mx-auto px-4 relative mt-12"
        style={{ height: isMobile ? "auto" : "80vh" }}
      >
        {isMobile ? (
          // Mobile view - stacked cards without animation
          <div className="space-y-8">
            {featureCards.map((card, index) => (
              <div
                key={card.id}
                className={cn("rounded-3xl p-8 shadow-xl max-w-3xl mx-auto", `bg-gradient-to-br ${card.bgGradient}`)}
                style={{ width: "600px", height: "540px", maxWidth: "100%" }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={cn("p-4 rounded-full mb-6", card.iconBg || "bg-white/20")}>
                    <Icon icon={card.icon} className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{card.title}</h3>
                  <p className="text-white/90 text-lg leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop view - animated stacked cards
          <div className="relative h-full flex items-center justify-center">
            {featureCards.map((card, index) => {
              // Calculate position and visibility based on active card
              const isActive = index === activeCardIndex
              const wasActive = index < activeCardIndex
              const willBeActive = index > activeCardIndex

              // Calculate vertical position
              let yPosition = 0
              if (isActive) {
                yPosition = 0 // Active card is centered
              } else if (wasActive) {
                yPosition = -600 // Cards that were active move up and out of view
              } else if (willBeActive) {
                yPosition = 600 * (index - activeCardIndex) // Future cards are below
              }

              // Calculate z-index and opacity
              const zIndex = isActive ? 30 : wasActive ? 10 : 20
              const opacity = isActive ? 1 : wasActive ? 0 : 0.7

              return (
                <motion.div
                  key={card.id}
                  className={cn("absolute rounded-3xl p-8 shadow-xl", `bg-gradient-to-br ${card.bgGradient}`)}
                  style={{
                    width: "600px",
                    height: "540px",
                    maxHeight: "540px",
                    overflow: "hidden",
                  }}
                  initial={{ y: 600 * index, opacity: index === 0 ? 1 : 0.7, zIndex: index === 0 ? 30 : 20 }}
                  animate={{
                    y: yPosition,
                    opacity: opacity,
                    zIndex: zIndex,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={cn("p-4 rounded-full mb-6", card.iconBg || "bg-white/20")}>
                      <Icon icon={card.icon} className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{card.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed">{card.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Bottom Text */}
      <motion.div
        className="container mx-auto px-4 text-center mt-20 md:mt-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isMobile ? 1 : bottomTextOpacity,
          y: isMobile ? 0 : bottomTextY,
        }}
        transition={{ duration: 0.5 }}
      >
        <h3 className={cn("text-2xl md:text-3xl font-medium mb-2", textColor)}>{bottomTitle}</h3>
        <h2 className={cn("text-3xl md:text-5xl font-bold", textColor)}>{bottomSubtitle}</h2>
      </motion.div>

      {/* Scroll indicator for desktop */}
      {!isMobile && isScrollLocked && activeCardIndex < featureCards.length - 1 && (
        <div className="hidden md:block fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          <p className="text-center">Scroll to explore</p>
          <motion.div
            className="flex justify-center mt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Navigation dots */}
      {!isMobile && isScrollLocked && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
          <div className="flex flex-col gap-3">
            {featureCards.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeCardIndex ? "bg-emerald-500 scale-125" : "bg-white/40 hover:bg-white/60",
                )}
                onClick={() => setActiveCardIndex(index)}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

