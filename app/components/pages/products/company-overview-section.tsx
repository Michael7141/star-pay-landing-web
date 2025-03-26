"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

// Define the shape of each overview item
interface OverviewStep {
  id: string
  topic: string
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  textPosition: "left" | "right"
}

// Company overview steps
const overviewSteps: OverviewStep[] = [
  {
    id: "introduction",
    topic: "Introduction",
    title: "STARPAY",
    subtitle: "THE ULTIMATE PAYMENT GATEWAY",
    description:
      "StarPay is a secure, scalable, and flexible payment gateway designed for seamless transactions. It supports QR payments, payment links, OTP, USSD, and reference-based payments, integrating with local and international banks, wallets, and Mastercard. With real-time verification, instant withdrawals, and a powerful merchant suite, StarPay ensures fast, reliable, and effortless payments for businesses of all sizes.",
    icon: "mdi:magnify",
    color: "emerald",
    textPosition: "right",
  },
  {
    id: "mission",
    topic: "Mission",
    title: "SIMPLIFYING PAYMENTS",
    subtitle: "EMPOWERING BUSINESSES",
    description:
      "At StarPay, our mission is to make digital payments efficient, secure, and accessible for businesses of all sizes. We strive to innovate payment solutions by providing a robust and integrated platform that supports multiple payment methods, including QR, USSD, OTP, and digital wallets. By bridging local and international payment networks, we empower businesses to grow, streamline transactions, and deliver seamless customer experiences.",
    icon: "mdi:target",
    color: "emerald",
    textPosition: "right",
  },
  {
    id: "vision",
    topic: "Vision",
    title: "REDEFINING",
    subtitle: "THE FUTURE OF DIGITAL PAYMENTS",
    description:
      "Our vision is to become the leading payment gateway that connects businesses to a borderless, seamless, and secure payment ecosystem. We aim to revolutionize how money moves between businesses. To accept payments effortlessly, whether locally or globally. By continuously innovating and integrating with emerging financial technologies, StarPay envisions a world where payments are instant, accessible, and frictionless for everyone.",
    icon: "mdi:chart-timeline-variant",
    color: "emerald",
    textPosition: "left",
  },
  {
    id: "value",
    topic: "Value",
    title: "CREATING",
    subtitle: "LASTING FINANCIAL SOLUTIONS",
    description:
      "Our core values center around integrity, innovation, inclusivity, and excellence. We believe in transparent operations, continuous improvement, and creating solutions that address real needs in our community. StarPay is committed to ethical business practices and building trust with all stakeholders.",
    icon: "mdi:diamond-stone",
    color: "emerald",
    textPosition: "right",
  },
  {
    id: "goal",
    topic: "Goal",
    title: "BUILDING",
    subtitle: "INCLUSIVE PAYMENT ECOSYSTEM",
    description:
      "Our goal is to empower businesses with a fast, secure, and scalable payment solution that simplifies transactions and enhances financial accessibility. We strive to integrate more banks, wallets, and digital payment methods to enable businesses to accept payments anytime, anywhere. Through continuous innovation, we aim to make digital payments effortless, withdrawals instant, and financial growth limitless for businesses of all sizes.",
    icon: "mdi:stairs",
    color: "emerald",
    textPosition: "right",
  },
]

const CompanyOverviewSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(0)

  // Calculate the proper height for the sticky container based on the number of steps
  useEffect(() => {
    if (sectionRef.current) {
      // Set the section height to be tall enough to accommodate all transitions
      // Each step takes up 100vh of scroll space
      setSectionHeight(overviewSteps.length * window.innerHeight)
    }
  }, [])

  // Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Update active step based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      // Scale the progress to map to our steps
      const scaledProgress = Math.min(value * overviewSteps.length, overviewSteps.length - 1)
      const newIndex = Math.floor(scaledProgress)

      if (newIndex !== activeStep && newIndex >= 0 && newIndex < overviewSteps.length) {
        setActiveStep(newIndex)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, activeStep])

  return (
    <div ref={sectionRef} className="relative w-full bg-gray-50" style={{ height: `${sectionHeight}px` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            {/* Left sidebar - Navigation */}
            <div className="col-span-2">
              <div className="flex flex-col space-y-8">
                {overviewSteps.map((step, index) => {
                  const isActive = index === activeStep

                  return (
                    <div
                      key={step.id}
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => {
                        // Calculate the scroll position for this step
                        if (sectionRef.current) {
                          const stepHeight = window.innerHeight
                          const sectionTop = sectionRef.current.offsetTop
                          const scrollTo = sectionTop + index * stepHeight + 10
                          window.scrollTo({ top: scrollTo, behavior: "smooth" })
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "w-6 h-0.5 transition-all duration-300",
                          isActive ? "bg-emerald-500 w-10" : "bg-gray-300",
                        )}
                      ></div>
                      <span
                        className={cn(
                          "text-lg font-medium transition-colors duration-300",
                          isActive ? "text-emerald-500" : "text-gray-400",
                        )}
                      >
                        {step.topic}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Main content area - Flexible layout */}
            <div className="col-span-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ContentSection
                    step={overviewSteps[activeStep]}
                    textPosition={overviewSteps[activeStep].textPosition}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ContentSectionProps {
  step: OverviewStep
  textPosition: "left" | "right"
}

const ContentSection: React.FC<ContentSectionProps> = ({ step, textPosition }) => {
  // Determine icon size based on which icon is being displayed
  const getIconSize = (iconName: string) => {
    switch (iconName) {
      case "mdi:magnify":
        return 180
      case "mdi:stairs":
        return 200
      default:
        return 150
    }
  }

  const TextContent = () => (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className={cn("text-5xl font-bold", step.id === "introduction" ? "text-emerald-600" : "text-black")}>
          {step.title}
        </h2>
        <h3
          className={cn(
            "text-5xl font-bold mt-2",
            step.id === "introduction"
              ? "text-black"
              : step.id === "mission" || step.id === "goal"
                ? "text-emerald-600"
                : "text-black",
          )}
        >
          {step.subtitle}
        </h3>
      </div>

      <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">{step.description}</p>
    </div>
  )

  const VisualContent = () => (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          "relative",
          step.id === "vision" ? "grid grid-cols-3 grid-rows-3 gap-4" : "flex justify-center items-center",
        )}
      >
        {step.id === "vision" ? (
          // Grid of shapes for the Vision section
          <>
            {[...Array(9)].map((_, i) => {
              // Skip the center position
              if (i === 4) return <div key={i} className="w-16 h-16 rounded-full bg-gray-500"></div>

              return (
                <div
                  key={i}
                  className={cn("w-16 h-16", i % 2 === 0 ? "bg-gray-300" : "bg-transparent")}
                  style={{
                    clipPath: i % 2 === 0 ? "polygon(50% 0%, 100% 100%, 0% 100%)" : "none",
                    transform: [1, 3, 5, 7].includes(i) ? "rotate(180deg)" : "none",
                  }}
                ></div>
              )
            })}
          </>
        ) : (
          <Icon
            icon={step.icon}
            width={getIconSize(step.icon)}
            height={getIconSize(step.icon)}
            className="text-gray-300"
          />
        )}
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-12 gap-8 items-center">
      {textPosition === "left" ? (
        <>
          <div className="col-span-7">
            <TextContent />
          </div>
          <div className="col-span-5">
            <VisualContent />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-5">
            <VisualContent />
          </div>
          <div className="col-span-7">
            <TextContent />
          </div>
        </>
      )}
    </div>
  )
}

export default CompanyOverviewSection

