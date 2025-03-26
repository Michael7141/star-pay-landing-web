"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@iconify/react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Define the FAQ item interface
interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
  videoDescription?: string
  videoThumbnail?: string
  isExpanded?: boolean
}

// Sample FAQ data
const faqItems: FAQItem[] = [
  {
    id: "generating-bill",
    category: "Generating Bill",
    question: "What is Starpay and how does it work?",
    answer:
      "Starpay is a secure and reliable payment gateway that enables businesses and merchants to process payments online. It allows you to accept various payment methods such as credit/debit cards, mobile payments, and bank transfers. To use Starpay, merchants integrate the gateway into their websites or mobile apps.",
    videoDescription: "Video Description",
    videoThumbnail: "/video-alt-image.png",
    isExpanded: true,
  },
  {
    id: "wallet-withdrawal",
    category: "Wallet withdrawal",
    question: "How can I integrate Starpay with my website or app?",
    answer:
      "Integrating Starpay with your website or app is straightforward. We provide comprehensive API documentation and SDKs for various platforms including JavaScript, PHP, Python, and mobile SDKs for Android and iOS. Our developer portal offers step-by-step guides, code examples, and testing environments to ensure a smooth integration process. For personalized assistance, our technical support team is available to help you throughout the integration process.",
  },
  {
    id: "integrations",
    category: "Integrations",
    question: "What payment methods does Starpay support?",
    answer:
      "Starpay supports a wide range of payment methods to ensure flexibility for your customers. These include major credit and debit cards (Visa, Mastercard, American Express), mobile payment solutions, bank transfers, USSD payments, QR code payments, and digital wallets. We continuously expand our supported payment methods to accommodate the evolving payment landscape in Ethiopia and beyond.",
  },
  {
    id: "payment-options",
    category: "Payment Options",
    question: "Are there any fees for using Starpay?",
    answer:
      "Starpay offers transparent pricing with no hidden fees. We charge a small percentage per successful transaction, with rates varying based on your business volume and the payment methods you choose to accept. Volume discounts are available for businesses with high transaction volumes. There are no setup fees, monthly fees, or charges for failed transactions. For detailed pricing information, please contact our sales team.",
  },
  {
    id: "refund",
    category: "Refund",
    question: "How do I make a payment through Starpay?",
    answer:
      "Making a payment through Starpay is simple and secure. When shopping on a website or app that uses Starpay, select your items and proceed to checkout. Choose your preferred payment method from the options provided. Enter your payment details in the secure Starpay payment form. Confirm your payment, and you'll receive a confirmation once the transaction is complete. The entire process is encrypted and secure to protect your financial information.",
  },
  {
    id: "international",
    category: "International Payments",
    question: "Can I receive international payments using Starpay?",
    answer:
      "Yes, Starpay supports international payments, allowing your business to accept payments from customers worldwide. We handle currency conversion automatically, so you can receive funds in your preferred currency. Our platform complies with international security standards and regulations to ensure safe cross-border transactions. International payment processing fees may vary from domestic rates. Contact our support team for specific details about international payment options for your business.",
  },
]

const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("")
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([""])

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const setCategory = (category: string) => {
    setActiveCategory(category)
    // Find the first question in this category and expand it
    const firstItemInCategory = faqItems.find((item) => item.id === category)
    if (firstItemInCategory && !expandedQuestions.includes(category)) {
      setExpandedQuestions((prev) => [...prev, category])
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-24">
              <ul className="space-y-6">
                {faqItems.map((item) => (
                  <li key={item.id} className="flex items-center">
                    <button
                      onClick={() => setCategory(item.id)}
                      className={cn(
                        "flex items-center text-left w-full transition-colors duration-200",
                        activeCategory === item.id ? "text-emerald-600" : "text-gray-500 hover:text-gray-700",
                      )}
                    >
                      <div
                        className={cn(
                          "w-6 h-0.5 mr-3 transition-all duration-300",
                          activeCategory === item.id ? "bg-emerald-600" : "bg-gray-300",
                        )}
                      />
                      <span className="text-lg">{item.category}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right content */}
          <div className="md:w-3/4">
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className={cn("border-b border-gray-100 pb-6", activeCategory !== item.id && "hidden md:block")}
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    className="flex justify-between items-start w-full text-left"
                  >
                    <h3 className="text-xl font-medium text-gray-900">{item.question}</h3>
                    <div className="ml-2 flex-shrink-0 mt-1">
                      {expandedQuestions.includes(item.id) ? (
                        <Icon icon="heroicons:minus" className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Icon icon="heroicons:plus" className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedQuestions.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <p className="text-gray-600">{item.answer}</p>

                          {item.videoDescription && (
                            <div className="mt-6">
                              <p className="text-sm text-gray-500 mb-2">{item.videoDescription}</p>
                              <div className="relative rounded-lg overflow-hidden">
                                <Image
                                  src={item.videoThumbnail || "/placeholder.svg"}
                                  alt="Video thumbnail"
                                  width={1050}
                                  height={466}
                                  className="h-auto w-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                                    <Icon icon="heroicons:play-solid" className="w-8 h-8 text-emerald-600 ml-1" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection

