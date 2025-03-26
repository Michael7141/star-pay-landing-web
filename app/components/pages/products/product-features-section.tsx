"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define the product features
interface ProductFeature {
  id: string
  index: number
  title: string
  description: string
  icon: string
  image: string
  imageWidth: number
  imageHeight: number
  buttonText: string
  bgColor: string
  textColor: string
}

export default function ProductFeaturesSection() {
  // State for controlling the section
  const [activeFeature, setActiveFeature] = useState(0)
  const [, setIsInView] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [hasCompletedSequence, setHasCompletedSequence] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"next" | "prev">("next")
  const [isFullyVisible, setIsFullyVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [entryDirection, setEntryDirection] = useState<"up" | "down">("down")

  // Refs for tracking scroll behavior
  const sectionRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const wheelEventCount = useRef(0)
  const wheelThreshold = 3 // Number of wheel events needed to change feature
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const previousScrollY = useRef(0)

  // Product features data
  const productFeatures: ProductFeature[] = [
    {
      id: "merchant-app",
      index: 1,
      title: "MERCHANT APP",
      description:
        "Take your business on the go with the StarPay Merchant Mobile App. Available for both Android and iOS, this app lets you manage transactions, track payments, and issue receipts wherever you are. Whether you're at the counter, at a client meeting, or on the move, the mobile app gives you full flexibility to manage your business efficiently, allowing you to send payment requests, view payment status, and stay updated in real-time—all from the palm of your hand.",
      icon: "clarity:event-solid",
      image: "/iphone15.png",
      imageWidth: 944,
      imageHeight: 1117,
      buttonText: "Get Started",
      bgColor: "bg-white",
      textColor: "text-gray-800",
    },
    {
      id: "merchant-dashboard",
      index: 2,
      title: "MERCHANT DASHBOARD",
      description:
        "The Merchant Dashboard is your centralized hub for managing all aspects of your payments and transactions. With real-time data and easy-to-navigate features, you can track sales, monitor payments, generate invoices, and view comprehensive reports—all from one platform. Whether you're managing a single store or a large chain, the Merchant Dashboard gives you full control over your business's financial operations, empowering you to make informed decisions and optimize your cash flow with ease.",
      icon: "clarity:event-solid",
      image: "/second-image.png",
      imageWidth: 1568,
      imageHeight: 620,
      buttonText: "Get Started",
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      id: "checkout-sdk",
      index: 3,
      title: "WEB & MOBILE CHECKOUT SDK",
      description:
        "Integrate seamless and secure payment solutions into your website or mobile app with StarPay's Checkout SDK. Designed for both web and mobile platforms, the Checkout SDK provides a smooth, frictionless checkout experience for your customers. Whether you're running an online store, a subscription-based service, or a one-time purchase, our SDK ensures your customers can pay quickly and securely, with multiple payment options to choose from. It's simple to implement, highly customizable, and built to increase conversion rates.",
      icon: "clarity:event-solid",
      image: "/third-image.png",
      imageWidth: 944,
      imageHeight: 1117,
      buttonText: "Get Started",
      bgColor: "bg-white",
      textColor: "text-gray-800",
    },
    {
      id: "api-integration",
      index: 4,
      title: "API INTEGRATION",
      description:
        "The StarPay API is designed for developers who want to integrate payment solutions directly into their custom applications or websites. With a robust, easy-to-use interface, the API gives you full control over your payment processing, allowing you to automate transactions, manage subscriptions, and handle customer payments seamlessly. Whether you're building a complex e-commerce platform, a mobile app, or a custom solution, the StarPay API delivers flexibility, security, and scalability for all your payment needs.",
      icon: "clarity:event-solid",
      image: "/fourth-image.png",
      imageWidth: 1568,
      imageHeight: 620,
      buttonText: "Get Started",
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      id: "remittance-api",
      index: 5,
      title: "REMITTANCE API",
      description:
        "StarPay's Remittance API empowers businesses in the remittance industry with seamless access to all banks in Ethiopia through a single integration. Our solution simplifies transaction processing and provides a centralized portal where businesses can manage all their remittance operations in one place. With secure, efficient, and real-time payments, StarPay makes cross-border and local money transfers easier than ever.",
      icon: "clarity:event-solid",
      image: "/fifth-image.png",
      imageWidth: 1568,
      imageHeight: 620,
      buttonText: "Get Started",
      bgColor: "bg-white",
      textColor: "text-gray-800",
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

  // Function to navigate to a specific feature
  const goToFeature = useCallback(
    (index: number) => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setScrollDirection(index > activeFeature ? "next" : "prev")
      setActiveFeature(index)

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    },
    [activeFeature, isTransitioning],
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
            setActiveFeature(productFeatures.length - 1)
          } else {
            // Coming from above, show the first slide
            setActiveFeature(0)
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
  }, [hasCompletedSequence, isScrollLocked, productFeatures.length, entryDirection, isExiting])

  // Handle feature change with debounce
  const changeFeature = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setScrollDirection(direction)

      if (direction === "next") {
        setActiveFeature((prev) => {
          const nextFeature = Math.min(prev + 1, productFeatures.length - 1)
          if (nextFeature === productFeatures.length - 1 && prev === productFeatures.length - 1) {
            // If we're already at the last slide and trying to go further, prepare to exit
            handleExitSection("down")
            return prev
          }
          return nextFeature
        })
      } else {
        setActiveFeature((prev) => {
          const nextFeature = Math.max(prev - 1, 0)
          if (nextFeature === 0 && prev === 0) {
            // If we're already at the first slide and trying to go back, prepare to exit
            handleExitSection("up")
            return prev
          }
          return nextFeature
        })
      }

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 800)
    },
    [isTransitioning, productFeatures.length],
  )

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

  // Handle wheel events to progress through features
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
          changeFeature("next")
        }
      } else if (delta < 0) {
        // Scrolling left/up
        wheelEventCount.current -= 1
        if (wheelEventCount.current <= -wheelThreshold) {
          wheelEventCount.current = 0
          changeFeature("prev")
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
  }, [isScrollLocked, changeFeature])

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
          // Swiping left (next feature)
          touchMoveCount = 0
          changeFeature("next")
        } else if (diffX < 0 && touchMoveCount > touchThreshold) {
          // Swiping right (previous feature)
          touchMoveCount = 0
          changeFeature("prev")
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
  }, [isScrollLocked, isTransitioning, changeFeature])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isScrollLocked) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        changeFeature("next")
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        changeFeature("prev")
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isScrollLocked, isTransitioning, changeFeature])

  // Add a cleanup function to ensure scroll is restored when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = ""
      document.body.style.touchAction = ""
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="product-features"
      className="min-h-screen relative overflow-hidden transition-opacity duration-500"
      style={{ height: "100vh" }} // Force full viewport height
    >
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="container mx-auto h-full flex items-center justify-center">
          <h2 className="sr-only">Product Features</h2>
        </div>
      </div>

      {/* Feature Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFeature}
          className={cn("h-screen w-full flex items-center", productFeatures[activeFeature].bgColor)}
          initial={{ opacity: 0, x: scrollDirection === "next" ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: scrollDirection === "next" ? -300 : 300 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="container mx-auto px-4 py-16">
            <div
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                activeFeature % 2 === 1 && "lg:grid-cols-2 flex-row-reverse",
              )}
            >
              {/* Text Content */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-emerald-600 w-11 h-11 rounded-lg flex items-center justify-center">
                    <Icon icon={productFeatures[activeFeature].icon} className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-emerald-600/10 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-emerald-600">
                      {productFeatures[activeFeature].index.toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={cn("text-3xl font-bold", productFeatures[activeFeature].textColor)}
                  style={{ fontSize: "32px" }}
                >
                  {productFeatures[activeFeature].title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={cn(
                    "text-lg leading-relaxed max-w-xl",
                    productFeatures[activeFeature].textColor === "text-white" ? "text-gray-300" : "text-gray-600",
                  )}
                >
                  {productFeatures[activeFeature].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-3 flex items-center gap-2 w-fit">
                    {productFeatures[activeFeature].buttonText}
                    <Icon icon="tabler:arrow-right" className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div
                className="flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative">
                  <Image
                    src={productFeatures[activeFeature].image || "/placeholder.svg"}
                    alt={productFeatures[activeFeature].title}
                    width={productFeatures[activeFeature].imageWidth}
                    height={productFeatures[activeFeature].imageHeight}
                    className="w-full h-auto object-contain max-h-[70vh]"
                    priority={activeFeature === 0}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=600&width=800"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators - only show when fully visible and locked */}
      {isFullyVisible && isScrollLocked && !hasCompletedSequence && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
          <div className="flex flex-col gap-3">
            {productFeatures.map((feature, index) => (
              <motion.button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === activeFeature
                    ? "bg-emerald-500 scale-125"
                    : productFeatures[activeFeature].bgColor === "bg-black"
                      ? "bg-white/40 hover:bg-white/60"
                      : "bg-gray-300 hover:bg-gray-400",
                )}
                animate={{
                  scale: index === activeFeature ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                onClick={() => goToFeature(index)}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Visual indicator for scrolling - only show when fully visible and locked */}
      {isFullyVisible && isScrollLocked && !hasCompletedSequence && (
        <motion.div
          className={cn(
            "fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full z-50 backdrop-blur-sm",
            productFeatures[activeFeature].bgColor === "bg-black"
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
    </section>
  )
}

