// import CompanyOverviewSection from "@/app/components/pages/products/company-overview-section";
// import FAQSection from "@/app/components/pages/features/faq-section";
import ProductFeaturesSection from "@/app/components/pages/products/product-features-section";
import Image from "next/image";
import React from "react";
import PaymentSolutionsSection from "@/app/components/pages/home/components/payment-solutions-section";
import NewsSection from "@/app/components/pages/about-us/components/news-section";

export default function ProductPage() {
  return (
    <>
      <div className="flex flex-1 flex-col w-full px-16 gap-9 bg-white pt-32 min-h-screen">
        <div className="flex gap-32 w-full bg-white">
          <span className="text-6xl font-bold text-[#565656]">
            <span className="text-primary">
            STARPAY
            </span>
             – SEAMLESS & SECURE PAYMENTS FOR ETHIOPIA
          </span>
          <div className="flex items-end justify-end w-full">

          <span className="text-gray-500">
            StarPay gives you the speed, security, and flexibility to accept
            payments effortlessly. With our <span className="font-bold text-black">Merchant Dashboard, Mobile App,
            Checkout SDK</span>, and <span className="font-bold text-black">API</span>, businesses can get paid anytime, anywhere
            through multiple payment options. Seamless transactions start with
            StarPay.
          </span>
          </div>
        </div>
        <Image
          alt="StarPay"
          src={"/scan-qr-products-page.png"}
          width={1568}
          height={586}
          className="w-full h-auto"
        />
      </div>
      <ProductFeaturesSection />
      <PaymentSolutionsSection />
      <NewsSection />
    </>
  );
}
