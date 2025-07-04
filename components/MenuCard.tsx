"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, HeartFilled, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageWithFallback from "@/components/ImageWithFallback"
import { microAnimations } from "@/lib/microAnimations"

interface MenuCardProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    image: string
    isSpecial?: boolean
    specialPrice?: number
  }
  onAddToCart: (item: any) => void
}

export default function MenuCard({ item, onAddToCart }: MenuCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      quantity,
    })
    setQuantity(1) // Reset quantity after adding to cart
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md backdrop-blur-sm"
          >
            {isFavorite ? (
              <HeartFilled className="w-5 h-5 text-red-500" />
            ) : (
              <Heart className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {item.isSpecial ? (
                <>
                  <div className="text-2xl font-bold text-red-500">
                    ${item.specialPrice?.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400 line-through">
                    ${item.price.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-2xl font-bold">
                  ${item.price.toFixed(2)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Quantity Controls */}
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="bg-yellow-500 hover:bg-red-500 text-white"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 