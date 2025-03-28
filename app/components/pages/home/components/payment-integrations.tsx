"use client"

import { useEffect, useState } from "react"
import { Icon } from "@iconify/react"

// Define the bank/payment icons using Iconify
const paymentIcons = [
  { name: "Google Pay", icon: "logos:google-pay" },
  { name: "Apple Pay", icon: "logos:apple-pay" },
  { name: "Shopify Pay", icon: "logos:shopify" },
  { name: "Bitcoin", icon: "logos:bitcoin" },
  { name: "Ethereum", icon: "logos:ethereum" },
  { name: "Google Pay", icon: "logos:google-pay" },
  { name: "Apple Pay", icon: "logos:apple-pay" },
  { name: "Shopify Pay", icon: "logos:shopify" },
  { name: "Bitcoin", icon: "logos:bitcoin" },
  { name: "Ethereum", icon: "logos:ethereum" },
  { name: "Google Pay", icon: "logos:google-pay" },
  { name: "Apple Pay", icon: "logos:apple-pay" },
  { name: "Shopify Pay", icon: "logos:shopify" },
  { name: "Bitcoin", icon: "logos:bitcoin" },
  { name: "Ethereum", icon: "logos:ethereum" },
  { name: "Google Pay", icon: "logos:google-pay" },
  { name: "Apple Pay", icon: "logos:apple-pay" },
  { name: "Shopify Pay", icon: "logos:shopify" },
  { name: "Bitcoin", icon: "logos:bitcoin" },
  { name: "Ethereum", icon: "logos:ethereum" },
]

// Fallback icons if the specified icon is not available
const fallbackIcons = ["mdi:bank", "mdi:credit-card", "mdi:cash", "mdi:wallet", "mdi:currency-usd"]

export default function PaymentIntegrations() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="text-black py-16">
      <div className="container mx-auto px-4 text-center mb-12 ">
        <div className="flex justify-center mb-6">
          <div className="rounded-lg">
            <Icon icon="solar:wallet-bold" className="w-24 h-24 text-[#008F5F]" />
            {/* bg-emerald-600  */}
            {/* solar:wallet-bold */}
          </div>
        </div>
        <div className="flex flex-col gap-1 text-4xl md:text-5xl font-bold mb-4">
          <span>OVER 50+</span>
          <span className="text-primary">LOCAL & INTERNATIONAL</span>
          <span>PAYMENT INTEGRATIONS</span>
        </div>
        <p className="text-[#6D6D6D] text-lg max-w-4xl mx-auto">
          With StarPay, you can easily send or receive money from International and Local Banks and wallets.
        </p>
      </div>

      {/* First row - moving right to left */}
      <div className="relative w-full overflow-hidden py-4 mb-8 ">
        {isClient && (
          <div className="marquee-container">
            <div className="marquee-row marquee-right-to-left">
              {[...paymentIcons, ...paymentIcons].map((item, index) => (
                <div
                  key={`first-${index}`}
                  className="w-[100px] h-[100px] flex items-center justify-center bg-white rounded-full p-2 flex-shrink-0 mx-4"
                >
                  <Icon icon={item.icon || fallbackIcons[index % fallbackIcons.length]} className="w-20 h-20" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Second row - moving left to right */}
      <div className="relative w-full overflow-hidden py-4 ">
        {isClient && (
          <div className="marquee-container">
            <div className="marquee-row marquee-left-to-right">
              {[...paymentIcons.reverse(), ...paymentIcons].map((item, index) => (
                <div
                  key={`second-${index}`}
                  className="w-[100px] h-[100px] flex items-center justify-center bg-white rounded-full p-2 flex-shrink-0 mx-4"
                >
                  <Icon icon={item.icon || fallbackIcons[index % fallbackIcons.length]} className="w-20 h-20" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

   
    </div>
  )
}

