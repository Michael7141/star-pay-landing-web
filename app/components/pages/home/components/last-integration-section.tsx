"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"

export default function LastIntegrationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden text-white"
      style={{
        backgroundImage: `url('/electric-grid-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay to darken the background */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            THE LAST PAYMENTS
            <br />
            INTEGRATION YOU&apos;LL NEED
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A Comprehensive And Detailed Guide To Effortlessly Integrating With The Gateway API, Covering All The
            Essential Steps, Best Practices, And Tips To Ensure A Smooth And Successful Implementation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-6 py-6 h-auto">
              Explore Doc <Icon icon="lucide:arrow-right" className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
          {/* Left side - Code snippets */}
          <motion.div variants={fadeIn} initial="hidden" animate={isInView ? "visible" : "hidden"} className="relative">
            <div className="relative">
              {/* Main code block */}
              <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-700">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-500 text-xs text-white px-2 py-1 rounded-md">Code-Geek</div>
                </div>
                <pre className="text-xs md:text-sm text-gray-300 overflow-x-auto">
                  <code>
                    {`<?php
require_once 'vendor/autoload.php';

use GuzzleHttp as GuzzleClient;
use Summarizer\\Summarizer;
use Summarizer\\Strategy\\BasicSummarizerStrategy;

function summarize_article($url) {
  // Initialize a Guzzle client to extract the main article text
  $guzzle = new GuzzleClient();
  $article = $guzzle->getArticleContent($url);
  $content = $article->getMainArticleText();
  
  // Initialize a Sumy summarizer and use the basic strategy
  $summarizer = new Summarizer(new BasicSummarizerStrategy());
  $summary = $summarizer->summarize($content, 5);
  
  // Return the summarized text
  return $summary;
}`}
                  </code>
                </pre>
              </div>

              {/* Secondary code block */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/4 bg-[#1e1e1e]/80 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-700 w-3/4 z-10">
                <div className="flex items-center mb-2">
                  <div className="bg-emerald-500 text-xs text-white px-2 py-1 rounded-md">Code-Geek</div>
                </div>
                <pre className="text-xs text-gray-300 overflow-x-auto">
                  <code>
                    {`<?php
require_once 'vendor/autoload.php';

use GuzzleHttp as GuzzleClient;
use Summarizer\\Summarizer;

function summarize_article($url) {
  // Initialize a Guzzle client to extract the main article text
  $guzzle = new GuzzleClient();
  $article = $guzzle->getArticleContent($url);
  $content = $article->getMainArticleText();
}`}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Right side - Phone mockup */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative max-w-[300px]">
              <div className="relative z-10 bg-black rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl">
                <div className="bg-black px-2 pt-2 pb-1 flex items-center justify-between">
                  <div className="text-white text-xs">2:20</div>
                  <div className="flex items-center space-x-1">
                    <Icon icon="lucide:wifi" className="w-3 h-3 text-white" />
                    <Icon icon="lucide:battery-full" className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="bg-gray-900 p-4">
                  <div className="text-center mb-4">
                    <p className="text-gray-400 text-sm">Scan My QR</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-xs mb-1">Cashier Code</p>
                    <p className="text-emerald-500 text-lg font-mono mb-2">348509348503</p>
                    <div className="bg-white p-4 rounded-md mb-2">
                      <Image
                        src="/qr-code.png"
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="w-full h-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='white'/%3E%3Cpath d='M50,50 L90,50 L90,90 L50,90 Z M60,60 L80,60 L80,80 L60,80 Z M110,50 L150,50 L150,90 L110,90 Z M120,60 L140,60 L140,80 L120,80 Z M50,110 L90,110 L90,150 L50,150 Z M60,120 L80,120 L80,140 L60,140 Z M110,110 L110,120 L120,120 L120,130 L110,130 L110,150 L120,150 L120,140 L130,140 L130,150 L150,150 L150,130 L140,130 L140,120 L150,120 L150,110 Z M130,110 L130,120 L140,120 L140,110 Z' fill='black'/%3E%3C/svg%3E"
                        }}
                      />
                    </div>
                    <p className="text-gray-300 text-xs text-center">Solomon Kebede Kasse</p>
                  </div>
                  <div className="mt-4">
                    <button className="w-full bg-emerald-500 text-white py-2 rounded-md">Back</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeIn} className="p-6">
            <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="mingcute:code-fill" className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Payments API</h3>
            <p className="text-gray-400">
              Integrate with a single API to access hundreds of payments services, in one unified way
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="p-6">
            <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="iconamoon:category-fill" className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Web & Mobile Checkout SDKs</h3>
            <p className="text-gray-400">Create a dynamic checkouts experience across all your applications.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="p-6">
            <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="ant-design:setting-filled" className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Customization & Flexibility</h3>
            <p className="text-gray-400">
              Choose how you integrate and customize the checkout to meet your exact needs.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

