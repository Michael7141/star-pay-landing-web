"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function FeaturesPage() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Auto-show features after a delay if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowFeatures(true);
      }
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    setHasInteracted(true);
    setShowFeatures(true);
  };

  // Feature items data
  const featureItems = [
    {
      icon: "mdi:credit-card-outline",
      title: "Pay",
      subtitle: "By Reference",
    },
    {
      icon: "mdi:qrcode",
      title: "Generate",
      subtitle: "QR",
    },
    {
      icon: "mdi:link",
      title: "Link",
      subtitle: "Payments",
    },
    {
      icon: "mdi:file-document-outline",
      title: "Generated",
      subtitle: "Bills",
    },
    {
      icon: "mdi:cash-multiple",
      title: "Money",
      subtitle: "Payouts",
    },
    {
      icon: "mdi:account-outline",
      title: "Cashiers",
      subtitle: "List",
    },
    {
      icon: "mdi:apps",
      title: "Products &",
      subtitle: "Services",
    },
    {
      icon: "mdi:account-group-outline",
      title: "Customers",
      subtitle: "List",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 ">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-3">
              REVOLUTIONIZING FINANCE FOR
              <br />A BETTER TOMORROW, TODAY
            </h1>
            <p className="text-xl text-gray-600">
              Fintech services leverage technology to enhance financial
              <br />
              processes, offering innovative solutions for banking
            </p>
          </div>

          <div className="flex justify-center items-center w-full">
            {/* Interactive Phone Display */}
            <div
              ref={phoneRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
            >
              {/* Base Phone Image */}
              <div className="relative z-10">
                <Image
                  src="/iphone15-first-slide.png"
                  alt="StarPay Mobile App"
                  width={300}
                  height={600}
                  className="relative z-10"
                  priority
                />
              </div>

              {/* Features Grid */}
              <AnimatePresence>
                {showFeatures && (
                  <motion.div
                    className="absolute bottom-[100px] -right-5 transform -translate-x-1/2 z-20 w-[340px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1], // Custom ease curve for a smooth, professional animation
                      delay: 0.2,
                    }}
                  >
                    <div className="bg-white rounded-3xl shadow-xl p-6">
                      <div className="grid grid-cols-4 gap-4">
                        {featureItems.slice(0, 4).map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center text-center"
                          >
                            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                              <Icon
                                icon={item.icon}
                                className="w-5 h-5 text-emerald-600"
                              />
                            </div>
                            <p className="text-xs font-medium text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-800">
                              {item.subtitle}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-4 gap-4 mt-4">
                        {featureItems.slice(4).map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center text-center"
                          >
                            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                              <Icon
                                icon={item.icon}
                                className="w-5 h-5 text-emerald-600"
                              />
                            </div>
                            <p className="text-xs font-medium text-gray-800">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-800">
                              {item.subtitle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interaction Hint */}
              <motion.div
                className="absolute bottom-[-30px] left-0 transform text-center text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: hasInteracted || showFeatures ? 0 : 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Icon
                  icon="mdi:cursor-default-gesture"
                  className="inline-block mr-1 w-5 h-5"
                />
                Hover to explore features
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Powerful Features at Your Fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the comprehensive suite of tools designed to streamline
              your financial operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <Icon icon={item.icon} className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title} {item.subtitle}
                </h3>
                <p className="text-gray-600">
                  {index === 0 &&
                    "Enable customers to make payments using a unique reference code for easy tracking and reconciliation."}
                  {index === 1 &&
                    "Create QR codes for quick and contactless payments, perfect for in-store transactions."}
                  {index === 2 &&
                    "Share payment links via SMS, email, or social media for remote transactions."}
                  {index === 3 &&
                    "Access and manage all your generated bills in one place for better organization."}
                  {index === 4 &&
                    "Process payouts to vendors, employees, or partners with ease and security."}
                  {index === 5 &&
                    "Manage your team of cashiers and their permissions for better control."}
                  {index === 6 &&
                    "Organize your product catalog and service offerings for streamlined operations."}
                  {index === 7 &&
                    "Keep track of your customers and their transaction history for improved service."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
