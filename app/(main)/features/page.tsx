/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import DeviceOverlay from "./device-overlay"

// Define types for feature sections
interface FeatureSection {
  id: string
  title: string
  description: string
  deviceImage: string
  deviceWidth?: number
  deviceHeight?: number
  overlayImage?: string
  overlayWidth?: number
  overlayHeight?: number
  overlayPosition?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
    transform?: string
  }
  layout: "deviceLeft" | "deviceRight" 
  bgColor: string
  textColor: string
  buttonText?: string
  iconComponent?: React.ReactNode
}

export default function FeaturesPage() {
  // State for controlling the current section and scrolling behavior
  const [activeSection, setActiveSection] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isFullyVisible, setIsFullyVisible] = useState(false)
  const [hasCompletedSequence, setHasCompletedSequence] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">("right")
  const [isExiting, setIsExiting] = useState(false)
  const [entryDirection, setEntryDirection] = useState<"up" | "down">("down")

  // Refs for tracking scroll behavior
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const wheelEventCount = useRef(0)
  const wheelThreshold = 3 // Number of wheel events needed to change section
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const previousScrollY = useRef(0)

  // Feature sections data
  const featureSections: FeatureSection[] = [
    {
      id: "money-withdrawal",
      title: "EASY MONEY WITHDRAWAL",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
      deviceImage:
        "/features-first-page-below-phone.png",
      deviceWidth: 386,
      deviceHeight: 802,
      overlayImage: "/balance-cards.png",
      overlayWidth: 550,
      overlayHeight: 350,
      overlayPosition: {
        top: "180px",
        left: "50%",
        transform: "translateX(-50%)",
      },
      layout: "deviceLeft",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      buttonText: "Get Started",
    },
    // {
    //   id: "customer-detail",
    //   title: "CUSTOMER DETAIL",
    //   description:
    //     "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
    //   deviceImage:
    //     "/features-first-page-below-phone.png",
    //   deviceWidth: 500,
    //   deviceHeight: 1000,
    //   overlayImage: "/balance-cards.png",
    //   overlayWidth: 600,
    //   overlayHeight: 400,
    //   overlayPosition: {
    //     bottom: "300px",
    //     left: "50%",
    //     transform: "translateX(-50%)",
    //   },
    //   layout: "deviceRight",
    //   bgColor: "bg-white",
    //   textColor: "text-gray-800",
    //   buttonText: "Get Started",
    // },
    // {
    //   id: "withdrawal-account",
    //   title: "CHOOSE YOUR WITHDRAWAL ACCOUNT",
    //   description:
    //     "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
    //   deviceImage: "/features-first-page-below-phone.png",
    //   deviceWidth: 500,
    //   deviceHeight: 1000,
    //   overlayWidth: 600,
    //   overlayHeight: 400,
    //   overlayPosition: {
    //     top: "250px",
    //     left: "50%",
    //     transform: "translateX(-50%)",
    //   },
    //   layout: "deviceLeft",
    //   bgColor: "bg-gray-50",
    //   textColor: "text-gray-800",
    //   buttonText: "Get Started",
    // },
    // {
    //   id: "generate-qr",
    //   title: "GENERATE QR",
    //   description:
    //     "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
    //   deviceImage: "/features-first-page-below-phone.png",
    //   deviceWidth: 500,
    //   deviceHeight: 1000,
    //   overlayImage: "/balance-cards.png",
    //   overlayWidth: 600,
    //   overlayHeight: 400,
    //   overlayPosition: {
    //     bottom: "250px",
    //     left: "50%",
    //     transform: "translateX(-50%)",
    //   },
    //   layout: "deviceRight",
    //   bgColor: "bg-white",
    //   textColor: "text-gray-800",
    //   buttonText: "Get Started",
    // },
    // {
    //   id: "payment-options",
    //   title: "MULTIPLE PAYMENT OPTIONS",
    //   description:
    //     "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
    //   deviceImage: "/features-first-page-below-phone.png",
    //   deviceWidth: 500,
    //   deviceHeight: 1000,
    //   overlayImage: "/balance-cards.png",
    //   overlayWidth: 600,
    //   overlayHeight: 400,
    //   overlayPosition: {
    //     top: "300px",
    //     left: "50%",
    //     transform: "translateX(-50%)",
    //   },
    //   layout: "deviceLeft",
    //   bgColor: "bg-gray-900",
    //   textColor: "text-white",
    //   buttonText: "Get Started",
    // },
    {
      id: "1",
      title: "EASY MONEY WITHDRAWAL",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
      deviceImage:
        "/features-first-page-below-phone.png",
      deviceWidth: 386,
      deviceHeight: 802,
      overlayImage: "/balance-cards.png",
      overlayWidth: 550,
      overlayHeight: 350,
      overlayPosition: {
        top: "80px",
        left: "50%",
        transform: "translateX(-50%)",
      },
      layout: "deviceRight",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      buttonText: "Get Started",
    },
    {
      id: "2",
      title: "EASY MONEY WITHDRAWAL",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
      deviceImage:
        "/features-first-page-below-phone.png",
      deviceWidth: 386,
      deviceHeight: 802,
      overlayImage: "/balance-cards.png",
      overlayWidth: 550,
      overlayHeight: 350,
      overlayPosition: {
        top: "180px",
        left: "50%",
        transform: "translateX(-50%)",
      },
      layout: "deviceLeft",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      buttonText: "Get Started",
    },
    {
      id: "3",
      title: "EASY MONEY WITHDRAWAL",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
      deviceImage:
        "/features-first-page-below-phone.png",
      deviceWidth: 386,
      deviceHeight: 802,
      overlayImage: "/balance-cards.png",
      overlayWidth: 550,
      overlayHeight: 350,
      overlayPosition: {
        top: "180px",
        left: "50%",
        transform: "translateX(-50%)",
      },
      layout: "deviceRight",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      buttonText: "Get Started",
    },
    {
      id: "4",
      title: "EASY MONEY WITHDRAWAL",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
      deviceImage:
        "/features-first-page-below-phone.png",
      deviceWidth: 386,
      deviceHeight: 802,
      overlayImage: "/balance-cards.png",
      overlayWidth: 550,
      overlayHeight: 350,
      overlayPosition: {
        top: "180px",
        left: "50%",
        transform: "translateX(-50%)",
      },
      layout: "deviceRight",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      buttonText: "Get Started",
    },
    {
      id: "5",
      title: "EASY MONEY WITHDRAWAL",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
      deviceImage:
        "/features-first-page-below-phone.png",
      deviceWidth: 386,
      deviceHeight: 802,
      overlayImage: "/balance-cards.png",
      overlayWidth: 550,
      overlayHeight: 350,
      overlayPosition: {
        top: "180px",
        left: "50%",
        transform: "translateX(-50%)",
      },
      layout: "deviceLeft",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      buttonText: "Get Started",
    },
    {
      id: "6",
      title: "EASY MONEY WITHDRAWAL",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
      deviceImage:
        "/features-first-page-below-phone.png",
      deviceWidth: 386,
      deviceHeight: 802,
      overlayImage: "/balance-cards.png",
      overlayWidth: 550,
      overlayHeight: 350,
      overlayPosition: {
        top: "180px",
        left: "50%",
        transform: "translateX(-50%)",
      },
      layout: "deviceLeft",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      buttonText: "Get Started",
    },
  ]

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setEntryDirection(currentScrollY > previousScrollY.current ? "down" : "up")
      previousScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle exiting the section
  const handleExitSection = useCallback(
    (direction: "up" | "down" = "down") => {
      if (isExiting) return

      setIsExiting(true)
      setIsScrollLocked(false)
      document.body.style.overflow = ""
      document.body.style.touchAction = ""

      // Calculate the position to scroll to
      const sectionHeight = sectionRef.current?.offsetHeight || 0
      const sectionTop = sectionRef.current?.getBoundingClientRect().top || 0
      const currentScrollY = window.scrollY

      let scrollToPosition

      if (direction === "down") {
        // Scroll to the bottom of the section
        scrollToPosition = currentScrollY + sectionTop + sectionHeight
      } else {
        // Scroll to the top of the section (minus a bit to ensure we're above it)
        scrollToPosition = currentScrollY + sectionTop - 10
      }

      // Smooth scroll to the target position
      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      })

      // Reset states after scrolling is complete
      setTimeout(() => {
        setHasCompletedSequence(true)
        setIsExiting(false)
      }, 800)
    },
    [isExiting],
  )

  // Function to navigate to a specific section
  const goToSection = useCallback(
    (index: number) => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setScrollDirection(index > activeSection ? "right" : "left")
      setActiveSection(index)

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    },
    [activeSection, isTransitioning],
  )

  // Handle section visibility using IntersectionObserver
  useEffect(() => {
    if (!sectionRef.current) return

    // First observer: Check if section is entering the viewport
    const approachObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }, // Trigger when just 10% is visible
    )

    // Second observer: Check if section is fully visible
    const fullVisibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const isFullyInView = entry.isIntersecting && entry.intersectionRatio >= 0.95
        setIsFullyVisible(isFullyInView)

        if (isFullyInView && !hasCompletedSequence && !isScrollLocked) {
          // Determine which slide to show based on scroll direction
          if (entryDirection === "up") {
            // Coming from below, show the last slide
            setActiveSection(featureSections.length - 1)
          } else {
            // Coming from above, show the first slide
            setActiveSection(0)
          }

          // Lock scroll with a slight delay for smoother transition
          setTimeout(() => {
            if (sectionRef.current) {
              // Store the current scroll position
              lastScrollY.current = window.scrollY

              // Position the section at the top of the viewport
              const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY
              window.scrollTo({ top: sectionTop, behavior: "auto" })

              // Lock scrolling
              setIsScrollLocked(true)
              document.body.style.overflow = "hidden"
              document.body.style.touchAction = "none"
            }
          }, 50)
        } else if (!isFullyInView && isScrollLocked && !isExiting) {
          // If we're scrolling away and not in the exit process, unlock
          handleExitSection()
        }
      },
      { threshold: [0.95, 1.0] }, // Trigger when 95% or more is visible
    )

    approachObserver.observe(sectionRef.current)
    fullVisibilityObserver.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) {
        approachObserver.unobserve(sectionRef.current)
        fullVisibilityObserver.unobserve(sectionRef.current)
      }
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [hasCompletedSequence, isScrollLocked, featureSections.length, entryDirection, isExiting, handleExitSection])

  // Handle section change with debounce
  const changeSection = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setScrollDirection(direction === "next" ? "right" : "left")

      if (direction === "next") {
        setActiveSection((prev) => {
          // Only move one slide at a time
          const nextSection = prev + 1

          // Check if we're at the end
          if (nextSection >= featureSections.length) {
            // If we're at the last slide and trying to go further, prepare to exit
            handleExitSection("down")
            return prev
          }
          return nextSection
        })
      } else {
        setActiveSection((prev) => {
          // Only move one slide at a time
          const nextSection = prev - 1

          // Check if we're at the beginning
          if (nextSection < 0) {
            // If we're at the first slide and trying to go back, prepare to exit
            handleExitSection("up")
            return prev
          }
          return nextSection
        })
      }

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    },
    [isTransitioning, featureSections.length, handleExitSection],
  )

  // Handle wheel events to progress through sections
  useEffect(() => {
    if (!isScrollLocked) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Ignore events if we're transitioning
      if (isTransitioning) return

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Simplify the direction detection - focus only on vertical scrolling
      const delta = e.deltaY

      // Use a more straightforward approach - directly map vertical scroll to horizontal movement
      if (delta > 10) {
        // Scrolling DOWN = move RIGHT
        changeSection("next")
      } else if (delta < -10) {
        // Scrolling UP = move LEFT
        changeSection("prev")
      }

      // Set a timeout to prevent rapid firing
      scrollTimeout.current = setTimeout(() => {
        wheelEventCount.current = 0
      }, 500)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [isScrollLocked, changeSection, isTransitioning])

  // Handle touch events for mobile
  useEffect(() => {
    if (!isScrollLocked) return

    let touchStartX = 0
    let touchStartY = 0
    let isSwiping = false

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      isSwiping = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning || isSwiping) return

      // Prevent default to avoid page scrolling
      e.preventDefault()

      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const diffX = touchStartX - touchX
      const diffY = touchStartY - touchY

      // Only respond to horizontal swipes (to avoid confusion with vertical scrolling)
      if (Math.abs(diffX) > Math.abs(diffY) * 1.5 && Math.abs(diffX) > 50) {
        isSwiping = true

        if (diffX > 0) {
          // Swiping left (next section)
          changeSection("next")
        } else {
          // Swiping right (previous section)
          changeSection("prev")
        }
      }
    }

    const handleTouchEnd = () => {
      isSwiping = false
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isScrollLocked, isTransitioning, changeSection])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isScrollLocked) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        changeSection("next")
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        changeSection("prev")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isScrollLocked, isTransitioning, changeSection])

  // Add a cleanup function to ensure scroll is restored when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
      {/* Feature Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          className={cn("min-h-screen w-full flex items-center justify-center", featureSections[activeSection].bgColor)}
          initial={{ opacity: 0, x: scrollDirection === "right" ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: scrollDirection === "right" ? -300 : 300 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <DeviceOverlay
            layout={featureSections[activeSection].layout}
            deviceImage={featureSections[activeSection].deviceImage}
            deviceWidth={featureSections[activeSection].deviceWidth}
            deviceHeight={featureSections[activeSection].deviceHeight}
            overlayImage={featureSections[activeSection].overlayImage}
            overlayWidth={featureSections[activeSection].overlayWidth}
            overlayHeight={featureSections[activeSection].overlayHeight}
            overlayPosition={featureSections[activeSection].overlayPosition}
            title={featureSections[activeSection].title}
            description={featureSections[activeSection].description}
            buttonText={featureSections[activeSection].buttonText}
            iconComponent={featureSections[activeSection].iconComponent}
            containerClassName={featureSections[activeSection].bgColor}
            direction={scrollDirection}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators */}
      {isFullyVisible && isScrollLocked && !hasCompletedSequence && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
          <div className="flex flex-col gap-3">
            {featureSections.map((_, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeSection
                    ? "bg-emerald-500 scale-125"
                    : featureSections[activeSection].bgColor === "bg-black" ||
                        featureSections[activeSection].bgColor === "bg-gray-900"
                      ? "bg-white/40 hover:bg-white/60"
                      : "bg-gray-300 hover:bg-gray-400",
                )}
                animate={{
                  scale: index === activeSection ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                onClick={() => goToSection(index)}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Visual indicator for scrolling */}
      {isFullyVisible && isScrollLocked && !hasCompletedSequence && (
        <motion.div
          className={cn(
            "fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full z-50 backdrop-blur-sm",
            featureSections[activeSection].bgColor === "bg-black" ||
              featureSections[activeSection].bgColor === "bg-gray-900"
              ? "bg-white/20 text-white"
              : "bg-black/10 text-gray-800",
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="text-sm flex items-center">
            <span>Scroll to explore features</span>
            <motion.span
              animate={{
                x: [0, 5, 0],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="ml-2 inline-block"
            >
              <Icon icon="lucide:chevron-right" className="w-4 h-4" />
            </motion.span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

