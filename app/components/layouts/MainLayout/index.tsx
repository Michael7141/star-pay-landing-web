import React, { ReactNode } from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <div>
    <NavBar />
      {children}
    <Footer />
    </div>
  )
}
