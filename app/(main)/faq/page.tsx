// import CompanyOverviewSection from "@/app/components/pages/products/company-overview-section";
import FAQSection from "@/app/components/pages/features/faq-section";
// import ProductFeaturesSection from "@/app/components/pages/products/product-features-section";
import Image from "next/image";
import React from "react";
import JoinMerchantsSection from "@/app/components/pages/home/components/join-merchants-section";

export default function ProductPage() {
  return (
    <>
      <div className="flex flex-1 flex-col w-full px-16 gap-9 bg-white pt-40">
        <div className="flex gap-32 w-full bg-white">
          <span className="text-6xl font-bold text-[#565656]">
            FREQUENTLY ASKED QUESTIONS ABOUT STARPAY
          </span>
          <div className="flex items-end justify-end w-full">
            <span className="text-[#848484]">
              Get answers to common questions and step-by-step guides. Explore
              topics like security, transactions, refunds, and multi-currency
              support, plus watch how-to videos for easy setup and
              troubleshooting.
            </span>
          </div>
        </div>
        <Image
          alt="StarPay"
          src={"/question-mark-image-faq.png"}
          width={1568}
          height={586}
          className="w-full h-auto"
        />
        {/* ProductFeaturesSection */}
      </div>
      {/* <ProductFeaturesSection /> */}
      {/* <CompanyOverviewSection /> */}
      <JoinMerchantsSection />
      <FAQSection />
    </>
  );
}
