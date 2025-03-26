"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { debounce } from "lodash"

// Define types for feature sections
interface Section {
  id: string
  title: string
  subtitle?: string
  description: string
  phoneImage: string
  overlayImage?: string
  overlayPosition?: "top" | "middle" | "bottom"
  textPosition: "left" | "right" | "center"
  bgColor: string
  textColor: string
  buttonText?: string
  buttonIcon?: string
  iconName?: string
}

export default function FeaturesPage() {
  // State for controlling the current section and scrolling behavior
  const [activeSection, setActiveSection] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [hasCompletedSequence, setHasCompletedSequence] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"left" | "right">("right")
  const [showFeatures, setShowFeatures] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Refs for tracking scroll behavior
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const wheelEventCount = useRef(0)
  const wheelThreshold = 3 // Number of wheel events needed to change section
  const phoneRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // Feature sections data
  const sections: Section[] = [
    {
      id: "main-features",
      title: "REVOLUTIONIZING FINANCE FOR A BETTER TOMORROW, TODAY",
      subtitle:
        "Fintech services leverage technology to enhance financial processes, offering innovative solutions for banking",
      description: "",
      phoneImage: "/iphone15-first-slide.png",
      overlayImage: "/zoomed-in-1.png",
      overlayPosition: "middle",
      textPosition: "center",
      bgColor: "bg-white",
      textColor: "text-gray-800",
      buttonText: "Explore Features",
      buttonIcon: "tabler:arrow-down",
      iconName: "mdi:bank-outline",
    },
    {
      id: "money-withdrawal",
      title: "REQUESTING MONEY NEVER GET EASY",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
        phoneImage: "/iphone15-first-slide.png",
        overlayImage: "/zoomed-in-1.png",
      overlayPosition: "top",
      textPosition: "left",
      bgColor: "bg-gray-900",
      textColor: "text-white",
      buttonText: "Get Started",
      iconName: "mdi:cash-multiple",
    },
    {
      id: "customer-detail",
      title: "CUSTOMER DETAIL",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
        phoneImage: "/iphone15-first-slide.png",
        overlayImage: "/zoomed-in-1.png",
      textPosition: "right",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      iconName: "mdi:account-details-outline",
    },
    {
      id: "withdrawal-account",
      title: "CHOOSE YOUR WITHDRAWAL ACCOUNT",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
        phoneImage: "/iphone15-first-slide.png",
        overlayImage: "/zoomed-in-1.png",
      textPosition: "left",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      iconName: "mdi:bank-transfer",
    },
    {
      id: "withdrawal-success",
      title: "WITHDRAWAL SUCCESSFUL!",
      description:
        "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
        phoneImage: "/iphone15-first-slide.png",
        overlayImage: "/zoomed-in-1.png",
      overlayPosition: "top",
      textPosition: "right",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      iconName: "mdi:check-circle-outline",
    },
    {
      id: "next-feature",
      title: "THE NEXT BIG FEATURE",
      description: "",
      phoneImage: "/iphone15-first-slide.png",
      overlayImage: "/zoomed-in-1.png",
      textPosition: "center",
      bgColor: "bg-black",
      textColor: "text-white",
      buttonText: "Explore More",
      buttonIcon: "tabler:arrow-down",
      iconName: "mdi:rocket-launch-outline",
    },
  ]

  // Function to navigate to a specific section
  const goToSection = useCallback(
    (index: number) => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setDirection(index > activeSection ? "right" : "left")
      setActiveSection(index)

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    },
    [activeSection, isTransitioning],
  )

  // Auto-show features after a delay if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowFeatures(true)
      }
    }, 2000) // 2 seconds delay

    return () => clearTimeout(timer)
  }, [hasInteracted])

  // Handle mouse enter
  const handleMouseEnter = () => {
    setHasInteracted(true)
    setShowFeatures(true)
  }

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("right")
      } else {
        setScrollDirection("left")
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle section visibility and set initial active section based on scroll direction
  useEffect(() => {
    if (!sectionRef.current) return

    // Check if section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isSectionVisible = entry.isIntersecting
        setIsInView(isSectionVisible)

        if (isSectionVisible && !hasCompletedSequence) {
          setIsScrollLocked(true)
          document.body.style.overflow = "hidden"
          document.body.style.touchAction = "none" // Prevent touch scrolling

          // Set initial active section based on scroll direction
          if (scrollDirection === "right") {
            setActiveSection(0) // First section when scrolling down to the section
          } else {
            setActiveSection(sections.length - 1) // Last section when scrolling up to the section
          }
        } else {
          setIsScrollLocked(false)
          document.body.style.overflow = ""
          document.body.style.touchAction = ""

          // Reset sequence completion when scrolling away
          if (!isSectionVisible) {
            setHasCompletedSequence(false)
          }
        }
      },
      { threshold: 0.5 }, // Trigger when 50% of section is visible
    )

    observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [hasCompletedSequence, scrollDirection, sections.length])

  // Debounced function to handle section change
  const debouncedSectionChange = useCallback(
    debounce((direction: "next" | "prev") => {
      if (isTransitioning) return

      setIsTransitioning(true)

      if (direction === "next") {
        setActiveSection((prev) => {
          const nextSection = Math.min(prev + 1, sections.length - 1)
          if (nextSection === sections.length - 1 && prev === sections.length - 1) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextSection
        })
      } else {
        setActiveSection((prev) => {
          const nextSection = Math.max(prev - 1, 0)
          if (nextSection === 0 && prev === 0) {
            setHasCompletedSequence(true)
            return prev
          }
          return nextSection
        })
      }

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    }, 200),
    [isTransitioning, sections.length],
  )

  // Handle wheel events to progress through sections
  useEffect(() => {
    if (!isScrollLocked) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Determine primary scroll direction (horizontal or vertical)
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      const delta = isHorizontalScroll ? e.deltaX : e.deltaY

      // Accumulate wheel events to create a smoother experience
      if (delta > 0) {
        // Scrolling right/down
        wheelEventCount.current += 1
        if (wheelEventCount.current >= wheelThreshold) {
          wheelEventCount.current = 0
          debouncedSectionChange("next")
        }
      } else if (delta < 0) {
        // Scrolling left/up
        wheelEventCount.current -= 1
        if (wheelEventCount.current <= -wheelThreshold) {
          wheelEventCount.current = 0
          debouncedSectionChange("prev")
        }
      }

      // Set a timeout to reset the wheel event count if no scrolling occurs for a while
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
  }, [isScrollLocked, debouncedSectionChange])

  // Handle touch events for mobile
  useEffect(() => {
    if (!isScrollLocked) return

    let touchStartX = 0
    let touchStartY = 0
    let touchMoveCount = 0
    const touchThreshold = 50 // Increased threshold for more deliberate swipes

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      touchMoveCount = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning) return

      // Prevent default to avoid page scrolling
      e.preventDefault()

      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const diffX = touchStartX - touchX
      const diffY = touchStartY - touchY

      // Only respond to horizontal swipes (to avoid confusion with vertical scrolling)
      if (Math.abs(diffX) > Math.abs(diffY) * 1.5) {
        touchMoveCount += Math.abs(diffX)

        if (diffX > 0 && touchMoveCount > touchThreshold) {
          // Swiping left (next section)
          touchMoveCount = 0
          debouncedSectionChange("next")
        } else if (diffX < 0 && touchMoveCount > touchThreshold) {
          // Swiping right (previous section)
          touchMoveCount = 0
          debouncedSectionChange("prev")
        }
      }
    }

    const handleTouchEnd = () => {
      touchMoveCount = 0
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isScrollLocked, isTransitioning, debouncedSectionChange])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isScrollLocked) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        debouncedSectionChange("next")
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        debouncedSectionChange("prev")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isScrollLocked, isTransitioning, debouncedSectionChange])

  // Get overlay position styles based on the specified position
  const getOverlayPositionStyles = (position: "top" | "middle" | "bottom" = "middle") => {
    switch (position) {
      case "top":
        return "top-[15%] left-1/2 transform -translate-x-1/2"
      case "bottom":
        return "bottom-[15%] left-1/2 transform -translate-x-1/2"
      case "middle":
      default:
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    }
  }

  // Function to set scroll direction
  const setDirection = (direction: "left" | "right") => {
    setScrollDirection(direction)
  }

  return (
    <div ref={sectionRef} className="min-h-screen relative overflow-hidden">
      {/* Feature Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          className={cn("min-h-screen w-full flex items-center justify-center", sections[activeSection].bgColor)}
          initial={{ opacity: 0, x: scrollDirection === "right" ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: scrollDirection === "right" ? -300 : 300 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {activeSection === 0 ? (
            // First section with features grid
            <div className="container mx-auto px-4 pt-32 pb-20">
              <div className="text-center max-w-4xl mx-auto mb-16">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {sections[0].title}
                </motion.h1>
                {sections[0].subtitle && (
                  <motion.p
                    className="text-xl text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {sections[0].subtitle}
                  </motion.p>
                )}
              </div>

              <div className="flex justify-center items-center">
                {/* Interactive Phone Display */}
                <div ref={phoneRef} className="relative" onMouseEnter={handleMouseEnter}>
                  {/* Base Phone Image */}
                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Image
                      src={sections[0].phoneImage || "/placeholder.svg"}
                      alt="StarPay Mobile App"
                      width={300}
                      height={600}
                      className="relative z-10"
                      priority
                    />
                  </motion.div>

                  {/* Features Grid Overlay */}
                  <AnimatePresence>
                    {showFeatures && sections[0].overlayImage && (
                      <motion.div
                        className={cn(
                          "absolute z-20 max-w-[85%] w-auto",
                          getOverlayPositionStyles(sections[0].overlayPosition),
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.5,
                        }}
                      >
                        <Image
                          src={sections[0].overlayImage || "/placeholder.svg"}
                          alt="StarPay Features"
                          width={340}
                          height={200}
                          className="w-full h-auto"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Interaction Hint */}
                  <motion.div
                    className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hasInteracted || showFeatures ? 0 : 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <Icon icon="mdi:cursor-default-gesture" className="inline-block mr-1 w-5 h-5" />
                    Hover to explore features
                  </motion.div>
                </div>
              </div>
            </div>
          ) : (
            // Other sections with phone and overlay
            <div className="container mx-auto px-4">
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
                  sections[activeSection].textPosition === "right" ? "" : "flex-row-reverse",
                  sections[activeSection].textPosition === "center" && "md:grid-cols-1",
                )}
              >
                {/* Phone Image with Overlay */}
                <div
                  className={cn(
                    "flex justify-center items-center",
                    sections[activeSection].textPosition === "center" && "order-1",
                  )}
                >
                  <div className="relative">
                    {/* Base Phone Image */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10"
                    >
                      <Image
                        src={sections[activeSection].phoneImage || "/placeholder.svg"}
                        alt={sections[activeSection].title}
                        width={400}
                        height={800}
                        className="h-auto max-h-[70vh] w-auto object-contain"
                        priority
                      />
                    </motion.div>

                    {/* Overlay Image */}
                    {sections[activeSection].overlayImage && (
                      <motion.div
                        className={cn(
                          "absolute z-20 max-w-[85%] w-auto",
                          getOverlayPositionStyles(sections[activeSection].overlayPosition),
                        )}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.5,
                        }}
                      >
                        <Image
                          src={sections[activeSection].overlayImage || "/placeholder.svg"}
                          alt={`${sections[activeSection].title} Overlay`}
                          width={340}
                          height={200}
                          className="w-full h-auto"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div
                  className={cn(
                    "flex flex-col gap-6",
                    sections[activeSection].textPosition === "center" && "text-center items-center order-0",
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-emerald-600 w-16 h-16 rounded-lg flex items-center justify-center"
                  >
                    <Icon
                      icon={sections[activeSection].iconName || "mdi:credit-card-outline"}
                      className="w-8 h-8 text-white"
                    />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={cn("text-4xl font-bold", sections[activeSection].textColor)}
                  >
                    {sections[activeSection].title}
                  </motion.h2>

                  {sections[activeSection].description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={cn(
                        "text-lg leading-relaxed max-w-xl",
                        sections[activeSection].textColor === "text-white" ? "text-gray-300" : "text-gray-600",
                      )}
                    >
                      {sections[activeSection].description}
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-3 flex items-center gap-2 w-fit">
                      {sections[activeSection].buttonText || "Get Started"}
                      <Icon icon={sections[activeSection].buttonIcon || "tabler:arrow-right"} className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Visual indicator for scrolling */}
      {isInView && !hasCompletedSequence && (
        <motion.div
          className={cn(
            "fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full z-50 backdrop-blur-sm",
            sections[activeSection].bgColor === "bg-black" || sections[activeSection].bgColor === "bg-gray-900"
              ? "bg-white/20 text-white"
              : "bg-black/10 text-gray-800",
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="text-sm flex items-center">
            <span>Swipe {scrollDirection === "right" ? "left" : "right"} to explore</span>
            <motion.span
              animate={{
                x: scrollDirection === "right" ? [0, 5, 0] : [0, -5, 0],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="ml-2 inline-block"
            >
              <Icon
                icon={scrollDirection === "right" ? "lucide:chevron-right" : "lucide:chevron-left"}
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
            {sections.map((_, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeSection
                    ? "bg-emerald-500 scale-125"
                    : sections[activeSection].bgColor === "bg-black" ||
                        sections[activeSection].bgColor === "bg-gray-900"
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
        )}
      </div>
    </div>
  )
}

