/* eslint-disable @typescript-eslint/no-unused-vars */
// import StarNewsSection from "@/app/components/pages/about-us/components/star-news-section";
import NewsSection from "@/app/components/pages/about-us/components/news-section";
import ExpandingVideoSection from "@/app/components/pages/home/components/expanding-video-section";
import GenerateBillSection from "@/app/components/pages/home/components/generate-bill-section";
import HeroSection from "@/app/components/pages/home/components/hero-section";
import Intro from "@/app/components/pages/home/components/intro";
import JoinMerchantsSection from "@/app/components/pages/home/components/join-merchants-section";
import LastIntegrationSection from "@/app/components/pages/home/components/last-integration-section";
// import MerchantDashboardSection from "@/app/components/pages/home/components/merchant-dashboard-section";
import PaymentIntegrations from "@/app/components/pages/home/components/payment-integrations";
import PaymentSolutionsSection from "@/app/components/pages/home/components/payment-solutions-section";
import RemittanceApiSection from "@/app/components/pages/home/components/remittance-api-section";
import RequestMoneySection from "@/app/components/pages/home/components/request-money-section";
import SecuritySection from "@/app/components/pages/home/components/security-section";
import StarCoinSection from "@/app/components/pages/home/components/star-coin-section";
import WhatStarPayOffersSection from "@/app/components/pages/home/components/what-starpay-offers-section";
import ProductFeaturesSection from "@/app/components/pages/products/product-features-section";

export default function Home() {
  return (
    <div>
      <div>
        <HeroSection />
        <PaymentIntegrations />

        <ExpandingVideoSection 
          videoSrc = "/sample-vid.mp4"
          title = "EXPERIENCE THE FUTURE OF PAYMENTS"
          subtitle = "See how StarPay is revolutionizing the way businesses accept payments across Ethiopia"
        />
        
        <RequestMoneySection />


        <GenerateBillSection />

        <WhatStarPayOffersSection />

        <LastIntegrationSection />

        <RemittanceApiSection />

        <StarCoinSection />

        

        {/* SecuritySection */}
        <SecuritySection />

        {/* ProductFeaturesSection */}
        <ProductFeaturesSection />

        <JoinMerchantsSection />

        <PaymentSolutionsSection />

        <NewsSection />

        {/* <StickySectionContent /> */}
      </div>
    </div>
  );
}
