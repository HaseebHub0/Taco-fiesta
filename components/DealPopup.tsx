"use client"

import { useState, useEffect } from 'react'
import { X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ImageWithFallback from '@/components/ImageWithFallback'
import Link from 'next/link'

const todaysDeal = {
  title: "🌮 Special Deal of the Day 🌮",
  description: "Triple Taco Fiesta Bundle",
  subtext: "Get 3 Signature Tacos for the Price of 2!",
  image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1920",
  price: "15.99",
  originalPrice: "23.99"
}

export function DealPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl mx-4"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 border-2 border-yellow-500/30 shadow-2xl">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 z-10 hover:bg-red-500 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="relative h-72 sm:h-80">
                <ImageWithFallback
                  src={todaysDeal.image}
                  alt={todaysDeal.title}
                  fill
                  className="object-cover"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Floating discount badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  SAVE 33% TODAY
                </div>

                {/* Title overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                    {todaysDeal.description}
                  </h2>
                  <p className="text-lg sm:text-xl text-white/90">
                    {todaysDeal.subtext}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-gradient-to-b from-yellow-50/50 to-orange-50/50">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 line-through">
                      ${todaysDeal.originalPrice}
                    </div>
                    <div className="text-4xl font-bold text-yellow-500">
                      ${todaysDeal.price}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg px-8 py-6 h-auto transform hover:scale-105 transition-transform duration-200 shadow-lg"
                    onClick={() => {
                      // Add to cart logic here
                      setIsOpen(false)
                    }}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Claim This Deal Now
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  ⏰ Limited time offer - Ends at midnight tonight!
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 