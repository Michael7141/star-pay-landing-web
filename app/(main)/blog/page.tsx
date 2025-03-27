import Link from "next/link"
import { Icon } from "@iconify/react"
import Navbar from "@/app/components/layouts/MainLayout/components/NavBar"

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen px-6 relative">
        <div className="container mx-auto h-full">
          {/* Top right "2024" */}
          <div className="absolute top-32 right-6 md:right-16">
            <p className="text-[24px]">2024</p>
          </div>

          {/* Main content positioned lower */}
          <div className="pt-[35vh]">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="md:w-1/2">
                <h1 className="text-[96px] font-bold leading-tight">
                  THE LAUNCH
                  <br />
                  OF STARPAY
                </h1>

                <div className="flex items-center text-white bg-transparent hover:bg-white/10 rounded-full py-3 px-6 transition-colors w-fit mt-8">
                  <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full mr-3">
                    <Icon icon="heroicons:play-solid" className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-[32px]">Watch Video</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom right "Fintech News" */}
          <div className="absolute bottom-32 right-6 md:right-16">
            <div className="flex space-x-6">
              <span className="text-gray-400">Fintech</span>
              <span className="text-gray-400">News</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}

      {/* News Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <h2 className="text-[128px] font-bold text-gray-700">STAR NEWS</h2>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-1">
                  <p className="text-gray-500">Date</p>
                  <p className="text-2xl">12/01/2024</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-gray-500">Industry</p>
                  <p className="text-2xl">Fintech</p>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-gray-500">Duration</p>
                  <div className="flex items-baseline">
                    <span className="text-[64px] font-bold">06</span>
                    <span className="ml-2 text-[24px]">Weeks</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-[24px] text-gray-500">Written by</p>
                  <p className="text-[40px]">Lewi Haile</p>
                  <p className="text-[40px]">Abebe K.</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-16 border-l border-gray-800">
              <div className="max-w-lg">
                <p className="text-[36px] leading-tight">
                  Breaking news: A major storm is approaching the coast, bringing heavy rains and strong winds.
                  Residents are advised to prepare for possible flooding and power outages. Stay tuned for updates!
                </p>

                <div className="mt-8">
                  <Link
                    href="/news/storm-warning"
                    className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    Read More
                    <Icon icon="heroicons:arrow-down" className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

