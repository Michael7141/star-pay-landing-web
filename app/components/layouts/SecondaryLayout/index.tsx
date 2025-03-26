import React, { ReactNode } from 'react'
import Footer from '../MainLayout/components/Footer'
import NavBar from './components/NavBar'

export default function SecondaryLayout({children}: {children: ReactNode}) {
  return (
    <div>
    <NavBar />
      {children}
    <Footer />
    </div>
  )
}
