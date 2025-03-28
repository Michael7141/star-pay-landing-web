"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from "@/lib/utils";

// Define the shape of each step item
interface PaymentStep {
  id: string;
  title: string;
  description: string;
  image: string;
  fallbackImage: string;
}

// Payment process steps based on the image
const paymentSteps: PaymentStep[] = [
  {
    id: "step1",
    title: "01. Initiate Your Bill",
    description: "Start the payment process by initiating your bill in just a few taps.",
    image: "/device1.png",
    fallbackImage: "/placeholder.svg"
  },
  {
    id: "step2",
    title: "02. Choose Payment Options",
    description: "Select from various secure payment methods that work best for you.",
    image: "/iphone15.png",
    fallbackImage: "/placeholder.svg"
  },
  {
    id: "step3",
    title: "03. Receive Your Payment",
    description: "Instantly receive payments directly to your account.",
    image: "/iphone15-first-slide.png",
    fallbackImage: "/placeholder.svg"
  },
  {
    id: "step4",
    title: "04. Enter Your Customer Info.",
    description: "Provide customer details for a personalized payment experience.",
    image: "/iphone15.png",
    fallbackImage: "/placeholder.svg"
  },
  {
    id: "step5",
    title: "05. Wait for Seconds",
    description: "The system processes your request in just seconds.",
    image: "/iphone15.png",
    fallbackImage: "/placeholder.svg"
  },
  {
    id: "step6",
    title: "06. Verify Your Payment",
    description: "Confirm and complete your transaction securely.",
    image: "/iphone15.png",
    fallbackImage: "/placeholder.svg"
  },
];

const PaymentProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  
  // Calculate the proper height for the sticky container based on the number of steps
  useEffect(() => {
    if (sectionRef.current) {
      // Set the section height to be tall enough to accommodate all transitions
      // Each step takes up 100vh of scroll space
      setSectionHeight(paymentSteps.length * window.innerHeight);
    }
  }, []);
  
  // Set up scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Update active step based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(value => {
      // Scale the progress to map to our steps
      const scaledProgress = Math.min(value * paymentSteps.length, paymentSteps.length - 1);
      const newIndex = Math.floor(scaledProgress);
      
      if (newIndex !== activeStep && newIndex >= 0 && newIndex < paymentSteps.length) {
        setActiveStep(newIndex);
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, activeStep]);
  
  return (
    <div 
      ref={sectionRef} 
      className="relative w-full bg-white"
      style={{ height: `${sectionHeight}px` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden py-16">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
              EASY WAY TO REQUEST & RECEIVE MONEY
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left side - Steps list */}
            <div className="md:col-span-4">
              <div className="flex flex-col space-y-8">
                {paymentSteps.map((step, index) => {
                  const isActive = index === activeStep;
                  
                  return (
                    <div 
                      key={step.id}
                      className="flex items-start group"
                    >
                      <motion.div
                        className={cn(
                          "transition-all duration-700",
                          isActive ? "text-gray-800" : "text-gray-400"
                        )}
                        animate={{
                          x: isActive ? 10 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className={cn(
                          "text-lg md:text-xl font-bold mb-1 transition-colors duration-500",
                          isActive ? "text-gray-800" : "text-gray-400"
                        )}>
                          {step.title}
                        </h3>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Middle - Phone UI */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-64 md:w-72">
                {/* Phone frame */}
                <div className="relative z-10">
                  <Image
                    src="/iphone15.png"
                    alt="Phone"
                    width={300}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                
                {/* Phone screen content */}
                <div className="absolute top-[12%] left-[8%] right-[8%] bottom-[12%] z-0 overflow-hidden rounded-3xl bg-emerald-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={paymentSteps[activeStep].image || paymentSteps[activeStep].fallbackImage || "/placeholder.svg"}
                        alt={paymentSteps[activeStep].title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = paymentSteps[activeStep].fallbackImage || "/placeholder.svg";
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
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='100' viewBox='0 0 400 100'%3E%3Cpath d='M20,20 L380,20 L350,80 L50,80 Z' fill='%23555555'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Right side - Description */}
            <div className="md:col-span-4">
              <div className="h-full flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-4">
                    Fast way to Request Payment
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    StarPay makes payment requests quick and easy. Merchants can select from various secure options: Pay by USSD for offline customers, Pay by OTP for security, Pay by Reference for repeat transactions, QR Code Payments for contactless transactions, and Pay by Link to share payment links via SMS or email. With additional flexible methods, StarPay ensures a seamless experience for both merchants and customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessSection;