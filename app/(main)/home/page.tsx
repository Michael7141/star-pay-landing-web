/* eslint-disable @typescript-eslint/no-unused-vars */
import NewsSection from "@/app/components/pages/about-us/components/news-section";
import ExpandingVideoSection from "@/app/components/pages/home/components/expanding-video-section";
import GenerateBillSection from "@/app/components/pages/home/components/generate-bill-section";
import HeroSection from "@/app/components/pages/home/components/hero-section";
import JoinMerchantsSection from "@/app/components/pages/home/components/join-merchants-section";
import LastIntegrationSection from "@/app/components/pages/home/components/last-integration-section";
import MerchantDashboardSection from "@/app/components/pages/home/components/merchant-dashboard-section";
import PaymentIntegrations from "@/app/components/pages/home/components/payment-integrations";
import PaymentSolutionsSection from "@/app/components/pages/home/components/payment-solutions-section";
import RemittanceApiSection from "@/app/components/pages/home/components/remittance-api-section";
import RequestMoneySection from "@/app/components/pages/home/components/request-money-section";
import SecuritySection from "@/app/components/pages/home/components/security-section";
import StarCoinSection from "@/app/components/pages/home/components/star-coin-section";
import WhatStarPayOffersSection from "@/app/components/pages/home/components/what-starpay-offers-section";
import ProductFeaturesSection from "@/app/components/pages/products/product-features-section";
import { QrCodeIcon, LinkIcon, ReferenceIcon } from "@/lib/svg";

const customCards = [
  {
    id: "multi-channel",
    title: "Multi-Channel Payment",
    description:
      "StarPay allows merchants to request payments through a variety of convenient methods, including QR codes, payment links, OTPs, USSD, and reference codes. This flexibility ensures that merchants can accommodate every customer's preferred payment method, whether online or offline, making the payment process quick and seamless.",
    icon: <QrCodeIcon className="w-11 h-11 text-white" />,
    bgGradient: "from-emerald-900 to-emerald-800",
    iconBg: "bg-emerald-700",
  },
  {
    id: "real-time",
    title: "Real-Time Payment Verification",
    description:
      "With StarPay, merchants can instantly verify successful payments through the customer's receipt or success screen. This unique feature ensures transparency, reduces errors, and gives both merchants and customers peace of mind by confirming that the transaction is complete in real-time.",
    icon: <LinkIcon className="w-11 h-11 text-white" />,
    bgGradient: "from-amber-900 to-amber-800",
    iconBg: "bg-amber-700",
  },
  {
    id: "easy-withdrawal",
    title: "Easy Withdrawal",
    description:
      "Imagine a world where withdrawing your earnings is just a few taps away. With our Easy Withdrawal feature, you can quickly transfer funds to your bank or preferred payment method without complicated processes or long waits. Whether on our mobile app or desktop, just select your preferred withdrawal method, and confirm. It's that simple! Plus, with real-time tracking, you'll always know your transaction status. Enjoy the convenience of Easy Withdrawal!",
    icon: <ReferenceIcon className="w-11 h-11 text-white" />,
    bgGradient: "from-blue-900 to-blue-800",
    iconBg: "bg-blue-700",
  },
]

export default function Home() {
  return (
      <div>
        <HeroSection />

        <PaymentIntegrations />

        <ExpandingVideoSection 
          videoSrc = "/sample-vid.mp4"
          title = "EXPERIENCE THE FUTURE OF PAYMENTS"
          subtitle = "See how StarPay is revolutionizing the way businesses accept payments across Ethiopia"
        />
        
        <RequestMoneySection />

        <MerchantDashboardSection />

        <GenerateBillSection />

        <WhatStarPayOffersSection />
        
        {/* <WhatStarPayOffersSection
      title="WHAT STARPAY OFFERS"
      subtitle="A Comprehensive And Detailed Guide To Effortlessly Integrating With The Gateway API, Covering All The Essential Steps, Best Practices, And Tips To Ensure A Smooth And Successful Implementation."
      bottomTitle="THE FUTURE OF PAYMENT IS"
      bottomSubtitle="OPEN & INTEROPERABLE"
      bgColor="bg-emerald-950"
      textColor="text-white"
      cards={customCards}
    /> */}

        <LastIntegrationSection />

        <RemittanceApiSection />

        <StarCoinSection />

        <SecuritySection />

        <ProductFeaturesSection />

        <JoinMerchantsSection />

        <PaymentSolutionsSection />

        <NewsSection />

        {/* <StickySectionContent /> */}
      </div>
  );
}
