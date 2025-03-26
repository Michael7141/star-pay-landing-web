"use client"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FeatureSectionProps {
  id: string
  title: string
  description: string
  phoneImage: string
  phoneWidth: number
  phoneHeight: number
  phoneScale: string
  overlayImage?: string
  overlayWidth?: number
  overlayHeight?: number
  overlayPosition?: "top" | "middle" | "bottom" | "custom"
  overlayCustomPosition?: {
    top?: string
    left?: string
    right?: string
    bottom?: string
    transform?: string
  }
  textPosition: "left" | "right" | "center"
  textPlacement?: "top" | "side" | "bottom" // Where to place text relative to image
  bgColor: string
  textColor: string
  buttonText?: string
  buttonIcon?: string
  iconName?: string
  isActive: boolean
  showOverlay: boolean
  onMouseEnter?: () => void
}

export default function FeatureSection({
  // id,
  title,
  description,
  phoneImage,
  phoneWidth,
  phoneHeight,
  // phoneScale,
  overlayImage,
  overlayWidth,
  overlayHeight,
  overlayPosition = "middle",
  overlayCustomPosition,
  textPosition,
  textPlacement = "side",
  // bgColor,
  textColor,
  buttonText = "Get Started",
  buttonIcon = "tabler:arrow-right",
  iconName = "mdi:credit-card-outline",
  isActive,
  showOverlay,
  onMouseEnter,
}: FeatureSectionProps) {
  // Get overlay position styles based on the specified position
  const getOverlayPositionStyles = () => {
    if (overlayCustomPosition) {
      return overlayCustomPosition
    }

    switch (overlayPosition) {
      case "top":
        return { top: "15%", left: "50%", transform: "translateX(-50%)" }
      case "bottom":
        return { bottom: "15%", left: "50%", transform: "translateX(-50%)" }
      case "middle":
      default:
        return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div
        className={cn(
          "grid grid-cols-1 gap-12",
          textPlacement === "side" ? "md:grid-cols-2 items-center" : "md:grid-cols-1",
          textPosition === "right" && textPlacement === "side" ? "md:flex-row-reverse" : "",
        )}
      >
        {/* Text Content */}
        <div
          className={cn(
            "flex flex-col gap-6",
            textPosition === "center" && "text-center items-center",
            textPlacement === "top" ? "order-0" : textPlacement === "bottom" ? "order-1" : "",
            textPosition === "right" && textPlacement === "side" ? "md:order-2" : "md:order-1",
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-emerald-600 w-16 h-16 rounded-lg flex items-center justify-center"
          >
            <Icon icon={iconName} className="w-8 h-8 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn("text-4xl font-bold", textColor)}
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "text-lg leading-relaxed max-w-xl",
                textColor === "text-white" ? "text-gray-300" : "text-gray-600",
              )}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-3 flex items-center gap-2 w-fit">
              {buttonText}
              <Icon icon={buttonIcon} className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Phone Image with Overlay */}
        <div
          className={cn(
            "flex justify-center items-center",
            textPlacement === "top" ? "order-1" : textPlacement === "bottom" ? "order-0" : "",
            textPosition === "right" && textPlacement === "side" ? "md:order-1" : "md:order-2",
          )}
        >
          <div className="relative" onMouseEnter={onMouseEnter}>
            {/* Base Phone Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
              style={{
                width: `${phoneWidth}px`,
                maxWidth: "100%",
                transformOrigin: "center center",
              }}
            >
              <Image
                src={phoneImage || "/placeholder.svg"}
                alt={title}
                width={phoneWidth}
                height={phoneHeight}
                className="w-full h-auto object-contain"
                priority={isActive}
              />
            </motion.div>

            {/* Overlay Image */}
            <AnimatePresence>
              {showOverlay && overlayImage && (
                <motion.div
                  className="absolute z-20"
                  style={getOverlayPositionStyles()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.5,
                  }}
                >
                  <Image
                    src={overlayImage || "/placeholder.svg"}
                    alt={`${title} Overlay`}
                    width={overlayWidth || 600}
                    height={overlayHeight || 400}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

