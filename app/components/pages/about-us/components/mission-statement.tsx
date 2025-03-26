/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const EthiopiaFintechBanner = () => {
  return (
    <div className="relative w-full bg-white p-4 flex items-center justify-center" style={{ height: '657px' }}>
      <div className="relative max-w-6xl w-full flex items-center justify-between">
        {/* Left Quote Image (Top Left) */}
        <div className="absolute top-1 -left-14">
          <Icon icon="gravity-ui:quote-open" className="text-6xl text-gray-400" />
        </div>

        {/* Left Image (Bottom Left) */}
        <div className="absolute top-40 -left-60 z-10 rounded-3xl overflow-hidden w-64 h-64">
          <img
            height={256}
            width={256}
            src="/quotes1.png"
            alt="People working together"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Text Content (Center) */}
        <div className="flex-1 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 leading-tight">
            EMPOWERING DREAMS, TRANSFORMING FUTURES: TOGETHER WE INNOVATE IN
            ETHIOPIA'S FINTECH! OUR MISSION IS TO USE TECHNOLOGY FOR SOLUTIONS
            THAT ENHANCE FINANCIAL ACCESS AND DRIVE GROWTH. JOIN US IN
            REDEFINING ETHIOPIA'S FINANCIAL FUTURE!
          </h1>
        </div>

        {/* Right Image (Top Right) */}
        <div className="absolute -top-28 -right-80 z-10 rounded-3xl overflow-hidden w-64 h-64">
          <img
            height={256}
            width={256}
            src="/quotes2.png"
            alt="Person smiling"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Quote Image (Bottom Right) */}
        <div className="absolute bottom-8 -right-20">
          <Icon icon="gravity-ui:quote-close" className="text-6xl text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default EthiopiaFintechBanner;