/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { QrCodeIcon } from "@/lib/svg"
import { Icon } from "@iconify/react"

// Define the feature card interface
interface FeatureCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
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

  // Default cards if none provided
  const defaultCards: FeatureCard[] = [
    {
      id: "multi-channel",
      title: "Multi-Channel Payment",
      description:
        "StarPay allows merchants to request payments through a variety of convenient methods, including QR codes, payment links, OTPs, USSD, and reference codes. This flexibility ensures that merchants can accommodate every customer's preferred payment method, whether online or offline, making the payment process quick and seamless.",
      icon: <QrCodeIcon className="w-11 h-11" />,
      bgGradient: "from-emerald-900 to-emerald-800",
      iconBg: "bg-emerald-700",
    },
    {
      id: "real-time",
      title: "Real-Time Payment Verification",
      description:
        "With StarPay, merchants can instantly verify successful payments through the customer's receipt or success screen. This unique feature ensures transparency, reduces errors, and gives both merchants and customers peace of mind by confirming that the transaction is complete in real-time.",
      icon: <QrCodeIcon className="w-11 h-11" />,
      bgGradient: "from-amber-900 to-amber-800",
      iconBg: "bg-amber-700",
    },
    {
      id: "easy-withdrawal",
      title: "Easy Withdrawal",
      description:
        "Imagine a world where withdrawing your earnings is just a few taps away. With our Easy Withdrawal feature, you can quickly transfer funds to your bank or preferred payment method without complicated processes or long waits. Whether on our mobile app or desktop, just select your preferred withdrawal method, and confirm. It's that simple! Plus, with real-time tracking, you'll always know your transaction status. Enjoy the convenience of Easy Withdrawal!",
      icon: <QrCodeIcon className="w-11 h-11" />,
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
    offset: ["start end", "end start"],
  })

  // Calculate card positions based on scroll
  const card1Y = useTransform(scrollYProgress, [0.1, 0.3], ["0%", "0%"])
  const card2Y = useTransform(scrollYProgress, [0.1, 0.3, 0.5], ["100%", "10%", "10%"])
  const card3Y = useTransform(scrollYProgress, [0.3, 0.5, 0.7], ["100%", "20%", "20%"])

  // Calculate opacity for bottom text
  const bottomTextOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const bottomTextY = useTransform(scrollYProgress, [0.5, 0.7], ["50px", "0px"])

  // Fallback icon component
  const FallbackIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6", className)}>
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

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
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className={cn("text-4xl md:text-5xl font-bold mb-4", textColor)}>{title}</h2>
        <p className={cn("text-lg max-w-3xl mx-auto", textColor === "text-white" ? "text-gray-300" : "text-gray-600")}>
          {subtitle}
        </p>
      </div>

      {/* Cards Container */}
      <div
        ref={cardsContainerRef}
        className="container mx-auto px-4 relative"
        style={{ height: isMobile ? "auto" : "80vh" }}
      >
        {isMobile ? (
          // Mobile view - stacked cards without animation
          <div className="space-y-8">
            {featureCards.map((card, index) => (
              <div
                key={card.id}
                className={cn("rounded-3xl p-8 shadow-xl max-w-3xl mx-auto", `bg-gradient-to-br ${card.bgGradient}`)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={cn("p-4 rounded-full mb-6", card.iconBg || "bg-white/20")}>
                    {card.icon ? (
                    //   <Image
                    //     src={card.icon || "/placeholder.svg"}
                    //     alt={card.title}
                    //     width={40}
                    //     height={40}
                    //     className={cn("w-10 h-10", card.iconColor || "text-white")}
                    //     onError={(e) => {
                    //       const target = e.target as HTMLImageElement
                    //       target.style.display = "none"
                    //       const parent = target.parentElement
                    //       if (parent) {
                    //         const fallback = document.createElement("div")
                    //         fallback.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white">
                    //           <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    //           <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    //           <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    //         </svg>`
                    //         parent.appendChild(fallback)
                    //       }
                    //     }}
                    //   />
                    <>{card.icon}</>
                    ) : (
                      <FallbackIcon className={cn("w-10 h-10", card.iconColor || "text-white")} />
                    )}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{card.title}</h3>
                  <p className="text-white/90 text-lg leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop view - animated stacked cards
          <>
            {/* Card 1 */}
            <motion.div
              className={cn(
                "absolute w-full max-w-3xl left-1/2 -translate-x-1/2 rounded-3xl p-8 shadow-xl z-30",
                `bg-gradient-to-br ${featureCards[0].bgGradient}`,
              )}
              style={{ y: card1Y }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={cn("p-4 rounded-full mb-6", featureCards[0].iconBg || "bg-white/20")}>
                  {featureCards[0].icon ? (
                    <>{featureCards[0].icon}</>
                  ) : (
                    <FallbackIcon className={cn("w-10 h-10", featureCards[0].iconColor || "text-white")} />
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{featureCards[0].title}</h3>
                <p className="text-white/90 text-lg leading-relaxed">{featureCards[0].description}</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className={cn(
                "absolute w-full max-w-3xl left-1/2 -translate-x-1/2 rounded-3xl p-8 shadow-xl z-20",
                `bg-gradient-to-br ${featureCards[1].bgGradient}`,
              )}
              style={{ y: card2Y }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={cn("p-4 rounded-full mb-6", featureCards[1].iconBg || "bg-white/20")}>
                  {featureCards[1].icon ? (
                    <>{featureCards[1].icon}</>
                  ) : (
                    <FallbackIcon className={cn("w-10 h-10", featureCards[1].iconColor || "text-white")} />
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{featureCards[1].title}</h3>
                <p className="text-white/90 text-lg leading-relaxed">{featureCards[1].description}</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className={cn(
                "absolute w-full max-w-3xl left-1/2 -translate-x-1/2 rounded-3xl p-8 shadow-xl z-10",
                `bg-gradient-to-br ${featureCards[2].bgGradient}`,
              )}
              style={{ y: card3Y }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={cn("p-4 rounded-full mb-6", featureCards[2].iconBg || "bg-white/20")}>
                  {featureCards[2].icon ? (
                    <>{featureCards[2].icon}</>
                  ) : (
                    <FallbackIcon className={cn("w-10 h-10", featureCards[2].iconColor || "text-white")} />
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{featureCards[2].title}</h3>
                <p className="text-white/90 text-lg leading-relaxed">{featureCards[2].description}</p>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Bottom Text */}
      <motion.div
        className="container mx-auto px-4 text-center mt-20 md:mt-40"
        style={{
          opacity: isMobile ? 1 : bottomTextOpacity,
          y: isMobile ? 0 : bottomTextY,
        }}
      >
        <h3 className={cn("text-2xl md:text-3xl font-medium mb-2", textColor)}>{bottomTitle}</h3>
        <h2 className={cn("text-3xl md:text-5xl font-bold", textColor)}>{bottomSubtitle}</h2>
      </motion.div>

      {/* Scroll indicator for desktop */}
      {!isMobile && (
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
    </section>
  )
}

