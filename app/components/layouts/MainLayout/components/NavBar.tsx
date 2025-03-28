"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Define theme variants for different pages
type NavTheme = "light" | "dark" | "gray" | "blog" | "home"

interface NavThemeConfig {
  background: string
  text: string
  logo: string
  activeBackground: string
  buttonVariant: "primary" | "outline" | "ghost"
  isFloating?: boolean
  isTransparent?: boolean
}

// Theme configurations
const themeConfigs: Record<NavTheme, NavThemeConfig> = {
  light: {
    background: "bg-white",
    text: "text-gray-800",
    logo: "/light-logo.png", // Default logo
    activeBackground: "bg-gray-100/40",
    buttonVariant: "primary",
  },
  dark: {
    background: "bg-[#0a1a1a]",
    text: "text-white",
    logo: "/logo2.png", // Default logo
    activeBackground: "bg-white/10",
    buttonVariant: "primary",
  },
  gray: {
    background: "bg-gray-300",
    text: "text-white",
    logo: "/light-logo.png", // Default logo
    activeBackground: "bg-white/10",
    buttonVariant: "primary",
  },
  blog: {
    background: "bg-black",
    text: "text-white",
    logo: "/light-logo.png", // Default logo
    activeBackground: "bg-white/10",
    buttonVariant: "primary",
  },
  home: {
    background: "bg-black/25",
    text: "text-white",
    logo: "/light-logo.png", // Default logo
    activeBackground: "bg-white/10",
    buttonVariant: "primary",
  },
}

// Route-based theme mapping
const routeThemes: Record<string, NavTheme> = {
  "/": "dark",
  "/home": "home",
  "/about-us": "light",
  "/blog": "blog",
  "/products": "gray",
  "/features": "dark",
  "/developers": "gray",
  "/faq": "light",
}

// Default theme if route is not specified
const defaultTheme: NavTheme = "light"

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Get the theme for the current route, or use the default
  const currentTheme = routeThemes[pathname] || defaultTheme
  const themeConfig = themeConfigs[currentTheme]

  // Handle scroll events for transparent/floating navbars
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { href: "/products", label: "Products" },
    { href: "/features", label: "Features" },
    { href: "/developers", label: "Developers" },
    { href: "/faq", label: "FAQ" },
    { href: "/about-us", label: "About us" },
  ]

  // Determine navbar classes based on theme and scroll state
  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-12 transition-all duration-300",
    themeConfig.isTransparent && !scrolled ? "bg-transparent" : themeConfig.background,
    themeConfig.isFloating && scrolled && "shadow-md",
    scrolled && "py-3", // Smaller on scroll
  )

  return (
    <header className={navClasses}>
      <Link href="/" className="flex items-center">
        <Image
          src={themeConfig.logo || "/placeholder.svg"}
          alt="StarPay"
          width={120}
          height={40}
          className="h-10 w-auto"
          onError={(e) => {
            // Fallback to default logo if the themed one fails to load
            const target = e.target as HTMLImageElement
            target.src = "/starpay-logo.svg"
          }}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 rounded-3xl text-sm font-medium transition-colors",
              themeConfig.text,
              pathname === item.href ? themeConfig.activeBackground : "hover:opacity-80",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button
          className={cn(
            "rounded-full px-6",
            themeConfig.buttonVariant === "primary"
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : themeConfig.buttonVariant === "outline"
                ? "border border-emerald-600 text-emerald-600 hover:bg-emerald-600/10"
                : "text-emerald-600 hover:bg-emerald-600/10",
          )}
        >
          Become a Merchant <Icon icon="tabler:arrow-right" className="ml-2 h-4 w-4" />
        </Button>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Icon icon={mobileMenuOpen ? "lucide:x" : "lucide:menu"} className={cn("w-6 h-6", themeConfig.text)} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 shadow-lg animate-in slide-in-from-top-5">
          <div className={cn("rounded-lg p-4", themeConfig.background)}>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    themeConfig.text,
                    pathname === item.href ? themeConfig.activeBackground : "hover:opacity-80",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

