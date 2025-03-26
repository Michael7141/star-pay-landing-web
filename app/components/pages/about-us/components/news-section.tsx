/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"
import Image from "next/image"
import { Icon } from "@iconify/react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface NewsItem {
  id: string
  title: string
  content: string
  image: string
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Empower Your Financial Future with Innovative",
    content:
      "In a groundbreaking move for the fintech sector, NovaPay has launched a new app that simplifies peer-to-peer transactions. Users can now send money instantly with just a few taps, making financial exchanges faster and more efficient than ever. This innovation is set to revolutionize how we handle everyday payments.",
    image: "https://plus.unsplash.com/premium_photo-1682339496371-d71e65e3e42d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    title: "Empower Your Financial Future with Innovative",
    content:
      "In a groundbreaking move for the fintech sector, NovaPay has launched a new app that simplifies peer-to-peer transactions. Users can now send money instantly with just a few taps, making financial exchanges faster and more efficient than ever. This innovation is set to revolutionize how we handle everyday payments.",
      image: "https://plus.unsplash.com/premium_photo-1682339496371-d71e65e3e42d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  {
    id: "3",
    title: "Empower Your Financial Future with Innovative",
    content:
      "In a groundbreaking move for the fintech sector, NovaPay has launched a new app that simplifies peer-to-peer transactions. Users can now send money instantly with just a few taps, making financial exchanges faster and more efficient than ever. This innovation is set to revolutionize how we handle everyday payments.",
    image: "https://plus.unsplash.com/premium_photo-1682339496371-d71e65e3e42d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    title: "Empower Your Financial Future with Innovative",
    content:
      "In a groundbreaking move for the fintech sector, NovaPay has launched a new app that simplifies peer-to-peer transactions. Users can now send money instantly with just a few taps, making financial exchanges faster and more efficient than ever. This innovation is set to revolutionize how we handle everyday payments.",
    image: "https://plus.unsplash.com/premium_photo-1682339496371-d71e65e3e42d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    title: "Empower Your Financial Future with Innovative",
    content:
      "In a groundbreaking move for the fintech sector, NovaPay has launched a new app that simplifies peer-to-peer transactions. Users can now send money instantly with just a few taps, making financial exchanges faster and more efficient than ever. This innovation is set to revolutionize how we handle everyday payments.",
    image: "https://plus.unsplash.com/premium_photo-1682339496371-d71e65e3e42d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

const NewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-12">
          <h2 className="text-[64px] font-bold text-gray-700 leading-none">STAR NEWS</h2>
          <p className="text-gray-600 max-w-md text-[18px]">
            With StarPay, you can effortlessly send or receive money from any bank or digital wallet across Ethiopia,
            making transactions not only convenient but also secure. Whether you're paying for
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {newsItems.map((item) => (
              <CarouselItem key={item.id} className="pl-6 basis-[500px] flex gap-2">
                <div className="w-[500px] h-[500px] bg-gray-50 rounded-lg overflow-hidden flex flex-col">
                  <div className="p-[16px] flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block py-1 px-3 bg-emerald-100 text-[16px] rounded-full text-emerald-800">
                        News
                      </span>
                      <Icon icon="ph:arrow-up-right-bold" className="text-gray-400 w-6 h-6" />
                    </div>

                    <h3 className="text-[20px] font-bold mb-2 text-gray-800">{item.title}</h3>

                    <p className="text-[14px] text-gray-600 mb-4 flex-1">{item.content}</p>

                    <div className="mt-auto">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={468}
                        height={250}
                        className="rounded-lg w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-between items-center mt-8">
            <p className="text-gray-600 max-w-xs">
              With StarPay, you can effortlessly send or receive money from any bank or digital wallet
            </p>

            <div className="flex gap-4">
              <CarouselPrevious className="static transform-none w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100" />
              <CarouselNext className="static transform-none w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}

export default NewsSection

