// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Define circle dimensions
const CIRCLES = {
  inner: 735.91,
  middle: 1172.38,
  outer: 1503.55,
};

// Dashboard images for carousel
const DASHBOARD_IMAGES = ["/hero1.png", "/hero1.png", "/hero1.png"];

export default function Intro() {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-rotate dashboard images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % DASHBOARD_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className="relative min-h-screen bg-black overflow-hidden"
      style={{
        backgroundImage: "url('/hero2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute rounded-full bg-green-900/20"
          style={{ width: CIRCLES.outer, height: CIRCLES.outer }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute rounded-full bg-green-700/20"
          style={{ width: CIRCLES.middle, height: CIRCLES.middle }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.5, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute rounded-full bg-green-500/30"
          style={{ width: CIRCLES.inner, height: CIRCLES.inner }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.6, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 md:px-12 backdrop-blur-md bg-black/40">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo2.png"
            alt="StarPay"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/products"
            className="text-white hover:text-green-400 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/features"
            className="text-white hover:text-green-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/developers"
            className="text-white hover:text-green-400 transition-colors"
          >
            Developers
          </Link>
          <Link
            href="/faq"
            className="text-white hover:text-green-400 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/about-us"
            className="text-white hover:text-green-400 transition-colors"
          >
            About us
          </Link>
        </div>

        <Button className="bg-[#008F5F] hover:bg-green-700 text-white rounded-full px-6">
          Become a Merchant <span className="ml-2">→</span>
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-12 px-6 md:px-12 flex flex-col justify-center z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            STARPAY - THE SMARTER WAY
            <br className="md:hidden" />
            <span className="md:ml-2">TO ACCEPT PAYMENTS</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            With StarPay, you can effortlessly send or receive money from any
            bank or digital wallet across Ethiopia, making transactions not only
            convenient but also secure. Whether you&apos;re paying for.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button className="bg-[#008F5F] hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg">
              Explore More
              <motion.span
                className="ml-2 inline-block"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative px-6 md:px-12 pb-32 z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={DASHBOARD_IMAGES[currentImage]}
              alt="Dashboard Preview"
              width={1200}
              height={800}
              className="w-full"
            />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
