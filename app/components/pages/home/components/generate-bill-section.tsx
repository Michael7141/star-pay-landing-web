"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

// Payment method types
interface PaymentMethod {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  screenContent: string
}

export default function GenerateBillSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeMethod, setActiveMethod] = useState("qr")

  // Define payment methods with their respective screen content
  const paymentMethods: PaymentMethod[] = [
    {
      id: "qr",
      title: "QR Payment",
      description:
        "Merchants can easily generate a QR code that customers scan to make payments instantly. It's a fast, contactless method that enhances in-store transactions, allowing for quick payment with just a smartphone.",
      screenContent: "/iphone15.png",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="12" height="12" rx="2" stroke="#0D9F6F" strokeWidth="2" />
          <rect x="4" y="24" width="12" height="12" rx="2" stroke="#0D9F6F" strokeWidth="2" />
          <rect x="24" y="4" width="12" height="12" rx="2" stroke="#0D9F6F" strokeWidth="2" />
          <path d="M24 24H28V28H24V24Z" fill="#0D9F6F" />
          <path d="M32 24H36V28H32V24Z" fill="#0D9F6F" />
          <path d="M24 32H28V36H24V32Z" fill="#0D9F6F" />
          <path d="M32 32H36V36H32V32Z" fill="#0D9F6F" />
        </svg>
      ),
    },
    {
      id: "link",
      title: "Link Payment",
      description:
        "Merchants can create a custom payment link and share it with customers via SMS, email, or social media. Customers can click on the link, make a secure payment, and complete their transaction quickly from anywhere.",
      screenContent: "/iphone15.png",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.6667 20C16.6667 17.0667 19.0667 14.6667 22 14.6667H28.6667C31.6 14.6667 34 17.0667 34 20C34 22.9333 31.6 25.3333 28.6667 25.3333H22C19.0667 25.3333 16.6667 22.9333 16.6667 20Z"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 20C22 22.9333 19.6 25.3333 16.6667 25.3333H10C7.06667 25.3333 4.66667 22.9333 4.66667 20C4.66667 17.0667 7.06667 14.6667 10 14.6667H16.6667C19.6 14.6667 22 17.0667 22 20Z"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "reference",
      title: "Pay by Reference",
      description:
        "Merchants can generate a unique reference code for the transaction. Customers use this code to complete their payment, providing a simple and efficient way for repeat or bulk payments.",
      screenContent: "/iphone15.png",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.3333 13.3333V26.6667C33.3333 31.6667 31.6667 33.3333 26.6667 33.3333H13.3333C8.33333 33.3333 6.66667 31.6667 6.66667 26.6667V13.3333C6.66667 8.33333 8.33333 6.66667 13.3333 6.66667H26.6667C31.6667 6.66667 33.3333 8.33333 33.3333 13.3333Z"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.3333 11.6667H16.6667C15 11.6667 13.6667 13 13.6667 14.6667V18.3333C13.6667 20 15 21.3333 16.6667 21.3333H23.3333C25 21.3333 26.3333 20 26.3333 18.3333V14.6667C26.3333 13 25 11.6667 23.3333 11.6667Z"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3333 26.6667H26.6667"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "otp",
      title: "Pay by OTP",
      description:
        "For added security, merchants can send a one-time password (OTP) directly to the customer's phone. The customer enters the OTP to verify and complete the payment, ensuring a secure transaction process.",
      screenContent: "/iphone15.png",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.3333 13.3333V26.6667C33.3333 31.6667 31.6667 33.3333 26.6667 33.3333H13.3333C8.33333 33.3333 6.66667 31.6667 6.66667 26.6667V13.3333C6.66667 8.33333 8.33333 6.66667 13.3333 6.66667H26.6667C31.6667 6.66667 33.3333 8.33333 33.3333 13.3333Z"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 21.3333C21.841 21.3333 23.3333 19.841 23.3333 18C23.3333 16.159 21.841 14.6667 20 14.6667C18.159 14.6667 16.6667 16.159 16.6667 18C16.6667 19.841 18.159 21.3333 20 21.3333Z"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.6667 26.6667C26.6667 23.9 23.6833 21.6667 20 21.6667C16.3167 21.6667 13.3333 23.9 13.3333 26.6667"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "ussd",
      title: "Pay by USSD",
      description:
        "Merchants can provide customers with a USSD code to complete payments without requiring internet access. This is a reliable option for customers with basic phones or in areas with low connectivity.",
      screenContent: "/iphone15.png",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26.6667 6.66667H13.3333C10 6.66667 6.66667 8.33333 6.66667 13.3333V26.6667C6.66667 31.6667 10 33.3333 13.3333 33.3333H26.6667C30 33.3333 33.3333 31.6667 33.3333 26.6667V13.3333C33.3333 8.33333 30 6.66667 26.6667 6.66667Z"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3333 16.6667V23.3333"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M20 16.6667V23.3333" stroke="#0D9F6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M26.6667 16.6667V23.3333"
            stroke="#0D9F6F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  // Get the current active payment method
  const activePaymentMethod = paymentMethods.find((method) => method.id === activeMethod) || paymentMethods[0]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          GENERATE BILL & 
          RECEIVE PAYMENTS
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Payment methods */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                variants={itemVariants}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  activeMethod === method.id ? "border-l-4 border-emerald-500 bg-white shadow-md" : ""
                }`}
                onClick={() => setActiveMethod(method.id)}
              >
                <div className="flex-shrink-0 mt-1">{method.icon}</div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
                <div
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-opacity ${
                    activeMethod === method.id ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <ChevronRight className="h-6 w-6 text-emerald-600" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Phone with payment method image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-64 md:w-72">
              {/* Phone frame */}
              <div className="relative z-10">
                <Image
                  src="/iphone15.png"
                  alt="Phone"
                  width={300}
                  height={600}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/iphone15.png"
                  }}
                />
              </div>

              {/* Phone screen content */}
              <div className="absolute top-[12%] left-[8%] right-[8%] bottom-[12%] z-0 overflow-hidden rounded-3xl bg-emerald-700">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMethod}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={activePaymentMethod.screenContent || "/placeholder.svg"}
                      alt={activePaymentMethod.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src =
                          "/iphone15.png"
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Stone base */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full">
                <Image
                  src="/bg.png"
                  alt="Stone Base"
                  width={400}
                  height={100}
                  className="w-full h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    // Create a gray stone-like shape as fallback
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='100' viewBox='0 0 400 100'%3E%3Cpath d='M20,20 L380,20 L350,80 L50,80 Z' fill='%23555555'/%3E%3C/svg%3E"
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

