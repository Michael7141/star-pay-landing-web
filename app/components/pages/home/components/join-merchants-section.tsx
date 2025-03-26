"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export default function JoinMerchantsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const scaleIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-gray-800 overflow-hidden py-20"
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="relative w-[1185px] h-[1185px]">
          {/* Outer circle - 1185px */}
          <motion.div
            className="absolute top-0 left-0 w-[1185px] h-[1185px] rounded-full border border-gray-200"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Middle circle - 924px */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[924px] h-[924px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          />

          {/* Inner circle - 580px */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[580px] h-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          {/* Top icon (bank) - outer orbit */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 -translate-y-1/2"
            custom={0.2}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
              <Icon icon="hugeicons:bank" className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Right icon (coins) - outer orbit */}
          <motion.div
            className="absolute top-1/2 -right-8 translate-x-1/2 -translate-y-1/2"
            custom={0.3}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
              <Icon icon="lucide:coins" className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Bottom icon (phone) - outer orbit */}
          <motion.div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 translate-y-1/2"
            custom={0.4}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
            <Icon icon="hugeicons:bank" className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-2/3 left-6 -translate-x-1/2 -translate-y-1/2"
            custom={0.5}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
              <Icon icon="ep:coin" className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Top-right phone - middle orbit */}
          <motion.div
            className="absolute top-[300px] right-[160px]"
            custom={0.6}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
              <Icon
                icon="solar:graph-new-linear"
                className="w-10 h-10 text-white"
              />
            </div>
          </motion.div>

          {/* Bottom-right phone - middle orbit */}
          <motion.div
            className="absolute bottom-[130px] right-[130px]"
            custom={0.7}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
              <Icon
                icon="solar:graph-new-linear"
                className="w-10 h-10 text-white"
              />
            </div>
          </motion.div>

          {/* Bottom-right phone - middle orbit */}
          <motion.div
            className="absolute bottom-[235px] right-[235px]"
            custom={0.7}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
              <Icon
                icon="solar:graph-new-linear"
                className="w-10 h-10 text-white"
              />
            </div>
          </motion.div>

          {/* Bottom-left phone - middle orbit */}
          <motion.div
            className="absolute bottom-[130px] left-[130px]"
            custom={0.8}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
            <Icon icon="solar:shop-linear" className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Top-left chart - middle orbit */}
          <motion.div
            className="absolute top-[230px] left-[230px]"
            custom={0.9}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
              <Icon
                icon="solar:graph-new-linear"
                className="w-10 h-10 text-white"
              />
            </div>
          </motion.div>

          {/* Central content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] flex flex-col items-center justify-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center"
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              JOIN TODAY&apos;S MERCHANTS
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 mb-8 text-center"
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
            >
              Join StarPay as a merchant and unlock endless payment
              possibilities! Register today to start accepting payments from any
              bank or wallet throughout Ethiopia, making transactions smoother
              and more convenient for your customers.
            </motion.p>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md px-6 py-3 h-auto">
                Register as Merchant
                <Icon icon="lucide:arrow-right" className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
