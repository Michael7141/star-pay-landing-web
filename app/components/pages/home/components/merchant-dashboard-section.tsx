"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MerchantDashboardSection() {
  return (
    <section className="bg-black py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <div className="bg-emerald-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 10V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 18.5C16.6 18.5 17.5 17.6 17.5 16.5C17.5 15.4 16.6 14.5 15.5 14.5C14.4 14.5 13.5 15.4 13.5 16.5C13.5 17.6 14.4 18.5 15.5 18.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5 20.5C19.5 19.1 17.7 18 15.5 18C13.3 18 11.5 19.1 11.5 20.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10.5H13"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 14H10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-[32px] font-bold text-white mb-6">
                MERCHANT DASHBOARD
              </h2>

              <p className="text-gray-300 text-[20px] mb-8 leading-relaxed">
                The Merchant Dashboard is your centralized hub for managing all
                aspects of your payments and transactions. With real-time data
                and easy-to-navigate features, you can track sales, monitor
                payments, generate invoices, and view comprehensive reports—all
                from one platform. Whether you&apos;re managing a single store
                or a large chain, the Merchant Dashboard gives you full control
                over your business&apos;s financial operations, empowering you
                to make informed decisions and optimize your cash flow with
                ease.
              </p>

              <Button className="bg-[#008F5F] hover:bg-emerald-600 text-white rounded-full pr-4 h-auto">
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full width dashboard image */}
      <div className="mt-24 w-[1568px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
            <Image
              src="/dashboard.png"
              alt="StarPay Dashboard Interface"
              width={1920}
              height={600}
              className="w-full h-auto"
            />
        </motion.div>
      </div>
    </section>
  );
}
