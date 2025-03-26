import React from "react";

export default function GradientSection() {
  return (
    <div
      className="flex flex-col gap-16 w-full items-center justify-center p-60 "
      style={{
        backgroundImage: `url('/usp-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <span className="text-4xl text-[#C9C9C9]">They needed</span>
        <span className="text-5xl text-[#939393]">An infrastructure that</span>
        <span className="text-5xl text-[#939393]">Could scale with them</span>
      </div>
      <span className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-100 to-[#008F5F]">STAR PAY</span>
    </div>
  );
}


