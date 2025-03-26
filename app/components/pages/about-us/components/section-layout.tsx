import type React from "react"

interface SectionLayoutProps {
  textPosition: "left" | "right"
  title: React.ReactNode
  content: React.ReactNode
  visual: React.ReactNode
}

export default function SectionLayout({ textPosition, title, content, visual }: SectionLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center justify-between w-full">
      {textPosition === "left" ? (
        <>
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              {title}
              <div className="py-6">{content}</div>
            </div>
          </div>
          <div className="flex justify-center items-center">{visual}</div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center order-2 lg:order-1">{visual}</div>
          <div className="flex-1 order-1 lg:order-2">
            <div className="flex flex-col gap-4">
              {title}
              <div className="py-6">{content}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

