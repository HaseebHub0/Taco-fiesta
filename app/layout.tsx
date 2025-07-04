import { Lobster, Poppins } from "next/font/google"
import type { Metadata } from 'next'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/context/CartContext"
import { MusicProvider } from '@/context/MusicContext'
import BackgroundMusic from '@/components/BackgroundMusic'
import { AuthProvider } from '@/components/AuthProvider'
import ClientLayout from '@/components/ClientLayout'
import PageWrapper from '@/components/PageWrapper'
import "./globals.css"
import { Toaster } from 'sonner'
import { DealPopup } from "@/components/DealPopup"
import { CustomCursor } from '@/components/CustomCursor'

// Configure fonts
const lobster = Lobster({ 
  weight: "400", 
  subsets: ["latin"],
  variable: '--font-lobster',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ["400", "500", "700"], 
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Taco Fiesta",
  description: "Authentic Mexican cuisine with a modern twist",
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${lobster.variable} cursor-none`}>
      <body className={`${poppins.className} bg-background`}>
        <AuthProvider>
          <MusicProvider>
            <CartProvider>
              <ClientLayout>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1 pt-16">
                    <PageWrapper>
                      {children}
                    </PageWrapper>
                  </main>
                  <Footer />
                  <BackgroundMusic />
                </div>
              </ClientLayout>
            </CartProvider>
          </MusicProvider>
        </AuthProvider>
        <Toaster position="top-center" />
        <DealPopup />
        <CustomCursor />
      </body>
    </html>
  )
}

import './globals.css'