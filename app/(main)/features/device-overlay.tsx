"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type React from "react"

// TypeScript interfaces for props
interface DeviceOverlayProps {
  // Layout options
  layout?: "deviceLeft" | "deviceRight" | "deviceTop" | "deviceBottom"

  // Device image options
  deviceImage: string
  deviceWidth?: number
  deviceHeight?: number
  deviceAlt?: string

  // Overlay options
  overlayContent?: React.ReactNode
  overlayImage?: string
  overlayWidth?: number
  overlayHeight?: number
  overlayAlt?: string

  // Positioning options - fully customizable
  overlayPosition?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
    transform?: string
  }

  // Text content options
  title?: string
  description?: string
  buttonText?: string
  iconComponent?: React.ReactNode

  // Container options
  containerClassName?: string
  maxWidth?: string

  // Animation options
  animate?: boolean
  direction?: "left" | "right"
  delay?: number
}

export default function DeviceOverlay({
  // Default values for props
  layout = "deviceLeft",
  deviceImage,
  deviceWidth = 452,
  deviceHeight = 940,
  deviceAlt = "Device mockup",
  overlayContent,
  overlayImage,
  overlayWidth = 500,
  overlayHeight = 145,
  overlayAlt = "Overlay UI",
  // overlayPosition = {
  //   bottom: "100px",
  //   left: "50%",
  //   transform: "translateX(-50%)",
  // },
  title = "SELECT YOUR SERVICE",
  description = "QR Payment is an innovative solution that enables you to conduct quick and secure transactions by effortlessly scanning a unique code with your smartphone. This modern payment method eliminates the need for cash or cards, making it a hassle-free way to pay for a wide range of goods and services.",
  buttonText = "Get Started",
  iconComponent,
  containerClassName = "",
  maxWidth = "6xl",
  animate = true,
  direction = "right",
  delay = 0,
}: DeviceOverlayProps) {
  // Device section with overlay
  const deviceSection = (
    <motion.div
      className="relative"
      initial={animate ? { opacity: 0, x: direction === "right" ? -50 : 50 } : {}}
      animate={{ opacity: 1, x: 0 }}
      exit={animate ? { opacity: 0, x: direction === "right" ? 50 : -50 } : {}}
      transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeInOut" }}
    >
      {/* Device Image */}
      <div className="relative">
        <Image
          src={deviceImage || "/placeholder.svg"}
          alt={deviceAlt}
          width={deviceWidth}
          height={deviceHeight}
          className="z-0"
        />
      </div>

      {/* Overlay - positioned on top of the device */}
      <motion.div
        className="absolute top-[50px] -left-[50px] transform -translate-x-1/2 z-10 w-[500px] rounded-xl shadow-lg"
        style={{
          // width: `${overlayWidth}px`,
          // ...overlayPosition,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 1.8, delay: delay + 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {overlayImage ? (
          <Image
            src={overlayImage || "/placeholder.svg"}
            alt={overlayAlt}
            width={overlayWidth}
            height={overlayHeight}
            className="w-full h-auto"
          />
        ) : overlayContent ? (
          overlayContent
        ) : (
          <div className="p-4 bg-white">
            <h3 className="font-medium mb-2">Service Name (Optional)</h3>
            <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
              <span className="text-gray-400">Select Service Name</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )

  // Text content section
  const textSection = (
    <motion.div
      className="max-w-md"
      initial={animate ? { opacity: 0, y: 20 } : {}}
      animate={{ opacity: 1, y: 0 }}
      exit={animate ? { opacity: 0, y: 20 } : {}}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={animate ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        {iconComponent || (
          <div className="w-12 h-12 bg-emerald-600 rounded-md flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2" />
              <path d="M3 10H21" stroke="white" strokeWidth="2" />
              <path d="M7 15H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </motion.div>

      <motion.h2
        className="text-3xl font-bold mb-4"
        initial={animate ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
      >
        {title}
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-6"
        initial={animate ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {description}
      </motion.p>

      <motion.button
        className="px-6 py-3 bg-emerald-600 text-white rounded-md flex items-center"
        initial={animate ? { opacity: 0, y: 20 } : {}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      >
        {buttonText}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </motion.div>
  )

  // Determine if layout is horizontal or vertical
  const isHorizontal = layout === "deviceLeft" || layout === "deviceRight"

  return (
    <div className={`flex items-center justify-center min-h-screen p-20 w-full ${containerClassName}`}>
      <div
        className={`flex flex-col items-center justify-between max-w-${maxWidth} w-full ${isHorizontal ? "md:flex-row" : ""}`}
      >
        {layout === "deviceLeft" && (
          <>
            {deviceSection}
            {textSection}
          </>
        )}

        {layout === "deviceRight" && (
          <>
            {textSection}
            {deviceSection}
          </>
        )}

        {/* {layout === "deviceTop" && (
          <>
            {deviceSection}
            {textSection}
          </>
        )}

        {layout === "deviceBottom" && (
          <>
            {textSection}
            {deviceSection}
          </>
        )} */}
      </div>
    </div>
  )
}

