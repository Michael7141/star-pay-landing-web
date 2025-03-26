/* eslint-disable react/no-unescaped-entities */
"use client";

import CompanySpirit from "@/app/components/pages/about-us/components/company-spirit";
import GradientSection from "@/app/components/pages/about-us/components/gradient-section";
import MissionStatement from "@/app/components/pages/about-us/components/mission-statement";
import CompanyOverviewWithSidebar from "@/app/components/pages/about-us/components/company-overview-with-sidebar";
import NewsSection from "@/app/components/pages/about-us/components/news-section";
// import StarNewsSection from "@/app/components/pages/home/components/star-news-section";


export default function AboutUsPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="h-screen w-full relative"
        style={{
          backgroundImage: `url('/about-us-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="min-h-screen flex items-end justify-center ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-24">
            {/* Left side - Heading */}
            <div className="pt-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                STARPAY – SEAMLESS
                <br />& SECURE PAYMENTS
                <br />
                FOR ETHIOPIA
              </h1>
            </div>

            {/* Right side - Description */}
            <div className="pt-32">
              <p className="text-xl text-white">
                With StarPay, you can effortlessly send or receive money from
                any bank or digital wallet across Ethiopia, making transactions
                not only convenient but also secure. Whether you're paying for
                goods, services, or sending money to family, StarPay makes it
                simple and safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Section with Sidebar Navigation */}
      <CompanyOverviewWithSidebar />

      {/* MissionStatement */}
      <MissionStatement />

      {/* CompanySpirit */}
      <CompanySpirit />

      {/* GradientSection */}
      <GradientSection />

      {/* NewsSection */}
      <NewsSection />

      {/* StarNewsSection */}
      {/* <StarNewsSection /> */}
    </>
  );
}
