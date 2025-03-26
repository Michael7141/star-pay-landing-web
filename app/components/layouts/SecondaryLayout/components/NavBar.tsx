"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const pathname = usePathname();
  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/features", label: "Features" },
    { href: "/developers", label: "Developers" },
    { href: "/faq", label: "FAQ" },
    { href: "/about-us", label: "About us" },
  ];

  return (
    <nav className="top-0 left-0 right-0 flex justify-between items-center px-6 py-4 md:px-12 backdrop-blur-md bg-white">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="StarPay"
          width={150}
          height={40}
          className="h-10 w-auto"
        />
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "text-black px-3 py-2 rounded-3xl text-sm font-light transition-colors",
              pathname === item.href ? "bg-[#E3E3E3]/40" : ""
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <Button className="bg-primary hover:bg-green-700 text-white rounded-full px-6">
        Become a Merchant <span className="ml-2">→</span>
      </Button>
    </nav>
  );
}
