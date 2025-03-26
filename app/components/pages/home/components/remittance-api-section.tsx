/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

// Bank interface
interface Bank {
  name: string
  logo: string
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  pathD: string
}

export default function RemittanceApiSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Define banks with their positions and path data
  // const banks: Bank[] = [
  //   {
  //     name: "Bank 1",
  //     logo: "/bank-logos/bank1.png",
  //     position: { top: "15%", left: "10%" },
  //     pathD: "M235,480 C150,450 100,350 180,300",
  //   },
  //   {
  //     name: "Bank 2",
  //     logo: "/bank-logos/bank2.png",
  //     position: { top: "30%", left: "5%" },
  //     pathD: "M235,480 C180,450 120,400 180,350",
  //   },
  //   {
  //     name: "Bank 3",
  //     logo: "/bank-logos/bank3.png",
  //     position: { bottom: "30%", left: "5%" },
  //     pathD: "M235,480 C180,510 120,560 180,610",
  //   },
  //   {
  //     name: "Bank 4",
  //     logo: "/bank-logos/bank4.png",
  //     position: { bottom: "15%", left: "10%" },
  //     pathD: "M235,480 C150,510 100,610 180,660",
  //   },
  //   {
  //     name: "Bank 5",
  //     logo: "/bank-logos/bank5.png",
  //     position: { top: "15%", right: "10%" },
  //     pathD: "M725,480 C810,450 860,350 780,300",
  //   },
  //   {
  //     name: "Bank 6",
  //     logo: "/bank-logos/bank6.png",
  //     position: { top: "30%", right: "5%" },
  //     pathD: "M725,480 C780,450 840,400 780,350",
  //   },
  //   {
  //     name: "Bank 7",
  //     logo: "/bank-logos/bank7.png",
  //     position: { bottom: "30%", right: "5%" },
  //     pathD: "M725,480 C780,510 840,560 780,610",
  //   },
  //   {
  //     name: "Bank 8",
  //     logo: "/bank-logos/bank8.png",
  //     position: { bottom: "15%", right: "10%" },
  //     pathD: "M725,480 C810,510 860,610 780,660",
  //   },
  // ]

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const drawPath = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  }

  const popIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + custom * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    }),
  }

  const glowPulse = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0.5, 1, 0.5],
      scale: [0.9, 1.05, 0.9],
      transition: {
        opacity: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
        scale: { repeat: Number.POSITIVE_INFINITY, duration: 3 },
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-2 text-emerald-600"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            STARPAY REMITTANCE API
          </motion.h2>

          <motion.h3
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            ONE GATEWAY FOR ALL BANKS
          </motion.h3>

          <motion.p
            className="text-lg text-gray-600 max-w-4xl mx-auto"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            StarPay&apos;s Remittance API Empowers Businesses In The Remittance Industry With Seamless Access To All Banks In
            Ethiopia Through A Single Integration. Our Solution Simplifies Transaction Processing And Provides A
            Centralized Portal Where Businesses Can Manage All Their Remittance Operations In One Place. With Secure,
            Efficient, And Real- Time Payments, StarPay Makes Cross-Border And Local Money Transfers Easier Than Ever.
          </motion.p>
        </div>

        <div>
          <Image
            src="/branches.png"
            alt="StarPay Remittance API"
            width={1270}
            height={390}
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  )
}

