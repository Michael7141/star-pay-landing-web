/* eslint-disable @typescript-eslint/no-unused-vars */
//Hero section center works perfectly except the circle radial bg effect thingy
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the dashboard images for the carousel
const dashboardImages = [
  {
    id: 1,
    src: "/explore-more-dash.png",
    alt: "StarPay Dashboard - Overview",
    width: 900,
    height: 600,
  },
  {
    id: 2,
    src: "/phone.png",
    alt: "StarPay Dashboard - Features",
    width: 364,
    height: 756,
  },
  {
    id: 3,
    src: "/iphone15.png",
    alt: "StarPay Dashboard - Analytics",
    width: 364,
    height: 756,
  },
  {
    id: 4,
    src: "/device1.png",
    alt: "StarPay Dashboard - Merchant View",
    width: 364,
    height: 756,
  },
  {
    id: 5,
    src: "/features-second-page-below.png",
    alt: "StarPay Dashboard - Full Interface",
    width: 364,
    height: 756,
  },
];

export default function HeroSection() {
  const [showFullDashboard, setShowFullDashboard] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle the "Explore More" button click
  const handleExploreClick = () => {
    setShowFullDashboard(true);

    // Scroll to the dashboard section
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Start auto-playing the carousel
    setIsAutoPlaying(true);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % dashboardImages.length);
      }, 3000); // Change image every 3 seconds
    } else if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    setActiveImageIndex(index);
    // Reset auto-play timer when manually navigating
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % dashboardImages.length);
      }, 3000);
    }
  };

  // Function to pause/resume auto-play
  const _toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  return (
    <section
      className="relative min-h-screen bg-[#0a1a1a] text-white overflow-hidden pt-16"
      style={{
        backgroundImage: `url('/landing-page-time-lapse-bg2.png')`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-20 pb-10 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            STARPAY - THE SMARTER WAY
            <br />
            TO ACCEPT PAYMENTS
          </motion.h1>

          <motion.p
            className="text-white/70 text-lg max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            With StarPay, you can effortlessly send or receive money from any
            bank or digital wallet across Ethiopia, making transactions not only
            convenient but also secure. Whether you&apos;re paying for...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={handleExploreClick}
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-6 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Explore More{" "}
                <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
              </span>
              <span className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Preview Section */}
      <div
        ref={dashboardRef}
        className={`relative z-10 transition-all duration-700 ease-in-out ${
          showFullDashboard ? "mt-0 min-h-screen flex items-center" : "mt-16"
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Dashboard Image Carousel */}
          <div
            className={`relative mx-auto rounded-xl shadow-2xl overflow-hidden transition-all duration-700 ${
              showFullDashboard ? "w-fit" : "w-full max-w-4xl h-[330px]"
            }`}
          >
            {/* Gradient overlay for partial view */}
            {!showFullDashboard && (
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1a1a] to-transparent z-20"></div>
            )}

            {/* Image Carousel */}
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex justify-center"
                  style={{
                    width: "100%",
                    height: showFullDashboard ? "auto" : "330px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={
                      dashboardImages[activeImageIndex].src ||
                      "/placeholder.svg"
                    }
                    alt={dashboardImages[activeImageIndex].alt}
                    width={dashboardImages[activeImageIndex].width}
                    height={dashboardImages[activeImageIndex].height}
                    className={`w-full ${
                      !showFullDashboard ? "object-cover" : "object-cover"
                    }`}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* Carousel Controls - Only visible when full dashboard is shown */}
          {showFullDashboard && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-30">
              <button
                onClick={() =>
                  goToSlide(
                    (activeImageIndex - 1 + dashboardImages.length) %
                      dashboardImages.length
                  )
                }
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md p-2 transition-colors"
                aria-label="Previous slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {dashboardImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeImageIndex
                        ? "w-8 bg-emerald-500"
                        : "w-4 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  goToSlide((activeImageIndex + 1) % dashboardImages.length)
                }
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md p-2 transition-colors"
                aria-label="Next slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* <button
                onClick={toggleAutoPlay}
                className={`ml-4 rounded-full p-2 transition-colors ${
                  isAutoPlaying
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                    : "bg-white/20 hover:bg-white/30 text-white"
                }`}
                aria-label={
                  isAutoPlaying ? "Pause slideshow" : "Play slideshow"
                }
              >
                {isAutoPlaying ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 9H6V15H10V9Z" fill="currentColor" />
                    <path d="M18 9H14V15H18V9Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                  </svg>
                )}
              </button> */}
            </div>
          )}
        </div>
      </div>

      {/* Background circular gradient effect */}
      {/* <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div> */}
    </section>
  );
}
