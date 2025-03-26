import GenerateBillSection from "@/app/components/pages/home/components/generate-bill-section";
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
    <div className="min-h-screen bg-[#0a1a1a] text-white">
      <Intro />

      <PaymentIntegrations />

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

      {/* <StickySectionContent /> */}

      <section className="py-20 bg-[#0a1a1a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Continue Exploring StarPay
          </h2>
          <p className="text-white/70 text-lg mx-auto">
            Discover more features and benefits of using StarPay for your
            business.
          </p>
        </div>
      </section>
    </div>
  );
}
