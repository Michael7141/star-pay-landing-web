"use client";

import type React from "react";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";
import {
  LinkIcon,
  OTPIcon,
  QrCodeIcon,
  ReferenceIcon,
  USSDIcon,
} from "@/lib/svg";

// Payment method types
interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  icon: string | React.ReactNode;
  deviceImage?: string;
  screenContent: string;
}

export default function GenerateBillSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeMethod, setActiveMethod] = useState("qr");

  // Define payment methods with their respective device and screen content
  const paymentMethods: PaymentMethod[] = [
    {
      id: "qr",
      title: "QR Payment",
      description:
        "Merchants can easily generate a QR code that customers scan to make payments instantly. It's a fast, contactless method that enhances in-store transactions, allowing for quick payment with just a smartphone.",
      deviceImage: "/device1.png",
      screenContent: "/device1.png",
      icon: <QrCodeIcon className="w-11 h-11" />,
    },
    {
      id: "link",
      title: "Link Payment",
      description:
        "Merchants can create a custom payment link and share it with customers via SMS, email, or social media. Customers can click on the link, make a secure payment, and complete their transaction quickly from anywhere.",
      deviceImage: "/iphone15.png",
      screenContent: "/iphone15.png",
      icon: <LinkIcon className="w-11 h-11" />,
    },
    {
      id: "reference",
      title: "Pay by Reference",
      description:
        "Merchants can generate a unique reference code for the transaction. Customers use this code to complete their payment, providing a simple and efficient way for repeat or bulk payments.",
      deviceImage: "/iphone15.png",
      screenContent: "/iphone15.png",
      icon: <ReferenceIcon className="w-11 h-11" />,
    },
    {
      id: "otp",
      title: "Pay by OTP",
      description:
        "For added security, merchants can send a one-time password (OTP) directly to the customer's phone. The customer enters the OTP to verify and complete the payment, ensuring a secure transaction process.",
      deviceImage: "/device1.png",
      screenContent: "/iphone15.png",
      icon: <OTPIcon className="w-11 h-11" />,
    },
    {
      id: "ussd",
      title: "Pay by USSD",
      description:
        "Merchants can provide customers with a USSD code to complete payments without requiring internet access. This is a reliable option for customers with basic phones or in areas with low connectivity.",
      deviceImage: "/device1.png",
      screenContent: "/iphone15.png",
      icon: <USSDIcon className="w-11 h-11" />,
    },
  ];

  // Get the current active payment method
  const activePaymentMethod =
    paymentMethods.find((method) => method.id === activeMethod) ||
    paymentMethods[0];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-[#5D5D5D]"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          GENERATE BILL &
        </motion.h2>
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-[#5D5D5D] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          RECEIVE PAYMENTS
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center rounded-xl overflow-hidden">
          {/* Left side - Payment methods */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                variants={itemVariants}
                className={`backdrop-blur-sm p-6 flex gap-4 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  activeMethod === method.id ? "bg-[#E6FFF7] shadow-md" : ""
                }`}
                onClick={() => setActiveMethod(method.id)}
              >
                {typeof method.icon === "string" ? (
                  <Icon
                    icon={method.icon}
                    className="h-11 w-11 text-primary justify-items-start place-self-start"
                  />
                ) : (
                  <div className="justify-items-start place-self-start h-11 w-11">
                    {method.icon}
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold  mb-2">
                    {method.title}
                  </h3>
                  <p className="text-[#6D6D6D]">{method.description}</p>
                </div>
                <div>
                  <div className="flex flex-col flex-grow h-full justify-center items-center flex-1">
                    <ChevronRight className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Phone with payment method image */}
          <div className="bg-[#F5F5F5] w-full h-full flex flex-col justify-center">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="relative w-64 md:w-72">
                {/* Phone frame */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`device-${activeMethod}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                  >
                    <Image
                      src={
                        activePaymentMethod.deviceImage || "/placeholder.svg"
                      }
                      alt="Phone"
                      width={300}
                      height={600}
                      className="w-full h-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/iphone15.png";
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Phone screen content */}

                {/* Stone base */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full">
                  <Image
                    src="/bg.png"
                    alt="Stone Base"
                    width={1600}
                    height={1600}
                    className="w-full h-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Create a gray stone-like shape as fallback
                      target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='100' viewBox='0 0 400 100'%3E%3Cpath d='M20,20 L380,20 L350,80 L50,80 Z' fill='%23555555'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
