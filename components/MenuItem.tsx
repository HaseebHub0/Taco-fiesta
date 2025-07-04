"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ImageWithFallback } from './ImageWithFallback'
import { Plus, Minus } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { Button } from './ui/button'
import { fadeIn, scaleIn, hoverScale } from "@/lib/animations"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"

interface MenuItemProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    image: string
    sizes?: Array<{
      size: string
      price: number
    }>
  }
}

const MenuItem = ({ item }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const { addItem } = useCart()

  const getPrice = () => {
    if (selectedSize && item.sizes) {
      const sizePrice = item.sizes.find(s => s.size === selectedSize)?.price
      return sizePrice || item.price || 0
    }
    return item.price || 0
  }

  const handleAddToCart = () => {
    const itemToAdd = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: getPrice(),
      quantity: quantity
    }
    addItem(itemToAdd)
    setQuantity(1)
    setSelectedSize('')
  }

  return (
    <motion.div
      whileHover={hoverScale}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative h-48 overflow-hidden rounded-t-lg"
      >
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white">{item.name}</h3>
        </div>
      </motion.div>

      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        
        {item.sizes && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Size:</label>
            <div className="flex gap-2">
              {item.sizes.map((size) => (
                <Button
                  key={size.size}
                  variant="outline"
                  onClick={() => setSelectedSize(size.size)}
                  className={cn(
                    "flex-1",
                    selectedSize === size.size && "bg-red-500 text-white border-red-500"
                  )}
                >
                  {size.size}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-primary">
            ${getPrice().toFixed(2)}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center border-2 border-yellow-500 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-yellow-600 hover:text-red-600"
              >
                -
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                className="text-yellow-600 hover:text-red-600"
              >
                +
              </Button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="bg-yellow-500 hover:bg-red-500 text-white"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MenuItem

