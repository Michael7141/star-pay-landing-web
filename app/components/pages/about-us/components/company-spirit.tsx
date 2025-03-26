/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function CompanySpirit() {
  return (
    <div
      className=""
      style={{
        backgroundImage: `url('/team-photo.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="min-h-screen flex flex-col justify-end shadow">
        <div className="flex flex-1 w-full flex-col gap-4 items-center justify-end p-16">
          <div className="flex w-full justify-between items-center text-white">
            <span className="text-9xl w-1/3 font-bold">THE TEAM</span>
            <span className="w-1/3 text-2xl">
              At StarPay, teamwork drives us! Our dedicated team ensures every
              transaction is seamless and secure. With their expertise, your
              money is in good hands. Together, we're simplifying financial
              transactions in Ethiopia!
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}
