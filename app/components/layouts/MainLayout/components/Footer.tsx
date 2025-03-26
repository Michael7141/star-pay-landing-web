"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    privacyAgreed: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, privacyAgreed: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <footer
      className=" text-white"
      style={{
        backgroundImage: "url('/footer-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "cover",
      }}
    >
      <div className="w-full pl-4 py-16 flex">
        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl w-full mx-auto">
          {/* Left Column - Logo and Newsletter */}
          <div className="flex-1">
            <div className="flex flex-col gap-8">
              <Image
                src="/logo2.png"
                alt="StarPay Logo"
                width={137}
                height={78}
              />

              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                <h3 className="text-xl font-medium">
                  Want to receive StarPay news and updates?
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border-none rounded-md p-4 text-white"
                />

                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full bg-gray-800 border-none rounded-md p-4 text-white resize-none"
                ></textarea>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={formData.privacyAgreed}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 rounded-full border-2 border-gray-600 bg-transparent"
                  />
                  <label htmlFor="privacy" className="text-gray-400">
                    I agree with the{" "}
                    <Link
                      href="/privacy"
                      className="text-emerald-500 hover:underline"
                    >
                      privacy statement
                    </Link>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-6 py-3 flex items-center gap-2"
                  >
                    Send Message
                    <Icon icon="lucide:arrow-right" className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Middle Columns - Links */}
          <div className="flex-1 flex flex-col md:flex-row gap-12">
            {/* About Product Column */}
            <div className="flex-1">
              <div className="flex flex-col gap-6">
                <h4 className="text-gray-400 font-medium">About product</h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      href="/demo"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      Demo
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/updates"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      Updates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/api"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      API Integration
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Company Column */}
            <div className="flex-1">
              <div className="flex flex-col gap-6">
                <h4 className="text-gray-400 font-medium">Company</h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/developers"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      Developers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/features"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-emerald-500 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Office Info */}
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              <h4 className="text-gray-400 font-medium">Offices</h4>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Addis Ababa</p>
                <p className="text-gray-400">Sar Bet-Elita Real Estate</p>
                <p className="text-gray-400">5th Floor</p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-medium">Call us</p>
                <p className="text-gray-400">+251900110011</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">

        <div className=" bg-emerald-500 rounded-l-lg h-[194px]">
          <div className="flex flex-col gap-4 p-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icon
                icon="mdi:linkedin"
                className="w-8 h-8 text-black hover:text-white transition-colors"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Icon
                icon="mdi:twitter"
                className="w-8 h-8 text-black hover:text-white transition-colors"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Icon
                icon="mdi:instagram"
                className="w-8 h-8 text-black hover:text-white transition-colors"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Icon
                icon="mdi:facebook"
                className="w-8 h-8 text-black hover:text-white transition-colors"
              />
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Social Media Bar - Fixed on right side */}
      {/* <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-emerald-500 rounded-l-lg">

      </div> */}

      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="flex justify-between items-center max-w-7xl w-full mx-auto px-4 py-6">
          <p className="text-gray-500 text-sm">
            © 2024 • StarPay Financial Inc.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-emerald-500 hover:bg-emerald-600 rounded-full p-2 transition-colors"
            aria-label="Back to top"
          >
            <Icon icon="lucide:arrow-up" className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </footer>
  );
}
