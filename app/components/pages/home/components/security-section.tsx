"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"

const SecuritySection: React.FC = () => {
  const [lockState, setLockState] = useState<"unlocked" | "locked">("unlocked")
  const [showContent, setShowContent] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Set up intersection observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section becomes visible
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3, // Trigger when 30% of the section is visible
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  // Start animation sequence only after section becomes visible
  useEffect(() => {
    if (!isVisible) return

    // Start with unlocked state, then transition to locked after delay
    const lockTimer = setTimeout(() => {
      setLockState("locked")
    }, 1500)

    // Show content after lock animation
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 2500)

    return () => {
      clearTimeout(lockTimer)
      clearTimeout(contentTimer)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 flex flex-col items-center justify-center overflow-hidden min-h-screen">
      <div className="relative mb-6">
        <AnimatePresence mode="wait">
          {lockState === "unlocked" ? (
            <motion.div
              key="unlocked"
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.5 },
              }}
              className="flex justify-center"
            >
              <Icon icon="heroicons:lock-open-solid" className="w-20 h-20 text-emerald-600" />
            </motion.div>
          ) : (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                },
              }}
              className="flex justify-center"
            >
              <Icon icon="heroicons:lock-closed-solid" className="w-20 h-20 text-emerald-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: lockState === "locked" ? 1 : 0,
          y: lockState === "locked" ? 0 : 10,
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-6xl font-bold">
          SECURITY
          <br />
          IS EVERYTHING
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 30,
        }}
        transition={{
          duration: 0.8,
        }}
        className="w-full max-w-6xl mx-auto bg-gray-100 rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `url('/hand-holding-watch-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-10 md:p-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <p className="text-gray-600 leading-relaxed">
              Enjoy quick transactions with our payment gateway in Ethiopia! Access your funds easily from any bank or
              digital wallet, anytime. Experience instant payments and a secure, user-friendly interface. Join our happy
              users and step into the future of digital finance!
            </p>
          </div>

          <div className="md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="w-[300px] h-[300px]">
              </div>
            </div>
          </div>

          <div className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-gray-600 leading-relaxed">
              Experience quick transactions with our payment gateway in Ethiopia! Access your funds securely from any
              bank or wallet, anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SecuritySection

