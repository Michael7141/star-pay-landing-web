"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Icon } from "@iconify/react"

interface SolutionCardProps {
  icon: string
  title: string
  description: string
  imageSrc: string
  delay: number
}

const SolutionCard = ({ icon, title, description, imageSrc, delay }: SolutionCardProps) => {
  return (
    <motion.div 
      className="w-full max-w-[488px] bg-black/10 backdrop-blur-sm rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="p-8">
        <div className="bg-black/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
          <Icon icon={icon} className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-base">{description}</p>
      </div>
      <div className="w-full h-[347px] relative">
        <Image 
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  )
}

export default function PaymentSolutionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const solutions = [
    {
      icon: "foundation:graph-pie",
      title: "Global Payment Integration",
      description: "Accept payments from local and international customers through integrated banks, digital wallets, and networks like Mastercard, expanding your reach globally.",
      imageSrc: "https://s3-alpha-sig.figma.com/img/5224/2bc7/632ae37c5a348a012b13123d0f7b2472?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=c9~-EUKsUEoZbKR4dlbCUVXApJS98jIpVk0M6C85HcO456TApMtFtnwxBFQ907o9wcQ3Z1ZPvK1Jt6Q7Cq9zN3R-cFCxrTMcd3lt8j~y6GCtAl7FVVvNZBaaC4lHJUCFIKu-cfl-y8VutXwIs7breUn504LQBU~jjPeSfSfN1I5loGEvirUwJJQawUtpldYdd25yqWLGkKX9WfVC9hbujxPDZPnfPtCMid0xVDO-PcwM3CLq~4k7bI4WBUA-Ik3TlY00J9-sPrI3Od5DtOCKs7zKWBzRkjBEbGm8yLVC6SFysflvYeTSKJ5Vwcg58VCJzQalOgnzKZT-eqTXbTJp7g__",
    },
    {
      icon: "foundation:graph-pie",
      title: "Real Time Financial Insights",
      description: "Access up-to-the-minute insights into your financial transactions, sales, and revenue, helping you make data-driven decisions without delay.",
      imageSrc: "https://s3-alpha-sig.figma.com/img/5224/2bc7/632ae37c5a348a012b13123d0f7b2472?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=c9~-EUKsUEoZbKR4dlbCUVXApJS98jIpVk0M6C85HcO456TApMtFtnwxBFQ907o9wcQ3Z1ZPvK1Jt6Q7Cq9zN3R-cFCxrTMcd3lt8j~y6GCtAl7FVVvNZBaaC4lHJUCFIKu-cfl-y8VutXwIs7breUn504LQBU~jjPeSfSfN1I5loGEvirUwJJQawUtpldYdd25yqWLGkKX9WfVC9hbujxPDZPnfPtCMid0xVDO-PcwM3CLq~4k7bI4WBUA-Ik3TlY00J9-sPrI3Od5DtOCKs7zKWBzRkjBEbGm8yLVC6SFysflvYeTSKJ5Vwcg58VCJzQalOgnzKZT-eqTXbTJp7g__",
    },
    {
      icon: "foundation:graph-pie",
      title: "Transaction Mini Statement",
      description: "Quickly view transaction details with our mini statement feature, allowing you to track payments, refunds, and all activities in a compact, easy-to-read format.",
      imageSrc: "https://s3-alpha-sig.figma.com/img/5224/2bc7/632ae37c5a348a012b13123d0f7b2472?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=c9~-EUKsUEoZbKR4dlbCUVXApJS98jIpVk0M6C85HcO456TApMtFtnwxBFQ907o9wcQ3Z1ZPvK1Jt6Q7Cq9zN3R-cFCxrTMcd3lt8j~y6GCtAl7FVVvNZBaaC4lHJUCFIKu-cfl-y8VutXwIs7breUn504LQBU~jjPeSfSfN1I5loGEvirUwJJQawUtpldYdd25yqWLGkKX9WfVC9hbujxPDZPnfPtCMid0xVDO-PcwM3CLq~4k7bI4WBUA-Ik3TlY00J9-sPrI3Od5DtOCKs7zKWBzRkjBEbGm8yLVC6SFysflvYeTSKJ5Vwcg58VCJzQalOgnzKZT-eqTXbTJp7g__",
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative"
      style={{
        backgroundImage: "url('/products-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            EFFORTLESS AND SAFE PAYMENT<br />
            SOLUTIONS FOR ETHIOPIA
          </h2>
          <p className="text-gray-300 text-lg">
            With StarPay, you can effortlessly send or receive money from any bank or digital wallet across
            Ethiopia, making transactions not only convenient but also secure. Whether you&apos;re paying for
            goods, services, or sending money to family, StarPay makes it simple and safe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              imageSrc={solution.imageSrc}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
