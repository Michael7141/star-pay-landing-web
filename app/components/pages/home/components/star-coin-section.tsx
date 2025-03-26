"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"

export default function StarCoinSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden text-white"
      style={{
        backgroundImage: `url('/blurry-green-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-2 text-emerald-500"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            STAR-COIN
          </motion.h2>

          <motion.h3
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            THE LOYALTY COIN
          </motion.h3>

          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Star-Coin Lets Merchants And Banks Reward Customers For Every Payment. Customers Can Earn And Redeem Coins
            For Discounts, Special Offers, And Exclusive Perks. Boost Loyalty, Increase Engagement, And Drive Repeat
            Business Effortlessly!
          </motion.p>
        </div>

        {/* Video placeholder - this would be replaced with an actual video component */}
        <motion.div
          className="relative w-full max-w-3xl mx-auto my-20 aspect-video rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* This div would be replaced with a video player */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Video placeholder with play button */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Placeholder for the video - this is where you would add your video component */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors mx-auto mb-4">
                  <Icon icon="lucide:play" className="w-10 h-10 text-white" />
                </div>
                <p className="text-white/70 text-sm">Click to play Star-Coin video</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          className="text-center mt-16"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-xl text-gray-400 mb-2">EVERY CUSTOMER</h4>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">DESERVES TO BE REWARDED</h3>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md px-6 py-6 h-auto">
            Learn More About Star-Coin <Icon icon="lucide:arrow-right" className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

