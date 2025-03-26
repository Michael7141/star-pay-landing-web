/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image"
import { Icon } from "@iconify/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useState, useEffect } from "react"

// News item interface
interface NewsItem {
  id: number
  tag: string
  title: string
  content: string
  image: string
}

// Sample news data
const newsItems: NewsItem[] = [
  {
    id: 1,
    tag: "News",
    title: "Empower Your Financial Future with Innovative",
    content:
      "In a groundbreaking move for the fintech sector, NovaPay has launched a new app that simplifies peer-to-peer transactions. Users can now send money instantly with just a few taps, making financial exchanges faster and more efficient than ever. This innovation is set to revolutionize how we handle everyday payments.",
    image: "/news/payment-qr.jpg",
  },
  {
    id: 2,
    tag: "News",
    title: "Empower Your Financial Future with Innovative",
    content:
      "In a groundbreaking move for the fintech sector, NovaPay has launched a new app that simplifies peer-to-peer transactions. Users can now send money instantly with just a few taps, making financial exchanges faster and more efficient than ever. This innovation is set to revolutionize how we handle everyday payments.",
    image: "/news/payment-terminal.jpg",
  },
  {
    id: 3,
    tag: "News",
    title: "Empower Your Financial Future with Innovative",
    content:
      "In a groundbreaking move for the fintech sector, NovaPay has launched a new app that simplifies peer-to-peer transactions. Users can now send money instantly with just a few taps, making financial exchanges faster and more efficient than ever. This innovation is set to revolutionize how we handle everyday payments.",
    image: "/news/mobile-banking.jpg",
  },
  {
    id: 4,
    tag: "News",
    title: "Digital Payments Transforming Ethiopian Economy",
    content:
      "The rapid adoption of digital payment solutions is reshaping Ethiopia's economic landscape. With increased smartphone penetration and improved internet infrastructure, more Ethiopians are embracing cashless transactions, driving financial inclusion and economic growth across the country.",
    image: "/news/digital-economy.jpg",
  },
]

export default function StarNewsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="w-full bg-white py-16">
      <div className="flex flex-col gap-12 w-4/5">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <h2 className="text-5xl font-bold text-gray-700">STAR NEWS</h2>
          </div>
          <div className="flex-1">
            <p className="text-gray-600">
              With StarPay, you can effortlessly send or receive money from any bank or digital wallet across Ethiopia,
              making transactions not only convenient but also secure. Whether you're paying for
            </p>
          </div>
        </div>

        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-0 gap-6">
            {newsItems.map((item) => (
              <CarouselItem key={item.id} className="pl-0 md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md text-sm">{item.tag}</span>
                    <Icon icon="lucide:arrow-up-right" className="w-5 h-5 text-gray-400" />
                  </div>

                  <h3 className="text-xl font-bold">{item.title}</h3>

                  <p className="text-gray-600 flex-grow">{item.content}</p>

                  <div className="relative w-full h-56 rounded-lg overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=224&width=400"
                      }}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-between mt-8">
            <p className="text-gray-600">
              With StarPay, you can effortlessly send or receive money from any bank or digital wallet
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${current === index + 1 ? "bg-emerald-500" : "bg-gray-300"}`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <CarouselPrevious className="static transform-none h-10 w-10 border-gray-300 hover:bg-gray-100" />
                <CarouselNext className="static transform-none h-10 w-10 border-gray-300 hover:bg-gray-100" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}

