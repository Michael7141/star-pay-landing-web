"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Feature card interface
interface FeatureCard {
  id: string
  title: string
  description: string
  icon: string
  bgGradient: string
}

export default function WhatStarPayOffersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [hasCompletedSequence, setHasCompletedSequence] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const lastScrollY = useRef(0)
  const wheelEventCount = useRef(0)
  const wheelThreshold = 3 // Number of wheel events needed to change card

  // Feature cards data
  const featureCards: FeatureCard[] = [
    {
      id: "multi-channel",
      title: "Multi-Channel Payment",
      description:
        "StarPay allows merchants to request payments through a variety of convenient methods, including QR codes, payment links, OTPs, USSD, and reference codes. This flexibility ensures that merchants can accommodate every customer's preferred payment method, whether online or offline, making the payment process quick and seamless.",
      icon: "hugeicons:money-receive-01",
      bgGradient: "from-emerald-900 to-emerald-800",
    },
    {
      id: "real-time",
      title: "Real-Time Payment Verification",
      description:
        "With StarPay, merchants can instantly verify successful payments through the customer's receipt or success screen. This unique feature ensures transparency, reduces errors, and provides immediate confirmation of transactions.",
      icon: "carbon:checkmark-outline",
      bgGradient: "from-emerald-800 to-emerald-700",
    },
    {
      id: "dashboard",
      title: "Comprehensive Dashboard",
      description:
        "Access a powerful dashboard that provides real-time insights into your business transactions. Monitor sales, track payment trends, and generate detailed reports to make informed business decisions.",
      icon: "carbon:dashboard",
      bgGradient: "from-emerald-700 to-emerald-600",
    },
    {
      id: "security",
      title: "Advanced Security Measures",
      description:
        "StarPay implements industry-leading security protocols to protect both merchants and customers. With end-to-end encryption, secure authentication, and fraud detection systems, you can trust that every transaction is safe.",
      icon: "carbon:security",
      bgGradient: "from-emerald-600 to-emerald-500",
    },
    {
      id: "integration",
      title: "Seamless API Integration",
      description:
        "Our well-documented API allows for easy integration with your existing systems. Whether you're running an e-commerce platform, POS system, or custom application, StarPay can be integrated with minimal development effort.",
      icon: "carbon:api",
      bgGradient: "from-emerald-500 to-emerald-400",
    },
  ]

  // Track when the section title comes into view
  const titleEntry = useIntersectionObserver(titleRef, {
    threshold: 0.5,
    rootMargin: "0px",
  })

  // Track when the entire section is in view
  const sectionEntry = useIntersectionObserver(sectionRef, {
    threshold: 0.8, // Higher threshold to ensure most of the section is visible
    rootMargin: "0px",
  })

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle section visibility and set initial active card based on scroll direction
  useEffect(() => {
    if (!sectionRef.current) return

    // Check if title is in view (for starting the sequence)
    const isTitleVisible = titleEntry?.isIntersecting

    // Check if section is fully in view (for locking)
    const isSectionVisible = sectionEntry?.isIntersecting

    setIsInView(!!isSectionVisible)

    if (isSectionVisible && !hasCompletedSequence) {
      setIsScrollLocked(true)
      document.body.style.overflow = "hidden"

      // Set initial active card based on scroll direction
      if (scrollDirection === "down") {
        setActiveCardIndex(0) // First card when scrolling down to the section
      } else {
        setActiveCardIndex(featureCards.length - 1) // Last card when scrolling up to the section
      }
    } else {
      setIsScrollLocked(false)
      document.body.style.overflow = ""

      // Reset sequence completion when scrolling away
      if (!isTitleVisible && !isSectionVisible) {
        setHasCompletedSequence(false)
      }
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [
    titleEntry?.isIntersecting,
    sectionEntry?.isIntersecting,
    hasCompletedSequence,
    scrollDirection,
    featureCards.length,
  ])

  // Handle wheel events to progress through cards
  useEffect(() => {
    if (!isScrollLocked) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Accumulate wheel events to create a smoother experience
      if (e.deltaY > 0) {
        // Scrolling down
        wheelEventCount.current += 1
        if (wheelEventCount.current >= wheelThreshold) {
          wheelEventCount.current = 0
          setActiveCardIndex((prev) => {
            const nextCard = Math.min(prev + 1, featureCards.length - 1)
            if (nextCard === featureCards.length - 1 && prev === featureCards.length - 1) {
              // User has viewed all cards and is trying to scroll down more
              setHasCompletedSequence(true)
              return prev
            }
            return nextCard
          })
        }
      } else if (e.deltaY < 0) {
        // Scrolling up
        wheelEventCount.current -= 1
        if (wheelEventCount.current <= -wheelThreshold) {
          wheelEventCount.current = 0
          setActiveCardIndex((prev) => {
            const nextCard = Math.max(prev - 1, 0)
            if (nextCard === 0 && prev === 0) {
              // User has viewed all cards and is trying to scroll up more
              setHasCompletedSequence(true)
              return prev
            }
            return nextCard
          })
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [isScrollLocked, featureCards.length])

  // Handle touch events for mobile
  useEffect(() => {
    if (!isScrollLocked) return

    let touchStartY = 0
    let touchMoveCount = 0
    const touchThreshold = 30 // Pixels to swipe before changing card

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchMoveCount = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touchY = e.touches[0].clientY
      const diff = touchStartY - touchY
      touchMoveCount += Math.abs(diff)

      if (diff > 0 && touchMoveCount > touchThreshold) {
        // Swiping up (scrolling down)
        touchMoveCount = 0
        setActiveCardIndex((prev) => {
          const nextCard = Math.min(prev + 1, featureCards.length - 1)
          if (nextCard === featureCards.length - 1 && prev === featureCards.length - 1) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextCard
        })
      } else if (diff < 0 && touchMoveCount > touchThreshold) {
        // Swiping down (scrolling up)
        touchMoveCount = 0
        setActiveCardIndex((prev) => {
          const nextCard = Math.max(prev - 1, 0)
          if (nextCard === 0 && prev === 0) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextCard
        })
      }

      touchStartY = touchY
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [isScrollLocked, featureCards.length])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isScrollLocked) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setActiveCardIndex((prev) => {
          const nextCard = Math.min(prev + 1, featureCards.length - 1)
          if (nextCard === featureCards.length - 1 && prev === featureCards.length - 1) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextCard
        })
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setActiveCardIndex((prev) => {
          const nextCard = Math.max(prev - 1, 0)
          if (nextCard === 0 && prev === 0) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextCard
        })
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isScrollLocked, featureCards.length])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 relative bg-gradient-to-b from-emerald-950 to-emerald-900 text-white"
      id="what-starpay-offers"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4">
            WHAT STARPAY OFFERS
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A Comprehensive And Detailed Guide To Effortlessly Integrating With The Gateway API, Covering All The
            Essential Steps, Best Practices, And Tips To Ensure A Smooth And Successful Implementation.
          </p>
        </div>

        <div className="flex justify-center items-center min-h-[500px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCardIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className={`max-w-3xl w-full rounded-3xl p-12 shadow-xl bg-gradient-to-br ${featureCards[activeCardIndex].bgGradient}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-6">
                  <Icon icon={featureCards[activeCardIndex].icon} className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{featureCards[activeCardIndex].title}</h3>
                <p className="text-white/90 text-lg leading-relaxed">{featureCards[activeCardIndex].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {featureCards.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeCardIndex ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
              }`}
              onClick={() => setActiveCardIndex(index)}
              aria-label={`View feature ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Visual indicator for scrolling */}
      {isInView && !hasCompletedSequence && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="text-sm text-white flex items-center">
            <span>{scrollDirection === "down" ? "Scroll down" : "Scroll up"} to explore</span>
            <motion.span
              animate={{
                y: scrollDirection === "down" ? [0, 5, 0] : [0, -5, 0],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="ml-2 inline-block"
            >
              <Icon
                icon={scrollDirection === "down" ? "lucide:chevron-down" : "lucide:chevron-up"}
                className="w-4 h-4"
              />
            </motion.span>
          </div>
        </motion.div>
      )}

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        {isInView && !hasCompletedSequence && (
          <div className="flex flex-col gap-3">
            {featureCards.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeCardIndex ? "bg-white w-3 h-3" : "bg-white/40"}`}
                animate={{
                  scale: index === activeCardIndex ? 1.2 : 1,
                  backgroundColor: index === activeCardIndex ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveCardIndex(index)}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

