"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function FloatingCart() {
  const { items } = useCart()
  const itemCount = items.length

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed bottom-6 right-6"
        >
          <Link href="/cart">
            <button className="bg-yellow-500 hover:bg-red-500 text-white p-4 rounded-full shadow-lg">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {itemCount}
              </span>
            </button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 