"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type NavbarTheme = "light" | "dark" | "gray" | "transparent"

interface NavbarContextType {
  theme: NavbarTheme
  setTheme: (theme: NavbarTheme) => void
  isFloating: boolean
  setIsFloating: (isFloating: boolean) => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<NavbarTheme>("dark")
  const [isFloating, setIsFloating] = useState(false)

  return (
    <NavbarContext.Provider value={{ theme, setTheme, isFloating, setIsFloating }}>{children}</NavbarContext.Provider>
  )
}

export function useNavbar() {
  const context = useContext(NavbarContext)
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider")
  }
  return context
}

